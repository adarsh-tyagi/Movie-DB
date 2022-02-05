import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const ProtectRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated } = useGlobalContext();

  if (loading === false) {
    if (isAuthenticated === false) {
      return <Navigate to="/signin" />;
    }
    return <Component />;
  }
  return <Navigate to="/" />;
};

export default ProtectRoute;
