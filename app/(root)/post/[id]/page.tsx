import Collection from "@/components/shared/Collection";
import { CommentForm } from "@/components/shared/CommentForm";
import { CommentsSection } from "@/components/shared/CommentsSection";
import PostContent from "@/components/shared/postContent";
import {
  getPostById,
  getRelatedPostsByCategory,
} from "@/lib/actions/post.actions";
import { getCurrentUserId } from "@/lib/actions/user.actions";
import { formatDate } from "@/lib/utils";
//import { useAuth } from "@clerk/clerk-react";
import Image from "next/image";

type searchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const PostDetails = ({
  params: { id },
  searchParams,
}: searchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  /*const currentUserId = await getCurrentUserId()
  const post = await getPostById(id);
  const postId = post._id
  const relatedPost = await getRelatedPostsByCategory({
    categoryId: post.category._id,
    postId,
    page: searchParams.page as string,
  });
  const postAuthorId = post.author._id.toString();
  const userId  = currentUserId as string
  const isAuthor = userId === postAuthorId */
  const postId = id

  return (
    <div className="container relative">
      <div>
        <PostContent postId={id} searchParams={searchParams} />
      </div>
      <section className="mx-12 flex flex-col items-center">
          <div className="w-full">
            {/*<CommentForm userId={userId} postId={post._id} type="Create" />*/}
            </div>
            <CommentsSection postId={postId}/>
      </section>
      </div>
  );
};

export default PostDetails;
