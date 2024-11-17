import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { getAllRoom } from "../../../../services/employee/room";
import { formatCurrency } from "../../../../config/formatPrice";
import Alert from "../../../../config/alert";

const DatPhong = ({ onClose }) => {
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [rooms, setRooms] = useState([]); // Danh sách phòng
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [alert, setAlert] = useState(null);


    useEffect(() => {
        handleRooms(currentPage);
    }, [currentPage]);

    const handleRooms = async (page) => {
        const data = await getAllRoom(page);
        if (data) {
            setRooms(data.content);
            setTotalPages(data.totalPages);
        }
    };

    // Hàm chuyển trang
    const handlePageChange = (direction) => {
        const newPage = currentPage + direction;
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Hàm chọn phòng
    const handleSelectRoom = (room) => {
        if (!checkInDate || !checkOutDate) {
            setAlert({ type: "error", title: "Vui lòng chọn ngày nhận và trả phòng trước!" });
            return;
        }

        const roomData = {
            roomId: room.id,
            roomName: room.roomName,
            typeRoomName: room.typeRoomDto.typeRoomName,
            bedName: room.typeRoomDto.typeBedDto.bedName,
            price: room.typeRoomDto.price,
            checkInDate,
            checkOutDate,
        };

        // Thêm phòng vào danh sách nếu chưa có
        setSelectedRooms((prev) => {
            if (!prev.some((r) => r.roomId === room.id)) {
                return [...prev, roomData];
            }
            return prev;
        });
    };

    // Hàm xóa phòng khỏi danh sách đã chọn
    const handleRemoveRoom = (roomId) => {
        setSelectedRooms((prev) => prev.filter((room) => room.roomId !== roomId));
    };

    // Tính tổng giá
    const totalPrice = selectedRooms.reduce((total, room) => total + room.price, 0);

    return (
        <Modal show={true} onHide={onClose} className="modal-noneBg modal-dialog-centered" centered>
            <Modal.Header closeButton>
            {alert && <Alert type={alert.type} title={alert.title} />}
                <Modal.Title className="fw-bolder">Chọn phòng</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ overflow: "auto", scrollbarWidth: "none" }}>
                {/* Form chọn ngày */}
                <div className="row text-start mb-3">
                    <div className="col-12 col-md-6 mb-3">
                        <Form.Group controlId="checkInDate">
                            <Form.Label>Nhận phòng</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <Form.Group controlId="checkOutDate">
                            <Form.Label>Trả phòng</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                </div>

                {/* Danh sách phòng */}
                <Table className="table-borderless table-responsive">
                    <thead>
                        <tr>
                            <th className="text-start">Lựa chọn khác</th>
                            <th className="text-center">Giá</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div>
                                        <strong>
                                            {item.roomName} - {item.typeRoomDto.typeRoomName} - {item.typeRoomDto.typeBedDto.bedName}
                                        </strong>
                                    </div>
                                    <div className="d-flex align-items-center mt-1">
                                        <i className="fa fa-user icon-mask icon-xs mr-2"></i> {item.typeRoomDto.guestLimit}
                                    </div>
                                </td>
                                <td className="text-right">{formatCurrency(item.typeRoomDto.price)}</td>
                                <td className="text-center">
                                    <Button
                                        variant="outline-success"
                                        onClick={() => handleSelectRoom(item)}
                                    >
                                        Chọn
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Chuyển trang */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Button
                        variant="outline-secondary"
                        onClick={() => handlePageChange(-1)}
                        disabled={currentPage === 0}
                    >
                        Trước
                    </Button>
                    <span>Trang {currentPage + 1} / {totalPages}</span>
                    <Button
                        variant="outline-secondary"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage + 1 === totalPages}
                    >
                        Tiếp theo
                    </Button>
                </div>
            </Modal.Body>

            <Modal.Footer className="justify-content-between align-items-start flex-column">
                <div style={{ maxHeight: "150px", overflowY: "auto", width: "100%" }}>
                    {selectedRooms.length > 0 && (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Tên phòng</th>
                                    <th>Loại phòng</th>
                                    <th>Nhận phòng</th>
                                    <th>Trả phòng</th>
                                    <th>Giá</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedRooms.map((room) => (
                                    <tr key={room.roomId}>
                                        <td>{room.roomName}</td>
                                        <td>{room.typeRoomName}</td>
                                        <td>{room.checkInDate}</td>
                                        <td>{room.checkOutDate}</td>
                                        <td>{formatCurrency(room.price)} VND</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleRemoveRoom(room.roomId)}
                                            >
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
                <div className="w-100 mt-3 d-flex justify-content-between align-items-center">
                    <div className="fw-bolder fs-5">Tổng giá: {formatCurrency(totalPrice)} VND</div>
                    <Button variant="success" className="ml-auto">Đặt phòng</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default DatPhong;
