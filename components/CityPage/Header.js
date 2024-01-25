import React from "react";

const Header = ({ header }) => {
  return (
    <div className="font-Poppins py-4">
      <p className="opacity-90 font-bold text-[28px] mb-2">{header.title}</p>
      <p className="font-semibold opacity-60 text-[20px]">
        {header.description}
      </p>
    </div>
  );
};

export default Header;
