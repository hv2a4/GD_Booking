import { request } from "../../config/configApi";

const addCustomer = async (data, idBookingRoom) => {
    const res = await request({
        method: "POST",
        path: `api/customer-info/add?idBookingRoom=${idBookingRoom}`,
        data: data
    });
    return res;
}

export {addCustomer};