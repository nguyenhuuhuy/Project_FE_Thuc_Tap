import axios from "../utils/BaseAxios";
import authHeader from "./auth-header";
const doctors = "api/doctors";
const checkDoctor = "doctors/status";
const detailDoctor = "doctors/detail/doctor";
const detailDoctorById = "doctors/detail/doctor";
const createDoctor = "doctors";
const activeDoctor = "doctors/approve/doctor";
const blockDoctor = "doctors/block/doctor";
const searchDoctor = "doctors/search/doctor"
const getListDoctor = () => {
  return axios.get(`${doctors}`);
};
const getCheckListDoctor = () => {
  return axios.get(`${checkDoctor}`, {
    headers: authHeader(),
  });
};
const getDetailDoctor = () => {
  return axios.get(`${detailDoctor}`, {
    headers: authHeader(),
  });
};
const getDetailDoctorById = (id) => {
  return axios.get(`${detailDoctorById}/${id}`, {
    headers: authHeader(),
  });
};
const getSearchDoctorByName = (name) =>{
  return axios.get(`${searchDoctor}/${name}`, {
    headers: authHeader(),
  });
}
const postCreateDoctor = (specialty) => {
  return axios.post(`${createDoctor}`, specialty, {
    headers: authHeader(),
  });
};

const putActiceDoctor = (active) => {
  return axios.put(`${activeDoctor}`, active, {
    headers: authHeader(),
  });
};
const putBlockDoctor = (block) => {
  return axios.put(`${blockDoctor}`, block, {
    headers: authHeader(),
  });
};
export {
  getListDoctor,
  getCheckListDoctor,
  getDetailDoctor,
  getDetailDoctorById,
  getSearchDoctorByName,
  postCreateDoctor,
  putActiceDoctor,
  putBlockDoctor,
};
