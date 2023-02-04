import { Outlet } from "react-router-dom";
import { productApiSlice } from "../product/productApiSlice";
import { store } from "../../app/store";
import { useEffect } from "react";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      productApiSlice.util.prefetch("getProducts", "product", { force: true })
    );
  }, []);

  return <Outlet />;
};
