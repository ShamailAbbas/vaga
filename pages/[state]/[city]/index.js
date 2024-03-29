import ArticlePreview from "@/components/CityPage/ArticlePreview";
import Attorny from "@/components/CityPage/Attorny";
import Faq from "@/components/CityPage/Faq";
import Header from "@/components/CityPage/Header";
import Review from "@/components/CityPage/Review";
import YoutubeEmbed from "@/components/CityPage/YoutubeEmbed";
import ReviewForm from "@/components/CityPage/ReviewForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { header } from "@/data";
import deslugify from "@/utils/deslugify";
import { addArticle, fetchArticleByCity } from "@/lib/article";
import { addAttorney, fetchAttorneyByCity } from "@/lib/attorny";
import { addVideo, fetchVideosByCity } from "@/lib/video";
import ArticleForm from "@/components/CityPage/ArticleForm";
import {
  addReview,
  fetchAverageStarsByCity,
  fetchReviewByCity,
} from "@/lib/review";
import isSubdomainAdmin from "@/utils/isSubdomainAdmin ";
import VideoForm from "@/components/CityPage/VideoForm";
import AttorneyForm from "@/components/CityPage/AttornyForm";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateAndSaveFaqs, getFaqByCity } from "@/lib/faq";
import { GetCityByName } from "@/lib/city";

const City = ({
  attorney,
  articles,
  videoIds,
  reviews,
  averageStars,
  isAdmin,
  faqs,
  cityFound,
  zip,
}) => {
  const router = useRouter();
  const { state, city } = router.query;
  const [_isAdmin, set_IsAdmin] = useState(false);
  const [showForm, setShowForm] = useState("");

  useEffect(() => {
    set_IsAdmin(isAdmin);
  }, []);

  function showMessage(message, closetime = 1000) {
    toast(message, {
      position: "top-right",
      autoClose: closetime,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "success",
    });
  }

  if (!cityFound) {
    return (
      <p className="w-full h-screen flex items-center justify-center font-bold text-40 ">
        City not found
      </p>
    );
  }
  return (
    <div className="flex flex-col w-full items-center font-Poppins px-4">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center sm:max-w-[500px] w-full ">
        <Header
          header={header}
          city={city && deslugify(city)}
          state={state && deslugify(state)}
        />

        {isAdmin && (
          <div
            className="flex items-center w-full justify-center py-2 my-4 rounded-full border-[1.5px] border-red-300 hover:bg-red-200 bg-red-100 text-red-800 text-16 font-bold cursor-pointer"
            onClick={() => setShowForm(1)}
          >
            Add A New Attorny
          </div>
        )}

        {attorney && (
          <Attorny data={attorney} city_name={city && deslugify(city)} />
        )}

        {isAdmin && (
          <div
            className="flex items-center w-full justify-center py-2 my-4 rounded-full border-[1.5px] border-red-300 hover:bg-red-200 bg-red-100 text-red-800 text-16 font-bold cursor-pointer"
            onClick={() => setShowForm(2)}
          >
            Add A New Review
          </div>
        )}
        {reviews?.reviews?.length > 0 && (
          <Review
            averageStars={averageStars}
            data={reviews}
            city_name={city && deslugify(city)}
          />
        )}
        {isAdmin && !faqs?.faqs?.length > 0 && (
          <div
            className="flex items-center w-full justify-center py-2 my-4 rounded-full border-[1.5px] border-red-300 hover:bg-red-200 bg-red-100 text-red-800 text-16 font-bold cursor-pointer"
            onClick={async () => {
              showMessage(`Generating Faqs please wait...`, 60000);
              const res = await generateAndSaveFaqs(
                deslugify(state),
                deslugify(city)
              );
            }}
          >
            Generate Faqs
          </div>
        )}
        {faqs?.faqs?.length > 0 && (
          <Faq data={faqs} city_name={city && deslugify(city)} />
        )}
        {videoIds.length > 0 && (
          <p className=" self-start uppercase text-[22px]  opacity-90 mt-8">
            PERSONAL INJURY VIDEOS FOR {deslugify(city)}
          </p>
        )}
        {isAdmin && (
          <div
            className="flex items-center w-full justify-center py-2 my-4 rounded-full border-[1.5px] border-red-300 hover:bg-red-200 bg-red-100 text-red-800 text-16 font-bold cursor-pointer"
            onClick={() => setShowForm(3)}
          >
            Add A New Video
          </div>
        )}
        {videoIds.map((i, index) => (
          <YoutubeEmbed data={i.videoId} key={index} />
        ))}
        {articles.length > 0 && (
          <p className=" self-start  uppercase text-[22px]   opacity-90 mt-8">
            ARTICLES
          </p>
        )}
        {isAdmin && (
          <div
            className="flex items-center w-full justify-center py-2 my-4 rounded-full border-[1.5px] border-red-300 hover:bg-red-200 bg-red-100 text-red-800 text-16 font-bold cursor-pointer"
            onClick={() => setShowForm(4)}
          >
            Add A New Article
          </div>
        )}
        {articles && (
          <ArticlePreview data={articles} city_name={city && deslugify(city)} />
        )}

        {zip && (
          <div className="mt-60 pb-12  text-gray-900 md:text-[20px]">
            <p>ZIP CODES FOR PERSONAL INJURY LAW FIRMS</p>
            <p className="my-2 text-justify">{zip}</p>
          </div>
        )}

        {showForm == 1 && (
          <AttorneyForm
            onSubmit={async (data) => {
              const res = await addAttorney(data);
              if (res._id) {
                showMessage("Added Successfully");
                setShowForm("");
              }
            }}
            setShowForm={setShowForm}
            city={city && deslugify(city)}
            state={state && deslugify(state)}
          />
        )}
        {showForm == 2 && (
          <ReviewForm
            onSubmit={async (data) => {
              const res = await addReview(data);
              if (res._id) {
                showMessage("Added Successfully");
                setShowForm("");
              }
            }}
            setShowForm={setShowForm}
            city={city && deslugify(city)}
          />
        )}
        {showForm == 3 && (
          <VideoForm
            onSubmit={async (data) => {
              const res = await addVideo(data);
              if (res._id) {
                showMessage("Added Successfully");
                setShowForm("");
              }
            }}
            setShowForm={setShowForm}
            city={city && deslugify(city)}
          />
        )}

        {showForm == 4 && (
          <ArticleForm
            onSubmit={async (data) => {
              const res = await addArticle(data);
              if (res._id) {
                showMessage("Added Successfully");
                setShowForm("");
              }
            }}
            setShowForm={setShowForm}
            city={city && deslugify(city)}
            state={state && deslugify(state)}
          />
        )}
      </div>
    </div>
  );
};

