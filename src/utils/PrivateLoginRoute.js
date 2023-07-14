import { Outlet, Navigate } from "react-router-dom";
const PrivateRoutesLogin = () =>{
    const token = sessionStorage.getItem('Token_Key');
    console.log(token);
    if (token == null) {
        console.log("không có token");
        return <Outlet />;
    } else {
        return <Navigate to={"/err"}/>
    }
}

export default PrivateRoutesLogin;