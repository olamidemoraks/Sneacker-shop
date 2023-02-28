import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/adminComponents/AdminLayout";
import Layout from "./components/Layout";
import { Navigate } from "react-router-dom";
import { CreateProduct, Customer, Order, Overview, Product } from "./adminPage";
import useAuth from "./hooks/useAuth";
import { Checkout, Home, LoginPage, ProductDetails } from "./pages";
import { lazy } from "react";

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
          <Route path="checkout" element={<Checkout />} />
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
