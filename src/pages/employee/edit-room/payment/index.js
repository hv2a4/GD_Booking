import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { formatCurrency } from "../../../../config/formatPrice";
import { getBookingRoomServiceRoom } from "../../../../services/admin/account-manager";
import Cookies from 'js-cookie';
import { jwtDecode as jwt_decode } from "jwt-decode";
import { addInvoice } from "../../../../services/employee/invoice";
import Alert from "../../../../config/alert";
import { useNavigate } from "react-router-dom";
import { getIdBooking } from "../../../../config/idBooking";
import { discountBooking } from "../../../../services/employee/discount";

const PopupPayment = ({ bookings = { bookingRooms: [], id: null, accountDto: {} } }) => {
    const localDatetime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
    const [show, setShow] = useState(false);
    const [bookingRooms, setBookingRooms] = useState([]);
    const [services, setServices] = useState([]);
    const [alert, setAlert] = useState(null);
    const [dateTime, setDateTime] = useState(localDatetime);
    const [priceDiscount, setPriceDiscount] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const cookieToken = Cookies.get("token") ? Cookies.get("token") : null;
    const decodedToken = jwt_decode(cookieToken);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(bookings);
        
        if (bookings?.bookingRooms) {
            setBookingRooms(bookings.bookingRooms);
            handleService();
            handlediscountBooking();
        }
        setTimeout(() => setAlert(null), 500);
    }, [bookings]);


    const handleService = async () => {
        const idBookingRoom = bookingRooms.map((e) => e.id);
        const data = await getBookingRoomServiceRoom(idBookingRoom);
        setServices(data);
    }

    const calculateDuration = (checkIn, checkOut) => {
        if (!checkIn || !checkOut) return 0;

        const start = new Date(checkIn);
        const end = new Date(checkOut);

        if (isNaN(start) || isNaN(end)) return 0;

        const diffMs = end - start;
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays : 0;
    };
    const calculateTotal = () => {
        // Đảm bảo bookingRooms là mảng hợp lệ
        const validBookingRooms = Array.isArray(bookingRooms) ? bookingRooms : [];
        const totalRoomCost = validBookingRooms.reduce((acc, item) => {
            const duration = calculateDuration(item.checkIn, new Date());
            const roomCost = (item.room?.typeRoomDto?.price || 0) * duration;
            return acc + roomCost;
        }, 0);

        // Đảm bảo services là mảng hợp lệ
        const validServices = Array.isArray(services) ? services : [];
        const totalServiceCost = validServices.reduce((acc, item) => {
            const serviceCost = (item.price || 0) * (item.quantity || 0);
            return acc + serviceCost;
        }, 0);

        // Tổng cộng tiền phòng và dịch vụ
        return totalRoomCost + totalServiceCost;
    };

    const handlediscountBooking = async () => {
        if (bookings.disCountName) {
            // Gọi service hoặc API để lấy dữ liệu giảm giá
            const data = await discountBooking(bookings.disCountName);
            if (data) {
                const validBookingRooms = Array.isArray(bookingRooms) ? bookingRooms : [];
                const totalRoomCost = validBookingRooms.reduce((acc, item) => {
                    const duration = calculateDuration(item.checkIn, new Date());
                    const roomCost = (item.room?.typeRoomDto?.price || 0) * duration;
                    return acc + roomCost;
                }, 0);
    
                // Tính giá giảm dựa trên phần trăm giảm giá
                const priceDiscount = (totalRoomCost * data[0].percent) / 100;
                setPriceDiscount(priceDiscount);
            }
        }
    };
    const tatolRoom = () => {
        const totalRoomCost = bookingRooms.reduce((acc, item) => {
            const duration = calculateDuration(item.checkIn, new Date());
            const roomCost = item.room?.typeRoomDto?.price * duration || 0;
            return acc + roomCost;
        }, 0);
        return totalRoomCost;
    }

    const handleAddInvoice = async () => {
        const data = {
            createAt: new Date(dateTime),
            invoiceStatus: true,
            totalAmount: calculateTotal(),
            bookingId: bookings?.id
        }
        const res = await addInvoice(data, cookieToken);
        if (res) {
            setAlert({ type: res.status, title: res.message });
            setTimeout(() => navigate("/employee/list-booking-room"), 3000);
        }
    }


    if (!bookings?.bookingRooms?.length) {
        return <div className="overlay-loading">
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    return (
        <>
            <button
                className="btn btn-outline-success"
                type="button"
                onClick={handleShow}
                disabled={bookings?.statusBookingDto?.id === 6 || bookings?.statusBookingDto?.id === 8}
            >
                Thanh toán
            </button>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                centered
                scrollable
            >
                <Modal.Header closeButton>
                    {alert && <Alert type={alert.type} title={alert.title} />}
                    <Modal.Title>Thanh toán hóa đơn {getIdBooking(bookings?.id, bookings?.createAt)} - {bookings?.accountDto?.fullname}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-8">
                                <div className="row">
                                    <div className="col-lg-12 mb-4">
                                        <h5 className="fw-semibold">Tiền phòng</h5>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">STT</th>
                                                    <th>Hạng mục</th>
                                                    <th className="text-center">Số lượng</th>
                                                    <th className="text-end">Đơn giá</th>
                                                    <th className="text-end">Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookingRooms && bookingRooms.length > 0 ? (
                                                    bookingRooms.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td className="fw-semibold">
                                                                    {item.room?.typeRoomDto?.typeRoomName} - {item.room?.typeRoomDto?.typeBedDto?.bedName}
                                                                    <br />
                                                                    <small className="text-muted">{item.room?.roomName}</small>
                                                                </td>
                                                                <td className="text-center">{calculateDuration(item.checkIn, new Date())} ngày</td>
                                                                <td className="text-end">{formatCurrency(item.room?.typeRoomDto?.price)}</td>
                                                                <td className="text-end">{formatCurrency(item.room?.typeRoomDto?.price * calculateDuration(item.checkIn, new Date()))}</td>
                                                            </tr>
                                                        )
                                                    })
                                                ) : (
                                                    ""
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="col-lg-12 mb-4">
                                        <h5 className="fw-semibold">Dịch vụ</h5>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">STT</th>
                                                    <th>Tên dịch vụ</th>
                                                    <th className="text-center">Số lượng</th>
                                                    <th className="text-end">Đơn giá</th>
                                                    <th className="text-end">Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {services && services.length > 0 ? (
                                                    services.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td className="fw-semibold">{item.serviceRoomDto?.serviceRoomName} ({item.serviceRoomDto?.typeServiceRoomDto?.duration})
                                                                    <br />
                                                                    <small className="text-muted">{item.bookingRoomDto?.room?.roomName}</small>
                                                                </td>
                                                                <td className="text-center">{item.quantity}</td>
                                                                <td className="text-end">{formatCurrency(item.price)}</td>
                                                                <td className="text-end">{formatCurrency(item.price * item.quantity)}</td>
                                                            </tr>
                                                        );
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">Không có dịch vụ nào</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <div className="border p-3 rounded">
                                    <h5>Chi tiết thanh toán</h5>
                                    <div className="mb-3">
                                        <label className="form-label">Nhân viên tạo HĐ</label>
                                        <input className="form-control" value={decodedToken.fullname} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Thời gian tạo HĐ</label>
                                        <input
                                            type="datetime-local"
                                            value={dateTime}
                                            onChange={(e) => setDateTime(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <span>Tổng cộng</span>
                                            <strong>{formatCurrency(calculateTotal())} VNĐ</strong>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <span>Giảm giá</span>
                                            <strong>{formatCurrency(priceDiscount)} VNĐ</strong>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <span>Thu khác</span>
                                            <strong>0</strong>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <span>Khách đã trả</span>
                                            <strong>{bookings.methodPaymentDto
                                                ? bookings.methodPaymentDto.id === 1
                                                    ? 0
                                                    : bookings.methodPaymentDto.id === 2
                                                        ? formatCurrency(tatolRoom()) + " VNĐ"
                                                        : 0
                                                : 0}
                                            </strong>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <strong>Còn cần trả</strong>
                                            <strong>
                                                {bookings.methodPaymentDto?.id === 2
                                                    ? formatCurrency(calculateTotal() - tatolRoom() - priceDiscount)
                                                    : formatCurrency(calculateTotal() - priceDiscount)} VNĐ
                                            </strong>
                                        </div>
                                    </div>
                                    {/* <h5>Phương thức thanh toán</h5>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            id="cash"
                                        />
                                        <label className="form-check-label" htmlFor="cash">
                                            Tiền mặt
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            id="bankTransfer"
                                        />
                                        <label className="form-check-label" htmlFor="bankTransfer">
                                            Chuyển khoản
                                        </label>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleAddInvoice}>
                        Thanh toán
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PopupPayment;
