import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/motions";
import { useGetProductsQuery } from "../feature/product/productApiSlice";
import RatingStars from "../components/RatingStars";
import { useCart } from "react-use-cart";

const ProductDetails = () => {
  const { id } = useParams();
  const { product } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      product: data?.entities[id],
    }),
  });
  const [size, setSize] = useState([]);
  const [error, setError] = useState(false);
  const { addItem } = useCart();

  const addToCart = (product) => {
    if (size.length === 0) {
      setError(true);
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

    console.log(cartItem);
    addItem(cartItem);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      className=" bg-primary-black/95 relative h-screen text-white flex items-center justify-center overflow-hidden"
    >
      <div className="absolute text-[450px] text-gray-100 opacity-5 uppercase z-0 font-semibold leading-9">
        {product?.brand}
      </div>
      <div className="xl:w-[70%] lg:w-[80%] md:w-[90%] w-[80%] flex justify-center md:flex-row flex-col ">
        <div className="flex-1 w-full relative -right-[50px] md:block hidden">
          <motion.p
            variants={fadeIn("left", "tween", 0.5, 1)}
            className="text-[40px] font-semibold mb-4 uppercase"
          >
            {product?.name}
          </motion.p>
          <motion.p
            variants={fadeIn("left", "tween", 0.6, 1)}
            className="leading-[2rem] text-[18px] text-secondary-white"
          >
            {product?.description}
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
            Available: {product?.inventory}
          </motion.div>
        </div>
        <motion.div
          variants={fadeIn("down", "tween", 0.5, 1.3)}
          className="lg:h-[300px] h-[300px] lg:w-[600px] md:w-[500px] rounded-[20px] flex items-center justify-center relative md:-left-[3rem]  md:-translate-y-14 -translate-y-14 group"
        >
          <img
            src={`http://localhost:4500/assets/${product?.image}`}
            alt="images"
            className="md:-rotate-[20deg] w-full md:group-hover:-rotate-[23deg] ease-linear duration-300 z-10"
          />
          <div className="md:block hidden absolute lg:h-[100px] md:h-[100px] lg:w-[500px] md:w-[400px] rounded-full bg-black -rotate-[20deg] group-hover:-rotate-[23deg] lg:-bottom-20 -bottom-20 left-[15%] blur-[50px] ease-linear duration-300" />
          <div className="md:hidden absolute h-[100px] w-[300px] rounded-full bg-black bottom-0  blur-[60px] z-0" />
        </motion.div>

        <div className="flex-[0.5] flex flex-col items-start gap-4 z-[9] w-full md:justify-end">
          <motion.p
            variants={fadeIn("right", "tween", 0.5, 1)}
            className="text-[30px] font-semibold md:block hidden text-orange-300"
          >
            ${product?.price}
          </motion.p>
          <motion.label
            variants={fadeIn("right", "tween", 0.6, 1)}
            htmlFor="size"
          >
            <div className="flex gap-4 text-gray-400 hover:text-white text-[20px]">
              <label htmlFor="size">Size</label>
              <select
                id="size"
                className=" bg-transparent outline-none md:flex items-center justify-center hidden"
                onChange={(e) => setSize(e.target.value)}
              >
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
            {error ? (
              <p className=" text-red-500 py-2">please select your size</p>
            ) : null}
          </motion.label>

          {/* Mobile view */}
          <div className="w-full md:hidden flex justify-between items-end">
            <div>
              <motion.p
                variants={fadeIn("right", "tween", 0.5, 1)}
                className="text-[30px] font-semibold mb-2 uppercase"
              >
                {product?.name}
              </motion.p>
              <motion.p
                variants={fadeIn("right", "tween", 0.54, 1)}
                className="text-[25px] font-semibold md:hidden text-orange-300"
              >
                ${product?.price}
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
            className="md:hidden flex gap-3 mx-auto"
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
            className="md:hidden text-indigo-500 font-bold uppercase text-[1.2rem] cursor-pointer tracking-wide mx-auto hover:bg-indigo-500 hover:text-indigo-100 px-3 rounded-[5px] w-full py-2 ease-linear duration-200"
            type="button"
            onClick={() => addToCart(product)}
          >
            Buy Now
          </motion.button>
          <motion.button
            variants={fadeIn("right", "tween", 0.7, 1)}
            className="md:block hidden text-indigo-500 font-bold uppercase text-[1.4rem] cursor-pointer tracking-wide text-start ease-linear duration-200 group"
            type="button"
            onClick={() => addToCart(product)}
          >
            Buy Now
            <div className="h-[2px] w-full bg-indigo-500 ease-linear duration-200 hidden group-hover:block" />
          </motion.button>
          <motion.p
            variants={fadeIn("up", "tween", 0.5, 1)}
            className="md:hidden w-full text-[16px] text-center"
          >
            {product?.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
