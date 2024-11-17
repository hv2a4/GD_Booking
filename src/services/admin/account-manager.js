import { request } from "../../config/configApi";

const getAllEmployee = async () => {
    const res = await request({
        method: "GET",
        path: "/api/account/getAll"
    }); 
    return res;
}

const addEmployee = async (employee) => {
    const res = await request({
        method: "POST",
        path: "/api/account/add-account-staff",
        data: employee
    });
    return res;
}

const updateActiveAccount = async (id) => {
    const res = await request({
        method: "PUT",
        path: "/api/account/toggleDelete/" + id
    });
    return res;
}

const getBookingAccount = async (id,token) => {
    const res = await request({
        method: "GET",
        path: "api/booking/accountId/" + id,
        token: token
    });
    return res;
}

const getBookingRoomInformation = async (id, token) => {
    const res = await request({
        method: "GET",
        path: "api/booking-infomation/booking-room?bookingroom=" + id,
        token: token
    });
    return res;
}
const getBookingRoomServiceRoom = async (id, token) => {
    const res = await request({
        method: "GET",
        path: "api/booking-room-service-room/service?bookingRoom=" + id,
        token: token
    });
    return res;
}

export {getAllEmployee,updateActiveAccount,addEmployee,getBookingAccount,getBookingRoomInformation,getBookingRoomServiceRoom};