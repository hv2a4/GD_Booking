import React, { useState } from "react";
import { Card, Col, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsPencil, BsPlus, BsSearch } from "react-icons/bs";
import './Style/Custom.css';
import { FaCalendarCheck, FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineDelete } from "react-icons/ai";
import { CiBoxList } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

const AddRoomPriceModal = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        discountCode: '',
        priceTableName: '',
        notes: '',
        scopeSystem: false,  // Chỉnh sửa để có nhiều phạm vi áp dụng
        scopeCustomer: false,
        effectiveTime: '',
        endTime: ''
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if endTime is after effectiveTime
        if (new Date(formData.endTime) <= new Date(formData.effectiveTime)) {
            alert("End time must be after effective time.");
            return;
        }

        // Process form submission here
        console.log(formData);
        handleClose(); // Close modal after saving
        // Optionally, reset form data
        setFormData({
            discountCode: '',
            priceTableName: '',
            notes: '',
            scopeSystem: false,
            scopeCustomer: false,
            effectiveTime: '',
            endTime: ''
        });
    };

    return (
        <>
            <Button variant="success" className="d-flex align-items-center" onClick={handleShow}>
                <BsPlus className="me-2" size={20} />
                Thêm bảng giá
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="Custom-width-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm bảng giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={5}>
                                        <Form.Group as={Row} controlId="formDiscountCode" className='mt-3'>
                                            <Form.Label column sm={4}><strong>Mã giảm giá</strong></Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập mã giảm giá"
                                                    name="discountCode"
                                                    value={formData.discountCode}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPriceTableName" className='mt-3'>
                                            <Form.Label column sm={4}><strong>Tên bảng giá</strong></Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập tên bảng giá"
                                                    name="priceTableName"
                                                    value={formData.priceTableName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formNotes" className='mt-3'>
                                            <Form.Label column sm={4}><strong>Ghi chú</strong></Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập ghi chú"
                                                    name="notes"
                                                    value={formData.notes}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col md={7}>
                                        <Row className="mt-3">
                                            <Col md={6} className="d-flex flex-column">
                                                <Form.Group as={Row} className="mb-3 align-items-center">
                                                    <Form.Label column sm={4}>
                                                        <strong>Hiệu lực</strong>
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Control
                                                            type="datetime-local"
                                                            name="effectiveTime"
                                                            value={formData.effectiveTime}
                                                            onChange={handleChange}
                                                            required
                                                            className="input-width"
                                                        />
                                                    </Col>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} className="d-flex flex-column">
                                                <Form.Group as={Row} className="mb-3 align-items-center">
                                                    <Form.Label column sm={4}>
                                                        <strong>Đến</strong>
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Control
                                                            type="datetime-local"
                                                            name="endTime"
                                                            value={formData.endTime}
                                                            onChange={handleChange}
                                                            required
                                                            className="input-width"
                                                        />
                                                    </Col>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group as={Row} controlId="formScopeSystem" className='mt-3'>
                                            <Form.Label column sm={4}><strong>Phạm vi áp dụng</strong></Form.Label>
                                            <Col sm={8}>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Toàn hệ thống"
                                                    name="scopeSystem"
                                                    checked={formData.scopeSystem}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group as={Row} controlId="formScopeCustomer" className='mt-3'>
                                            <Form.Label column sm={4}></Form.Label>
                                            <Col sm={8}>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Toàn khách hàng"
                                                    name="scopeCustomer"
                                                    checked={formData.scopeCustomer}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Row className="mt-3 justify-content-end">
                        <Col sm="auto">
                            <Button
                                variant="success"
                                style={{
                                    padding: '0.75rem 1.5rem',  // Increase padding for larger size
                                    fontSize: '1rem',           // Larger font size
                                    fontWeight: 'bold'          // Make the text bold
                                }}
                                onClick={handleSubmit} // Call handleSubmit to save
                            >
                                <FaSave size={14} />&nbsp;
                                Lưu
                            </Button>
                        </Col>
                        <Col sm="auto">
                            <Button
                                variant="dark"
                                style={{
                                    background: '#898C8D',      // Custom background color
                                    padding: '0.75rem 1.5rem',  // Increase padding for larger size
                                    fontSize: '1rem',           // Larger font size
                                    fontWeight: 'bold',
                                    border: 'none'
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
};

const EditRoomPriceModal = ({ labelName }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        discountCode: '',
        priceTableName: '',
        notes: '',
        scopeSystem: false,
        scopeCustomer: false,
        effectiveTime: '',
        endTime: '',
        stayStartTime: '',
        stayEndTime: ''
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if endTime is after effectiveTime
        if (new Date(formData.endTime) <= new Date(formData.effectiveTime)) {
            alert("End time must be after effective time.");
            return;
        }

        console.log(formData);
        handleClose(); // Close modal after saving

        // Reset form data
        setFormData({
            discountCode: '',
            priceTableName: '',
            notes: '',
            scopeSystem: false,
            scopeCustomer: false,
            effectiveTime: '',
            endTime: '',
            stayStartTime: '',
            stayEndTime: ''
        });
    };

    return (
        <>
            <p
                className="nav-link text-primary mb-0"
                style={{ fontSize: '0.9rem', cursor: 'pointer' }}
                onClick={handleShow}
            >
                {labelName}
            </p>
            <Modal show={show} onHide={handleClose} dialogClassName="Custom-width-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Sửa bảng giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={5}>
                                        {/* Discount Code */}
                                        <Form.Group as={Row} controlId="formDiscountCode" className='mt-3'>
                                            <Form.Label column sm={4}><strong>Mã bảng giá</strong></Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập mã bảng giá"
                                                    name="discountCode"
                                                    value={formData.discountCode}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>

                                        {/* Price Table Name */}
                                        <Form.Group as={Row} controlId="formPriceTableName" className='mt-3'>
                                            <Form.Label column sm={4}><strong>Tên bảng giá</strong></Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập tên bảng giá"
                                                    name="priceTableName"
                                                    value={formData.priceTableName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>

                                        {/* Notes */}
                                        <Form.Group as={Row} controlId="formNotes" className='mt-3'>
                                            <Form.Label column sm={4}><strong>Ghi chú</strong></Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập ghi chú"
                                                    name="notes"
                                                    value={formData.notes}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Col>

                                    <Col md={7}>
                                        <Row className="mt-3">
                                            {/* Effective Time */}
                                            <Col md={6} className="d-flex flex-column">
                                                <Form.Group as={Row} className="mb-3 align-items-center">
                                                    <Form.Label column sm={4}><strong>Hiệu lực</strong></Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Control
                                                            type="datetime-local"
                                                            name="effectiveTime"
                                                            value={formData.effectiveTime}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                {/* Stay Start Time */}
                                                <Form.Group as={Row} className="mb-3 align-items-center">
                                                    <Form.Label column sm={4}><strong>TG lưu trú</strong></Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Control
                                                            type="date"
                                                            name="stayStartTime"
                                                            value={formData.stayStartTime}
                                                            onChange={handleChange}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                            </Col>

                                            {/* End Time */}
                                            <Col md={6} className="d-flex flex-column">
                                                <Form.Group as={Row} className="mb-3 align-items-center">
                                                    <Form.Label column sm={2}><strong>Đến</strong></Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control
                                                            type="datetime-local"
                                                            name="endTime"
                                                            value={formData.endTime}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                {/* Stay End Time */}
                                                <Form.Group as={Row} className="mb-3 align-items-center">
                                                    <Form.Label column sm={2}><strong>Đến</strong></Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control
                                                            type="date"
                                                            name="stayEndTime"
                                                            value={formData.stayEndTime}
                                                            onChange={handleChange}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                {/* Scope Checkboxes */}
                                <Row>
                                    <Col md={6}>
                                        <Form.Group as={Row} controlId="formScopeSystem" className='mt-3'>
                                            <Form.Label column sm={4}><strong>Phạm vi áp dụng</strong></Form.Label>
                                            <Col sm={8}>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Toàn hệ thống"
                                                    name="scopeSystem"
                                                    checked={formData.scopeSystem}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group as={Row} controlId="formScopeCustomer" className='mt-3'>
                                            <Col sm={8}>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Toàn khách hàng"
                                                    name="scopeCustomer"
                                                    checked={formData.scopeCustomer}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
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
                        onClick={handleSubmit}
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


const ListPriceModal = () => {
    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [items] = useState(["121212", "giảm giá mạnh", "Giảm giá sâu"]); // Danh sách các mục

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            {/* Nút mở Modal */}
            <CiBoxList size={19} onClick={handleShow} style={{ cursor: 'pointer' }} />

            {/* Modal hiển thị danh sách */}
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* Ô tìm kiếm */}
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            <BsSearch /> {/* Icon tìm kiếm */}
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Tìm kiếm"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ border: '1px solid #ccc' }}
                        />
                    </InputGroup>

                    {/* Danh sách các mục */}
                    <ListGroup>
                        {items.filter(item => item.includes(searchTerm)).map((item, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                {item}
                                <EditRoomPriceModal labelName={
                                    <Button variant="outline-secondary" size="sm">
                                        <BsPencil /> {/* Icon bút chỉnh sửa */}
                                    </Button>
                                } />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </>
    );
};
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
export { AddRoomPriceModal, EditRoomPriceModal, DeletePriceModal, ListPriceModal };
