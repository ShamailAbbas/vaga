import ArticlePreview from "@/components/CityPage/ArticlePreview";
import Attorny from "@/components/CityPage/Attorny";
import Faq from "@/components/CityPage/Faq";
import Header from "@/components/CityPage/Header";
import Review from "@/components/CityPage/Review";
import YoutubeEmbed from "@/components/CityPage/YoutubeEmbed";
import { useRouter } from "next/router";
import React from "react";
import { attorney, articles, header, videoIds } from "@/data";

const city = () => {
  const router = useRouter();
  const { state, city, article } = router.query;
  return (
    <div className="flex flex-col w-full items-center font-Poppins">
      <div className="flex flex-col justify-center items-center max-w-[500px] ">
        <Header header={header} />
        {attorney.map((data, index) => (
          <Attorny data={data} key={index} />
        ))}
        <Review aggegateReview={4.6} />
        <Faq />
        {videoIds.map((videoId, index) => (
          <YoutubeEmbed videoId={videoId} key={index} />
        ))}

        {articles.map((article, index) => (
          <ArticlePreview
            key={index}
            imageUrl={article.imageUrl}
            title={article.title}
            date={article.date}
            description={article.description}
            type={article.type}
            state={article.state}
            city={article.city}
            slug={article.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default city;
