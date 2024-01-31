import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";

import { fetchReviewByCity } from "@/lib/review";
import Head from "next/head";
const Review = ({ averageStars, data, city_name }) => {
  const StarRating = ({ rating }) => {
    // Ensure the rating is within the range [0, 5]
    const normalizedRating = Math.min(5, Math.max(0, rating));

    // Determine the number of filled and empty stars
    const filledStars = Math.floor(normalizedRating);
    const hasHalfStar = normalizedRating % 1 !== 0;

    return (
      <div className="flex items-center">
        {/* Filled stars */}
        {Array.from({ length: filledStars }).map((_, index) => (
          <IoMdStar key={index} />
        ))}

        {/* Half star */}
        {hasHalfStar && <IoMdStarHalf />}
      </div>
    );
  };

  const EachReview = ({ data }) => {
    return (
      <div className="min-w-[80%] min-h-[200px] border-[2px] border-slate-100 rounded-xl  mx-4 p-2">
        <span className="flex items-center">
          <StarRating rating={data.stars} className="" />
          <p className="font-bold text-12 mx-2 opacity-50">.</p>
          <p className="font-medium text-sm self-end mb-[2px] ">
            {moment(data.date).calendar(null, {
              sameDay: "[Today]",
              lastDay: "[Yesterday]",
              lastWeek: "[Last] dddd", // 'Last' followed by the day of the week
              sameElse: "DD/MM/YYYY", // Use a custom format for other days
            })}
          </p>
        </span>
        <p className="my-2 text-[16px]">{data.review}</p>

        <div className="flex items-center mt-12">
          <Image
            src={data.picture}
            alt="profile"
            width={10}
            height={10}
            quality={80}
            className="w-10 h-10 rounded-full overflow-hidden"
          />
          <p className="font-semibold text-24 ml-4 opacity-70">
            {data.reviewer}
          </p>
        </div>
      </div>
    );
  };

  const [shouldHideShowAll, setshouldHideShowAll] = useState(false);
  const [_reviews, setReviews] = useState();
  useEffect(() => {
    data?.reviews && setReviews(data);
  }, [data]);

  async function getMore() {
    if (_reviews?.currentPage < _reviews?.totalPages) {
      const newLimits = {
        page: 1,
        limit: _reviews.totalReviews,
      };

      const res = await fetchReviewByCity(
        city_name,
        newLimits.page,
        newLimits.limit
      );
      if (res?.reviews?.length > 0) {
        setReviews({
          reviews: [..._reviews.reviews, ...res?.reviews],
          currentPage: res.currentPage,
          totalPages: res.totalPages,
        });

        setshouldHideShowAll(true);
      }
    }
  }
  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "AggregateRating",
            itemReviewed: {
              "@type": "Thing",
              name: `${city_name} Personal Injury Attorny Review`, // Replace with your actual business or product name
            },
            ratingValue: averageStars || 0,
            reviewCount: data?.totalReviews || 0,
            bestRating: 5, // Assuming the rating is out of 5
          })}
        </script>
      </Head>
      <div className="flex flex-col w-full p-4 pt-8 border-b-[2px] border-slate-200">
        <div className="flex self-center items-center">
          <Image
            src="/images/flower.png"
            alt="profile"
            width={50}
            height={50}
            quality={80}
            //className="w-40 h-40"
          />
          <p className="opacity-70 font-bold text-[40px] mb-6">
            {averageStars && parseFloat(averageStars)?.toFixed(1)}
          </p>
          <Image
            src="/images/flower.png"
            alt="profile"
            width={50}
            height={50}
            quality={80}
            className="transform scale-x-[-1]"
          />
        </div>
        <div className="flex items-center flex-col mt-4 mb-6 w-full ">
          <p className="font-medium  mb-2">Guest Favorite</p>
          <p className="w-[64%] text-center text-sm opacity-70">
            One of the most beloved home on Airbnb based on ratings, reviews and
            reliablity.
          </p>
        </div>
        <div
          className={`flex overflow-x-auto reviewcontainer pb-8 mt-8 ${
            _reviews?.totalReviews == 1 && "justify-center"
          }`}
        >
          {_reviews?.reviews?.map((i, index) => (
            <EachReview data={i} key={index} />
          ))}
        </div>
        {_reviews?.totalReviews > 10 && !shouldHideShowAll && (
          <button
            className="flex items-center w-full justify-center py-2 my-4 rounded-md border-[1.5px] border-gray-600 hover:bg-slate-50 text-16 font-bold  "
            onClick={() => getMore()}
          >
            See all {_reviews?.totalReviews} reviews
          </button>
        )}
      </div>
    </>
  );
};

export default Review;
