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
import { TrashIcon } from '@radix-ui/react-icons'

const DeleteConfirmation = ({postId}: {postId: string}) => {
    const pathname = usePathname()
    let [isPending, startTransition] = useTransition()

  return (
    <AlertDialog>
        <AlertDialogTrigger className='text-red-400 flex gap-1 items-center'>
        <TrashIcon className="w-5 h-4"/>
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