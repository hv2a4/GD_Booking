import React, { useState, useRef } from 'react';
import { Modal, Button, Card, Row, Col, Form } from 'react-bootstrap';
import { FaClipboardCheck, FaSave } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { GiCancel } from "react-icons/gi";
import ImageListSlider from '../../../../RoomAndTypeRoom/Rom/ImagesList';
import { useForm } from 'react-hook-form';

const RoomServiceFormModal = ({ idRommService }) => {
    const [show, setShow] = useState(false);
    const { register, handleSubmit } = useForm(); // Khởi tạo useForm

    const [images, setImages] = useState([]);

    const handleImagesChange = (newImages) => {
        setImages(newImages);
    };

    const handleShow = () => {
        if(!show){
            setShow(true);
        }
    }
    const handleClose = () => setShow(false);

    const onSubmit = (data) => {
        console.log("Submitting data:", data); // Xác minh dữ liệu được gửi
        handleClose();
    };

    // const onSubmit = (data) => {
    //     console.log(data); // Xử lý dữ liệu submit tại đây
    //     handleClose(); // Đóng modal sau khi lưu
    // };

    return (
        <>
            {(() => {
                if (!idRommService) {
                    return (
                        <small style={{ fontSize: '13px', cursor: 'pointer' }} id="room-service-form" onClick={handleShow}>
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
                        <h5>{!idRommService ? 'Thêm' : 'Cập nhật'} Dịch Vụ Phòng</h5>
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
                                                Mã dịch vụ phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Mã dịch vụ phòng tự động" disabled
                                                    name='id'
                                                    value={idRommService}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="serviceRoomName" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Tên dịch vụ phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    {...register('serviceRoomName', { required: true })} // Đăng ký trường với react-hook-form
                                                    placeholder="Nhập tên dịch vụ phòng..."
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="id_typeServiceRoom" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Loại dịch vụ phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Select
                                                    {...register('typeServiceRoom', { required: true })} // Đăng ký trường với react-hook-form
                                                    id="id_typeServiceRoom"
                                                    aria-label="Chọn loại dịch vụ phòng"
                                                >
                                                    <option value="">Chọn loại dịch vụ phòng...</option>
                                                    <option value="standard">Standard</option>
                                                    <option value="deluxe">Deluxe</option>
                                                    <option value="suite">Suite</option>
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>


                                        <Form.Group as={Row} controlId="price" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Giá
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="number"
                                                    {...register('price', { required: true, min: 1 })} // Đăng ký trường với react-hook-form
                                                    min="1" step="1"
                                                    placeholder="Nhập giá dịch vụ phòng..."
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="description" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Mô tả
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    as="textarea" // Đặt loại là textarea
                                                    rows={3} // Đặt số hàng cho textarea
                                                    {...register('description', { required: true })} // Đăng ký trường với react-hook-form
                                                    placeholder="Nhập mô tả..."
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Row className='mt-3'>
                                            <ImageListSlider onImagesChange={handleImagesChange} maxImages={1} />
                                        </Row>
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
                                    if (btnSubmit) {
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

const DeleteRoomServiceModal = ({ id, serviceRoomName }) => {
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
                    <Modal.Title>Xóa dịch vụ phòng </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa dịch vụ phòng <strong>{serviceRoomName}</strong> này?
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

export { RoomServiceFormModal, DeleteRoomServiceModal };
