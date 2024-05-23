"use server"

import { connectToDatabase } from "../database"
import Comment from "../database/models/comment.model"
import Post from "../database/models/post.model"
import User from "../database/models/user.model"

type CreateCommentParams = {
    userId: string
    comment: {
        message: string
    }
    postId: string
}

export async function createComentary({userId, comment, postId}: CreateCommentParams) {
    try {
        await connectToDatabase()

        const author = await User.findById(userId)

        if(!author){
            throw new Error("Comment author not found")
        }

        const newComment = await Comment.create({
            ...comment,
            post: postId,
            author: userId
        })

        return JSON.parse(JSON.stringify(newComment))
    } catch (error) {
        console.error(error)
        throw new Error(typeof error === "string" ? error : JSON.stringify(error))
    }
}

export async function populateComment(query: any) {
    return query
      .populate({ path: "author", model: User, select: "_id firstName lastName photo" })
      .populate({ path: "category", model: Post, select: "_id title" });
}

export async function getCommentById({commentId}: {commentId: string}) {
    try {
        await connectToDatabase()

        const comment = await populateComment(Comment.findById({commentId}))

        if(!comment) {
            throw new Error("Comment not found")
        }

        return JSON.parse(JSON.stringify(comment))
    } catch (error) {
        console.error(error)
        throw new Error(typeof error === "string" ? error : JSON.stringify(error))
    }
}


export async function getAllPostComments({postId}: {postId: string}) {
    try {
        await connectToDatabase()

        const conditions = {post: postId}

        const commentsQuery = await Comment.find(conditions)

        //const comments = await populateComment(commentsQuery)

        if(!commentsQuery){
            return []
        }

        return JSON.parse(JSON.stringify(commentsQuery))
    } catch (error) {
        console.error(error)
        throw new Error(typeof error === "string" ? error : JSON.stringify(error))
    }
}