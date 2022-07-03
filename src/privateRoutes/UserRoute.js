// import necessary utility from rrd
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { LoginContext } from "../contexts/AuthContext";

// create component here
const UserRoute = ({ element: Component, ...rest }) => {
  const [isLogin, setIsLogin] = useContext(LoginContext);

  return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default UserRoute;
