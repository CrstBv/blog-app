"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createComentary, updateComment } from "@/lib/actions/comment.actions"
import { IComment } from "@/lib/database/models/comment.model"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
 
const formSchema = z.object({
  message: z.string().min(1, {
    message: "Comment must be at least 1 character.",
  }),
})

export function CommentForm({userId, postId, commentId, type, comment}: 
  {userId: string, postId: string, commentId?: string, type: "Create" | "Update", comment?: IComment}) {
  const initialValues = comment && type === "Update" ? comment : { message: ""}
  
  const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
          
          if(type === "Create"){
            const message = values.message
             await createComentary({
              comment: {message},
              postId,
              userId,
            })
            form.reset()
          }

          if(type === "Update"){
            if(commentId === undefined){
              commentId = ""
            }
            await updateComment({comment: {_id: commentId, message: values.message}, userId})
          }

        } catch (error) {
          console.log(error)
        }
      }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 items-center w-full h-16 ">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Add a comment" {...field}  className="min-w-[670px] w-full h-8 sm:w-full"/>
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="flex items-center gap-1 h-7" disabled={form.formState.isSubmitting}>
               <PaperPlaneIcon className="w-4 h-4" />
                {form.formState.isSubmitting ? "Submitting..." : `${type} Comment`}
               </Button>
          </form>
        </Form>
      )
}