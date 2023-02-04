import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { sidebarLink } from "../../constants/sidebar";
import { IoStatsChart } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { FiBook } from "react-icons/fi";
import { RiSettingsLine } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { useSendLogoutMutation } from "../../feature/auth/authApiSlice";

const icons = {
  1: <IoStatsChart />,
  2: <HiOutlineShoppingBag />,
  3: <RxPerson />,
  4: <FiBook />,
  5: <RiSettingsLine />,
};
const Sidebar = () => {
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();
  function handleLogout() {
    sendLogout().unwrap();
    navigate("/");
  }
  return (
    <div className="md:w-[200px] sm:w-[100px] w-[50px]  border-r-[1px] border-r-gray-400/20  flex flex-col justify-between">
      <div className="flex  flex-col">
        <div className="sm:px-[40px] border-b-[1px] border-b-gray-400/20 py-5 mb-4">
          <Link
            to="/home"
            className="text-lg font-semibold text-white sm:rotate-0 rotate-90 sm:-translate-y-0 md:-translate-x-0 sm:-translate-x-5 -translate-y-5"
          >
            sneaker
          </Link>
        </div>
        <div className=" flex flex-col gap-8 md:px-[40px] md:items-start items-center mt-3">
          {sidebarLink.map((item, index) => (
            <Link
              className="flex gap-3 items-center group"
              key={index}
              to={item.link}
            >
              <div className=" text-secondary-white group-hover:text-lime-300 text-[20px] font-semibold">
                {icons[item.icons]}
              </div>
              <p className="text-secondary-white text-[16px] group-hover:text-white md:block hidden">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="md:pl-[40px] border-t-[1px] border-t-gray-400/20 py-5 md:block flex justify-center">
        <div
          className="flex gap-3 items-center group cursor-pointer"
          onClick={handleLogout}
        >
          <GoSignOut className=" text-secondary-white group-hover:text-lime-300 text-[20px] font-semibold" />
          <p className=" text-secondary-white text-[16px] group-hover:text-white md:block hidden">
            logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
