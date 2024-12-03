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
        const isCarhPayment = bookingData.methodPayment === 1;

        if (isCarhPayment) {
            Swal.fire({
                title: 'Đang xử lý...',
                text: 'Vui lòng chờ trong giây lát.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
        } else {
            let timerInterval;
            Swal.fire({
                title: "Đang chuyển đến cổng thanh toán VNPay...",
                html: "Chờ một chút, bạn sẽ được chuyển hướng đến VNPay để hoàn tất thanh toán.",
                timer: 5000,  // Thời gian đếm ngược là 5 giây (hoặc tùy chỉnh theo yêu cầu của bạn)
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    if (timer) { // Kiểm tra xem phần tử b có tồn tại không
                        timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    }
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            }).then((result) => {
                // Sau khi thông báo tự động đóng, đóng modal
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("Thông báo đã đóng tự động.");
                }
            });
        }

        const res = await request({
            method: "POST",
            path: `/api/booking/sendBooking`,
            data: bookingData
        });

        if (isCarhPayment) Swal.close();

        if (!res || typeof res !== 'object') {
            throw new Error("Phản hồi từ server không hợp lệ.");
        }

        if (res.status !== 'success') {
            throw new Error(res.message || "Phản hồi không hợp lệ từ server.");
        }
        if (res.vnPayURL) {

            const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            await delay(2000);

            window.location.href = res.vnPayURL;
        } else {
            await Swal.fire({
                title: 'Đặt phòng thành công!',
                text: `${res.message || 'Chúc bạn có kỳ nghỉ vui vẻ!'}`,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            navigate('/client/home');
        }

    } catch (error) {
        console.error("Đặt phòng thất bại: ", error.message || error);
        console.log("Dữ liệu đặt phòng: ", bookingData);
        await Swal.fire({
            title: 'Đặt phòng thất bại!',
            text: error.message || 'Đã xảy ra lỗi không xác định.',
            icon: 'error',
            confirmButtonText: 'OK'
        });

        throw error;
    }
};


export { getDataListTypeRoom, bookingRoom };