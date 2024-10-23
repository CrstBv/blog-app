import { IComment } from "@/lib/database/models/comment.model";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CommentCardActions, CommentCardAuthorActions } from "./CommentCardActions";

type CommentProps = {
    comment: IComment
}

export async function CommentCard({comment}: CommentProps) {
    //const isAuthor = userId === comment.author._id

    return (
        <div className="group relative flex flex-col">
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
            { /*isAuthor && (
                <CommentCardAuthorActions comment={comment} userId={userId}/>
            )*/}
            <p className="w-full text-sm">
            {comment.message}
            </p>
            </div>
            <div className="flex justify-end mr-16">
                <CommentCardActions />
            </div>
        </div>
    )
}