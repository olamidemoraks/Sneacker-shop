import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../feature/auth/authSlice";

const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  let isAdmin;
  let status = "User";

  if (user?.name || user?.role) {
    isAdmin = user?.role.includes("admin");
    if (isAdmin) status = "Admin";
    return {
      name: user?.name,
      isAdmin,
      status,
    };
  }

  return {
    name: "",
    isAdmin: false,
    status,
  };
};

export default useAuth;
