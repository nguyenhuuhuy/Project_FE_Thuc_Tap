import axios from "../utils/BaseAxios";
import authHeader from "./auth-header";
const doctors = "api/doctors";
const getListDoctor = ()=>{
    return axios.get(`${doctors}`);
}

export {getListDoctor};