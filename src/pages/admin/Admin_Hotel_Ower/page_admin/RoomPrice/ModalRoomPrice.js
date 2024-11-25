import React, { useState, useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsPlus } from "react-icons/bs";
import './Style/Custom.css';
import { FaCalendarCheck, FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { request } from "../../../../../config/configApi";
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";

const AddRoomPriceModal = () => {
    const [show, setShow] = useState(false);
    const [roomTypes, setRoomTypes] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            const response = await request({
                method: "GET",
                path: "/api/type-room/getAll",
                token: Cookies.get('token'),
            });

            if (response && response.length > 0) {
                setRoomTypes(response);
            }
        };

        fetchRoomTypes();
    }, []);

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        // Xử lý logic gửi dữ liệu
    };

    return (
        <>
            <Button variant="success" className="d-flex align-items-center" onClick={handleShow}>
                <BsPlus className="me-2" size={20} />
                Thêm
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="Custom-width-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm giảm giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={4}>
                                                Mã giảm giá
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Mã giảm giá tự động"
                                                    disabled
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={4}><strong>Tên giảm giá</strong></Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập tên giảm giá..."
                                                    {...register("discountName", { required: "Tên giảm giá không được để trống" })}
                                                />
                                                {errors.discountName && (
                                                    <small className="text-danger">{errors.discountName.message}</small>
                                                )}
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={4}><strong>Phần trăm</strong></Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Nhập phần trăm giảm..."
                                                    {...register("percent", { 
                                                        required: "Phần trăm không được để trống",
                                                        min: { value: 1, message: "Phần trăm phải lớn hơn 0" },
                                                        max: { value: 100, message: "Phần trăm không được lớn hơn 100" }
                                                    })}
                                                />
                                                {errors.percent && (
                                                    <small className="text-danger">{errors.percent.message}</small>
                                                )}
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={4}>
                                                <strong>Ngày bắt đầu</strong>
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="date"
                                                    {...register("startDate", { required: "Vui lòng chọn ngày bắt đầu" })}
                                                />
                                                {errors.startDate && (
                                                    <small className="text-danger">{errors.startDate.message}</small>
                                                )}
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={4}>
                                                <strong>Ngày kết thúc</strong>
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="date"
                                                    {...register("endDate", { required: "Vui lòng chọn ngày kết thúc" })}
                                                />
                                                {errors.endDate && (
                                                    <small className="text-danger">{errors.endDate.message}</small>
                                                )}
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={4}>
                                                <strong>Loại phòng</strong>
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    as="select"
                                                    {...register("roomType", { required: "Vui lòng chọn loại phòng" })}
                                                >
                                                    <option value="">--Lựa chọn loại phòng--</option>
                                                    {roomTypes.map((roomType) => (
                                                        <option key={roomType.id} value={roomType.id}>
                                                            {roomType.typeRoomName}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                                {errors.roomType && (
                                                    <small className="text-danger">{errors.roomType.message}</small>
                                                )}
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-3 justify-content-end">
                                    <Col sm="auto">
                                        <Button
                                            type="submit"
                                            variant="success"
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                fontSize: '1rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            <FaSave size={14} />&nbsp; Lưu
                                        </Button>
                                    </Col>
                                    <Col sm="auto">
                                        <Button
                                            variant="dark"
                                            style={{
                                                background: '#898C8D',
                                                padding: '0.75rem 1.5rem',
                                                fontSize: '1rem',
                                                fontWeight: 'bold',
                                                border: 'none'
                                            }}
                                            onClick={handleClose}
                                        >
                                            <ImCancelCircle size={14} />&nbsp; Bỏ qua
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    );
};

const EditRoomPriceModal = ({ id }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <p
                className="nav-link text-orange mb-0"
                style={{ fontSize: '0.9rem', cursor: 'pointer' }}
                onClick={handleShow}
            >
                {'Cập nhật giảm giá'}
            </p>
            <Modal show={show} onHide={handleClose} dialogClassName="Custom-width-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Sửa giảm giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                        }}
                    >
                        <FaSave size={14} />&nbsp; Lưu
                    </Button>
                    <Button
                        variant="dark"
                        style={{
                            background: '#898C8D',
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            border: 'none'
                        }}
                        onClick={handleClose}
                    >
                        <ImCancelCircle size={14} />&nbsp; Bỏ qua
                    </Button>
                    <DeleteListPriceModal />
                </Modal.Footer>
            </Modal>
        </>
    );
};

const DeletePriceModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    return (
        <>
            <AiOutlineDelete onClick={handleOpen} size={18} />

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Xóa hạng phòng khỏi bảng giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Bạn có chắc chắn muốn xóa Phòng 01 giường đôi cho 2 người khỏi bảng giá 121212 không?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Row className="mt-3 justify-content-end">
                        <Col sm="auto">
                            <Button
                                variant="danger"
                                onClick={handleClose}
                            >
                                <FaCalendarCheck size={14} />&nbsp;
                                Đồng ý
                            </Button>
                        </Col>
                        <Col sm="auto">
                            <Button
                                variant="dark"
                                style={{
                                    background: '#898C8D',      // Custom background color
                                    border: 'none'         // Make the text bold
                                }}
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
}

const DeleteListPriceModal = () => {
    const [showFirstModal, setShowFirstModal] = useState(false);

    const handleFirstModalClose = () => setShowFirstModal(false); // Sửa tên hàm đúng
    const handleFirstModalShow = () => setShowFirstModal(true);   // Sửa tên hàm đúng

    return (
        <>
            {/* Nút để mở modal */}
            <Button
                variant="danger"
                style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    border: 'none'
                }}
                onClick={handleFirstModalShow} // Gọi hàm để mở modal
            >
                <MdOutlineDeleteOutline size={17} />&nbsp; Xóa
            </Button>

            {/* Modal */}
            <Modal
                show={showFirstModal}
                onHide={handleFirstModalClose}
                animation={false}
                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xóa bảng giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Hệ thống sẽ xóa bảng giá 121212,
                    nhưng vẫn giữ thông tin bảng giá (gồm Tên bảng giá, Đơn giá) trong các giao dịch đã phát sinh.
                    Bạn có chắc chắn muốn xóa?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleFirstModalClose}>
                        <FaCheck />&nbsp;
                        Đồng ý
                    </Button>
                    <Button
                        variant="dark"
                        onClick={handleFirstModalClose}
                        style={{ background: '#898C8D', border: 'none' }}
                    >
                        <ImCancelCircle />&nbsp;
                        Bỏ qua
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export { AddRoomPriceModal, EditRoomPriceModal, DeletePriceModal };
