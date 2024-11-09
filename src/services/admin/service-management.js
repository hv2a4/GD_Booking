import { request } from "../../config/configApi";


const updateServiceHotel = async (data) => {
    const res = await request({
        method: "PUT",
        path: "api/service-hotel/update-data-service-hotel",
        data: data
    });
    return res;
}

export {updateServiceHotel};