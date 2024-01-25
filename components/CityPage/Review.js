import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";

const today = new Date(); // Current date and time
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1); // 1 day ago
const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 5); // 7 days ago
const customDate = new Date(2023, 0, 15);

const Review = ({ aggegateReview }) => {
  const reviews = [
    {
      reviewer: "Dany",
      stars: 4,
      date: new Date(),
      review: "Gorgious, just wow",
      picture: "/images/profilepic.jpg",
    },
    {
      reviewer: "Dany",
      stars: 4,
      date: yesterday,
      review: "Gorgious, just wow",
      picture: "/images/profilepic.jpg",
    },
    {
      reviewer: "Dany",
      stars: 4,
      date: customDate,
      review: "Gorgious, just wow",
      picture: "/images/profilepic.jpg",
    },
    {
      reviewer: "Dany",
      stars: 4,
      date: lastWeek,
      review: "Gorgious, just wow",
      picture: "/images/profilepic.jpg",
    },
  ];
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

  return (
    <div className="flex flex-col w-full p-4 border-b-[2px] border-slate-200">
      <div className="flex self-center items-center">
        <Image
          src="/images/flower.png"
          alt="profile"
          width={80}
          height={80}
          quality={80}
          //className="w-40 h-40"
        />
        <p className="opacity-70 font-bold text-[60px] mb-12">
          {aggegateReview}
        </p>
        <Image
          src="/images/flower.png"
          alt="profile"
          width={80}
          height={80}
          quality={80}
          className="transform scale-x-[-1]"
        />
      </div>
      <div className="flex overflow-x-scroll pb-8 mt-8">
        {reviews.map((i, index) => (
          <EachReview data={i} key={index} />
        ))}
      </div>
      <button className="flex items-center w-full justify-center py-2 my-4 rounded-md border-[1.5px] border-gray-600 hover:bg-slate-50 text-16 font-bold ">
        See all 280 reviews
      </button>
    </div>
  );
};

export default Review;
