import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../feature/auth/authSlice";
import jwt_decode from "jwt-decode";

const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  let isAdmin;
  let status = "User";
  let token = "";
  let isExpired = false;

  if (user?.name || user?.role || user?.token) {
    isAdmin = user?.role.includes("admin");
    if (isAdmin) status = "Admin";
    token = user?.token;
    var decodedToken = jwt_decode(token);
    var dateNow = new Date().getTime() / 1000;
    if (decodedToken.exp < dateNow) {
      isExpired = true;
    }

    return {
      name: user?.name,
      isAdmin,
      status,
      token,
      isExpired,
    };
  }

  return {
    name: "",
    isAdmin: false,
    status,
    token: "",
    isExpired,
  };
};

export default useAuth;
