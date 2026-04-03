import { Outlet, Navigate } from "react-router";
import useAuth from "../hooks/useAuth.jsx";

const PrivateRoute = () => {
  const { isAuth } = useAuth();
  return isAuth() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
