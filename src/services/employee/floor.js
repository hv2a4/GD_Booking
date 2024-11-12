import { request } from "../../config/configApi";

const getAllFloor = async () => {
    const res = await request({
        method: "GET",
        path: "api/floor/getAll"
    });
    return res;
}

export {getAllFloor}