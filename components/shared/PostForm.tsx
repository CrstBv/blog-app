"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost, updatePost } from "@/lib/actions/post.actions";
import { IPost } from "@/lib/database/models/post.model";
import { useUploadThing } from "@/lib/uploadthing";
import { postFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "../ui/checkbox";
import Dropdown from "./Dropdown";
import { FileUploader } from "./FileUploader";

type PostFormProps = {
  userId: string;
  type: "Create" | "Update";
  post?: IPost;
  postId?: string;
};

const PostForm = ({ userId, type, post, postId }: PostFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues = post && type === 'Update' ? post : {
    title: "",
    description: "",
    private: false,
    imageUrl: "",
    categoryId: "",
  };

  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newPost = await createPost({
          post: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });

        if (newPost) {
          form.reset();
          router.push(`/post/${newPost._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

  if (type === "Update") {
    if(!postId) {
      router.back()
      return
    }

    try {
      const updatedPost = await updatePost({
        userId,
        post: { ...values, imageUrl: uploadedImageUrl, _id: postId },
        path: `/post/${postId}`,
      });

      if (updatedPost) {
        form.reset();
        router.push(`/post/${updatedPost._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="pt-4 space-y-5">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl className="h-80">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <p>Category</p>
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Select the category wich fix better to your post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="pt-5">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <p>Image</p>
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="private"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <label htmlFor="private" />
                    <Checkbox
                      onCheckedChange={field.onChange}
                      checked={field.value}
                      id="private"
                      className="mr-2 border-2"
                    />
                    <p>Private</p>
                  </div>
                </FormControl>
                <FormDescription>
                  Check if you want to be the only one who can see this post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : `${type} Post`}
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
