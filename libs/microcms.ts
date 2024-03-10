import { Article } from "@/app/types/articleType";
import { MicroCMSQueries, createClient } from "microcms-js-sdk";

if (!process.env.MICROCMS_SERVICE_DOMAIN)
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
if (!process.env.MICROCMS_API_KEY)
  throw new Error("MICROCMS_API_KEY is required");

// microCMSClientの作成
export const microCMSClient = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// 記事一覧の取得
export async function getArticles(queries?: MicroCMSQueries) {
  const articles = await microCMSClient.getList<Article>({
    customRequestInit: {
      next: {
        revalidate: 0,
      },
    },
    endpoint: "muscle-blog",
    queries,
  });
  return articles;
}

// 特定の記事を取得
export async function getArticlesDetail(
  contentId: string,
  queries?: MicroCMSQueries
) {
  const ArticlesDetail = await microCMSClient.getListDetail<Article>({
    customRequestInit: {
      next: {
        revalidate: 0,
      },
    },
    endpoint: "muscle-blog",
    contentId,
    queries,
  });
  return ArticlesDetail;
}
