import React, { useState, useRef } from 'react';
import { Modal, Button, Card, Row, Col, Form } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { GiCancel } from "react-icons/gi";

const HotelServiceFormModal = () => {
    const [show, setShow] = useState(false);
    const [hotelServiceData, setHotelServiceData] = useState({
        id: '',
        serviceHotelName: '',
        price: '',
        icon: '',
        image: '',
        id_hotel: 1
    });
    const fileInputRef = useRef(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [images, setImages] = useState(Array(1).fill(null));

    const handleShow = () => setShow(true);
    const handleClose = () => {
        if (hotelServiceData) {
            setHotelServiceData({
                id: '',
                serviceHotelName: '',
                price: '',
                icon: '',
                image: '',
                id_hotel: 1
            });
            setImages(Array(1).fill(null));
        }
        setShow(false);
    };

    // Xử lý chọn và thêm ảnh
    const handleAddImageClick = (index) => {
        setSelectedImageIndex(index);
        fileInputRef.current.click();
    };

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[selectedImageIndex] = URL.createObjectURL(file);
            setImages(newImages);

            // Cập nhật hình ảnh trong hotelServiceData
            setHotelServiceData({
                ...hotelServiceData,
                image: newImages
            });
        }
    };

    // Kiểm tra dữ liệu đầu vào
    const validateForm = () => {
        if (!hotelServiceData.serviceHotelName) {
            alert("Tên dịch vụ không được để trống.");
            return false;
        }
        if (!/^\d+(\.\d{1,2})?$/.test(hotelServiceData.price)) {
            alert("Giá phải là một số hợp lệ.");
            return false;
        }
        return true;
    };

    // Lưu dữ liệu dịch vụ khách sạn
    const handleSave = () => {
        if (validateForm()) {
            console.log("Hotel service data saved:", hotelServiceData);
            handleClose();
        }
    };

    return (
        <>
            <small style={{ fontSize: '13px', cursor: 'pointer' }} id="hotel-service-form" onClick={handleShow}>
                Thêm
            </small>
            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-wides"
                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5>Thêm Dịch Vụ Khách Sạn</h5>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={12}>
                                    <Form>
                                        <Form.Group as={Row} controlId="serviceHotelName" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Tên dịch vụ khách sạn
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập tên dịch vụ khách sạn..."
                                                    value={hotelServiceData.serviceHotelName}
                                                    onChange={(e) =>
                                                        setHotelServiceData({
                                                            ...hotelServiceData,
                                                            serviceHotelName: e.target.value
                                                        })
                                                    }
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="price" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Giá
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="number"
                                                    min="1" max="100" step="1"
                                                    placeholder="Nhập giá dịch vụ khách sạn..."
                                                    value={hotelServiceData.price}
                                                    onChange={(e) =>
                                                        setHotelServiceData({
                                                            ...hotelServiceData,
                                                            price: e.target.value
                                                        })
                                                    }
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="price" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Icon
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập icon..."
                                                    value={hotelServiceData.icon}
                                                    onChange={(e) =>
                                                        setHotelServiceData({
                                                            ...hotelServiceData,
                                                            icon: e.target.value
                                                        })
                                                    }
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <div className="slider mt-5">
                                    <div className="image-container">
                                        <Form.Label column sm={4}>

                                        </Form.Label>
                                        <Col sm={8}>
                                            {images.map((img, index) => (
                                                <div
                                                    key={index}
                                                    className="image-box"
                                                    onClick={() => handleAddImageClick(index)}
                                                >
                                                    {img ? <img src={img} alt={`Slide ${index + 1}`} /> : <span className="add-text">+ Thêm</span>}
                                                </div>
                                            ))}
                                        </Col>
                                    </div>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                />
                            </Row>
                        </Card.Body>
                    </Card>
                </Modal.Body>

                <Modal.Footer>
                    <Row className="mt-3 justify-content-end">
                        <Col sm="auto">
                            <Button variant="success" onClick={handleSave}>
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

const  DeleteHotelServiceModal=  ({id, serviceHotelName }) => {
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
                    <Modal.Title>Xóa dịch vụ khách sạn </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa dịch vụ khách sạn <strong>{serviceHotelName}</strong> này?
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

export { HotelServiceFormModal, DeleteHotelServiceModal };
