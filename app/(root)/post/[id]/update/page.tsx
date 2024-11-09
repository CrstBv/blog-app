import PostForm from '@/components/shared/PostForm';
import { getPostById } from '@/lib/actions/post.actions';
import { auth } from '@clerk/nextjs'
import React from 'react'

type UpdatePostProps = {
  params:{
    id: string
  }
}

const UpdatePost = async ({params: {id}}: UpdatePostProps) => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string
  const post = await getPostById(id)

  return (
    <div className='container relative'>
    <section className='flex justify-center py-3 md:py-5'>
      <div className='max-w-2xl lg:mx-6 p-5 md:px-4 xl:px-0 w-full gap-7 2xl:gap-3'>
        <h3 className="flex justify-center w-full text-[27px] pb-5">Update Post</h3>
        <PostForm userId={userId} type="Update" postId={post._id} post={post}/>
    </div>
    </section>
    
    </div>

  )
}

export default UpdatePost