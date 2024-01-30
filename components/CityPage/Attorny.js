import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { fetchAttorneyByCity } from "@/lib/attorny";

const Attorny = ({ data, city_name }) => {
  const [_attorneys, setAttornys] = useState();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 3,
  });

  useEffect(() => {
    data?.attorneys && setAttornys(data);
  }, [data]);

  async function getMore() {
    if (_attorneys?.currentPage < _attorneys?.totalPages) {
      const newLimits = {
        page: pagination.page + 1,
        limit: pagination.limit + 3,
      };

      const res = await fetchAttorneyByCity(city_name, newLimits.page);
      if (res?.attorneys?.length > 0) {
        setAttornys({
          attorneys: [..._attorneys.attorneys, ...res?.attorneys],
          currentPage: res.currentPage,
          totalPages: res.totalPages,
        });
        setPagination(newLimits);
      }
    }
  }

  return (
    <>
      {_attorneys?.attorneys?.map((i, index) => {
        return (
          <div
            className="w-full flex flex-col font-Poppins border-b-[1px] border-slate-500 rounded-xl mb-4 mt-2"
            key={index}
          >
            <div className="self-center flex flex-col items-center">
              <Image
                src={i.image}
                alt="profile"
                width={100}
                height={150}
                className="w-32 h-40 rounded-xl"
              />
              <div className="flex items-center mt-2 text-sm">
                <CiBookmark className="mr-[2px]" /> Top rated Criminal defence
                layer
              </div>
              <p className="text-blue-800 opacity-80 underline text-[24px] font-bold mt-4 ">
                {i.name}
              </p>

              <div className="flex items-center text-gray-600 ">
                {i.firm}{" "}
                <Link href={i.website} className='ml-2 font-bold mt-[-3px] text-[18px]'>
                  <IoIosLink />
                </Link>
              </div>
            </div>
            <button className="flex items-center w-full justify-center py-2 my-4 rounded-full border-[1.5px] border-gray-600 hover:bg-slate-50 text-16 font-bold ">
              <FiPhone className="text-red-200 mx-4 text-[24px]" /> {i.phone}
            </button>
            <p className="opacity-70 font-semibold  mb-2">
              {i.city}, {i.state}
            </p>
            <p className="font-medium opacity-80">{i.description}</p>
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
      })}
      {_attorneys?.currentPage < _attorneys?.totalPages && (
        <p
          className="pb-2 opacity-60 cursor-pointer self-start"
          onClick={() => getMore()}
        >
          more
        </p>
      )}
    </>
  );
};

export default Attorny;
