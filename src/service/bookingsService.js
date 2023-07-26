import axios from "../utils/BaseAxios";
import authHeader from "./auth-header";
const bookings = "bookings";
const successBooking = "bookings/success/booking/oder/timeSlot";
const cancelBooking = "bookings/cancel/booking/oder/timeSlot";
const detailBookingsByTimeSlotId = "bookings/detail/userBookingByTimeSlotId";
const detailHistoryByUserId = "api/list/oderByUserId";

const cancelBookingById = "api/cancel/booking/user/timeslot";
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
const oderBookings = async (id, bookingDto) => {
  return await axios.post(`${bookings}/${id}`, bookingDto, {
    headers: authHeader(),
  });
};

const successBookingByTimeSlotId = async (id) => {
  return await axios.post(`${successBooking}/${id}`, {
    headers: authHeader(),
  });
};

const cancelBookingByTimeSlotId = async (id) => {
  return await axios.post(`${cancelBooking}/${id}`, {
    headers: authHeader(),
  });
}

const putCancelByBookingId = (id) => {
  return axios.put(`${cancelBookingById}/${id}`, {
    headers: authHeader(),
  });
};

const getHistoryByUserId = async () => {
  return await axios.get(`${detailHistoryByUserId}`, {
    headers: authHeader(),
  });
};

export {
  getListBookings,
  getDetailBookingsByTimeSlotId,
  getHistoryByUserId,
  oderBookings,
  putCancelByBookingId,
  successBookingByTimeSlotId,
  cancelBookingByTimeSlotId,
};
