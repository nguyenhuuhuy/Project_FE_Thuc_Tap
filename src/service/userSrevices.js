import axios from "../utils/BaseAxios";
import authHeader from "./auth-header";
const users = "api/users";
const getListUser =  () => {
  return axios.get(`${users}`, {
    headers: authHeader()
  });
};


export { getListUser};
