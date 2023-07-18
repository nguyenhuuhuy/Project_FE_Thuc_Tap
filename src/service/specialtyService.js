import axios from "../utils/BaseAxios";
import authHeader from "./auth-header";
const specialty = "api/specialty";
const getListSpecialty = () =>{
    return axios.get(`${specialty}`)
}
export{getListSpecialty};
