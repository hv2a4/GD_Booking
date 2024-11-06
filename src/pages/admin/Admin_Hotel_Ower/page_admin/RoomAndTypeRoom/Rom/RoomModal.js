import React, { useRef, useState, useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaClipboardCheck } from "react-icons/fa";
import { RiAddFill } from "react-icons/ri";
import { Add_Floor, Add_TypeRoom } from "./AddAndUpdate";
import './modelCus.css';
import { MdAdd } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";


const UpdateRoomModal = () => {
    const [show, setShow] = useState(false); // Bắt đầu với show là false
    const [id, setId] = useState('');
    const [roomName, setRoomName] = useState('');
    const [floor, setFloor] = useState('');
    const [roomType, setRoomType] = useState('');
    const [status, setStatus] = useState('');


    // Hàm để mở modal
    const handleShow = () => {
        if (!show) { // Chỉ mở modal nếu nó đang đóng
            setShow(true);
        }
    };

    // Hàm để đóng modal
    const handleClose = () => {
        setShow(false);
    };

    // Lấy giá dựa vào loại phòng
    const getPrice = () => {
        return roomType === 'Phòng VIP' ? {
            hourPrice: '300,000',
            dayPrice: '1,000,000',
            nightPrice: '1,000,000',
            overtimeFee: 'Tính tiền mỗi giờ'
        } : {
            hourPrice: '200,000',
            dayPrice: '800,000',
            nightPrice: '800,000',
            overtimeFee: 'Tính tiền mỗi giờ'
        };
    };

    const prices = getPrice();

    // Lưu dữ liệu phòng
    const handleSave = () => {
        const roomData = {
            id,
            roomName,
            floor,
            roomType,
            status
        };
        console.log("Room data saved:", roomData);
        handleClose(); // Đóng modal sau khi lưu
    };


    return (
        <>
            <small style={{ fontSize: '13px', cursor: 'pointer' }} className="btn btn-success me-2" id="add-room" onClick={handleShow}>
                <FaClipboardCheck />&nbsp;Cập nhật
            </small>
            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-wides"
                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5>Sửa thông tin phòng</h5>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group as={Row} controlId="formRoomName" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Mã phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Mã phòng tự động" disabled
                                                    value={id}
                                                    onChange={(e) => setId(e.target.value)}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formRoomName" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Tên phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập tên phòng"
                                                    value={roomName}
                                                    onChange={(e) => setRoomName(e.target.value)}
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formArea" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Tầng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    as="select"
                                                    value={floor}
                                                    onChange={(e) => setFloor(e.target.value)}
                                                >
                                                    <option value="">--Lựa chọn tầng--</option>
                                                    <option value="Tầng 1">Tầng 1</option>
                                                    <option value="Tầng 2">Tầng 2</option>
                                                    <option value="Tầng 3">Tầng 3</option>
                                                    <option value="Tầng 4">Tầng 4</option>
                                                    <option value="Tầng 5">Tầng 5</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formRoomType" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Loại phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    as="select"
                                                    value={roomType}
                                                    onChange={(e) => setRoomType(e.target.value)}
                                                >
                                                    <option value="">--Lựa chọn loại phòng--</option>
                                                    <option value="Phòng thường">Phòng thường</option>
                                                    <option value="Phòng VIP">Phòng VIP</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formRoomStatus" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Trạng thái
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    as="select"
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                >
                                                    <option value="">--Lựa chọn trạng thái--</option>
                                                    <option value="Đang trống">Đang trống</option>
                                                    <option value="Đang sử dụng">Đang sử dụng</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col md={6}>
                                    <Card style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "8px" }}>
                                        <Card.Body>
                                            <Row>
                                                <Col md={12}>
                                                    <Card.Text>
                                                        Phòng áp dụng theo giá của loại phòng:
                                                    </Card.Text>
                                                    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                                                        <li>
                                                            <span>• Giá giờ:</span> <strong>{prices.hourPrice}</strong>
                                                        </li>
                                                        <li>
                                                            <span>• Giá cả ngày:</span> <strong>{prices.dayPrice}</strong>
                                                        </li>
                                                        <li>
                                                            <span>• Phụ thu quá giờ:</span> <strong>{prices.overtimeFee}</strong>
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Modal.Body>

                <Modal.Footer>
                    <Row className="mt-3 justify-content-end">
                        <Col sm="auto">
                            <Button
                                variant="success"
                                onClick={handleSave}
                            >
                                <FaSave size={14} />&nbsp;
                                Lưu
                            </Button>
                        </Col>
                        <Col sm="auto">
                            <Button
                                variant="dark"
                                onClick={handleClose}
                            >
                                <ImCancelCircle size={14} />&nbsp;
                                Bỏ qua
                            </Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    );

};


