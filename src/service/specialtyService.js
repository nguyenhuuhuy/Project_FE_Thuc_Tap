import axios from "../utils/BaseAxios";
import authHeader from "./auth-header";
const specialty = "api/specialty";
const specialtyAdmin = "specialty";
const detailSpecialtyById = "specialty/detail/specialty";
const editSpecialty = "specialty/update/specialty";
const searchSpecialty = "specialty/search/specialty";
const getListSpecialty = () => {
  return axios.get(`${specialty}`);
};
const getListSpecialtyAdmin = () => {
  return axios.get(`${specialtyAdmin}`, {
    headers: authHeader(),
  });
};
const getDetailSpecialtyById = (id) => {
  return axios.get(`${detailSpecialtyById}/${id}`, {
    headers: authHeader(),
  });
};
const postSpecialty = (newSpecialty) => {
  return axios.post(`${specialtyAdmin}`, newSpecialty, {
    headers: authHeader(),
  });
};

const putSpecialtyById = (id, newSpecialty) => {
  return axios.put(`${editSpecialty}/${id}`, newSpecialty, {
    headers: authHeader(),
  });
};
const getSearchSpecialty = (name) => {
  return axios.get(`${searchSpecialty}/${name}`, {
    headers: authHeader(),
  });
};
export {
  getListSpecialty,
  getListSpecialtyAdmin,
  getDetailSpecialtyById,
  getSearchSpecialty,
  postSpecialty,
  putSpecialtyById,
};
