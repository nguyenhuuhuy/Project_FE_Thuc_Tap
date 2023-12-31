import axios from "../utils/BaseAxios";
import authHeader from "./auth-header";
const users = "api/users";
const page = "api/page/users";
const blockUser = "api/block/user";
const searchUser = "api/search";
const detailUser = "api/detail/user";
const updateUser = "api/update/user";
const getListUser = () => {
  return axios.get(`${users}`);
};
const getPageUser = (pageNumber, pageSize) => {
  return axios.get(`${page}?page=${pageNumber}&size=${pageSize}`);
};
const getSearchUserByName = (name) => {
  return axios.get(`${searchUser}?users=${name}`, {
    headers: authHeader(),
  });
};
const putBlockUserById = (userId) => {
  return axios.get(`${blockUser}/${userId}`, {
    headers: authHeader(),
  });
};
const getDetailUser = () => {
  return axios.get(`${detailUser}`, {
    headers: authHeader(),
  });
};
const getDetailUserById = (userId) => {
  return axios.get(`${detailUser}/${userId}`, {
    headers: authHeader(),
  });
};
const putUpdateuser = async (newUpdate) => {
  return await axios.put(`${updateUser}`, newUpdate, {
    headers: authHeader(),
  });
};
export {
  getListUser,
  getPageUser,
  getSearchUserByName,
  putBlockUserById,
  getDetailUser,
  getDetailUserById,
  putUpdateuser,
};
