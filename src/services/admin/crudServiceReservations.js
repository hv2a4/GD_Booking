import { request } from "../../config/configApi";
import Cookies from 'js-cookie';

const getTokenFromCookie = () => {
    return Cookies.get('token');  // Lấy token từ cookie
}
// Hàm lấy dữ liệu từ API
const getDataReservations = async () => {
    try {
        const res = await request({
            method: "GET",
            path: "/api/reservations/getAll",
            token:getTokenFromCookie()
        });

        // Log dữ liệu nhận được từ API để kiểm tra
        console.log('Dữ liệu nhận được từ API:', res);

        // Kiểm tra mảng
        if (!Array.isArray(res)) {
            throw new Error("Dữ liệu trả về không phải là mảng");
        }

        return res;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        throw error;
    }
};

export { getDataReservations };
