"use client"
import { deleteComment, getCommentById } from "@/lib/actions/comment.actions";
import { DotsVerticalIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CommentForm } from "./CommentForm";

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


export function CommentCardAuthorActions(
  {comment, userId}: 
  {comment: {_id: string, post:{_id: string}}, userId: string}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  //const comment = await getCommentById(commentId) this will go in the fetch data
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
            <DropdownMenuTrigger><DotsVerticalIcon className="w-7 h-7" /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex gap-1 items-center cursor-pointer" onClick={() => {setIsConfirmOpen(true)}}>
                <Pencil1Icon className="w-4 h-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
              className="flex gap-1 items-center justify-center cursor-pointer text-red-400"
              onClick={async () => {
                await deleteComment({commentId: comment._id})//Alert can be 
              }}
              >
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