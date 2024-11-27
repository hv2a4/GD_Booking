import React from "react"; 
import { request } from "../../config/configApi";

const getByIdBookingRoom = async (id) => {
    const res = await request({
        method: "GET",
        path: `api/booking-room/getById/${id}`
    });
    return res;
}

export {getByIdBookingRoom};