const AddRoomModal = () => {
    const [show, setShow] = useState(false); // Bắt đầu với show là false
    const [id, setId] = useState('');
    const [roomName, setRoomName] = useState('');
    const [floor, setFloor] = useState('');
    const [roomType, setRoomType] = useState('');
    const [status, setStatus] = useState('');


    // Hàm để mở modal
    const handleShow = () => {
        if (!show) { // Chỉ mở modal nếu nó đang đóng
            setShow(true);
        }
    };

    // Hàm để đóng modal
    const handleClose = () => {
        setShow(false);
    };

    // Lấy giá dựa vào loại phòng
    const getPrice = () => {
        return roomType === 'Phòng VIP' ? {
            hourPrice: '300,000',
            dayPrice: '1,000,000',
            nightPrice: '1,000,000',
            overtimeFee: 'Tính tiền mỗi giờ'
        } : {
            hourPrice: '200,000',
            dayPrice: '800,000',
            nightPrice: '800,000',
            overtimeFee: 'Tính tiền mỗi giờ'
        };
    };

    const prices = getPrice();

    // Lưu dữ liệu phòng
    const handleSave = () => {
        const roomData = {
            id,
            roomName,
            floor,
            roomType,
            status
        };
        console.log("Room data saved:", roomData);
        handleClose(); // Đóng modal sau khi lưu
    };


    return (
        <>
            <small style={{ fontSize: '13px', cursor: 'pointer' }} id="add-room" onClick={handleShow}>
                Thêm phòng
            </small>
            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-wides"
                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5>Thêm thông tin phòng mới</h5>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group as={Row} controlId="formRoomName" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Mã phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Mã phòng tự động" disabled
                                                    value={id}
                                                    onChange={(e) => setId(e.target.value)}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formRoomName" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Tên phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập tên phòng"
                                                    value={roomName}
                                                    onChange={(e) => setRoomName(e.target.value)}
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formArea" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Tầng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    as="select"
                                                    value={floor}
                                                    onChange={(e) => setFloor(e.target.value)}
                                                >
                                                    <option value="">--Lựa chọn tầng--</option>
                                                    <option value="Tầng 1">Tầng 1</option>
                                                    <option value="Tầng 2">Tầng 2</option>
                                                    <option value="Tầng 3">Tầng 3</option>
                                                    <option value="Tầng 4">Tầng 4</option>
                                                    <option value="Tầng 5">Tầng 5</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formRoomType" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Loại phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    as="select"
                                                    value={roomType}
                                                    onChange={(e) => setRoomType(e.target.value)}
                                                >
                                                    <option value="">--Lựa chọn loại phòng--</option>
                                                    <option value="Phòng thường">Phòng thường</option>
                                                    <option value="Phòng VIP">Phòng VIP</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formRoomStatus" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Trạng thái
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    as="select"
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                >
                                                    <option value="">--Lựa chọn trạng thái--</option>
                                                    <option value="Đang trống">Đang trống</option>
                                                    <option value="Đang sử dụng">Đang sử dụng</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col md={6}>
                                    <Card style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "8px" }}>
                                        <Card.Body>
                                            <Row>
                                                <Col md={12}>
                                                    <Card.Text>
                                                        Phòng áp dụng theo giá của loại phòng:
                                                    </Card.Text>
                                                    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                                                        <li>
                                                            <span>• Giá giờ:</span> <strong>{prices.hourPrice}</strong>
                                                        </li>
                                                        <li>
                                                            <span>• Giá cả ngày:</span> <strong>{prices.dayPrice}</strong>
                                                        </li>
                                                        <li>
                                                            <span>• Phụ thu quá giờ:</span> <strong>{prices.overtimeFee}</strong>
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Modal.Body>

                <Modal.Footer>
                    <Row className="mt-3 justify-content-end">
                        <Col sm="auto">
                            <Button
                                variant="success"
                                onClick={handleSave}
                            >
                                <FaSave size={14} />&nbsp;
                                Lưu
                            </Button>
                        </Col>
                        <Col sm="auto">
                            <Button
                                variant="dark"
                                onClick={handleClose}
                            >
                                <ImCancelCircle size={14} />&nbsp;
                                Bỏ qua
                            </Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export { UpdateRoomModal, AddRoomModal };
