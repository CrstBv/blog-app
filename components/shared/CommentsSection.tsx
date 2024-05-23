import { IComment } from "@/lib/database/models/comment.model"
import { CommentCard } from "./CommentCard";


export function CommentsSection({data}: {data: IComment[]}) {
    return (
        <div>
          {data.map((comment) => {
              return (
                  <CommentCard key={comment._id} comment={comment} />
              );
            })}
        </div>
    )
}