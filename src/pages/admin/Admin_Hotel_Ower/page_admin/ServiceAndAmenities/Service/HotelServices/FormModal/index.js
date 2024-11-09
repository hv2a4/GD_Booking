import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Card, Row, Col, Form } from 'react-bootstrap';
import { FaClipboardCheck, FaSave } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { GiCancel } from "react-icons/gi";
import ImageListSlider from '../../../../RoomAndTypeRoom/Rom/ImagesList';
import { useForm } from 'react-hook-form';
import uploadImageToFirebase from '../../../../../../../../config/fireBase';
import { updateServiceHotel } from '../../../../../../../../services/admin/service-management';

const HotelServiceFormModal = ({ item }) => {
    const [show, setShow] = useState(false);
    const { register, handleSubmit } = useForm();
    const [images, setImages] = useState();
    const [serviceHotel, setServiceHotel] = useState(item);

    useEffect(() => {
        if (item) console.log(item.id); // Log only if item is defined
    }, [item]);

    const handleImagesChange = (file) => {
        setImages(file);
        console.log(file);
        
        
    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onSubmit = async () => {
        try {
            const urlImage = await uploadImageToFirebase(images); // Wait for the image URL
            const updatedServiceHotel = {
                ...serviceHotel,
                image: urlImage || ""
            };
            const res = await updateServiceHotel(updatedServiceHotel);
            if(res){
                console.log(res.message);
            }
            console.log(images);
            handleClose();
        } catch (error) {
            console.error("Error updating hotel service:", error);
        }
    };
    

    return (
        <>
            {item ? (
                <small
                    className="btn btn-success me-2"
                    style={{ fontSize: '13px', cursor: 'pointer' }}
                    onClick={handleShow}
                >
                    <FaClipboardCheck />&nbsp;Cập nhật
                </small>
            ) : (
                <small
                    style={{ fontSize: '13px', cursor: 'pointer' }}
                    onClick={handleShow}
                >
                    Thêm
                </small>
            )}

            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-wides"
                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5>{item ? 'Cập nhật' : 'Thêm'} Dịch Vụ Khách Sạn</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={12}>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Form.Group as={Row} controlId="formRoomName" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Mã dịch vụ khách sạn
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Mã dịch vụ khách sạn tự động" disabled
                                                    value={serviceHotel?.id || ''}
                                                    onChange={(e) => setServiceHotel({...item, id: e.target.value})}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="serviceHotelName" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Tên dịch vụ khách sạn
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập tên dịch vụ khách sạn..."
                                                    value={serviceHotel?.serviceHotelName || ''}
                                                    onChange={(e) => setServiceHotel({...item, serviceHotelName: e.target.value })}
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
                                                    {...register('price', { required: true, min: 1 })}
                                                    min="1" step="1"
                                                    placeholder="Nhập giá dịch vụ khách sạn..."
                                                    value={serviceHotel?.price || ''}
                                                    onChange={(e) => setServiceHotel({...item, price: e.target.value })}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Row className='mt-3'>
                                            <ImageListSlider onImagesChange={handleImagesChange} maxImages={1} img={serviceHotel?.image}/>
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
                                    if (btnSubmit) btnSubmit.click();
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

const DeleteHotelServiceModal = ({ id, serviceHotelName }) => {
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
