import ArticlePreview from "@/components/CityPage/ArticlePreview";
import Attorny from "@/components/CityPage/Attorny";
import Faq from "@/components/CityPage/Faq";
import Header from "@/components/CityPage/Header";
import Review from "@/components/CityPage/Review";
import YoutubeEmbed from "@/components/CityPage/YoutubeEmbed";
import ReviewForm from "@/components/CityPage/ReviewForm";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { faqs, header } from "@/data";
import deslugify from "@/utils/deslugify";
import { fetchArticleByCity } from "@/lib/article";
import { addAttorney, fetchAttorneyByCity } from "@/lib/attorny";
import { addVideo, fetchVideosByCity } from "@/lib/video";
import {
  addReview,
  fetchAverageStarsByCity,
  fetchReviewByCity,
} from "@/lib/review";
import isSubdomainAdmin from "@/utils/isSubdomainAdmin ";
import VideoForm from "@/components/CityPage/VideoForm";
import AttorneyForm from "@/components/CityPage/AttornyForm";

const City = ({
  attorney,
  articles,
  videoIds,
  reviews,
  averageStars,
  isAdmin,
}) => {
  const router = useRouter();
  const { state, city, article } = router.query;
  const [_isAdmin, set_IsAdmin] = useState(false);
  const [showForm, setShowForm] = useState("");
  useEffect(() => {
    set_IsAdmin(isAdmin);
  }, []);
  function renderForm() {
    if (showForm == "review")
      return (
        <ReviewForm
          onSubmit={async (data) => {
            await addReview(data);
            setShowForm("");
          }}
          setShowForm={setShowForm}
          city={city && deslugify(city)}
        />
      );
    if (showForm == "video")
      return (
        <VideoForm
          onSubmit={async (data) => {
            await addVideo(data);
            setShowForm("");
          }}
          setShowForm={setShowForm}
          city={city && deslugify(city)}
        />
      );
    if (showForm == "attorny")
      return (
        <AttorneyForm
          onSubmit={async (data) => {
            await addAttorney(data);
            setShowForm("");
          }}
          setShowForm={setShowForm}
          city={city && deslugify(city)}
          state={state && deslugify(state)}
        />
      );
  }
  return (
    <div className="flex flex-col w-full items-center font-Poppins">
      <div className="flex flex-col justify-center items-center max-w-[500px] ">
        <Header
          header={header}
          city={city && deslugify(city)}
          state={state && deslugify(state)}
        />
        {isAdmin && (
          <button
            className="flex items-center w-full justify-center py-2 my-4 rounded-full border-[1.5px] border-red-300 hover:bg-red-200 bg-red-100 text-red-800 text-16 font-bold "
            onClick={() => setShowForm("attorny")}
          >
            Add A New Attorny
          </button>
        )}
        {attorney.map((data, index) => (
          <Attorny data={data} key={index} />
        ))}
        {isAdmin && (
          <button
            className="flex items-center w-full justify-center py-2 my-4 rounded-full border-[1.5px] border-red-300 hover:bg-red-200 bg-red-100 text-red-800 text-16 font-bold "
            onClick={() => setShowForm("review")}
          >
            Add A New Review
          </button>
        )}
        {reviews?.length > 0 && (
          <Review averageStars={averageStars} reviews={reviews} />
        )}
        {isAdmin && (
          <button
            className="flex items-center w-full justify-center py-2 my-4 rounded-full border-[1.5px] border-red-300 hover:bg-red-200 bg-red-100 text-red-800 text-16 font-bold "
            onClick={() => setShowForm("faqs")}
          >
            Generate Faqs
          </button>
        )}
        {faqs?.length > 0 && <Faq faqs={faqs} />}
        {isAdmin && (
          <button
            className="flex items-center w-full justify-center py-2 my-4 rounded-full border-[1.5px] border-red-300 hover:bg-red-200 bg-red-100 text-red-800 text-16 font-bold "
            onClick={() => setShowForm("video")}
          >
            Add A New Video
          </button>
        )}
        {videoIds.map((i, index) => (
          <YoutubeEmbed videoId={i.videoId} key={index} />
        ))}
        {isAdmin && (
          <button className="flex items-center w-full justify-center py-2 my-4 rounded-full border-[1.5px] border-red-300 hover:bg-red-200 bg-red-100 text-red-800 text-16 font-bold ">
            Add A New Article
          </button>
        )}
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
        {renderForm()}
      </div>
    </div>
  );
};

export default City;

export const getServerSideProps = async ({ params, req }) => {
  try {
    let isAdmin = true;

    // Extract subdomain from the hostname
    // const subdomain = req.headers.host.split(".")[0];

    // if (subdomain.toLowerCase() === "admin") {
    //   isAdmin = true;
    // }
    const { city } = params;
    const city_name = deslugify(city);
    const articles = await fetchArticleByCity(city_name);

    const attorney = await fetchAttorneyByCity(city_name);

    const videoIds = await fetchVideosByCity(city_name);
    const reviews = await fetchReviewByCity(city_name);
    const averageStars = await fetchAverageStarsByCity(city_name);
    console.log("averageStars", averageStars);
    return {
      props: {
        attorney,
        articles,
        videoIds,
        reviews,
        averageStars: averageStars?.averageStars || null,
        isAdmin,
      },
    };
  } catch (error) {
    return {
      props: {
        attorney: [],
        articles: [],
        videoIds: [],
        reviews: [],
        averageStars: null,
        isAdmin,
      },
    };
  }
};
