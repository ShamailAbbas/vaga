import { useRouter } from "next/router";
import React from "react";
import { articles } from "@/data";
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
    <div className="article-page">
      <img src={article.imageUrl} alt={article.title} />
      <h1>{article.title}</h1>
      <p className="date">{article.date}</p>
      <p>{article.description}</p>
    </div>
  );
};
