import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import './AddEmployeeModal.css';
import { addEmployee, updateAccountEmployee } from '../../../../../../services/admin/account-manager';
import uploadImageToFirebase from '../../../../../../config/fireBase';
import Alert from '../../../../../../config/alert';

const AddEmployeeModal = ({ show, handleClose, refreshData, selectedEmployee }) => {
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
        avatar: '',
    });

    // Cập nhật dữ liệu khi chuyển giữa thêm mới và chỉnh sửa
    useEffect(() => {
        console.log(selectedEmployee);
        
        if (selectedEmployee) {
            setEmployeeData({ ...selectedEmployee });
            setSelectedImage(selectedEmployee.avatar || null);
        } else {
            resetForm();
        }
    }, [selectedEmployee]);

    const resetForm = () => {
        if (selectedEmployee) {
            setEmployeeData({
                username: selectedEmployee.username || '',
                fullname: selectedEmployee.fullname || '',
                phone: selectedEmployee.phone || '',
                passwords: '',
                email: selectedEmployee.email || '',
                gender: selectedEmployee.gender ? true : false || null,
                avatar: selectedEmployee.avatar || '',
            });
        } else {
            setEmployeeData({
                username: '',
                fullname: '',
                 passwords: '',
                phone: '',
                email: '',
                gender: null,
                avatar: '',
            });
        }
        setSelectedImage(null);
        setImageFile(null);
    };
    

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
            let avatarUrl = employeeData.avatar;

            // Upload ảnh mới nếu có file ảnh
            if (imageFile) {
                avatarUrl = await uploadImageToFirebase(imageFile);
                if (!avatarUrl) {
                    setAlert({ type: 'error', title: 'Không thể tải ảnh lên. Vui lòng thử lại.' });
                    return;
                }
            }

            // Tạo payload chung
            const payload = {
                ...employeeData,
                avatar: avatarUrl,
            };
            console.log(payload);
            
            // Thêm mới hoặc cập nhật dựa vào chế độ hiện tại
            let response;
            if (selectedEmployee) {
                response = await updateAccountEmployee(payload);
            } else {
                response = await addEmployee(payload);
            }

            // Xử lý kết quả từ API
            if (response && response.errors) {
                const errorMessages = response.errors.map((err) => `${err.field}: ${err.message}`).join('\n');
                setAlert({ type: 'error', title: errorMessages });
            } else if (response) {
                const action = selectedEmployee ? 'cập nhật' : 'thêm';
                setAlert({ type: 'success', title: `${action} nhân viên thành công!` });
                handleClose();
                refreshData();
            } else {
                setAlert({ type: 'error', title: 'Có lỗi xảy ra. Vui lòng thử lại.' });
            }
        } catch (error) {
            console.error('Error:', error);
            setAlert({ type: 'error', title: 'Lỗi khi lưu dữ liệu nhân viên.' });
        } finally {
            setTimeout(() => setAlert(null), 500);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            {alert && <Alert type={alert.type} title={alert.title} />}
            <Modal.Header closeButton>
                <Modal.Title>{selectedEmployee ? 'Cập nhật nhân viên' : 'Thêm mới nhân viên'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="employee-form">
                    <Col md={4} className="employee-image mt-4">
                        <div className="image-upload" onClick={triggerFileInput}>
                            {selectedImage ? (
                                <img src={selectedEmployee ? employeeData.avatar : selectedImage} alt="Selected" className="selected-image" />
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
                                <Form.Control
                                    type="text"
                                    value={selectedEmployee ? selectedEmployee.id : 'Mã tự động'}
                                    disabled
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Tài khoản</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={employeeData.username}
                                    onChange={handleChange}
                                    disabled={!!selectedEmployee}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col md={6}>
                                <Form.Label>Tên nhân viên</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullname"
                                    value={employeeData.fullname}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="passwords"
                                    value={employeeData.passwords}
                                    onChange={handleChange}
                                    disabled={!!selectedEmployee} // Vô hiệu hóa nếu cập nhật
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col md={6}>
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={employeeData.phone}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={employeeData.email}
                                    onChange={handleChange}
                                />
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
                                        checked={employeeData.gender === true}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        inline
                                        label="Nữ"
                                        type="radio"
                                        name="gender"
                                        value={false}
                                        checked={employeeData.gender === false}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleSubmit}>
                    {selectedEmployee ? 'Cập nhật' : 'Lưu'}
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Bỏ qua
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEmployeeModal;
