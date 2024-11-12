import { request } from "../../config/configApi";

const getRoomByFloorId = async (id) => {
    const res = await request({
        method: "GET",
        path: "api/room/FloorById/" + id
    });
    return res;
}

export {getRoomByFloorId}