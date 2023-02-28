import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
