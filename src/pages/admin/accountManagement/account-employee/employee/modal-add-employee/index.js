import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import './AddEmployeeModal.css';
import { addEmployee } from '../../../../../../services/admin/account-manager';
import uploadImageToFirebase from '../../../../../../config/fireBase';
import Alert from '../../../../../../config/alert';

const AddEmployeeModal = ({ show, handleClose, refreshData }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [alert, setAlert] = useState(null);
    const [employeeData, setEmployeeData] = useState({
        username: '',
        fullname: '',
        passwords: '',
        phone: '',
        email: '',
        gender: null,
        avatar: ''
    });

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file); // Lưu file ảnh vào imageFile để upload khi nhấn Lưu
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result); // Chỉ hiển thị ảnh trên giao diện
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
            if (imageFile) {
                // Bắt đầu tải ảnh lên Firebase
                const img = await uploadImageToFirebase(imageFile);
                if (!img) {
                    setAlert({ type: "error", title: "Không thể tải ảnh lên. Vui lòng thử lại." });
                    return;
                }
    
                // Gửi dữ liệu nhân viên sau khi có URL ảnh
                const response = await addEmployee({
                    ...employeeData,
                    avatar: img,
                });
    
                if (response && response.errors) {
                    // Xử lý danh sách lỗi từ API
                    const errorMessages = response.errors.map((err) => `${err.field}: ${err.message}`).join('\n');
                    setAlert({ type: "error", title: errorMessages});
                } else if (response && response.username) {
                    // Thành công
                    setAlert({ type: "success", title: `Thêm nhân viên ${response.fullname} thành công!` });
                    handleClose();
                    refreshData();
                } else {
                    // Lỗi không xác định
                    setAlert({ type: "error", title: "Có lỗi xảy ra khi thêm nhân viên." });
                }
            } else {
                setAlert({ type: "error", title: "Vui lòng chọn ảnh trước khi lưu." });
            }
        } catch (error) {
            console.error("Error:", error);
    
            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = error.response.data.errors
                    .map((err) => `${err.field}: ${err.message}`)
                    .join('\n');
                setAlert({ type: "error", title: errorMessages });
            } else {
                setAlert({ type: "error", title: "Lỗi khi thêm nhân viên." });
            }
        } finally {
            setTimeout(() => setAlert(null), 500); // Ẩn thông báo sau 5 giây
        }
    };
    
    

    return (
        <Modal show={show} onHide={handleClose} centered>
            {alert && <Alert type={alert.type} title={alert.title} />}
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
                                <Form.Control type="text" name="username" onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col md={6}>
                                <Form.Label>Tên nhân viên</Form.Label>
                                <Form.Control type="text" name="fullname" onChange={handleChange} />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="passwords" onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col md={6}>
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="text" name="phone" onChange={handleChange} />
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
                                        value={true}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        inline
                                        label="Nữ"
                                        type="radio"
                                        name="gender"
                                        value={false}
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
