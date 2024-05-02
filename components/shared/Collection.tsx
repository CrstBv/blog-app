import { IPost } from "@/lib/database/models/post.model";
import Card from "./Card";
import Pagination from "./Pagination";

type CollectionProps = {
  data: IPost[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  collectionTye?: "My_Posts" | "All_Posts";
  urlParamName?: string;
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionTye,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((post) => {
              return (
                <li key={post._id} className="flex justify-center">
                  <Card post={post} />
                </li>
              );
            })}
          </ul>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center min-h-[155px] w-full flex-col gap-3 rounded-xl py-26 text-center">
          <h3 className="text-[24px] leading-9">{emptyTitle}</h3>
          <p className="text-[16px] leading-3">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
