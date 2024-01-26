import { useRouter } from "next/router";
import React from "react";
import { articles } from "@/data";
import Image from "next/image";
const index = () => {
  const router = useRouter();
  const { article } = router.query;

  const current_article = articles.find((i) => i.slug == article);
  if (!current_article) {
    return <p>Article not found</p>;
  }

  return <ArticlePage article={current_article} />;
};

export default index;

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
      <p className="text-gray-600 mb-2">{article.date}</p>
      <p className="text-lg">{article.description}</p>
    </div>
  );
};
