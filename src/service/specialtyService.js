import axios from "../utils/BaseAxios";
import authHeader from "./auth-header";
const listSpecialty = "api/specialty";
const getListSpecialty = async () => {
  return await axios.get(`${listSpecialty}`);
};

export default { getListSpecialty };
