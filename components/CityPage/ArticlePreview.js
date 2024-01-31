// components/ArticlePreview.js
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchArticleByCity } from "@/lib/article";
import Head from "next/head";
import slugify from "@/utils/slugify";

const ArticlePreview = ({ data, city_name }) => {
  const router = useRouter();
  const [_articles, setArticles] = useState();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 3,
  });

  useEffect(() => {
    data?.articles && setArticles(data);
  }, [data]);

  async function getMore() {
    if (_articles?.currentPage < _articles?.totalPages) {
      const newLimits = {
        page: pagination.page + 1,
      };

      const res = await fetchArticleByCity(city_name, newLimits.page);
      if (res?.articles?.length > 0) {
        setArticles({
          articles: [..._articles.articles, ...res?.articles],
          currentPage: res.currentPage,
          totalPages: res.totalPages,
        });
        setPagination(newLimits);
      }
    }
  }

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "ItemList",
    itemListElement: data?.articles?.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://personalinjurynearme.attorney/${slugify(
        article.state
      )}/${slugify(article.city)}/${article.slug}`,
    })),
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      {_articles?.articles?.map((article, index) => {
        const { imageUrl, title, date, type, description, state, city, slug } =
          article;
        const previewText = description
          .replace(/<\/?[^>]+(>|$)/g, "")
          .split(" ")
          .slice(0, 20)
          .join(" ");
        return (
          <div
            className="flex w-full my-4 border-b-[2px] border-slate-100 pt-4 pb-8"
            key={index}
          >
            <div className="max-w-[300px] h-[150px] sm:min-w-[150px] sm:min-h-[150px] ">
              <Image
                src={imageUrl}
                alt={title}
                width={100}
                height={50}
                className="w-full h-full object-fill"
              />
            </div>

            <div className="ml-4">
              <h2 className="font-bold text-20 ">
                {title.slice(0, 35)}
                {title.length > 35 && " ..."}
              </h2>
              <div className="flex mb-2">
                <p className="font-medium text-sm ">{type}</p>
                <p className="ml-2 sm:ml-6 font-medium text-sm">{date}</p>
              </div>
              <p className="opacity-70 mt-2 text-sm my-2 ">
                {/* {description.slice(0, 100)} */}
                {previewText}
              </p>

              <button
                className="  px-4 py-[3px] rounded-full uppercase font-medium text-sm border-[1px] border-slate-200 hover:bg-slate-50 "
                onClick={() =>
                  router.push(`/${slugify(state)}/${slugify(city)}/${slug}`)
                }
              >
                Read More
              </button>
            </div>
          </div>
        );
      })}
      {_articles?.currentPage < _articles?.totalPages && (
        <p
          className="pb-8 opacity-60 self-start cursor-pointer"
          onClick={() => getMore()}
        >
          more
        </p>
      )}
    </>
  );
};

export default ArticlePreview;
