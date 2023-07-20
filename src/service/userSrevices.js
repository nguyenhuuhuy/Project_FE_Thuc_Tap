import axios from "../utils/BaseAxios";
import authHeader from "./auth-header";
const users = "api/users";
const blockUser = "api/block/user";
const searchUser = "api/search/users";
const detailUser = "api/detail/user";
const getListUser =  () => {
  return axios.get(`${users}`);
};
const getSearchUserByName = (name) =>{
  return axios.get(`${searchUser}/${name}`, {
    headers: authHeader(),
  });
}
const putBlockUserById = (userId) =>{
  return axios.get(`${blockUser}/${userId}`, {
    headers: authHeader(),
  });
}
const getDetailUserById = (userId) =>{
  return axios.get(`${detailUser}/${userId}`, {
    headers: authHeader(),
  });
}
export { getListUser, getSearchUserByName, putBlockUserById, getDetailUserById};
