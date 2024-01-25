import ArticlePreview from "@/components/CityPage/ArticlePreview";
import Attorny from "@/components/CityPage/Attorny";
import Faq from "@/components/CityPage/Faq";
import Header from "@/components/CityPage/Header";
import Review from "@/components/CityPage/Review";
import React from "react";

const city = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col justify-center items-center">
        <Header />
        <Attorny />
        <Review />
        <Faq />
        <ArticlePreview />
      </div>
    </div>
  );
};

export default city;
