// components/ArticlePreview.js
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
const ArticlePreview = ({ imageUrl, title, date, type, description,state,city,slug }) => {
  const router=useRouter()
  return (
    <div className="flex w-full my-4 border-b-[2px] border-slate-100 pt-4 pb-8">
      <div className="min-w-[150px] min-h-[150px] ">
        <Image
          src={imageUrl}
          alt={title}
          width={100}
          height={50}
          className="w-full h-full object-fill"
        />
      </div>

      <div className="ml-4">
        <h2 className="font-bold text-20 ">{title}</h2>
        <div className="flex mb-2">
          <p className="font-medium">{type}</p>
          <p className="ml-6 font-medium">{date}</p>
        </div>
        <p className="opacity-70 mt-2 text-sm my-2 ">
          {description.slice(0, 100)}
        </p>
        <button className="  px-4 py-[3px] rounded-full uppercase font-medium text-sm border-[1px] border-slate-200 hover:bg-slate-50 " onClick={()=>router.push(`/${state}/${city}/${slug}`)}>
          Read More
        </button>
      </div>
    </div>
  );
};

export default ArticlePreview;
