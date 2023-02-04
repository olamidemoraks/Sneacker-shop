import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className=" bg-primary-black/95 h-screen flex py-[40px] overflow-hidden">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
