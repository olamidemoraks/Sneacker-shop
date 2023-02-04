import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BiSearch, BiMenuAltLeft } from "react-icons/bi";
import { FaShoppingBag, FaSearch } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { navVariants } from "../utils/motions";
import Cart from "./Cart";
import { logout } from "../feature/auth/authSlice";
import { useDispatch } from "react-redux";
import { useCart } from "react-use-cart";
import useAdmin from "../hooks/useAuth";
import ProfileAvater from "../hooks/Avater";
import { searchItem } from "../feature/others/searchSlice";

const Navbar = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [isMenuToggle, setIsMenuToggle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");

  const { totalUniqueItems } = useCart();

  const { name, isAdmin } = useAdmin();

  function handleSearchSubmit() {
    dispatch(searchItem({ search }));
  }

  function handleClickScroll() {
    inputRef.current.focus();
    const element = document.getElementById("product");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsSearch((prev) => !prev);
    }
  }

  function handleLogout() {
    dispatch(logout());
  }
  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className=" px-6 xl:px-[rem] sm:px-16 py-8 fixed top-0 left-0 right-0 bg-transparent z-10"
    >
      <div className="flex justify-between items-center w-full bg-transparent">
        <h2 className="text-secondary-white text-2xl font-bold uppercase">
          <Link to="/home">Sneakers</Link>
        </h2>

        <div className="md:flex lg:gap-[5rem] gap-7 hidden justify-center items-center">
          <BiSearch
            className="text-secondary-white hover:text-white text-[20px] cursor-pointer"
            onClick={handleClickScroll}
          />
          {/* <ul className="flex lg:gap-[5rem] gap-7 text-secondary-white hover:text-white list-none">
            {navItem.map((item) => (
              <NavbarItem
                key={item.name}
                {...item}
                active={active}
                setActive={setActive}
              />
            ))}
          </ul> */}
          <div className="text-secondary-white tracking-wider text-center bg flex flex-col gap-1 ">
            Just For You
            <div className="flex flex-col">
              <div className="w-[45px] h-[1px] bg-secondary-white mb-1" />
              <div className="w-[30px] h-[1px] bg-secondary-white mb-[3px]" />
              <div className="w-[15px] h-[1px] bg-secondary-white" />
            </div>
          </div>
          <div className="flex justify-center items-center cursor-pointer relative">
            <FaShoppingBag
              className="text-secondary-white hover:text-white text-[18px]"
              onClick={() => {
                setIsCartOpen((prev) => !prev);
                setIsSearch(false);
              }}
            />
            {totalUniqueItems > 0 ? (
              <div className="bg-red-600 absolute h-2 w-2 rounded-full top-0 -right-1" />
            ) : null}
          </div>
        </div>
        {!name ? (
          <Link
            to="/"
            className="md:block hidden border-[1px] border-secondary-white uppercase text-[17px] font-semibold px-[9px] py-[4px] text-secondary-white cursor-pointer hover:text-white hover:border-white"
          >
            Sign In
          </Link>
        ) : (
          <div className="flex items-center gap-6">
            {isAdmin ? (
              <Link to="/admin" className="bg-white p-2 rounded-[100%]">
                <RiAdminFill className=" text-[20px] text-black cursor-pointer" />
              </Link>
            ) : null}
            <div
              className=" border md:flex hidden border-gray-400 p-1 rounded-[100%] items-center cursor-pointer relative"
              onClick={() => setIsMenuToggle((prev) => !prev)}
            >
              <ProfileAvater />

              <div
                className={`${
                  isMenuToggle ? " translate-y-0" : " -translate-y-[100vh]"
                } absolute top-[55px] right-3 z-10 bg-primary-black rounded-md w-[150px] ease-linear duration-700 `}
              >
                <ul className="flex flex-col text-secondary-white hover:text-white">
                  <li
                    className=" hover:bg-gray-600 hover:bg-opacity-20 py-2 px-2"
                    onClick={handleLogout}
                  >
                    <p>Logout</p>
                  </li>
                  <li className=" hover:bg-gray-600 hover:bg-opacity-20 py-2 px-2">
                    <p>Profile</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        <div className="md:hidden relative flex justify-center items-center gap-4">
          <BiSearch className="text-secondary-white hover:text-white text-[20px] cursor-pointer" />
          <div className="flex justify-center items-center cursor-pointer relative">
            <FaShoppingBag
              className="text-secondary-white hover:text-white text-[18px]"
              onClick={() => {
                setIsCartOpen((prev) => !prev);
                setIsSearch(false);
              }}
            />
            {totalUniqueItems > 0 ? (
              <div className="bg-red-600 absolute h-2 w-2 rounded-full top-0 -right-1" />
            ) : null}
          </div>
          <BiMenuAltLeft
            className="text-secondary-white hover:text-white text-[30px]"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />

          <div
            className={`${
              !isMenuOpen ? "-translate-y-[100vh]" : "translate-y-0"
            } min-w-[150px] max-h-[75vh] absolute top-9 right-0 z-10 
              transition-all duration-700 bg-primary-black shadow-secondary 
              flex  items-start rounded-md
              `}
          >
            <ul className="flex flex-col text-secondary-white hover:text-white w-full">
              {!name ? (
                <li className="hover:bg-gray-600 hover:bg-opacity-20 py-2 px-2 cursor-pointer">
                  Sign In
                </li>
              ) : (
                <>
                  <li
                    className=" hover:bg-gray-600 hover:bg-opacity-20 py-2 px-2 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <p>Logout</p>
                  </li>
                  <li className="flex justify-between items-center hover:bg-gray-600 hover:bg-opacity-20 py-2 px-2 cursor-pointer">
                    <p>Profile</p> <ProfileAvater />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Cart open={isCartOpen} handleClose={setIsCartOpen} />
      <div
        className={`${
          isSearch ? " translate-y-0" : " -translate-y-[100vh]"
        } bg-primary-black/60 w-[400px] mx-auto relative top-8 h-10 rounded-[7px] flex p-2 px-4 transition-all duration-700`}
      >
        <input
          type="text"
          className=" outline-none bg-transparent text-white h-full flex-1 placeholder:text-secondary-white"
          placeholder="Search..."
          value={search}
          ref={inputRef}
          onChange={(e) => {
            setSearch(e.target.value);
            setTimeout(() => {
              dispatch(searchItem({ search: e.target.value }));
            }, 1000);
          }}
        />
        <button type="submit">
          <FaSearch className="text-white" />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
