import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Alert from "../../../../config/alert";
import { updateStatusBooking } from "../../../../services/employee/booking-manager";
import { useLocation } from "react-router-dom";

const ConfirmBookingModal = ({ bookingRoom }) => {
    const [showModal1, setShowModal1] = useState(false);
    const [alert, setAlert] = useState(null);
    const location = useLocation();
    const [dates, setDates] = useState({
        startAt: null,
        endAt: null,
    });

    const handleShowModal1 = () => setShowModal1(true);
    const handleCloseModal1 = () => setShowModal1(false);

    // Đặt mặc định `startAt` và `endAt` từ bookingRoom dòng đầu tiên
    useEffect(() => {
        setTimeout(() => setAlert(null), 500);
        if (bookingRoom && bookingRoom.length > 0) {
            setDates({
                startAt: new Date(bookingRoom[0]?.booking?.startAt),
                endAt: new Date(bookingRoom[0]?.booking?.endAt),
            });
        }
    }, [bookingRoom,alert,location]);

    // Xử lý khi thay đổi ngày
    const handleChange = (field, value) => {
        const now = new Date();
        if (value < now) {
            setAlert({ type: "error", title: "Ngày không được nhỏ hơn hiện tại!" });
            return;
        }
        if (field === "endAt" && value < dates.startAt) {
            setAlert({ type: "error", title: "Ngày trả không được nhỏ hơn ngày nhận!" });
            return;
        }
        if (field === "startAt" && dates.endAt && value > dates.endAt) {
            setAlert({ type: "error", title: "Ngày nhận không được lớn hơn ngày trả!" });
            return;
        }

        setDates((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    // Xử lý khi bấm nút "Xác nhận"
    const handleUpdateBooking = async () => {
        const newBooking = {
            startDate: dates.startAt.toISOString(),
            endDate: dates.endAt.toISOString()
        }
        const idBooking = bookingRoom[0].booking.id;
        try {
            const data = await updateStatusBooking(idBooking, 4, newBooking);
            setAlert({ type: data.status, title: data.message });
            handleCloseModal1();
        } catch (error) {
            setAlert({ type: "error", title: error.message });
        }

    };

    return (
        <>
            <Button
                variant="outline-secondary"
                onClick={handleShowModal1}>
                Xác nhận
            </Button>
            <Modal show={showModal1} onHide={handleCloseModal1} centered>
                <Modal.Header closeButton>
                    {alert && <Alert type={alert.type} title={alert.title} />}
                    <Modal.Title>Xác nhận đặt phòng - DP000017</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>
                            <i className="bi bi-person-circle"></i> {bookingRoom[0]?.booking?.accountDto?.fullname} - {bookingRoom[0]?.booking?.accountDto?.phone}
                        </p>
                    </div>
                    <Table>
                        <thead>
                            <tr style={{ backgroundColor: "#eaf4eb" }}>
                                <th style={{ width: "40%" }}>Loại phòng</th>
                                <th style={{ width: "20%" }}>Phòng</th>
                                <th style={{ width: "20%" }}>Nhận</th>
                                <th style={{ width: "20%" }}>Trả</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingRoom.map((data, index) => (
                                <tr key={data.id}>
                                    <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                                        {data.room?.typeRoomDto?.typeRoomName} - {data.room?.typeRoomDto?.typeBedDto.bedName}
                                    </td>
                                    <td>{data.room?.roomName}</td>
                                    {index === 0 && ( // Chỉ hiện ô nhập ngày cho dòng đầu tiên
                                        <>
                                            <td>
                                                <DatePicker
                                                    selected={dates.startAt}
                                                    className="custom-date-picker"
                                                    onChange={(date) => handleChange("startAt", date)}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    timeCaption="Time"
                                                    dateFormat="dd/MM/yyyy, HH:mm"
                                                />
                                            </td>
                                            <td>
                                                <DatePicker
                                                    selected={dates.endAt}
                                                    className="custom-date-picker"
                                                    onChange={(date) => handleChange("endAt", date)}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    timeCaption="Time"
                                                    dateFormat="dd/MM/yyyy, HH:mm"
                                                />
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <p className="text-muted mt-3">
                        Sau khi xác nhận, các phòng sẽ chuyển về trạng thái đặt trước
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleUpdateBooking}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ConfirmBookingModal;
