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

const getDetailTypeRoom = async (id) => {
    const res = await request({
        method: "GET",
        path: `api/type-room/detail-type-room?id=${id}`
    });
    return res;
};

const getListRoom = async (page, size) => {
    try {
        const res = await request({
            method: "GET",
            path: `api/room/list-room-filter?page=${page}&size=${size}`
        });
        return res;  // Trả về dữ liệu phòng từ API
    } catch (error) {
        console.error("Error fetching room data:", error);
        throw error;  // Ném lỗi nếu có vấn đề xảy ra
    }
}


const getDetailListTypeRoom = async (roomId) => {
    const res = await request({
        method: "GET",
        path: `api/room/details?roomId=${roomId}`
    });
    return res;
}

const getFilterBooking = async (startDate, endDate, guestLimit, page, size) => {
    const res = await request({
        method: 'GET',
        path: `/api/type-room/find-type-room?startDate=${startDate}&endDate=${endDate}&guestLimit=${guestLimit}&page=${page}&size=${size}`,
    });
    return res;
};

export { getCountAbout, getTypeRoomTop3, getAllServiceHotel, getDetailTypeRoom, getListRoom, getDetailListTypeRoom, getFilterBooking };