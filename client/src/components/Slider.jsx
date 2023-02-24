import { motion } from "framer-motion";
import { backupImage } from "../assets";
import React, { useState } from "react";
import { data } from "../constants/data";
import { useGetProductsQuery } from "../feature/product/productApiSlice";
import {
  staggerContainer,
  slideIn,
  textVariant,
  fadeIn,
} from "../utils/motions";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const bgChange = ["gradient-01", "gradient-02", "gradient-03", "gradient-04"];

const Slider = () => {
  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState(bgChange[3]);
  const { data: products = [], isLoading } = useGetProductsQuery();
  const { ids, entities } = products;

  const toFilterProduct = useMemo(() => {
    const item = ids?.map((id) => {
      return entities[id];
    });
    return item;
  }, [products]);

  const arr = toFilterProduct || [];
  const filterProduct = arr.filter((product) => product.feature === true);
  const backup = data;
  let product = [];
  if (isLoading || !products) {
    product = [...backup];
  } else {
    product = [...filterProduct];
  }
  const { id, name, price, image, description } =
    product[index === -1 ? 0 : index];

  const handleNext = () => {
    if (index + 1 !== product.length) {
      setIndex((prev) => prev + 1);
      setBgColor(bgChange[Math.floor(Math.random() * 4)]);
    }
  };
  const handlePrevious = () => {
    if (index + 1 !== 1) {
      setIndex((prev) => prev - 1);
      setBgColor(bgChange[Math.floor(Math.random() * 4)]);
    }
  };
  return (
    <section
      className={`${bgColor} relative h-[100vh] sm:px-16 px-6 overflow-hidden snap-start slider-section`}
    >
      <motion.div
        key={index}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="mx-auto  pt-20 flex justify-center items-center"
      >
        <div
          onClick={() => handlePrevious()}
          className="group lg:h-[200px] lg:w-[200px] h-[100px] w-[100px] border-[1px] rounded-full absolute -left-10 hover:-left-8 z-[9] top-[40%] flex items-center justify-center border-white/25 ease-out duration-700 hover:lg:h-[230px]   hover:lg:w-[230px] hover:h-[130px] hover:w-[130px]  "
        >
          <BsArrowLeft className="group-hover:text-[29px] text-[27px] text-secondary-white group-hover:animate-bounce" />
        </div>

        <div
          onClick={() => handleNext()}
          className=" group lg:h-[200px] lg:w-[200px] h-[100px] w-[100px]  border-[1px] rounded-full absolute z-[9] -right-10 top-[40%] flex items-center justify-center border-white/25 ease-out duration-700  hover:lg:h-[230px] hover:-right-8  hover:lg:w-[230px] hover:h-[130px] hover:w-[130px]"
        >
          <BsArrowRight className="group-hover:text-[29px] text-[27px] text-secondary-white group-hover:animate-bounce" />
        </div>

        <div className="flex flex-col justify-center items-center relative w-full">
          <motion.div
            variants={slideIn("left", "spring", 0.3, 1.7)}
            className=""
          >
            <div className="bot lg:h-[400px] md:h-[300px] sm:h-[300px] lg:w-[600px] md:w-[500px] sm:w-[450px]  group">
              {image ? (
                <img
                  src={`${process.env.BASE_URL}/assets/${image}`}
                  alt={name}
                  className=" object-cover -rotate-[50deg] group-hover:-rotate-[55deg] h-full sm:-translate-x-[80px] -translate-x-[40px] lg:translate-y-[50px] md:translate-y-[100px] sm:translate-y-[60px] -translate-y-[30px] w-full ease-linear duration-500"
                  loading="lazy"
                />
              ) : (
                <img
                  src={backupImage}
                  alt={name}
                  className=" object-cover -rotate-[50deg] group-hover:-rotate-[55deg] h-full sm:-translate-x-[80px] -translate-x-[40px] lg:translate-y-[50px] md:translate-y-[100px] sm:translate-y-[60px] -translate-y-[30px] w-full ease-linear duration-500"
                  loading="lazy"
                />
              )}
              <div className="bot_shadow lg:-bottom-[12.2rem] md:-bottom-[14rem] sm:-bottom-[8.6rem] -bottom-[0.1rem] left-[15%] shadow-2xl h-[16px]  blur-sm  rounded-[100%] bg-black/25 group-hover:-rotate-[60deg]" />
            </div>
          </motion.div>

          <motion.p
            variants={slideIn("right", "spring", 0.2, 1.7)}
            className="absolute lg:text-[8rem] md:text-[7rem] sm:text-[6rem] text-[5rem] text-center lg:top-[50%] md:top-[70%] sm:top-[50%] tracking-wide uppercase  font-bold w-full left-0 "
            style={{ fontFamily: "Bold" }}
          >
            <span className="text-white">{name.split(" ")[0]}</span>{" "}
            <span className="text_background">{name.split(" ")[1]}</span>
            {/* slice(0, Math.floor(name.length / 2)) */}
            {/* slice(Math.floor(name.length / 2)) */}
          </motion.p>
        </div>
        <motion.div
          key={index}
          variants={fadeIn("up", "tween", 0.1, 1)}
          className="flex justify-between mx-auto max-w-[100%] md:w-[50%] w-[70%] absolute md:bottom-[40px] bottom-[30px] items-end gap-8"
        >
          <div className="flex flex-col min-w-[18rem] max-w-[25rem] gap-3">
            <h2 className="text-secondary-white text-xl font-bold">
              $ {price}
            </h2>
            <p
              className="text-secondary-white font-light tracking-wide text-[12px] leading-7"
              style={{ fontFamily: "Semibold" }}
            >
              {description.substring(0, 100)} ...
            </p>
          </div>
          <Link to={`product-details/${id}`}>
            <p
              className="uppercase font-bold text-white border-b-[2px] pb-[5px] border-secondary-white/50 hover:pb-[10px] ease-linear duration-200"
              style={{ fontFamily: "Bold" }}
            >
              Buy now
            </p>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Slider;
