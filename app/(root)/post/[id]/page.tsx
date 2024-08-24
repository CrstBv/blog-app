import Collection from "@/components/shared/Collection";
import { CommentForm } from "@/components/shared/CommentForm";
import { CommentsSection } from "@/components/shared/CommentsSection";
import { Placeholder } from "@/components/ui/placeholder";
import { getAllPostComments } from "@/lib/actions/comment.actions";
import {
  getPostById,
  getRelatedPostsByCategory,
} from "@/lib/actions/post.actions";
import { formatDate } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";

type searchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const PostDetails = async ({
  params: { id },
  searchParams,
}: searchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const post = await getPostById(id);
  const relatedPost = await getRelatedPostsByCategory({
    categoryId: post.category._id,
    postId: post._id,
    page: searchParams.page as string,
  });
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isAuthor = userId === post.author._id.toString();
  const comments = await getAllPostComments({postId: post._id})
  const isLoading = comments === undefined

  return (
    <div className="container relative">
      <section className="max-w-7xl pt-8">
        <div className="grid">
          <div className="flex justify-center w-full pb-5">
            <Image
            src={post.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="max-w-[550px] w-full h-fit max-h-[525px] object-cover object-center"
            priority
          />
          </div>
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl">{post.title}</h2>
              <div className="gap-3">
                <p className="py-2">
                  by{" "}
                  <span className="text-lg">
                    {post.author.firstName} {post.author.lastName}
                  </span>
                </p>
                <div className="text-[12px]">
                    {post.createdAt > post.updatedAt ? 
                    <div>
                      <span>Published</span>
                    <span className="pl-2">
                    {formatDate(post.createdAt)} </span>
                    </div>
                     : <div>
                     <span>Udated</span>
                   <span className="pl-2" >
                    {formatDate(post.updatedAt)}
                    </span>
                   </div> }
                </div>
              </div>
            </div>
            <div>
              <div className="px-2 text-xl text-justify">
                <p>{post.description}</p>
              </div>
            </div>
            <div className="py-3">
              <div>
                <p>Category: {post.category.name}</p>
              </div>
              <p className="flex pt-2 text-teal-300 items-center">
                {isAuthor ? post.private
                  ? "!Only you can see this post"
                  : "!Everyone can see this post"
                : ''}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-12 flex flex-col items-center">
          <div className="w-full">
            <CommentForm userId={userId} postId={post._id} type="Create" />
            </div>
            {isLoading && (
              <div className="fles flex-col gap-10 w-full items-center mt-28">
                <ReloadIcon className="h-36 w-36 animate-spin text-gray-500" />
                <div className="text-2xl">Loading comments ...</div>
              </div>
            )}
            {comments.lenght === 0 
            ? <Placeholder image="/empty_comments.svg" message="Be the first comment" /> 
            : <div className="flex flex-col w-full">
                <CommentsSection data={comments} />
              </div>
            }
      </section>
      <section className="my-8 flex flex-col gap-8 md:gap-12">
        <h2>Related Post</h2>
        <Collection
          data={relatedPost?.data}
          emptyTitle="No post related"
          emptyStateSubtext="Come back later"
          collectionTye="All_Posts"
          limit={9}
          page={page}
          totalPages={relatedPost.totalPages}
        />
      </section>
      </div>
  );
};

export default PostDetails;
