import { lazy } from "react";
const CreateProduct = lazy(() => import("./CreateProduct"));
const Customer = lazy(() => import("./Customer"));
const Order = lazy(() => import("./Order"));
const Overview = lazy(() => import("./Overview"));
const Product = lazy(() => import("./Product"));

export { Customer, Order, Overview, Product, CreateProduct };
