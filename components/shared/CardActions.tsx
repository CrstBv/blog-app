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
  
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from "@/components/ui/dropdown-menu";
import { usePathname } from 'next/navigation'
import { deletePost } from '@/lib/actions/post.actions'
import { useState } from 'react'
import { DropdownMenuIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import Link from 'next/link';
import { IPost } from '@/lib/database/models/post.model';

type CardProps = {
    post: IPost
}

const CardActions = ({post}: CardProps) => {
    const pathname = usePathname()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  return (
    <>
          <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogTrigger></AlertDialogTrigger>
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
                <AlertDialogAction className='bg-red-600' onClick={async() => {
                    await deletePost({ postId: post._id, path: pathname})
                }}>
                  Confirm
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

        <div>
          <div className="absolute right-2 top-2 rounded-sm bg-transparent shadow-inner transition-all">
          <DropdownMenu>
            <DropdownMenuTrigger><DropdownMenuIcon className="w-7 h-7" /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex gap-1 items-center cursor-pointer">
                <Button asChild variant='ghost' className="flex gap-1 items-center h-7">
                  <Link href={`/post/${post._id}/update`}><Pencil1Icon className="w-4 h-4"/>Edit</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-1 items-center justify-center cursor-pointer text-red-400"
              onClick={() => setIsConfirmOpen(true)}>
                <TrashIcon className="w-5 h-4"/>
            Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>            
          </div>
        </div>
        </>
  )
}

export default CardActions