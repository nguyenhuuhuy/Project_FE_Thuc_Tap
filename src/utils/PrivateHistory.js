import { Outlet, Navigate } from "react-router-dom";
const PrivateHistory = () => {
  const token = sessionStorage.getItem("Token_Key");
  if (token == null) {
    return <Navigate to={"/err"} />;
  } else {
    return <Outlet/>
  }
};

export default PrivateHistory;
