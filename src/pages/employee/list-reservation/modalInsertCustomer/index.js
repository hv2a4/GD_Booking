import React, { useState } from 'react';
import { Button, Card, Col, Modal, Row, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const InsertCustomer = ({ onClose }) => {
    const { register, handleSubmit, setValue } = useForm();
    const [images1, setImages1] = useState(null);
    const [images2, setImages2] = useState(null);

    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) setImage(URL.createObjectURL(file));
    };

    const handleDelete = (setImage) => {
        setImage(null);
    };

    const onSubmit = (data) => {
        const dataBig = {
            ...data, img1: images1, img2: images2
        }
        console.log(dataBig);
        onClose();
    };

    return (
        <Modal show={true} className="modal-dialog-centered modal-customer modal-noneBg" onHide={onClose} keyboard={false} centered>
            <div className="modal-content modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Thêm thông tin khách lưu trú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Label htmlFor="phong">Phòng</Form.Label>
                                <Form.Select id="phong" {...register('phong')}>
                                    <option value="">Chọn phòng</option>
                                    <option value="P.308">P.308</option>
                                </Form.Select>
                            </Col>
                            <Col md={6}>
                                <Form.Label htmlFor="ngaysinh">Ngày sinh</Form.Label>
                                <Form.Control type="text" id="ngaysinh" placeholder="DD/MM/YYYY" {...register('ngaysinh')} />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Label htmlFor="hovaten">Họ và tên</Form.Label>
                                <Form.Control type="text" id="hovaten" placeholder="Nhập họ và tên" {...register('hovaten')} />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Giới tính</Form.Label>
                                <div className="d-flex flex-column flex-md-row">
                                    <Form.Check type="radio" label="Nam" id="nam" value="nam" {...register('gioitinh')} />
                                    <Form.Check type="radio" label="Nữ" id="nu" value="nu" {...register('gioitinh')} />
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Label htmlFor="sodienthoai">Số điện thoại</Form.Label>
                                <Form.Control type="text" id="sodienthoai" placeholder="Nhập số điện thoại" {...register('sodienthoai')} />
                            </Col>
                            <Col md={6}>
                                <Form.Label htmlFor="lydoluutru">Số CCCD</Form.Label>
                                <Form.Control type="text" id="lydoluutru" placeholder="Nhập số giấy tờ" {...register('lydoluutru')} />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <div className="image-gallery mt-3">
                                <Form.Label htmlFor="firstCard">Mặt trước CCCD</Form.Label>
                                    <Card className="image-card">
                                        {images1 ? (
                                            <>
                                                <Card.Img variant="top" src={images1} />
                                                <div className="button-container mt-2">
                                                    <Button variant="warning" size="sm">Sửa</Button>
                                                    <Button variant="danger" size="sm" onClick={() => handleDelete(setImages1)}>Xóa</Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <label htmlFor="image-upload1" className="add-image-placeholder">
                                                    <span>+</span>
                                                    <p>Thêm ảnh</p>
                                                </label>
                                                <input
                                                    id="image-upload1"
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    onChange={(e) => handleImageChange(e, setImages1)}
                                                />
                                            </>
                                        )}
                                    </Card>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="image-gallery mt-3">
                                <Form.Label htmlFor="lastCard">Mặt sau CCCD</Form.Label>
                                    <Card className="image-card">
                                        {images2 ? (
                                            <>
                                                <Card.Img variant="top" src={images2} />
                                                <div className="button-container mt-2">
                                                    <Button variant="warning" size="sm">Sửa</Button>
                                                    <Button variant="danger" size="sm" onClick={() => handleDelete(setImages2)}>Xóa</Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <label htmlFor="image-upload2" className="add-image-placeholder">
                                                    <span>+</span>
                                                    <p>Thêm ảnh</p>
                                                </label>
                                                <input
                                                    id="image-upload2"
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    onChange={(e) => handleImageChange(e, setImages2)}
                                                />
                                            </>
                                        )}
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" className="btn btn-success" onClick={handleSubmit(onSubmit)}>Lưu</Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default InsertCustomer;
