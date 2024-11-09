import PostForm from "@/components/shared/PostForm";
import { auth } from "@clerk/nextjs";
import React from "react";

const CreatePost = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <div className="container relative">
      <section className="flex justify-center py-3 md:py-5 ">
        <div className="max-w-2xl lg:mx-6 p-5 md:px-4 xl:px-0 w-full gap-7 2xl:gap-3">
          <h3 className="flex justify-center w-full text-[27px] pb-5">Create Post</h3>
          <PostForm userId={userId} type="Create" />
        </div>
      </section>
    </div>
  );
};

export default CreatePost;
