import React from "react";
import { FiCodesandbox } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { data } from "../constants/data";
import CartItems from "./CartItems";
import { useCart } from "react-use-cart";
import useAuth from "../hooks/useAuth";

const Cart = ({ open, handleClose }) => {
  const { token, isExpired } = useAuth();
  const {
    totalItems,
    totalUniqueItems,
    isEmpty,
    cartTotal,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  return (
    <div
      className={`${
        !open ? "translate-x-[1000vh]" : "translate-x-0"
      } absolute top-0 right-0 left-0 bg-black/70 opacity-[10rem] w-[100%] h-[100vh] overflow-hidden transition-all duration-700  `}
    >
      <div
        className={`xl:w-[40%] lg:w-[50%] md:w-[60%] w-[100%] bg-black/60 h-full float-right overflow-y-auto overflow-x-hidden`}
      >
        <div
          className="  absolute w-[30px] h-[30px] text-[1.6rem] p-4 cursor-pointer"
          onClick={() => handleClose(false)}
        >
          <AiOutlineClose className=" bg-red-600 text-white rounded-sm" />
        </div>

        {isEmpty ? (
          <div className="flex flex-col text-secondary-white items-center justify-center h-full gap-4">
            <FiCodesandbox className=" text-[45px] animate-bounce" />
            <p className=" text-[30px] uppercase">Cart Empty</p>
          </div>
        ) : (
          <div className=" flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-col mx-[20px] mt-[80px] gap-3">
                {items.map((item, index) => (
                  <CartItems
                    key={index.id}
                    {...item}
                    updateItem={updateItemQuantity}
                    remove={removeItem}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="mx-[50px] flex flex-col mt-10 gap-5">
                <div className="flex justify-between">
                  <p className=" text-white text-lg">Sub Total:</p>
                  <p className=" text-white text-lg">
                    $ {cartTotal.toLocaleString("en-us")}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className=" text-white text-lg">Shipping:</p>
                  <p className=" text-white text-lg">$ 2.99</p>
                </div>
              </div>
              <div className="flex gradient-01 h-[150px] rounded-t-[20px] mt-8 items-center justify-between px-[50px]">
                <div className="flex gap-2 flex-col">
                  <p className=" text-white text-base">
                    Total: ({totalItems} item)
                  </p>
                  <p className=" text-white text-[30px] font-semibold  font-sans">
                    $ {(cartTotal + Number(2.99)).toLocaleString("en-us")}
                  </p>
                </div>
                {token && !isExpired ? (
                  <Link
                    to="/home/checkout"
                    className="p-4 rounded-lg bg-white text-xl"
                    onClick={() => handleClose(false)}
                  >
                    Proceed to checkout
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className="p-4 rounded-lg bg-white text-xl"
                    onClick={() => handleClose(false)}
                  >
                    Proceed to checkout
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
