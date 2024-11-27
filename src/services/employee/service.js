import { request } from "../../config/configApi";
import React from "react";

const serviceRoomBookingRoom = async (idBookingRoom) => {
    const res = await request({
        method: "GET",
        path: `api/booking-room-service-room/booking-room-id?bookingRoom=${idBookingRoom}`
    });
    return res;
}

export {serviceRoomBookingRoom};