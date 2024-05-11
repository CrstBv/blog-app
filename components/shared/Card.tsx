import { IPost } from "@/lib/database/models/post.model";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import CardActions from "./CardActions";


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
        <CardActions post={post} />
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
