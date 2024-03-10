import BlogPagination from "@/app/components/BlogPagination";
import { getArticles } from "@/libs/microcms";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
const parPage = 2;
export default function Home(props: Props) {
  const page = Number(props.searchParams.page ?? "1");
  const { contents, totalCount } = use(
    getArticles({ offset: page * parPage - parPage, limit: parPage })
  );

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-3/4 mx-auto">
        {contents.map((article) => (
          <article className="flex flex-col shadow p-4" key={article.id}>
            <Link
              href={`/article/${article.id}`}
              className="flex flex-col items-center"
            >
              <Image
                src={article.eyecatch?.url ?? "/no-image.png"}
                alt="アイキャッチ"
                width={1600}
                height={1200}
                className="rounded-xl object-cover"
              />
              <h2 className="text-3xl font-bold">{article.title}</h2>
            </Link>
          </article>
        ))}
      </div>
      <BlogPagination
        total={Math.ceil(totalCount / parPage)}
        initialPage={page}
        showControls
        variant="flat"
        showShadow
      />
    </div>
  );
}
