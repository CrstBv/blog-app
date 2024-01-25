"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Post from "../database/models/post.model";

export async function createUser(user: User) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error(error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}

type updateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

export async function updateUser(clerkId: string, user: updateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updateUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error(error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    await Promise.all([
      Post.updateMany(
        { _id: { $in: userToDelete.posts } },
        { $pull: { author: userToDelete._id } }
      ),
    ]);

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.error(error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}
