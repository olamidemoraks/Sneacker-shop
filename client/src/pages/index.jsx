import { lazy } from "react";
const Home = lazy(() => import("./Home"));
const ProductDetails = lazy(() => import("./ProductDetails"));
const Checkout = lazy(() => import("./Checkout"));
import LoginPage from "./LoginPage";

export { Home, Checkout, LoginPage, ProductDetails };
