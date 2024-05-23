import { IComment } from "@/lib/database/models/comment.model"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CommentCardActions } from "./CommentCardActions"

type CommentProps = {
    comment: IComment
}

export function CommentCard({comment}: CommentProps) {
    return (
        <div>
            <div>

            <div className={"flex items-center w-full"}>
                <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.author.photo} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col ml-2">
                    <div className="flex w-full items-center justify-start text-lg">
                        {comment.author.firstName} {comment.author.lastName}
                    </div>
                </div>
            </div>
            <p>
            {comment.message}
            </p>
            </div>
            <div>
                <CommentCardActions />
            </div>
        </div>
    )
}