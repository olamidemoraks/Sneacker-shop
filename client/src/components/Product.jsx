import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../feature/product/productApiSlice";
import RatingStars from "./RatingStars";

const colorPallete = [
  "bg-pink-300",
  "bg-purple-300",
  "bg-cyan-300",
  "bg-orange-300",
  "bg-rose-300",
  "bg-yellow-300",
  "bg-green-300",
  "bg-blue-300",
  "bg-indigo-300",
  "bg-amber-300",
  "bg-lime-300",
  "bg-emerald-300",
];

const Product = ({ product }) => {
  // const { product } = useGetProductsQuery(undefined, {
  //   selectFromResult: ({ data }) => ({
  //     product: data?.entities[productId],
  //   }),
  // });
  const { name, price, id, inventory, image } = product;
  const [bgColor, setBgColor] = useState("");
  useEffect(() => {
    setBgColor(
      colorPallete[
        Math.floor(Math.random() * 5) + Math.floor(Math.random() * 5)
      ]
    );
  }, []);

  return (
    <Link
      to={`product-details/${id}`}
      className="flex flex-col sm:w-[180px] w-[80%] mx-auto mb-[10px] group"
    >
      <div
        className={`w-full lg:h-[170px] sm:h-[150px] h-[300px] rounded-[20px] flex ${bgColor}  items-center justify-center relative`}
      >
        <img
          src={`${process.env.BASE_URL}/assets/${image}`}
          alt={image}
          className="-rotate-[20deg] group-hover:-rotate-[30deg] -translate-x-2 w-full sm:-translate-y-3 -translate-y-10 z-10 ease-linear duration-300"
          loading="lazy"
        />
        <div className="absolute h-[50px] w-[120px] rounded-full bg-black/20 -rotate-[20deg] group-hover:-rotate-[30deg] bottom-7 blur-[6px] ease-linear duration-300" />
      </div>
      <div className="w-full">
        <div className="flex  pt-[7px] text-sm px-[6px] justify-between">
          <p className="flex-1 max-w-[110px] uppercase truncate text-white font-semibold text-[14px] font-sans">
            {name.split("-").join(" ")}
          </p>
          <p className=" text-white font-normal ml-1">$ {price}</p>
        </div>
        <div className="flex justify-between pt-[7px] px-[6px]">
          <RatingStars
            rating={Number(product?.averageRating)}
            w="w-4"
            h="h-4"
            color="text-emerald-300"
          />
          <p className="text-[14px] text-secondary-white/60">
            {inventory} left
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
