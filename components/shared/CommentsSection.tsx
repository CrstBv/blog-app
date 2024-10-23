"use client"
import { Placeholder } from "@/components/ui/placeholder";
import { getAllPostComments } from "@/lib/actions/comment.actions";
import { IComment } from "@/lib/database/models/comment.model";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { CommentCard } from "./CommentCard";


export function CommentsSection({postId}: {postId: string}) {
    const [comments,setComments] = useState<IComment[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const fetchComments = async() => {
        try {
          const commentsData = await getAllPostComments({postId})
          console.log(commentsData)
          setComments(commentsData)
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchComments()
  
      const intervalId = setInterval(fetchComments, 16000)
  
      return () => clearInterval(intervalId)
    }, [postId])

    return (
        <div className="w-full" >
        {isLoading && (
            <div className="flex flex-col gap-10 w-full items-center mt-28">
              <ReloadIcon className="h-36 w-36 animate-spin text-gray-500" />
              <div className="text-2xl">Loading comments ...</div>
            </div>
          )}
        {!isLoading && comments.length > 0 
          ? (<div className="flex flex-col w-full">
              {comments.map((comment) => {
                return (
                    <CommentCard key={comment._id} comment={comment}/>
                )
              })}
            </div>)
          : (<Placeholder image="/assets/images/empty_comments.svg" message="Be the first comment" />)
          }
        </div>
    )
}