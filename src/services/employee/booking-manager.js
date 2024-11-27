import { request } from "../../config/configApi";

const getBookingId = async (id) => {
    const res = request({
        method: "GET",
        path: `api/booking/getById/${id}`
    });
    return res;
}
const updateStatusBooking = async (idBooking, idStatus, newBooking) => {
    const res = request({
        method: "PUT",
        path: `/api/booking/update-status/${idBooking}/${idStatus}`,
        data: newBooking
    });
    return res;
}

const updateStatusCheckInBooking = async (idBooking, roomId, bookingRooms) => {
    const res = request({
        method: "PUT",
        path: `/api/booking/update-checkIn/${idBooking}?roomId=${roomId}`,
        data: bookingRooms
    });
    return res;
}

const getBookingRoomInformation = async (id) => {
    const res = await request({
        method: "GET",
        path: "api/booking-infomation/booking-room?bookingroom=" + id
    });
    return res;
}

const getBookingRoomIds = async (idBookingRoom) => {
    const res = request({
        method: "GET",
        path: `api/booking-room/list-booking-room?bookingRoomId=${idBookingRoom}`
    });
    return res;
}

export {updateStatusBooking,updateStatusCheckInBooking,getBookingRoomInformation,getBookingRoomIds,getBookingId};