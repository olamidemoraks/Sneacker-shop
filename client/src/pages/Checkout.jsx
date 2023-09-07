import React, { useRef, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import Footer from "../components/Footer";
import { PaystackButton, usePaystackPayment } from "react-paystack";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import { useUpdateUserInformationMutation } from "../feature/user/userApiSlice";
import { useCreateOrderMutation } from "../feature/order/orderApiSlice";
import { useNavigate } from "react-router-dom";

const CheckoutScheme = yup.object().shape({
  email: yup.string().required("Please enter a your valid email address"),
  phoneNumber: yup.string().required("Please enter your phone number"),
  firstname: yup.string().required("Please enter your first name"),
  lastname: yup.string().required("Please enter your last name"),
  country: yup.string().required("Please enter your country name"),
  city: yup.string().required("Please enter your city"),
  zipCode: yup.string().required("Please enter your zip code"),
  address: yup.string().required("Please enter your address"),
});

const initialData = {
  email: "",
  phoneNumber: "",
  firstname: "",
  lastname: "",
  country: "",
  city: "",
  zipCode: "",
  address: "",
};

let submitedData = {};
const Checkout = () => {
  const navigate = useNavigate();
  const { cartTotal, items, emptyCart } = useCart();
  console.log("Cart items", items);

  const [updateUserInformation] = useUpdateUserInformationMutation();
  const [createOrder, { isSuccess }] = useCreateOrderMutation();

  const config = {
    reference: new Date().getTime().toString(),
    email: "",
    amount: cartTotal * 100 * 460.45, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.PAYSTACK_PUBLIC_KEY,
  };

  const handleCreatingOrder = async (reference) => {};

  const handlePaystackSuccessAction = async (reference) => {
    const orderItem = {
      cartItems: items,
      total: cartTotal * 460.45,
      status: reference.status,
      reference: reference.reference,
    };
    try {
      const data = await createOrder(orderItem).unwrap();
      console.log("Order created", data);

      emptyCart();
      navigate("/home");
    } catch (error) {
      console.log("handlePaystackSuccessAction error", error);
    }
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = (email) => {
    let newConfig = { ...config, email };

    return {
      ...newConfig,
      text: "Continue To Payment",
      onSuccess: (reference) => handlePaystackSuccessAction(reference),
      onClose: handlePaystackCloseAction,
    };
  };

  const handleSubmitForm = async (values) => {
    submitedData = { ...values };
    try {
      //   const data = await updateUserInformation(values);
      //   console.log(data);
    } catch (error) {
      console.log("handleSubmitForm error", error);
    }
  };

  return (
    <div className="bg-primary-black w-full h-[100%]  text-white relative">
      <div className="flex justify-center pt-[110px] pb-[20px]">
        <Formik
          onSubmit={handleSubmitForm}
          initialValues={initialData}
          validationSchema={CheckoutScheme}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="border-[2px] border-gray-300 md:w-[600px] w-[90%] "
            >
              <CheckoutForm
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
              <div className="px-5 pb-7 flex w-full gap-3 sm:flex-row flex-col-reverse ">
                <Link
                  to="/home"
                  className="border px-3 py-4 flex-1 text-center cursor-pointer hover:bg-gray-700 "
                >
                  Back To Home
                </Link>
                {Object.values(values).every((item) => {
                  if (!item) {
                    return false;
                  }
                  return true;
                }) && (
                  <button type="submit" className="flex-1">
                    <PaystackButton
                      className="px-3 py-4 flex-1 w-full text-center bg-red-500 cursor-pointer hover:bg-red-400"
                      {...componentProps(values.email)}
                    />
                  </button>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
