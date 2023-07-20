import { Outlet, Navigate } from "react-router-dom";
const PrivateRoutesLogin = () =>{
    const token = sessionStorage.getItem('Token_Key');
    if (token == null) {
        return <Outlet />;
    } else {
        return <Navigate to={"/err"}/>
    }
}

export default PrivateRoutesLogin;