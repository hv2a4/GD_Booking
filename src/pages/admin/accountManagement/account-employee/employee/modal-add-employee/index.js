import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import './AddEmployeeModal.css';
import { addEmployee } from '../../../../../../services/admin/account-manager';

const AddEmployeeModal = ({ show, handleClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [employeeData, setEmployeeData] = useState({
        accountId: '',
        employeeName: '',
        password: '',
        phoneNumber: '',
        email: '',
        gender: '',
    });

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

    const triggerFileInput = () => {
        document.getElementById('imageInput').click();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await addEmployee(employeeData);
            if (response.status === 200) {
                alert("Thêm nhân viên thành công!");
                handleClose();
            } else {
                alert("Có lỗi xảy ra khi thêm nhân viên.");
            }
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra khi kết nối đến server.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm mới nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="employee-form">
                    <Col md={4} className="employee-image mt-4">
                        <div className="image-upload" onClick={triggerFileInput}>
                            {selectedImage ? (
                                <img src={selectedImage} alt="Selected" className="selected-image" />
                            ) : (
                                <span className="camera-icon">📷</span>
                            )}
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="imageInput"
                            />
                        </div>
                    </Col>
                    <Col md={8} className="employee-info">
                        <Form.Group as={Row} className="mb-3">
                            <Col md={6}>
                                <Form.Label>Mã nhân viên</Form.Label>
                                <Form.Control type="text" value="Mã nhân viên tự động" disabled />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Tài khoản</Form.Label>
                                <Form.Control type="text" name="accountId" onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col md={6}>
                                <Form.Label>Tên nhân viên</Form.Label>
                                <Form.Control type="text" name="employeeName" onChange={handleChange} />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col md={6}>
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="text" name="phoneNumber" onChange={handleChange} />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col md={6}>
                                <Form.Label>Giới tính</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        label="Nam"
                                        type="radio"
                                        name="gender"
                                        value="Nam"
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        inline
                                        label="Nữ"
                                        type="radio"
                                        name="gender"
                                        value="Nữ"
                                        onChange={handleChange}
                                    />
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleSubmit}>Lưu</Button>
                <Button variant="secondary" onClick={handleClose}>Bỏ qua</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEmployeeModal;