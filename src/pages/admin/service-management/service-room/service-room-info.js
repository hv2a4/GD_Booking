import React, { useState } from "react";
import { Button, Card, Col, Row, Form, Alert } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";
import AddTypeServiceRoomModal from "./modal-typeServiceRoom";

const ServiceRoomInfo = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Kiểm tra kích thước ảnh (3MB = 3 * 1024 * 1024 bytes)
            if (file.size > 3 * 1024 * 1024) {
                setErrorMessage("Kích thước ảnh không được vượt quá 3MB.");
                setSelectedImage(null); // Đặt lại ảnh đã chọn
            } else {
                setErrorMessage(""); // Reset error message nếu ảnh hợp lệ
                const reader = new FileReader();
                reader.onload = (e) => {
                    setSelectedImage(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <Card style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
            <h4 style={{ fontWeight: "bold" }}>Dịch vụ</h4>
            <Row className="mt-4">
                <Col md={3} className="text-center employee-image">
                    <div className="image-upload">
                        {selectedImage ? (
                            <img src={selectedImage} alt="Selected" className="selected-image" />
                        ) : (
                            <span className="camera-icon">📷</span>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }} // Ẩn input file
                        id="imageUpload"
                    />
                    <label htmlFor="imageUpload" style={{ color: "#007bff", cursor: "pointer", display: "block", marginTop: "10px" }}>
                        Chọn ảnh
                    </label>
                    <p style={{ fontSize: "12px", color: "gray" }}>Lưu ý: Ảnh không vượt quá 3MB</p>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Hiển thị thông báo lỗi */}
                </Col>
                <Col md={9}>
                    <Row>
                        <Col md={6}>
                            <Form.Label>Mã dịch vụ</Form.Label>
                            <Form.Control type="text" value="Mã dịch vụ tự động" disabled />
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="storeName">
                                <Form.Label>Tên dịch vụ</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="address">
                                <Form.Label>Giá</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="area">
                                <Form.Label>Loại dịch vụ</Form.Label>
                                <Row>
                                    <Col md={9}>
                                        <Form.Select className="form-select">
                                            <option value="">Chọn loại dịch vụ</option>
                                            <option value="1">Đồ uống</option>
                                            <option value="2">Đồ ăn</option>
                                            <option value="3">Sức khỏe</option>
                                        </Form.Select>
                                    </Col>
                                    <Col md={3}>
                                        <Button variant="success" type="button" className="w-50" onClick={handleShow}>
                                            <CIcon icon={cilPlus} />
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col md={12} className="mb-3">
                            <Form.Group controlId="ward">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control as="textarea" placeholder="Mô tả dịch vụ phòng" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="text-right mt-3">
                        <Button variant="success">
                            <i className="fa fa-save"></i> Lưu
                        </Button>
                    </div>
                </Col>
            </Row>
            <AddTypeServiceRoomModal show={showModal} handleClose={handleClose} />
        </Card>
    );
};

export default ServiceRoomInfo;
