import { request } from "../../../../config/configApi"
import Swal from 'sweetalert2';


/**
 * Lấy danh sách loại phòng dựa trên ID
 * @param {Array} roomIds - Mảng chứa ID của các phòng
 * @returns {Object} - Phản hồi từ API
 */
const getDataListTypeRoom = async (roomIds) => {
    const res = await request({
        method: "GET",
        path: `api/room/list-room?roomId=${roomIds}`
    });
    return res;
};

/**
 * Đặt phòng với dữ liệu đặt phòng
 * @param {Object} bookingData - Dữ liệu đặt phòng
 * @returns {Object} - Phản hồi từ API
 */

const bookingRoom = async (bookingData, navigate) => {
    try {
        // Hiển thị trạng thái đang xử lý
        Swal.fire({
            title: 'Đang xử lý...',
            text: 'Vui lòng chờ trong giây lát.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Gửi yêu cầu đến server
        const res = await request({
            method: "POST",
            path: `/api/booking/sendBooking`,
            data: bookingData
        });

        console.log("Phản hồi từ server: ", res);

        // Kiểm tra phản hồi
        if (!res || res.status !== 'success') {
            throw new Error(res?.message || "Phản hồi không hợp lệ từ server.");
        }

        // Thông báo thành công và chờ người dùng nhấn "OK"
        await Swal.fire({
            title: 'Đặt phòng thành công!',
            text: `${res.message || 'Chúc bạn có kỳ nghỉ vui vẻ!'}`,
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Chuyển hướng sau khi người dùng nhấn "OK"
        navigate('/client/home');
        return res;
    } catch (error) {
        console.error("Đặt phòng thất bại: ", error.message || error);

        // Thông báo lỗi với SweetAlert2
        await Swal.fire({
            title: 'Đặt phòng thất bại!',
            text: error.message || 'Đã xảy ra lỗi không xác định.',
            icon: 'error',
            confirmButtonText: 'OK'
        });

        // Ném lỗi để xử lý ở nơi gọi
        throw error;
    }
};


export { getDataListTypeRoom, bookingRoom };