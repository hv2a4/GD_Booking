import { request } from "../../config/configApi";

const getRoomByFloorId = async (id) => {
    const res = await request({
        method: "GET",
        path: "api/room/FloorById/" + id
    });
    return res;
}
const updateStatusRoom = async (room,token) => {
    const res = await request({
        method: "PUT",
        path: "api/room/update-active",
        data: room,
        token: token
    });
    return res;
}

const getAllRoom = async (page = 0, size = 2) => {
    const res = await request({
        method: "GET",
        path: `api/room?page=${page}&size=${size}`
    });
    return res;
}

export {getRoomByFloorId, updateStatusRoom, getAllRoom}