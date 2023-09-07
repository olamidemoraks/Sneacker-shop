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
        !open ? "translate-x-[1000vw]" : "translate-x-0"
      } absolute top-0 right-0 left-0  bg-black/70 opacity-[10rem] w-[100%] h-[100vh] overflow-hidden transition-all duration-700  `}
    >
      <div
        className={`xl:w-[40%] lg:w-[50%] md:w-[60%] w-[100%] blur-bg bg-black/60 h-full float-right overflow-y-auto overflow-x-hidden`}
      >
        <div
          className="  absolute w-[30px] h-[30px] text-[1.6rem] p-4 cursor-pointer"
          onClick={() => handleClose(false)}
        >
          <AiOutlineClose className="  text-white rounded-sm" />
        </div>

        {isEmpty ? (
          <div className="flex flex-col text-secondary-white items-center justify-center h-full gap-4">
            <FiCodesandbox className=" text-[45px] animate-bounce" />
            <p className=" text-[30px] uppercase">Cart Empty</p>
          </div>
        ) : (
          <div className=" flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-col sm:mx-[20px] mt-[80px] gap-3">
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
            <div className=" ">
              <div className="sm:px-[50px] px-[20px] flex flex-col mt-10 gap-3 ">
                <div className="flex justify-between ">
                  <p className=" text-white text-lg">Sub Total:</p>
                  <p className=" text-white text-lg">
                    $ {cartTotal.toLocaleString("en-us")}
                  </p>
                </div>
                <div className="flex justify-between text-neutral-300 ">
                  <p className="text-lg">Shipping:</p>
                  <p className="text-lg">$ 2.99</p>
                </div>
              </div>
              <div className="flex  bg-neutral-800 rounded-t-[20px]   mt-4 items-start justify-between sm:px-[50px] px-[20px] py-[25px]">
                <div className="flex gap-2 flex-col">
                  <p className=" text-white text-base">
                    Total: ({totalItems} item)
                  </p>
                  <p className=" text-white text-lg font-semibold  font-sans">
                    $ {(cartTotal + Number(2.99)).toLocaleString("en-us")}
                  </p>
                </div>
                {token && !isExpired ? (
                  <Link
                    to="/home/checkout"
                    className="px-4 py-2 rounded-lg gradient-01 text-white text-xl"
                    onClick={() => handleClose(false)}
                  >
                    Checkout
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className="px-4 py-2 rounded-lg bg-white text-xl"
                    onClick={() => handleClose(false)}
                  >
                    Checkout
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
