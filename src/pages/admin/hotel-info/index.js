import React, { useState } from "react";
import LayoutAdmin from "../../../components/layout/admin/DefaultLayout";
import { Button, Card, Col, Container, Form, Row, Carousel } from "react-bootstrap";
import ModalImage from "./modal-image";

const HotelInfo = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <LayoutAdmin>
            <Container>
                <Card style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
                    <h4 style={{ fontWeight: "bold" }}>Thông tin khách sạn</h4>
                    <Row className="mt-4">
                        <Col md={3} className="text-center">
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Logo"
                                style={{ width: "100px", height: "100px", objectFit: "contain", marginBottom: "10px" }}
                            />
                            <div style={{ color: "#007bff", cursor: "pointer" }} onClick={handleShow}>Chọn ảnh</div>
                            <p style={{ fontSize: "12px", color: "gray" }}>Lưu ý: Ảnh không vượt quá 10 tấm và lấy ảnh đầu làm ảnh đại diện</p>
                        </Col>
                        <Col md={9}>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Group controlId="storeName">
                                        <Form.Label>Tên khách sạn</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Group controlId="address">
                                        <Form.Label>Địa chỉ</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Group controlId="area">
                                        <Form.Label>Khu vực</Form.Label>
                                        <Form.Control type="text" placeholder="Chọn Tỉnh/TP - Quận/Huyện" />
                                    </Form.Group>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Group controlId="ward">
                                        <Form.Label>Phường xã</Form.Label>
                                        <Form.Control type="text" placeholder="Chọn Phường/Xã" />
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
                </Card>
            </Container>
            <ModalImage show={show} handleClose={handleClose} />
        </LayoutAdmin>
    );
};

export default HotelInfo;
