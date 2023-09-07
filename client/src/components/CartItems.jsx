import React, { useState } from "react";
import { IoTrashBin } from "react-icons/io5";

const CartItems = ({
  id,
  image,
  itemTotal,
  name,
  price,
  quantity,
  size,
  updateItem,
  remove,
}) => {
  return (
    <div className="w-full h-[130px] bg-white/10 rounded-[8px] py-4 px-2 flex justify-between relative group">
      <div className="flex w-full">
        <div className="w-[100px] h-full  rounded-md">
          <img
            src={`${process.env.BASE_URL}/assets/${image}`}
            alt={image}
            className=" -translate-y-4"
          />
        </div>
        <div className="flex flex-col justify-between pl-4">
          <div>
            <p className="text-white  max-sm:truncate  sm:w-full w-[100px]">
              {name}
            </p>
            <p className=" text-secondary-white/80 ">Size: {size}</p>
          </div>
          <p className="text-sm text-secondary-white pb-3">${price}</p>
        </div>
      </div>
      <div className="flex items-end flex-col justify-between  text-secondary-white w-full ">
        <p className="text-orange-400 ">
          Total: ${itemTotal.toLocaleString("en-us")}
        </p>
        <div className="flex items-end flex-col justify-end gap-1">
          <p className="text-sm text-secondary-white">Qty: {quantity}</p>
          <div className="flex justify-between  bg-secondary-white/20 gap-4 rounded-lg px-2 border-[1px] border-white/20 items-center">
            <span
              className="cursor-pointer text-white"
              onClick={() => updateItem(id, quantity - 1)}
            >
              -
            </span>
            <p className="text-white text-lg">{quantity}</p>
            <span
              className="cursor-pointer text-white"
              onClick={() => updateItem(id, quantity + 1)}
            >
              +
            </span>
          </div>
        </div>
      </div>
      {/* <div
        className="absolute hover:text-red-500 opacity-0 group-hover:opacity-[1] group-hover:right-2 -right-5  text-red-400 -top-3 h-10 ease-linear duration-300 text-lg "
        onClick={() => remove(id)}
      >
        <IoTrashBin />
      </div> */}
    </div>
  );
};

export default CartItems;
