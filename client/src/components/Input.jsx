import React from "react";
import { boolean } from "yup";
import { BsEye, BsEyeSlash, BsStarFill } from "react-icons/bs";
import { useState } from "react";

const Input = ({
  borderColor = "border-gray-600",
  value,
  name,
  placeholder,
  type,
  handleChange,
  handleBlur,
  error,
  touched,
  setIsVisible,
  isVisible,
  textArea = false,
  ...other
}) => {
  return (
    <div className="flex flex-col ">
      <div
        className={`${
          Boolean(touched) && Boolean(error) ? " border-red-500" : borderColor
        } border-[1px]  w-full ${
          textArea ? "" : "h-[43px]"
        } flex justify-between items-center py-4 px-4 rounded-sm `}
      >
        {!textArea ? (
          <input
            className="outline-none bg-transparent  text-white placeholder:text-secondary-white/40 placeholder:text-sm flex-1 text-sm"
            type={name !== "password" ? type : isVisible ? "text" : "password"}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            {...other}
          />
        ) : (
          <textarea
            className="outline-none bg-transparent  text-white placeholder:text-secondary-white/40 flex-1"
            placeholder={placeholder}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            rows={4}
          ></textarea>
        )}
        {name === "averageRating" && (
          <BsStarFill
            className={` text-yellow-600 text-[20px] cursor-pointer`}
          />
        )}
        {name === "password" && (
          <>
            {isVisible ? (
              <BsEyeSlash
                onClick={() => setIsVisible(false)}
                className={`text-white text-[20px] cursor-pointer`}
              />
            ) : (
              <BsEye
                onClick={() => setIsVisible(true)}
                className={`text-white text-[20px] cursor-pointer `}
              />
            )}
          </>
        )}
      </div>
      {Boolean(touched) && Boolean(error) && (
        <p className=" text-red-500 text-[11px] pt-2">{touched && error}</p>
      )}
    </div>
  );
};

export default Input;