export default City;

export const getServerSideProps = async ({ params, req }) => {
  let isAdmin = false;
  let cityFound = false;
  try {
    // Extract subdomain from the hostname
    const subdomain = req.headers.host.split(".")[0];

    if (subdomain.toLowerCase() === "admin") {
      isAdmin = true;
    }
    const { city, state } = params;
    const state_name = deslugify(state);
    const city_name = deslugify(city);

    const _city = await GetCityByName(city_name, state_name);
    console.log("_city", _city.zips);

    if (!_city._id) {
      throw new Error();
    }

    const articles = await fetchArticleByCity(city_name);

    const attorney = await fetchAttorneyByCity(city_name);

    const videoIds = await fetchVideosByCity(city_name);
    const reviews = await fetchReviewByCity(city_name);

    const averageStars = await fetchAverageStarsByCity(city_name);
    const faqs = await getFaqByCity(city_name);

    return {
      props: {
        attorney,
        articles,
        videoIds,
        reviews,
        averageStars: averageStars?.averageStars || null,
        isAdmin,
        faqs,
        cityFound: true,
        zip: _city?.zips?.toString(),
      },
    };
  } catch (error) {
    return {
      props: {
        attorney: null,
        articles: null,
        videoIds: [],
        reviews: {},
        averageStars: null,
        isAdmin,
        faqs: null,
        cityFound,
        zip: "",
      },
    };
  }
};
