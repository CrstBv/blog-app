import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { IPost } from "@/lib/database/models/post.model";
import { auth } from "@clerk/nextjs";
import { DropdownMenuIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "../ui/button";
import DeleteConfirmation from "./DeleteConfirmation";


type CardProps = {
  post: IPost;
};

const Card = ({ post }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isAuthor = userId === post.author._id.toString();

  return (
    <div
      className="group relative flex min-h-[350px] w-full max-w-[285px] flex-col overflow-hidden rounded-xl 
    shadow-lg transition-all hover:shadow-xl md:min-h-[414x]"
    >
      <Link
        href={`/post/${post._id}`}
        style={{ backgroundImage: `url(${post.imageUrl})` }}
        className="flex justify-center flex-grow bg-slate-500 bg-cover bg-center"
      />

      {isAuthor && (
        <div>
          <div className="absolute right-2 top-2 rounded-sm bg-transparent shadow-inner transition-all">
          <DropdownMenu>
            <DropdownMenuTrigger><DropdownMenuIcon className="w-7 h-7" /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex gap-1 items-center cursor-pointer">
                <Button asChild variant='ghost' className="flex gap-1 items-center h-7">
                  <Link href={`/post/${post._id}/update`}><Pencil1Icon className="w-4 h-4"/>Edit</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-1 items-center justify-center cursor-pointer">
                <DeleteConfirmation postId={post._id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>            
          </div>
        </div>
      )}

      <div
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      >
        <p className="w-min rounded-full px-4 py-1 bg-neutral-500 line-clamp-1">
          {post.category?.name}
        </p>
        <Link href={`/post/${post._id}`}>
          <p className="line-clamp-2 flex-1">{post.title}</p>
        </Link>
        <div>
          <p className="">
            by: {post.author.firstName} {post.author.lastName}
          </p>
        </div>
        <div className="
          ">
            <span>
              {isAuthor
                ? post.private
                  ? "Only you can see this post"
                  : ''
                : ''}
            </span>
          </div>
      </div>
    </div>
  );
};

export default Card;
