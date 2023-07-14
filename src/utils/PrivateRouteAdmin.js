import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutesAdmin = () => {
  let role = JSON.parse(sessionStorage.getItem("Role_Key"));
  if (role == null) {
    return <Navigate to="/err" />;
  } else {
      if (role[0].authority == "USER") {
        return <Navigate to="/err" />;
    } else if (role[0].authority == "DOCTOR") {
          return <Navigate to="/err" />;
    } else {
      return <Outlet />;
    }
  }
};

export default PrivateRoutesAdmin;
