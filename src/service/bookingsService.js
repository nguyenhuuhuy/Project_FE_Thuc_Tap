import axios from "../utils/BaseAxios";
import authHeader from "./auth-header";
const bookings = "bookings";
const detailBookingsByTimeSlotId = "bookings/detail/userBookingByTimeSlotId";
const detailHistoryByUserId = "api/list/oderByUserId";
const detailHistoryCancelByUserID = "api/list/cancelByUserId";
const detailHistoryAcceptByUserID = "api/list/acceptByUserId";

const getListBookings = () => {
  return axios.get(`${bookings}`, {
    headers: authHeader(),
  });
};
const getDetailBookingsByTimeSlotId = (id) => {
  return axios.get(`${detailBookingsByTimeSlotId}/${id}`, {
    headers: authHeader(),
  });
};
const oderBookings = (id, bookingDto) => {
  return axios.post(`${bookings}/${id}`, bookingDto, {
    headers: authHeader(),
  });
};

const getHistoryByUserId = async () => {
  return await axios.get(`${detailHistoryByUserId}`, {
    headers: authHeader(),
  });
};

const getHistoryCancelByUserId = async () => {
  return await axios.get(`${detailHistoryCancelByUserID}`, {
    headers: authHeader(),
  });
};
const getHistoryAccpetByUserId = async () => {
  return await axios.get(`${detailHistoryAcceptByUserID}`, {
    headers: authHeader(),
  });
};
export {
  getListBookings,
  getDetailBookingsByTimeSlotId,
  getHistoryCancelByUserId,
  getHistoryAccpetByUserId,
  getHistoryByUserId,
  oderBookings,
};
