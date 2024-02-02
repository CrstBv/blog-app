'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/components/ui/alert-dialog'
import { usePathname } from 'next/navigation'
import { deletePost } from '@/lib/actions/post.actions'
import { useTransition } from 'react'

const DeleteConfirmation = ({postId}: {postId: string}) => {
    const pathname = usePathname()
    let [isPending, startTransition] = useTransition()

  return (
    <AlertDialog>
        <AlertDialogTrigger className='rounded-b-lg bg-red-400'>
            Delete
        </AlertDialogTrigger>
        <AlertDialogContent className='bg-inherit'>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you sure you want to delete?
                </AlertDialogTitle>
                <AlertDialogDescription className=''>
                    The post will be permanently delete
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-red-600' onClick={() => startTransition(async () => {
                    await deletePost({ postId, path: pathname})
                })}>
                    {isPending ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteConfirmation