import { InferSchemaType, Schema, model, models } from "mongoose";

export interface IPost extends Document {
  _id: string;
  author: { _id: string; firstName: string; lastName: string };
  title: string;
  description: string;
  imageUrl?: string;
  private: boolean;
  category?: { _id: string; name: string };
}

const PostSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    private: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
