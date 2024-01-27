import { useRouter } from "next/router";
import React from "react";

import Image from "next/image";
import { fetchArticleBySlug } from "@/lib/article";

import deslugify from "@/utils/deslugify";
const Index = ({ article }) => {
  if (!article._id) {
    return (
      <p className="w-full h-screen flex items-center justify-center font-bold text-40 ">
        Article not found
      </p>
    );
  }

  return <ArticlePage article={article} />;
};

export default Index;

const ArticlePage = ({ article }) => {
  return (
    <div className="article-page p-8 mx-auto max-w-2xl">
      <Image
        src={article.imageUrl}
        alt={article.title}
        width={200}
        height={130}
        className="mb-6 w-full h-48  rounded-md object-fill object-center"
      />
      <h1 className="text-xl font-bold mb-4">{article.title}</h1>
      <div className="flex">
        <p className="text-gray-600 mb-2 mr-6">{article.type}</p>
        <p className="text-gray-600 mb-2">{article.date}</p>
      </div>
      {/* <p className="text-lg">{article.description}</p> */}
      <div dangerouslySetInnerHTML={{ __html: article.description }} />
    </div>
  );
};

export const getServerSideProps = async ({ params, req }) => {
  try {
    const { city, state, article } = params;

    const article_by_slug = await fetchArticleBySlug(
      article,
      deslugify(city),
      deslugify(state)
    );
    console.log("article is ", article_by_slug);

    return {
      props: {
        article: article_by_slug?._id ? article_by_slug : {},
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
