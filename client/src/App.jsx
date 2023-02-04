import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import Layout from "./components/Layout";
import AdminLayout from "./components/adminComponents/AdminLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductDetails from "./pages/ProductDetails";
import { Overview, Product, Customer, Order, CreateProduct } from "./adminPage";
import useAuth from "./hooks/useAuth";
import { Navigate } from "react-router-dom";

function App() {
  const { isAdmin, name } = useAuth();
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={!name ? <LoginPage /> : <Navigate to="/home" replace />}
        />
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
        </Route>
        <Route
          path="/admin"
          element={isAdmin ? <AdminLayout /> : <Navigate to="/home" replace />}
        >
          <Route index element={<Overview />} />
          <Route path="product" element={<Product />} />
          <Route path="create-product/" element={<CreateProduct />} />
          <Route path="edit-product/:id" element={<CreateProduct />} />
          <Route path="view-product/:id" element={<CreateProduct />} />
          <Route path="customer" element={<Customer />} />
          <Route path="order" element={<Order />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
