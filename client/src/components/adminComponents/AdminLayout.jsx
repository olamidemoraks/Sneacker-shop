import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className=" bg-primary-black/95 h-screen flex py-[40px] overflow-hidden">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
