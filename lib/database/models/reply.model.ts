import { model } from "mongoose";
import { Schema, models } from "mongoose";

export interface IReply extends Document {
    _id: string,
    message: string,
    author: {_id: string, firstName: string, lastName: string, photo: string },
    repliedComment: {_id: string, message: string}
}


const ReplySchema = new Schema({
    repliedComment: {type: Schema.Types.ObjectId, ref: "Comment"},
    message: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: "User"}
})

const Reply = models.Reply || model("Reply", ReplySchema)

export default Reply