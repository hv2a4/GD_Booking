import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import './AddEmployeeModal.css';

const AddEmployeeModal = ({ show, handleClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm mới nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="employee-form">
                    <Col md={4} className="employee-image">
                        <div className="image-upload">
                            {selectedImage ? (
                                <img src={selectedImage} alt="Selected" className="selected-image" />
                            ) : (
                                <span className="camera-icon">📷</span>
                            )}
                        </div>
                        <Form.Group controlId="formFile" className="mt-2">
                            <Form.Control
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="upload-btn"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={8} className="employee-info">
                        <Form.Group as={Row} className="mb-3">
                            <Col md={6}>
                                <Form.Label>Mã nhân viên</Form.Label>
                                <Form.Control type="text" value="Mã nhân viên tự động" disabled />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Tài khoản</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="employeeName"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col md={6}>
                                <Form.Label>Tên nhân viên</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="employeeName"
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="password"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col md={6}>
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Giới tính</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            label="Nam"
                                            type="radio"
                                            name="gender"
                                            value="Nam"
                                        />
                                        <Form.Check
                                            inline
                                            label="Nữ"
                                            type="radio"
                                            name="gender"
                                            value="Nữ"
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success">Lưu</Button>
                <Button variant="secondary" onClick={handleClose}>Bỏ qua</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEmployeeModal;
