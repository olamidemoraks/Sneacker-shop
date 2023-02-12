import React from "react";

const Template = ({ title = "", style = "text-[12px]", children }) => {
  return (
    <div className="mx-[2rem] mt-1">
      <p className={` text-secondary-white ${style}`}>{title}</p>
      {children}
    </div>
  );
};

export default Template;
