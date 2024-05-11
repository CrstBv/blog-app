import { Schema, model, models } from "mongoose";

export interface IComment extends Document {
    _id: string;
    author: {_id: string, firstName: string, lastName: string};
    message: string;
    post: {_id: string, title: string}
}

const CommentsSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User"},
    message: {type: String, required: true },
    post: {type: Schema.Types.ObjectId, ref: "Post"},
})

const Comment = models.Comment || model("Comment", CommentsSchema)

export default Comment