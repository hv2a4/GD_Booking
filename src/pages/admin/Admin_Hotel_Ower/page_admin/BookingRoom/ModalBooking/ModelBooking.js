import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Table, Toast } from "react-bootstrap";
import '../styles/disible.css';
import { getDataReservations, updateStatusBooking } from "../../../../../../services/admin/crudServiceReservations";
import Alert from "../../../../../../config/alert";
import DetailBooking from "./DetailBooking";
const DatePicker = ({ label, id, value, onChange }) => {
    return (
        <Form.Group className="mb-3" controlId={id}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="date"
                value={value}
                onChange={onChange}
                style={{ fontSize: '12px' }}
            />
        </Form.Group>
    );
};

function MessageCancel() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const SearchBooking = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [timeRange, setTimeRange] = useState("");
    const [activeRow, setActiveRow] = useState(null);
    const [dataReservations, setDataReservations] = useState([]);
    const [alert, setAlert] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false); // State for cancel modal
    const [bookingToCancel, setBookingToCancel] = useState(null); // Store the booking to cancel
    const [disabledBookingIds, setDisabledBookingIds] = useState([]);

    const handleTableOpenAndClose = (rowId) => {
        if (activeRow === rowId) {
            setActiveRow(null); // Nếu bấm lại thì đóng thông tin chi tiết
        } else {
            setActiveRow(rowId); // Mở thông tin chi tiết cho dòng hiện tại
        }
    }

    const handleCancelBooking = (booking) => {
        setBookingToCancel(booking); // Store the booking to cancel
        setShowCancelModal(true); // Show the confirmation modal
    };

    const handleConfirmCancel = async () => {
        try {
            if (bookingToCancel) {
                await updateStatusBooking(bookingToCancel.bookingId); // Cancel the booking
                setAlert({ type: 'success', title: 'Hủy đặt phòng thành công' });
                setDisabledBookingIds([...disabledBookingIds, bookingToCancel.bookingId]); // Disable the cancel button
                handleGetReservations(); // Refresh the reservation data
            }
            setShowCancelModal(false); // Close the modal
        } catch (error) {
            setAlert({ type: 'error', title: 'Lỗi khi hủy đặt phòng' });
            setShowCancelModal(false); // Close the modal on error as well
        }
    };

    const handleCloseCancelModal = () => {
        setShowCancelModal(false); // Close the modal without confirming
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0'); // Thêm '0' nếu ngày có 1 chữ số
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm '0' nếu cần
        const year = date.getFullYear(); // Lấy năm của ngày đã chọn
        const currentYear = new Date().getFullYear(); // Năm hiện tại

        // Nếu năm khác năm hiện tại, hiển thị cả năm; nếu không, chỉ hiển thị ngày/tháng
        return year !== currentYear ? `${day}/${month}/${year}` : `${day}/${month}`;
    };
    const formatDates = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0'); // Thêm '0' nếu ngày có 1 chữ số
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm '0' nếu cần
        const year = date.getFullYear(); // Lấy năm của ngày đã chọn
        const currentYear = new Date().getFullYear(); // Năm hiện tại

        // Nếu năm khác năm hiện tại, hiển thị cả năm; nếu không, chỉ hiển thị ngày/tháng
        return year !== currentYear ? `${day}${month}${year}` : `${day}${month}`;
    };
    const handleSaveDateRange = () => {
        if (startDate && endDate) {
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);
            setTimeRange(`${formattedStartDate} - ${formattedEndDate}`);
            setShowToast(false);
        }
    };

    const handleGetReservations = async () => {
        try {
            const res = await getDataReservations();  // Lấy dữ liệu từ API

            // Kiểm tra xem `res` có phải là mảng hay không
            if (Array.isArray(res)) {
                const user = res.filter((e) => e.roleName === 'Customer');

                // Sắp xếp dữ liệu theo thời gian tăng dần (theo trường startAt)
                const sortedReservations = user.sort((a, b) => {
                    const dateA = new Date(a.startAt);  // Chuyển đổi startAt thành đối tượng Date
                    const dateB = new Date(b.startAt);  // Chuyển đổi startAt thành đối tượng Date
                    return dateA - dateB;  // Sắp xếp tăng dần
                });

                // Cập nhật dữ liệu đã sắp xếp
                setDataReservations(sortedReservations);
            } else {
                throw new Error("Dữ liệu không phải là mảng");
            }
        } catch (error) {
            setAlert({ type: 'error', title: 'Lỗi khi tải dữ liệu đặt phòng' });
            console.log("Lỗi khi tải dữ liệu đặt phòng: ", error);
        }
    };


    const formatCurrencyVND = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    function getStatusBadgeClass(status) {
        switch (status) {
            case 'chờ xác nhận':
                return 'badge-pending'; // Màu cam nhạt
            case 'xác nhận từ khách hàng':
                return 'badge-customer-confirmed'; // Màu xanh lơ
            case 'xác nhận từ khách sạn':
                return 'badge-hotel-confirmed'; // Màu xanh dương
            case 'Đang sử dụng khách sạn':
                return 'badge-in-use'; // Màu xanh lá sáng
            case 'Hoàn thành':
                return 'badge-completed'; // Màu xanh lá đậm
            case 'Đã hủy':
                return 'badge-cancelled'; // Màu đỏ đậm
            case 'Đã quá hạn':
                return 'badge-expired'; // Màu xám đen
            default:
                return 'badge-default'; // Màu xám nhạt
        }
    }

    const handleUpdateBookingStatus = async (id) => {
        try {
            await updateStatusBooking(id);
            setAlert({ type: 'success', title: 'Hủy đặt phòng thành công' });
            handleGetReservations();
        } catch (error) {
            setAlert({ type: 'error', title: 'Lỗi khi tải dữ liệu đặt phòng' });
        }
    }
    useEffect(() => {
        handleGetReservations();
    }, []);

    return (
        <>
            <Card style={{ border: 'none', boxShadow: 'none' }}>
                <Card.Body>
                    <Row>
                        {alert && <Alert type={alert.type} title={alert.title} />}
                        <Table responsive bordered className="mt-5">
                            <thead>
                                <tr className="table-limited-text" >
                                    <th>Số hiệu đặt phòng</th>
                                    <th>Tên khách hàng</th>
                                    <th>Ngày đến</th>
                                    <th>Ngày đi</th>
                                    <th>Số lượng khách</th>
                                    <th>Trạng thái đặt phòng</th>
                                    <th>Tổng giá trị đặt phòng</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataReservations.map((booking) => (
                                    <React.Fragment key={booking.bookingId}>
                                        <tr
                                            onClick={() => handleTableOpenAndClose(booking.bookingId)}
                                            className="table-limited-text"
                                        >
                                            <td>BK{booking.bookingId} {formatDates(booking.createAt)}</td>
                                            <td>{booking.accountFullname}</td>
                                            <td>{formatDate(booking.startAt)}</td>
                                            <td>{formatDate(booking.endAt)}</td>
                                            <td>{booking.max_guests} người</td>
                                            <td>
                                                <span className={`badge ${getStatusBadgeClass(booking.statusBookingName)}`}>
                                                    {booking.statusBookingName}
                                                </span>
                                            </td>
                                            <td>{formatCurrencyVND(booking.total_amount)}</td>
                                            <td className="d-flex justify-content-between">
                                                <DetailBooking object={booking} />
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleCancelBooking(booking)} // Show the modal on click
                                                    disabled={booking.statusBookingName === 'Hoàn thành' || disabledBookingIds.includes(booking.bookingId)}  // Disable if status is "Hoàn thành" or already canceled
                                                >
                                                    Hủy
                                                </button>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Card.Body>
            </Card>
            {/* Cancel Confirmation Modal */}
            <Modal show={showCancelModal} onHide={handleCloseCancelModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Hủy Đặt Phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn hủy đặt phòng này?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCancelModal}>
                        Không
                    </Button>
                    <Button variant="danger" onClick={handleConfirmCancel}>
                        Hủy Đặt Phòng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export { SearchBooking };
