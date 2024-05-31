"use client"
import { DropdownMenuIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useState } from "react";
import { CommentForm } from "./CommentForm";
import { getCommentById } from "@/lib/actions/comment.action";

export function CommentCardActions() {
    return (
        <div>
        
        <div className="flex items-center justify-between mx-5">
            <Button variant={"ghost"} className="text-xs">
            Reply {" "}
            </Button>
        </div>
        </div>
    )
}


export async function CommentCardAuthorActions({commentId, userId}: {commentId: string, userId: string}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const comment = await getCommentById({commentId})
    return (
      <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogTrigger></AlertDialogTrigger>
        <AlertDialogContent className='bg-inherit'>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Edit your comment
                </AlertDialogTitle>
                <CommentForm type="Update" commentId={comment._id} postId={comment.post._id} userId={userId}/>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-red-600' onClick={async() => {
                  setIsConfirmOpen(false)
                }}>
                  Done
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

                {/* InitialValues for CommentForm and implement the Delete Action */}
            <div className="flex items-center justify-between mx-5">
            <div className="absolute right-2 top-2 rounded-sm bg-transparent shadow-inner transition-all">
          <DropdownMenu>
            <DropdownMenuTrigger><DropdownMenuIcon className="w-7 h-7" /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex gap-1 items-center cursor-pointer" onClick={() => {setIsConfirmOpen(true)}}>
                <Pencil1Icon className="w-4 h-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-1 items-center justify-center cursor-pointer text-red-400">
                <TrashIcon className="w-4 h-4"/>
            Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>            
          </div>
        </div>
      </>
    )
}