import axios from "../utils/BaseAxios";
import authHeader from "./auth-header";
const bookings = "bookings";
const detailBookingsByTimeSlotId = "bookings/detail/userBookingByTimeSlotId";
const getListBookings = () => {
    return axios.get(`${bookings}`,{
        headers: authHeader()
    });
};
const getDetailBookingsByTimeSlotId = (id) =>{
    return axios.get(`${detailBookingsByTimeSlotId}/${id}`, {
        headers: authHeader()
    });
}
const oderBookings= (id,bookingDto)=>{
    return axios.post(`${bookings}/${id}`, bookingDto, {
        headers: authHeader()
    })
}
export { getListBookings , getDetailBookingsByTimeSlotId, oderBookings};