"use server"
import { connectToDatabase } from "../database"
import Comment from "../database/models/comment.model"
import Reply from "../database/models/reply.model"
import User from "../database/models/user.model"

type CreateReplyParams = {
    userId: string,
    reply: { 
        message: string
    },
    repliedCommentId: string
}

export async function CreateReply({userId, reply, repliedCommentId}: CreateReplyParams) {
    try {
        await connectToDatabase()

        const author = await User.findById(userId)

        if(!author) {
            throw new Error("Reply author not found")
        }

        const commentToReply = await Comment.findById(repliedCommentId)

        if(!commentToReply) {
            throw new Error("Comment not found you cant reply now, try later")
        }

        const newReply = await Reply.create({
            ...reply,
            author: userId,
            repliedComment: repliedCommentId
        })

        return JSON.parse(JSON.stringify(newReply))
    } catch (error) {
        console.error(error)
        throw new Error(typeof error === "string" ? error : JSON.stringify(error))
    }
}