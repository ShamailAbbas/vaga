import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiBookmark } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

const Attorny = ({ data }) => {
  return (
    <div className="w-full flex flex-col font-Poppins border-b-[1px] border-slate-500 rounded-xl mb-4 mt-2">
      <div className="self-center flex flex-col items-center">
        <Image
          src={data.image}
          alt="profile"
          width={100}
          height={150}
          className="w-32 h-40 rounded-xl"
        />
        <div className="flex items-center mt-2 text-sm">
          <CiBookmark className="mr-[2px]" /> Top rated Criminal defence layer
        </div>
        <p className="text-blue-800 opacity-80 underline text-[24px] font-bold mt-4 ">
          {data.name}
        </p>

        <div className="flex items-center text-gray-600">
          {data.firm.name}{" "}
          <Link href={data.firm.link}>
            <IoIosLink />
          </Link>
        </div>
      </div>
      <button className="flex items-center w-full justify-center py-2 my-4 rounded-full border-[1.5px] border-gray-600 hover:bg-slate-50 text-16 font-bold ">
        <FiPhone className="text-red-200 mx-4 text-[24px]" /> {data.phone}
      </button>
      <p className="opacity-70 font-semibold  mb-2">
        {data.city} {data.state}
      </p>
      <p className="font-medium opacity-80">{data.desctiption}</p>
      <div className="flex justify-between w-full">
        <button className="flex  w-[48%] justify-center py-2 my-10 rounded-full  bg-purple-900 hover:bg-purple-700  text-16 font-bold text-white">
          <CiMail className="mr-2 text-[20px]" /> Contact me
        </button>
        <button className="flex  w-[48%] justify-center py-2 my-10 rounded-full  bg-purple-900 hover:bg-purple-700  text-16 font-bold text-white">
          <CiUser className="mr-2 text-[20px]" /> View Profile
        </button>
      </div>
    </div>
  );
};

export default Attorny;
