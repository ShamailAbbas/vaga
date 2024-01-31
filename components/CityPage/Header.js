import React from "react";

const Header = ({ header, city, state }) => {
  return (
    <div className="font-Poppins py-4">
      <h1 className="opacity-90 font-bold text-[28px] mb-2">
        {header.title} {city}, {state}
      </h1>
      <h2 className="font-semibold opacity-60 text-[20px]">
        {header.description} {city}
      </h2>
    </div>
  );
};

export default Header;
