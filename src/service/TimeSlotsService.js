import axios from "../utils/BaseAxios";
import authHeader from "./auth-header";
const timeSlotsByDoctorId = "api/doctors/timeSlotByDoctor";
const detailTimeSlostById = "api/detail/timeSlotById";
const listTimesByDoctorId = "timeSlots/detail/list/timeSlotByDoctor";
const createTimeSlotByDoctor = "timeSlots";
const getTimeSlostById = async (id) => {
  return await axios.get(`${detailTimeSlostById}/${id}`);
};

const getListTimeByDoctorId = async (id) => {
  return axios.get(`${timeSlotsByDoctorId}/${id}`, {
    headers: authHeader(),
  });
};
const getListOderTimesByDoctorId = (id) => {
  return axios.get(`${listTimesByDoctorId}/${id}`, {
    headers: authHeader(),
  });
};
const createNewTimeSlotByDoctor= (timeSlot) => {
  return axios.post(`${createTimeSlotByDoctor}`, timeSlot, {
    headers: authHeader(),
  });
}
export { getListTimeByDoctorId, getTimeSlostById, getListOderTimesByDoctorId, createNewTimeSlotByDoctor };
