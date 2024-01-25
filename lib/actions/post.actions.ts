"use server"

import { connectToDatabase } from "../database"
import Post from "../database/models/post.model"
import User from "../database/models/user.model"

type createPostParams = {
    userId: string
    post: {
        title: string
        description: string
        imageUrl: string
        private: boolean
        categoryId: string
    }
    path: string
}

export async function createPost({post, userId, path}:createPostParams) {
    try {
        await connectToDatabase();

        const author = await User.findById(userId);

        if(!author){
            throw new Error(`Post author not found`)
        }

        const newPost = await Post.create({ ...post, category: post.categoryId, author: userId })

        return JSON.parse(JSON.stringify(newPost))
    } catch (error) {
        console.log(error)
        throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
    }
}