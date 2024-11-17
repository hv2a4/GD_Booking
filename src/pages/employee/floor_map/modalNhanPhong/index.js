import React, { useState } from "react";
import { Modal, Button, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

const ModalNhanPhong = ({ onClose }) => {
    const [rooms, setRooms] = useState([
        {
            id: 1,
            type: "Phòng đơn 2 giường",
            name: "P.309",
            status: "Sạch",
            checkIn: "2024-09-20T01:29",
            checkOut: "2024-09-21T02:29",
            selected: false,
        },
        {
            id: 2,
            type: "Phòng đơn 2 giường",
            name: "P.302",
            status: "Sạch",
            checkIn: "2024-09-20T01:29",
            checkOut: "2024-09-21T02:29",
            selected: false,
        },
    ]);

    const handleCheckboxChange = (id) => {
        setRooms(rooms.map(room =>
            room.id === id ? { ...room, selected: !room.selected } : room
        ));
    };

    return (
        <Modal className="modal-dialog-centered modal-customer modal-noneBg" show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Phòng nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="table-responsive">
                    <table
                        className="table table-striped table-borderless table-fill">
                        <thead>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>Hạng phòng</td>
                                <td>Phòng</td>
                                <td>Trạng thái phòng</td>
                                <td>Nhận</td>
                                <td>Trả</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center">
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>Phòng đơn 2 giường</td>
                                <td>P.309</td>
                                <td>Sạch</td>
                                <td><input type="datetime-local" value="2024-09-20T01:29" /></td>
                                <td><input type="datetime-local" value="2024-09-21T02:29" /></td>
                            </tr>
                            <tr className="text-center">
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>Phòng đơn 2 giường</td>
                                <td>P.302</td>
                                <td>Sạch</td>
                                <td><input type="datetime-local" value="2024-09-20T01:29" /></td>
                                <td><input type="datetime-local" value="2024-09-21T02:29" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Link to="/employee/edit-room">
                    <Button variant="outline-success">Cập nhật đặt phòng</Button>
                </Link>
                <Button variant="success" onClick={onClose}>Xác nhận</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalNhanPhong;
