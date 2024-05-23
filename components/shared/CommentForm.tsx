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
import { createComentary } from "@/lib/actions/comment.action"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
 
const formSchema = z.object({
  message: z.string().min(1, {
    message: "Comment must be at least 1 character.",
  }),
})

export function CreateCommentForm({userId, postId}: {userId: string, postId: string}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          message: "",
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
          const newComment = await createComentary({
            comment: {...values },
            postId,
            userId,
          })
          if(newComment){
            console.log("Comentary created successfully")
          }
          form.reset()
          
        } catch (error) {
          console.log(error)
        }
      }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 items-center w-full h-12">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Add a comment" {...field}  className="min-w-[670px] w-full h-7"/>
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="flex items-center gap-1 h-7"> <PaperPlaneIcon className="w-4 h-4" /> Submit</Button>
          </form>
        </Form>
      )
}