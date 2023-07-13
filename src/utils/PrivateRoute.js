import { Outlet, Navigate } from "react-router-dom";
import authHeader from "../service/auth-header";

const PrivateRoutes = () => {
  let role = JSON.parse(sessionStorage.getItem("Role_Key"));
  if (role == null) {
    return <Navigate to="/login" />;
  } else {
      if (role[0].authority != "ADMIN" || role[0].authority != "PM") {
      return <Navigate to="/login" />;
    } else if (role[0].authority != "DOCTOR") {
          return <Navigate to="/login" />;
    } else {
      return <Outlet />;
    }
  }

  // if (role[0].authority != 'ADMIN') {
  //     return (
  //          <Navigate to="/login" />
  //     )
  // } else{
  //     return(
  //         <Outlet/>
  //     )
  // }
};

export default PrivateRoutes;
