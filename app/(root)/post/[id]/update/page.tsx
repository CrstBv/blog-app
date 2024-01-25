import PostForm from '@/components/shared/PostForm';
import { auth } from '@clerk/nextjs'
import React from 'react'

const UpdatePost = () => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string

  return (
    <>
    <section className='py-5 md:py-10'>
        <h3>Update Post</h3>
    </section>
    <div className='my-8 '>
        <PostForm userId={userId} type="Update" />
    </div>
    </>

  )
}

export default UpdatePost