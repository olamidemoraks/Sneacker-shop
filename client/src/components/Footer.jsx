import React from "react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motions";

const Footer = () => {
  return (
    <div className="relative z-[9] w-full h-[150px] flex flex-col bg-primary-black/95 pt-6">
      <motion.div
        variants={fadeIn("up", "tween", 0.3, 1)}
        initial="hidden"
        whileInView="show"
        className="flex justify-between px-[10rem] pt-5"
      >
        <h3 className="uppercase text-secondary-white italic font-semibold">
          Sneakers
        </h3>
        <div className=" text-secondary-white flex justify-center items-center gap-3">
          <a href="" target="_blank">
            <FaFacebookSquare size={"20px"} />
          </a>
          <a href="" target="_blank">
            <FaTwitterSquare size={"20px"} />
          </a>
          <a href="" target="_blank">
            <FaInstagramSquare size={"20px"} />
          </a>
        </div>
      </motion.div>
      <div className="h-[1px] w-[80%] bg-gray-600 mx-auto mt-[20px]" />
      <p className="text-center text-secondary-white mt-2">
        &copy; Sneaker. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
