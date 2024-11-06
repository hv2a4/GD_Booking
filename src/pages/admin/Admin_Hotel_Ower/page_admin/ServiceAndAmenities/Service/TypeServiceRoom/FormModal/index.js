import React, { useState } from 'react';
import { Modal, Button, Card, Row, Col, Form } from 'react-bootstrap';
import { FaClipboardCheck, FaSave } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { GiCancel } from "react-icons/gi";

const RoomServiceRoomFormModal = ({ idTypeServiceRoom }) => {
    const [show, setShow] = useState(false);
    const { register, handleSubmit } = useForm(); // Khởi tạo useForm

    const handleShow = () => {if(!show){setShow(true)}};
    const handleClose = () => setShow(false);

    const onSubmit = (data) => {
        console.log(data); // Xử lý dữ liệu submit tại đây
        handleClose(); // Đóng modal sau khi lưu
    };

    return (
        <>
            {(() => {
                if (!idTypeServiceRoom) {
                    return (
                        <small style={{ fontSize: '13px', cursor: 'pointer' }} id="type-service-room-form" onClick={handleShow}>
                            Thêm
                        </small>
                    );
                } else {
                    return (
                        <small className="btn btn-success me-2" style={{ fontSize: '13px', cursor: 'pointer' }} onClick={handleShow}>
                            <FaClipboardCheck />&nbsp;Cập nhật
                        </small>
                    );
                }
            })()}

            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-wides"
                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5>{!idTypeServiceRoom ? 'Thêm' : 'Cập nhật'} Loại Dịch Vụ phòng</h5>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={12}>
                                    <Form onSubmit={handleSubmit(onSubmit)}> {/* Thêm onSubmit vào form */}
                                        <Form.Group as={Row} controlId="formRoomName" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Mã loạii dịch vụ phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Mã loại dịch vụ phòng tự động" disabled
                                                    name='id'
                                                    value={idTypeServiceRoom}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="typeServiceRoomName" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Tên gói dịch vụ
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    {...register('typeServiceRoomName', { required: true })} // Đăng ký trường với react-hook-form
                                                    placeholder="Nhập tên loại dịch vụ phòng..."
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Button variant="success" type="submit" className="mt-3 d-none" id='btnsubmit'>
                                            <FaSave size={14} />&nbsp;Lưu
                                        </Button>
                                    </Form>
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
                                type='button'
                                onClick={(e) => {
                                    e.preventDefault();
                                    const btnSubmit = document.getElementById('btnsubmit');
                                    if(btnSubmit){
                                        btnSubmit.click();
                                    }
                                }}
                            >
                                <FaSave size={14} />&nbsp;Lưu
                            </Button>
                        </Col>
                        <Col sm="auto">
                            <Button variant="dark" onClick={handleClose}>
                                <ImCancelCircle size={14} />&nbsp;Bỏ qua
                            </Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const DeleteTypeServiceModal = ({ id, typeServiceRoomName }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="btn btn-danger" onClick={handleShow}>
                <GiCancel />&nbsp;Xóa
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ border: 'none' }}>
                    <Modal.Title>Xóa loại dịch vụ phòng </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa loại dịch vụ <strong>{typeServiceRoomName}</strong> này?
                </Modal.Body>
                <Modal.Footer style={{ border: 'none' }}>
                    <Button variant="danger" onClick={handleClose}>
                        Đồng ý
                    </Button>
                    <Button
                        variant="dark" onClick={handleClose}
                        style={{
                            background: '#898C8D',      // Custom background color
                            border: 'none'
                        }}
                    >
                        Bỏ qua
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export { RoomServiceRoomFormModal, DeleteTypeServiceModal } ;