import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiBookmark } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { FiPhone } from "react-icons/fi";

const data = {
  image: "/images/profilepic.jpg",
  phone: 32243423445,
  name: "Steve Smith",
  city: "Los Angeles",
  state: "CA",
  desctiption:
    "Los Angeles is a sprawling Southern California city and the center of the nation’s film and television industry.",
  firm: {
    name: "Sitkoff & Hanrahan, LLP",
    link: "https://google.com",
  },
};

const Attorny = () => {
  return (
    <div>
      <Image src={data.image} alt="profile" width={100} height={100} />
      <div className="flex items-center">
        <CiBookmark /> Top rated Criminal defence layer
      </div>
      <button className="flex items-center w-60 justify-center py-2 my-10 rounded-full border-2 border-black text-16 font-bold">
        <FiPhone className="text-red-400 mx-4 " /> {data.phone}
      </button>
      <div className="flex items-center">
        {data.firm.name}{" "}
        <Link href={data.firm.link}>
          <IoIosLink />
        </Link>
      </div>
    </div>
  );
};

export default Attorny;
