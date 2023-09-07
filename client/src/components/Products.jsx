import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { productSearch } from "../feature/others/searchSlice";
import { useGetProductsQuery } from "../feature/product/productApiSlice";
import { fadeIn, staggerContainer, zoomIn } from "../utils/motions";
import { BeatLoader } from "react-spinners";
import Product from "./Product";

const Products = () => {
  const searchProduct = useSelector(productSearch);
  const { data, isLoading, isSuccess } = useGetProductsQuery();
  const { ids, entities } = data || [];
  const products = useMemo(() => {
    const item = ids?.map((id) => {
      return entities[id];
    });
    return (item || [])?.filter((product) => {
      return (
        searchProduct === "" ||
        product?.name?.toLowerCase().includes(searchProduct.toLowerCase())
      );
    });
  }, [searchProduct, data]);
  let content;
  if (isLoading) {
    content = (
      <div className="flex items-center justify-center h-[60vh]">
        <BeatLoader size={23} color="#d0d0d0" />
      </div>
    );
  }
  if (isSuccess || data) {
    content = (
      <motion.div
        variants={fadeIn("left", "tween", 1, 1)}
        initial="hidden"
        whileInView="show"
        className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7 w-full"
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <Product key={index} product={product} />
          ))
        ) : (
          <div className="flex justify-center items-center w-[100vw]">
            <p className="text-center text-white text-2xl">No Item Found</p>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <section
      id="product"
      className="relative overflow-hidden bg-primary-black/95  pt-[10rem] snap-center pb-[6rem] min-h-[87vh]"
    >
      <div className="flex justify-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
        >
          <div className="h-screen w-[500px] bg-yellow-700/20 opacity-20 -skew-x-[70deg] translate-x-[25rem] absolute z-0" />
          {content}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
