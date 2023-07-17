import axios from "../utils/BaseAxios";
import authHeader from "./auth-header";
const doctors = "api/doctors";
const detailDoctor = "doctors/detail/doctor";
const getListDoctor = () => {
  return axios.get(`${doctors}`);
};
const getDetailDoctor = () => {
  return axios.get(`${detailDoctor}`, {
    headers: authHeader(),
  });
};
export { getListDoctor ,getDetailDoctor};
