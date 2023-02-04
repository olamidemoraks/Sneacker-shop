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
    <div className="w-full h-[130px] bg-primary-black rounded-[8px] py-2 px-3 flex justify-between relative group ">
      <div className="flex">
        <div className="w-[120px] h-full  rounded-md">
          <img
            src={`http://localhost:4500/assets/${image}`}
            alt={image}
            className=" -translate-y-4"
          />
        </div>
        <div className="flex flex-col justify-between pt-2 pl-4">
          <div>
            <p className="text-white text-[17px] truncate w-full min-w-[100px]">
              {name}
            </p>
            <p className=" text-secondary-white/80">Size: {size}</p>
          </div>
          <p className="text-sm text-secondary-white pb-3">$ {price}</p>
        </div>
      </div>
      <div className="flex items-end flex-col justify-between py-1 text-secondary-white gap-3">
        <p className="text-green-400">Total: $ {itemTotal.toFixed(2)}</p>
        <div className="flex items-end flex-col justify-end  gap-3">
          <p className="text-sm text-secondary-white">Quantity: {quantity}</p>
          <div className="flex justify-between w-[100px] bg-secondary-white/20 gap-2 rounded-lg px-5 border-[1px] border-white/20 items-center">
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
      <div
        className="absolute hover:text-red-500 opacity-0 group-hover:opacity-[1] group-hover:right-2 -right-5  text-red-400 -top-3 h-10 ease-linear duration-300 text-lg "
        onClick={() => remove(id)}
      >
        <IoTrashBin />
      </div>
    </div>
  );
};

export default CartItems;
