import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { getBookingRoomByRoom } from "../../../../services/employee/floor";
import { Cookies } from "react-cookie";
import { getBookingRoomInformation } from "../../../../services/admin/account-manager";
import { format } from "date-fns";
import { formatCurrency } from "../../../../config/formatPrice";
import NhanPhong from "../modalNhanPhong";
const ModalDetailFloor = ({ onClose, item }) => {
    const [bookingRoom, setBookingRoom] = useState({});
    const [customer, setCustomer] = useState([]);
    const cookie = new Cookies();
    const token = cookie.get("token");
    useEffect(() => {
        if (item && token) {
            handleDetail(item?.id, item?.statusRoomDto?.id, token);
            handleCustomerInfo(item?.id, token);
        }

    }, [item])
    
    const handleCustomerInfo = async (id, token) => {
        try {
            const data = await getBookingRoomInformation(id, token);
            setCustomer(data);
        } catch (error) {

        }
    }
    const handleDetail = async (roomId, statusId, token) => {
        try {
            const data = await getBookingRoomByRoom(roomId, statusId, token);

            if (data && data.length > 0) {
                // Sắp xếp danh sách booking theo thời gian tạo tăng dần (cũ nhất trước, mới nhất ở cuối)
                const latestBooking = data.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate)).pop();

                setBookingRoom(latestBooking); // Chỉ lưu booking mới nhất (cuối cùng)
                console.log(latestBooking); // Kiểm tra booking mới nhất
            } else {
                setBookingRoom(null); // Không có booking
                console.log("Không có booking nào.");
            }
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết booking:", error);
        }
    };

    const formatDateTime = (date) => {
        if (!date || isNaN(new Date(date))) {
            console.error('Giá trị thời gian không hợp lệ:', date);
            return 'Invalid date';
        }
        return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
    };
    const calculateDuration = (checkIn, checkOut) => {
        if (!checkIn || !checkOut) return 'N/A';

        const start = new Date(checkIn);
        const end = new Date(checkOut);

        if (isNaN(start) || isNaN(end)) return 'N/A';

        const diffMs = end - start; // Khoảng thời gian thuê tính bằng milliseconds
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // Số ngày
        const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Số giờ còn lại

        if (diffDays > 0) {
            return `${diffDays} ngày ${diffHours} giờ`;
        } else if (diffHours > 0) {
            return `${diffHours} giờ`;
        } else {
            const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Số phút
            return `${diffMinutes} phút`;
        }
    };


    return (
        <Modal className="custom-modal-width modal-noneBg" show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết {item?.roomName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="boxster">
                    <div className="d-flex align-items-center mb-3">
                        <h3 className="font-weight-bold mb-0">{item?.roomName}</h3>
                        <span className="text-success ms-auto">{item?.statusRoomDto?.statusRoomName}</span>
                    </div>
                    <hr />
                    <div className="row mb-3">
                        <div className="col-lg-4">
                            <Form.Label className="text-muted">Tên khách hàng</Form.Label>
                            <div className="font-weight-medium">{bookingRoom?.booking?.accountDto?.fullname}</div>
                        </div>
                        <div className="col-lg-4">
                            <Form.Label className="text-muted">Khách lưu trú</Form.Label>
                            <div className="font-weight-medium">{customer.length} người</div>
                        </div>
                        <div className="col-lg-4">
                            <Form.Label className="text-muted">Mã đặt phòng</Form.Label>
                            <div className="font-weight-medium">{bookingRoom?.id}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-4">
                            <Form.Label className="text-muted">Nhận phòng</Form.Label>
                            <div className="font-weight-medium">{formatDateTime(bookingRoom?.booking?.startAt)}</div>
                        </div>
                        <div className="col-lg-4">
                            <Form.Label className="text-muted">Trả phòng</Form.Label>
                            <div className="font-weight-medium">{formatDateTime(bookingRoom?.booking?.endAt)}</div>
                        </div>
                        <div className="col-lg-4">
                            <Form.Label className="text-muted">Thời gian thuê</Form.Label>
                            <div className="font-weight-medium">
                                {calculateDuration(bookingRoom?.booking?.startAt, bookingRoom?.booking?.endAt)}
                                {bookingRoom?.booking?.endAt && new Date() > new Date(bookingRoom?.booking?.endAt) && (
                                    <span className="text-danger"> (Đã quá hạn trả)</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex spacer spacer-lg justify-content-between w-100 align-items-start mt-3 ng-star-inserted">
                    <div className="flex-fill">
                        <div className="form-row form-labels-50">
                            <label className="col-form-label font-semibold text-nowrap">Ghi chú </label>
                            <div className="col-form-control">
                                <textarea id="note-booking-calendar" maxlength="1000"
                                    name="note"
                                    className="form-control form-control-line max-width-400 ng-pristine ng-valid ng-touched"
                                    style={{ height: "2rem", width: "18em" }}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className="payment-suggest-money p-4 boxster">
                        <div className="payment-form-row form-row ng-star-inserted">
                            <div className="payment-form-label col-form-label">
                                <span>{item?.roomName}</span>
                            </div>
                            <div className="payment-form-control col-form-control">
                                <div className="payment-form-control col-form-control payment-total-amount font-regular">
                                    <span>{formatCurrency(bookingRoom?.price)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="payment-form-row form-row ng-star-inserted">
                            <div className="payment-form-label col-form-label">
                                <span>Khách đã trả </span>
                            </div>
                            <div className="payment-form-control col-form-control">
                                <div className="payment-form-control fw-bolder col-form-control payment-total-amount font-regular">
                                    <span> 150,000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Link to="/employee/edit-room">
                    <Button variant="outline-success">Cập nhật đặt phòng</Button>
                </Link>
                {item?.statusRoomDto?.id === 2 ? (
                    <Link to="/employee/edit-room">
                        <Button variant="success">Trả phòng</Button>
                    </Link>
                ) : (
                    <NhanPhong
                        bookingRooms={bookingRoom}
                        onClose={onClose} // Truyền callback để đóng modal chi tiết 
                    />
                )}

            </Modal.Footer>
        </Modal>
    );
}

export default ModalDetailFloor;
