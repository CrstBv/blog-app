import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getPostByUser } from "@/lib/actions/post.actions";
import { SearchParamsProps } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";


const Profile = async ({searchParams}: SearchParamsProps) => {
  const { sessionClaims } = auth();
  const page = Number(searchParams?.page) || 1;
  const userId = sessionClaims?.userId as string;
  const userPost = await getPostByUser({ userId, page });

  return (
    <div className="container max-w-7xl">
      <div className="flex items-center py-3 md:py-5">
        <div className="flex items-center gap-6 mr-4">
          <h2 className="text-[34px] leading-10">My Posts</h2>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
        <Button asChild className="">
          <Link href={"/post/create"}>Create new Post</Link>
        </Button>
        </div>
      </div>
      <div className="max-w-7xl lg:mx-12 p-6 md:px-8 xl:px-0 w-full my-4 gap-8 md:gap-12">
          <Collection
          data={userPost?.data}
          emptyTitle="No post have created yet"
          emptyStateSubtext="Create some now"
          collectionTye="My_Posts"
          limit={9}
          page={page}
          totalPages={userPost.totalPages}
        />
        </div>
    </div>
  );
};

export default Profile;
