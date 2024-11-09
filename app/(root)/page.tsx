import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { getAllPublicPost } from "@/lib/actions/post.actions";
import { SearchParamsProps } from "@/lib/utils";
import Image from "next/image";

export default async function Home({ searchParams }: SearchParamsProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const publicPost = await getAllPublicPost({
    query: searchText,
    category,
    page,
    limit: 9,
  });

  return (
    <div className="container relative">
      <section className="items-center py-3 md:py-4 md:pb-4 xl:py-6 xl:pb-6">
        <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full grid grid-cols-1 gap-7 md:grid-cols-2 2xl:gap-3">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px]  xl:text-[58px] xl:leading-[74px]">
              Cosmic Horizons Blog
            </h1>
            <p className="text-[18px] md:text-[21x]">
              Embark on a modest blog app inviting you to casually explore posts
              about the deep universe. From distant galaxies to enigmatic cosmic
              phenomena, these posts offer a glimpse into the profound mysteries
              that lie beyond our solar system. Uncover the wonders of the deep
              universe and ponder just how far our understanding extends. In
              this humble space, spark curiosity about the vastness that
              surrounds us.
            </p>
          </div>
          <Image
            src="/assets/images/home.png"
            alt="home"
            width={1000}
            height={1000}
            className="max-h-[44vh] object-contain  object-center 2xl:max-h-[40vh]"
            priority={true}
          />
        </div>
      </section>
      <section className="max-w-7xl lg:mx-12 p-6 md:px-8 xl:px-0 w-full my-4 flex flex-col gap-8 md:gap-12">
        <h2 className="font-bold text-[32px] leading-[30px] lg:text-[36px] lg:leading-[32px] xl:text-[38px] xl:leading-[36px]">Posts</h2>
        <div className="flex items-center w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>
        <Collection
          data={publicPost?.data}
          emptyTitle="No post found"
          emptyStateSubtext="Come back later"
          collectionTye="All_Posts"
          limit={9}
          page={page}
          totalPages={publicPost.totalPages}
        />
      </section>
    </div>
  );
}
