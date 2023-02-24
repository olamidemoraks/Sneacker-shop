import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../feature/auth/authSlice";

const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  let isAdmin;
  let status = "User";
  let token = "";

  if (user?.name || user?.role || user?.token) {
    isAdmin = user?.role.includes("admin");
    if (isAdmin) status = "Admin";
    token = user?.token;
    return {
      name: user?.name,
      isAdmin,
      status,
      token,
    };
  }

  return {
    name: "",
    isAdmin: false,
    status,
    token: "",
  };
};

export default useAuth;
