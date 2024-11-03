import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddTypeServiceRoomModal = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm mới Loại dịch vụ phòng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="employee-form">
                    <Col md={12} className="employee-info">
                        <Form.Group as={Row} className="mb-3">
                            <Col md={6}>
                                <Form.Label>Mã nhân viên</Form.Label>
                                <Form.Control type="text" value="Mã nhân viên tự động" disabled />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Tên Loại dịch vụ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="typeServiceName"
                                />
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

export default AddTypeServiceRoomModal;
