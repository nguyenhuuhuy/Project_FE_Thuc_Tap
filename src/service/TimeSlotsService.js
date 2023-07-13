import axios from "../utils/BaseAxios";
import authHeader from "./auth-header";
const timeSlotsByDoctorId = "api/doctors/timeSlotByDoctor";
const detailTimeSlostById = "api/detail/timeSlotById";

const getTimeSlostById = async (id) => {
  return await axios.get(`${detailTimeSlostById}/${id}`);
};

const getListTimeByDoctorId = async (id) => {
  return axios.get(
    `${timeSlotsByDoctorId}/${id}`,
    {
      headers: authHeader(),
    },
  );
};

export { getListTimeByDoctorId, getTimeSlostById };
