import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/motions";
import { useGetProductsQuery } from "../feature/product/productApiSlice";
import RatingStars from "../components/RatingStars";
import { useCart } from "react-use-cart";
import { toast, Toaster } from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const { product } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      product: data?.entities[id],
    }),
  });
  const [size, setSize] = useState([]);
  const [descLength, setDescLength] = useState(product?.description.length);
  const [descFull, setDescFull] = useState(false);
  const [error, setError] = useState(false);
  const { addItem } = useCart();

  const addToCart = (product) => {
    if (size.length === 0) {
      setError(true);
      toast.error("Please select your size");
      return;
    }
    const cartItem = {
      id: product?.id,
      name: product?.name,
      image: product?.image,
      price: product?.price,
      size: size,
    };
    setError(false);

    addItem(cartItem);
    toast.success("Added Successfully to Cart");
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      className=" bg-primary-black/95 relative h-screen text-white flex items-center justify-center overflow-x-hidden"
    >
      <div className="absolute text-[450px] text-gray-100 opacity-5 uppercase z-0 font-semibold leading-9">
        {product?.brand}
      </div>
      <div className="xl:w-[70%] lg:w-[80%] md:w-[90%] w-[80%] flex justify-center flex-col relative h-full">
        <Toaster position="top-right" />
        <div className="flex md:flex-row flex-col">
          <div className="flex-1 w-full relative -right-[50px] md:flex flex-col gap-3 hidden ">
            <motion.p
              variants={fadeIn("left", "tween", 0.5, 1)}
              className="text-[40px] font-semibold mb-1 uppercase"
              style={{ fontFamily: "Bold" }}
            >
              {product?.name}
            </motion.p>

            <motion.div
              variants={fadeIn("left", "tween", 0.6, 1)}
              className="mt-4"
            >
              <RatingStars
                rating={Number(product?.averageRating)}
                w="w-6"
                h="w-6"
                color="text-emerald-300"
              />
            </motion.div>
            <motion.div
              variants={fadeIn("left", "tween", 0.64, 1)}
              className="mt-2 leading-[2rem] text-[17px] text-secondary-white"
            >
              <p> Available: {product?.inventory}</p>
            </motion.div>
            {/* <p
              variants={fadeIn("left", "tween", 0.6, 1)}
              className="leading-[2rem] text-[18px] text-secondary-white cursor-pointer"
              onClick={() => setDescFull((prev) => !prev)}
            >
              {product?.description.substring(0, 100)} ...
            </p> */}
          </div>
          <motion.div
            variants={fadeIn("down", "tween", 0.5, 1.3)}
            className="lg:h-[300px] h-[300px] lg:w-[600px] md:w-[500px] flex items-center justify-center relative md:-left-[3rem]  md:-translate-y-14 -translate-y-14 group"
          >
            <img
              src={`${process.env.BASE_URL}/assets/${product?.image}`}
              alt="images"
              className="-rotate-[20deg] w-full group-hover:-rotate-[23deg] ease-linear duration-300 z-10"
            />
            <div className="md:block hidden absolute lg:h-[100px] md:h-[100px] lg:w-[500px] md:w-[400px] rounded-full bg-black -rotate-[20deg] group-hover:-rotate-[23deg] lg:-bottom-20 -bottom-20 left-[15%] blur-[50px] ease-linear duration-300" />
            <div className="md:hidden absolute h-[100px] w-[300px] rounded-full bg-black bottom-0  blur-[60px] z-0" />
          </motion.div>

          <div className="flex-[0.5] flex flex-col items-start gap-4 z-[9] w-full md:justify-end">
            <motion.p
              variants={fadeIn("right", "tween", 0.5, 1)}
              className="text-[27px] font-bold w-[120px] md:block hidden text-orange-300"
              style={{ fontFamily: "Bold" }}
            >
              $ {product?.price.toFixed(2)}
            </motion.p>
            <motion.label
              variants={fadeIn("right", "tween", 0.6, 1)}
              htmlFor="size"
            >
              <div
                className=" gap-4 text-gray-400 hover:text-white text-[20px] md:flex hidden"
                style={{ fontFamily: "Semibold" }}
              >
                <label htmlFor="size">Size</label>
                <select
                  id="size"
                  className=" bg-transparent outline-none  items-center justify-center "
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value=""></option>
                  {product?.size.map((value, index) => (
                    <option
                      className="bg-primary-black text-secondary-white p-2 "
                      key={index}
                      value={value}
                    >
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </motion.label>
            <motion.button
              variants={fadeIn("right", "tween", 0.7, 1)}
              className="md:block hidden text-indigo-500 font-bold uppercase text-[1.4rem] cursor-pointer tracking-wide text-start ease-linear duration-200 group"
              type="button"
              onClick={() => addToCart(product)}
            >
              Buy Now
              <div className="h-[2px] w-full bg-indigo-500 ease-linear duration-200 hidden group-hover:block" />
            </motion.button>
          </div>
        </div>

        <motion.div
          className="w-full text-lg text-justify px-[100px] absolute -bottom-20 md:block hidden "
          variants={fadeIn("left", "tween", 0.6, 1)}
        >
          <p className="w-full text-sm leading-8 pb-7">
            <span>Description: </span> <span>{product?.description}</span>
          </p>
        </motion.div>
        {/* Mobile view */}

        <div className="flex items-center flex-col translate-y-[4rem]">
          <div className="w-full md:hidden flex sm:flex-row flex-col justify-between items-center">
            <div className="text-center">
              <motion.p
                variants={fadeIn("right", "tween", 0.5, 1)}
                className="text-xl font-semibold mb-2 uppercase"
              >
                {product?.name}
              </motion.p>
              <motion.p
                variants={fadeIn("right", "tween", 0.54, 1)}
                className="text-lg font-semibold md:hidden "
              >
                $ {product?.price.toFixed(2)}
              </motion.p>
            </div>
            <div>
              <motion.div
                variants={fadeIn("left", "tween", 0.5, 1)}
                className="mt-4"
              >
                <RatingStars
                  rating={Number(product?.averageRating)}
                  w="w-4"
                  h="h-4"
                  color="text-emerald-300"
                />
              </motion.div>
              <motion.div
                variants={fadeIn("left", "tween", 0.54, 1)}
                className="mt-2 leading-[2rem] text-[16px] text-secondary-white"
              >
                Available: {product?.inventory}
              </motion.div>
            </div>
          </div>
          <motion.div
            variants={fadeIn("left", "tween", 0.5, 1)}
            className="md:hidden flex gap-3 mx-auto mt-3"
          >
            {product?.size?.map((value, index) => (
              <div
                key={index}
                onClick={() => setSize(value)}
                className={`p-[5px] ${
                  value === size ? " bg-indigo-500" : "bg-primary-black/50"
                }  cursor-pointer rounded-[7px] w-[30px] h-[30px] flex items-center justify-center hover:bg-gray-500`}
              >
                {value}
              </div>
            ))}
          </motion.div>
          <motion.button
            variants={fadeIn("right", "tween", 0.6, 1)}
            className="mt-3 md:hidden text-indigo-500 font-bold uppercase text-[1.2rem] cursor-pointer tracking-wide mx-auto hover:bg-indigo-500 hover:text-indigo-100 px-3 rounded-[5px] w-full py-2 ease-linear duration-200"
            type="button"
            onClick={() => addToCart(product)}
          >
            Buy Now
          </motion.button>

          <motion.p
            variants={fadeIn("up", "tween", 0.5, 1)}
            className="mt-3 md:hidden w-full text-[16px] text-center"
          >
            {product?.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
