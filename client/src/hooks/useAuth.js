import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../feature/auth/authSlice";

const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const { name, role } = useMemo(() => {
    return user;
  }, [user]);

  let isAdmin;
  let status = "User";

  if (name || role) {
    isAdmin = role.includes("admin");
    if (isAdmin) status = "Admin";
    return {
      name,
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
