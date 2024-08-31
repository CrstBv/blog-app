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

export async function getReplyById({replyId}: {replyId: string}) {
    try {
        await connectToDatabase()

        const reply = await Reply.findById({replyId})
        .populate({path: "author", model: User, select: "_id firstName lastName photo"})

        if(!reply) {
            throw new Error("Reply not found")
        }

        return JSON.parse(JSON.stringify(reply))
    } catch (error) {
        console.error(error)
        throw new Error(typeof error === "string" ? error : JSON.stringify(error))
    }
}

export async function getAllCommentReplies({commentId}: {commentId: string}){
    try {
        await connectToDatabase()

        const replies = await Reply.find({commentId})
        .populate({path: "author", model: User, select: "_id firstName lastName photo"})
        .sort({createdAt: "desc"})

        if(!replies){
            throw new Error("There´s no replies for this comment")
        }
        
        return JSON.parse(JSON.stringify(replies))
    } catch (error) {
        console.error(error)
        throw new Error(typeof error === "string" ? error : JSON.stringify(error))
    }
}

export async function updateReply({reply, userId}: {reply: {_id: string, message: string}, userId: string}) {
    try {
        await connectToDatabase()

        const replyToUpdate = await Reply.findById(reply._id)

        if(!replyToUpdate){
            throw new Error ("Reply not found")
        }

        if(replyToUpdate.author.toHexString() !== userId) {
            throw new Error("Unauthorized")
        }

        const updatedReply = await Reply.findByIdAndUpdate(reply._id, {...reply})

        return JSON.parse(JSON.stringify(updatedReply))
    } catch (error) {
        console.error(error)
        throw new Error(typeof error === "string" ? error : JSON.stringify(error))
    }
}

export async function deleteReply({replyId}: {replyId: string}) {
    try {
        await connectToDatabase()

        const replyToDelete = await Reply.findByIdAndDelete({replyId})

        if(!replyToDelete){
            throw new Error("Reply not found")
        }

        console.log("reply deleted successfully")
    } catch (error) {
        console.error(error)
        throw new Error(typeof error === "string" ? error : JSON.stringify(error))
    }
}