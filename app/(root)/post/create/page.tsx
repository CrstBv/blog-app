import PostForm from '@/components/shared/PostForm';
import { auth } from '@clerk/nextjs'
import React from 'react'

const CreatePost = () => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string

  return (
    <>
    <section className='py-5 md:py-10'>
        <h3>Create Post</h3>
    </section>
    <div className='max-w-2xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full grid grid-row-1 gap-7 md:grid-rows-2 2xl:gap-3 '>
        <PostForm userId={userId} type="Create" />
    </div>
    </>

  )
}

export default CreatePost