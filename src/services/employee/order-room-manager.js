import { request } from "../../config/configApi";

const getAllBooking = async (filterType, startDate, endDate, token) => {
    const params = new URLSearchParams();

    if (filterType) params.append("filterType", filterType); // Chỉ thêm nếu có giá trị
    if (startDate) params.append("startDate", startDate);   // Thêm nếu có giá trị
    if (endDate) params.append("endDate", endDate);         // Thêm nếu có giá trị

    const res = await request({
        method: "GET",
        path: `api/booking?${params.toString()}`, // Kết hợp URLSearchParams vào URL
        token: token,
    });

    return res;
};


export {getAllBooking};
