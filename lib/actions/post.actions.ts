"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";
import Post from "../database/models/post.model";
import User from "../database/models/user.model";

type CreatePostParams = {
  userId: string;
  post: {
    title: string;
    description: string;
    imageUrl: string;
    private: boolean;
    categoryId: string;
  };
  path: string;
};

export async function createPost({ post, userId, path }: CreatePostParams) {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);

    if (!author) {
      throw new Error(`Post author not found`);
    }

    const newPost = await Post.create({
      ...post,
      category: post.categoryId,
      author: userId,
    });

    return JSON.parse(JSON.stringify(newPost));
  } catch (error) {
    console.log(error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}

export async function populatePost(query: any) {
  return query
    .populate({ path: "author", model: User, select: "_id firstName lastName" })
    .populate({ path: "category", model: Category, select: "_id name" });
}

export async function getPostById(postId: string) {
  try {
    await connectToDatabase();

    const post = await populatePost(Post.findById(postId));

    if (!post) {
      throw new Error("Post not found");
    }

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error(error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

type GetAllPostParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
  includePrivatePost?: boolean
};

export async function getAllPublicPost({
  query,
  limit,
  page,
  category,
}: GetAllPostParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const privacyCondition = { private: false }
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
        privacyCondition,
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const postQuery = Post.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const posts = await populatePost(postQuery);
    const postsCount = await Post.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(posts)),
      totalPages: Math.ceil(postsCount / limit),
    };
  } catch (error) {
    console.error(error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}

type GetUserPostParams ={
  userId: string,
  limit?: number,
  page: number
}

export async function getPostByUser({
  userId,
  limit = 9,
  page,
}: GetUserPostParams) {
  try {
    await connectToDatabase();

    const conditions = { author: userId };
    const skipAmount = (page - 1) * limit
    const postQuery = Post.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const posts = await populatePost(postQuery);
    const postsCount = await Post.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(posts)),
      totalPages: Math.ceil(postsCount / limit),
    };
  } catch (error) {
    console.error(error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}

type DeletePostParams = {
  postId: string;
  path: string;
};

export async function deletePost({ postId, path }: DeletePostParams) {
  try {
    await connectToDatabase();

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (deletedPost) {
      revalidatePath(path);
    }
  } catch (error) {
    console.error(error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}


type UpdatePostParams = {
  userId: string
  post: {
    _id: string
    title: string
    description: string,
    private: boolean,
    imageUrl: string,
    categoryId: string,
  }
  path: string
}

export async function updatePost({userId, post, path}: UpdatePostParams) {
  try {
    await connectToDatabase()

    const postToUpdate = await Post.findById(post._id)
    if(!postToUpdate){
      throw new Error('Post not found')
    }

    if(postToUpdate.author.toHexString() !== userId){
      throw new Error('Unauthorized')
    }

    const updatedPost = await Post.findByIdAndUpdate(
      post._id,
      {...post, category: post.categoryId},
      { new: true}
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedPost))
  } catch (error) {
    console.error
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  }
}


type GetRelatedPostsByCategoryParams ={
  categoryId: string
  postId: string
  limit?: number
  page: number | string
}

export async function getRelatedPostsByCategory({
  categoryId,
  postId,
  limit = 9,
  page,
}: GetRelatedPostsByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const privacyCondition = { private: false }
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: postId } }, privacyCondition] }

    const PostsQuery = Post.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const posts = await populatePost(PostsQuery)
    const PostsCount = await Post.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(posts)), totalPages: Math.ceil(PostsCount / limit) }
  } catch (error) {
    console.error
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  }
}