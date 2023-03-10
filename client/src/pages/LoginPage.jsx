import React from "react";
import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import Input from "../components/Input";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../feature/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../feature/auth/authSlice";
import { BeatLoader } from "react-spinners";
import { toast, Toaster } from "react-hot-toast";
import { IoHome } from "react-icons/io5";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("please enter your first name"),
  lastName: yup.string().required("please enter your last name"),
  email: yup
    .string()
    .email("invalid email")
    .required("please enter your email"),
  password: yup
    .string()
    .required("please enter your password")
    .min(5, "password should be more than 5 character long"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email")
    .required("please enter your email"),
  password: yup.string().required("please enter your password"),
});

const initialValueRegisterForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const initialValueLoginForm = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [loginFn, { isLoading: loginLoading }] = useLoginMutation();
  const [registerFn, { isLoading: registerLoading }] = useRegisterMutation();

  const [formType, setformType] = useState("login");
  const [isVisible, setIsVisible] = useState(false);

  const isLogin = formType === "login";
  const isRegister = formType === "register";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function login(values) {
    try {
      const data = await loginFn(values).unwrap();
      dispatch(setCredentials({ user: { ...data.user, token: data.token } }));
      console.log(data);
      if (data.user.role !== "admin") {
        navigate("/home");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error?.data?.msg);
    }
  }
  async function register(values, formProps) {
    try {
      const { email, lastName, firstName, password } = values;
      const editedValue = {
        email,
        password,
        name: `${firstName} ${lastName}`,
      };
      const data = await registerFn(editedValue).unwrap();

      formProps.resetForm();
      setformType("login");
      setErrorDetails("");
    } catch (error) {
      toast.error(error?.data?.msg);
    }
  }
  async function handleSubmitForm(values, formProps) {
    if (isLogin) await login(values);
    if (isRegister) await register(values, formProps);
  }
  function handleFormTransition(resetForm, type) {
    setformType(type);
    resetForm();
    setErrorDetails("");
  }
  return (
    <div className=" bg-primary-black h-[100vh] flex pt-[12rem] justify-center relative">
      <Link
        to="/home"
        className="absolute top-5 left-9 text-lg text-white flex items-center gap-2 z-10"
      >
        <IoHome /> Home
      </Link>
      <div className="flex flex-col items-center  w-[400px]">
        <Toaster position="top-right" />
        <div className="w-[150px] h-[150px] rounded-full gradient-05 absolute -top-12 md:left-[25rem] -left-8 " />
        <div className="w-[80px] h-[80px] rounded-full gradient-06 absolute top-12 md:right-[36rem] right-10 " />
        <p className=" text-3xl font-bold text-white mb-[2rem]">
          {" "}
          {isLogin ? "Sign in." : "Sign up."}
        </p>

        <Formik
          onSubmit={handleSubmitForm}
          initialValues={
            isLogin ? initialValueLoginForm : initialValueRegisterForm
          }
          validationSchema={isLogin ? loginSchema : registerSchema}
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
              className="flex flex-col gap-2 w-full"
            >
              {isRegister && (
                <>
                  <div className="flex flex-col gap-2">
                    <label
                      className=" text-secondary-white text-sm"
                      htmlFor="fname"
                    >
                      FIRST NAME
                    </label>
                    <Input
                      id="fname"
                      value={values.firstName}
                      placeholder="John"
                      type="text"
                      name="firstName"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      error={errors.firstName}
                      touched={touched.firstName}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className=" text-secondary-white text-sm"
                      htmlFor="fname"
                    >
                      LAST NAME
                    </label>
                    <Input
                      value={values.lastName}
                      placeholder="Doe"
                      type="text"
                      name="lastName"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      error={errors.lastName}
                      touched={touched.lastName}
                    />
                  </div>
                </>
              )}

              <div className="flex flex-col gap-2">
                <label
                  className=" text-secondary-white text-sm"
                  htmlFor="fname"
                >
                  EMAIL
                </label>
                <Input
                  value={values.email}
                  placeholder="example@mail.com"
                  type="text"
                  name="email"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  error={errors.email}
                  touched={touched.email}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className=" text-secondary-white text-sm"
                  htmlFor="fname"
                >
                  PASSWORD
                </label>
                <Input
                  value={values.password}
                  placeholder="*******"
                  type="text"
                  name="password"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  error={errors.password}
                  touched={touched.password}
                  setIsVisible={setIsVisible}
                  isVisible={isVisible}
                />
              </div>
              <button className="gradient-05 py-2 rounded-md mt-3 text-white text-[17px] font-semibold">
                {registerLoading || loginLoading ? (
                  <>
                    <BeatLoader size={7} color="#fff" />
                  </>
                ) : (
                  <>{isLogin ? "Sign in" : "Sign up"}</>
                )}
              </button>
              <div className="">
                {isLogin ? (
                  <div className=" text-gray-500 text-center mt-4">
                    Don't have an account?{" "}
                    <span
                      className="text-secondary-white cursor-pointer"
                      onClick={() =>
                        handleFormTransition(resetForm, "register")
                      }
                    >
                      Create Account
                    </span>
                  </div>
                ) : (
                  <div className=" text-gray-500 text-center mt-4">
                    I already have an account!
                    <span
                      className="text-secondary-white cursor-pointer"
                      onClick={() => handleFormTransition(resetForm, "login")}
                    >
                      {" "}
                      Sign in here
                    </span>
                  </div>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
