"use client"
import { Placeholder } from "@/components/ui/placeholder";
import { getAllPostComments } from "@/lib/actions/comment.actions";
import { IComment } from "@/lib/database/models/comment.model";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { CommentCard } from "./CommentCard";


export function CommentsSection({postId}: { postId: string}) {
    const [comments,setComments] = useState<IComment[]>([])
    const isLoading = comments === undefined

    useEffect(() => {
      const fetchComments = async() => {
        try {
          const commentsData = await getAllPostComments({postId})
          setComments(commentsData)
        } catch (error) {
          console.error("" + error)
        }
      }
      fetchComments()
  
      const intervalId = setInterval(fetchComments, 4000)
  
      return () => clearInterval(intervalId)
    }, [postId])
    return (
        <div className="w-full" >
        {isLoading && (
            <div className="fles flex-col gap-10 w-full items-center mt-28">
              <ReloadIcon className="h-36 w-36 animate-spin text-gray-500" />
              <div className="text-2xl">Loading comments ...</div>
            </div>
          )}
          {comments.length > 0 
          ? <div className="flex flex-col w-full">
              {comments.map((comment) => {
                return (
                    <CommentCard key={comment._id} comment={comment} />
                )
              })}
            </div>
          :  <Placeholder image="/assets/images/empty_comments.svg" message="Be the first comment" /> 
          }
        </div>
    )
}