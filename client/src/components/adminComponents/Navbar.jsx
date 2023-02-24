import React from "react";
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { name } = useAuth();
  return (
    <div className="md:mx-[2rem] ml-5">
      <div className="flex justify-between mr-4">
        <p className=" md:text-2xl sm:text-md text-white capitalize">
          Welcome back, {name.split(" ")[0]}
        </p>
        <div className="flex items-center gap-3">
          <IoSearch className="text-[20px] text-white" />
          <div className="relative">
            <IoNotificationsOutline className="text-[20px] text-white" />
            <div className=" absolute h-[5px] w-[5px] bg-red-500 rounded-full top-0 right-[2px]" />
          </div>
          <p className="text-secondary-white text-[15px] font-semibold capitalize">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
