import Collection from "@/components/shared/Collection";
import {
  getPostById,
  getRelatedPostsByCategory,
} from "@/lib/actions/post.actions";
import Image from "next/image";

type searchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const PostDetails = async ({
  params: { id },
  searchParams,
}: searchParamProps) => {
  const post = await getPostById(id);
  const relatedPost = await getRelatedPostsByCategory({
    categoryId: post.category._id,
    postId: post._id,
    page: searchParams.page as string,
  });
  return (
    <div className="container relative ">
      <section className="flex justify-center pt-8 max-w-7xl">
        <div className="grid grid-rows-1 md:grid-rows-2">
          <Image
            src={post.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="h-full w-fit min-h-[32px] max-h-[55vh] object-cover object-center"
            priority
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2>{post.title}</h2>
              <div className="gap-3">
                <p className="">
                  by{" "}
                  <span>
                    {post.author.firstName} {post.author.lastName}
                  </span>
                </p>
                <div className="">
                  <span>Published</span>
                  <span className="pl-1">
                    {post.createdAt} {/*Add a date format */}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <p>{post.description}</p>
              </div>
            </div>
            <div>
              <div>
                <p>Category: {post.category.name}</p>
              </div>
              <p>
                {post.private
                  ? "Only you can see this post"
                  : "Everyone can see this post"}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-8 flex flex-col ga-8 md:gap-12">
        <h2>Related Post</h2>
        <Collection
          data={relatedPost?.data}
          emptyTitle="No post related"
          emptyStateSubtext="Come back later"
          collectionTye="All_Posts"
          limit={9}
          page={1}
          totalPages={relatedPost.totalPages}
        />
      </section>
    </div>
  );
};

export default PostDetails;
