// components/CityPage.js
import React from "react";
import Article from "./Article.js";

const CityPage = ({ slug }) => {
  // Fetch data for the city using the slug
  const cityData = fetchData(slug);

  return (
    <div>
      <h1>{cityData.cityName}</h1>
      {cityData.articles.map((article) => (
        <Article key={article.id} title={article.title} text={article.text} />
      ))}
    </div>
  );
};

export default CityPage;
