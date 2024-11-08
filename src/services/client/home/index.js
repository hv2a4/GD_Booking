import { request } from "../../../config/configApi";

const getCountAbout = async () => {
    const res = await request({
        method: "GET",
        path: "api/room/getCountRoom"
    });
    return res;
}

const getTypeRoomTop3 = async () => {
    const res = await request({
        method: "GET",
        path: "api/type-room/top3"
    });
    return res;
}

const getAllServiceHotel = async () => {
    const res = await request({
        method: "GET",
        path: "api/service-hotel/getAll",
    });
    return res;
}

export {getCountAbout,getTypeRoomTop3,getAllServiceHotel};