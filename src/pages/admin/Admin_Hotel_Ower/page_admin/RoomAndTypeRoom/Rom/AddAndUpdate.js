import React, { useState, useRef } from 'react';
import { Card, Col, Form, Row, Button, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { RiAddCircleLine } from "react-icons/ri";
import './modelCus.css';
import { FaSave, FaClipboardCheck } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ImageListSlider from './ImagesList';

function Add_Floor() {
    const [show, setShow] = useState(false);

    return (
        <>
            <small
                style={{ fontSize: '13px' }}
                onClick={(e) => {
                    e.stopPropagation(); 
                    setShow(true);
                }}
                id="add-area"
            >
                <RiAddCircleLine size={20} />
            </small>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <h5>Thêm khu vực</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card style={{ border: 'none', background: '#fff', boxShadow: 'none' }}>
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row} controlId="formRoomName" className="mt-1">
                                    <Form.Label column sm={4}>
                                        Khu vực
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control
                                            type="text"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formRoomName" className="mt-1">
                                    <Form.Label column sm={4}>
                                        Ghi chú
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control
                                            type="text"
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                            <Row className="mt-5 justify-content-end">
                                <Col sm="auto">
                                    <Button
                                        variant="success"
                                        style={{
                                            fontSize: '1rem',           // Larger font size
                                            fontWeight: 'bold'          // Make the text bold
                                        }}
                                        onClick={() => setShow(true)}                                    >
                                        <FaSave size={14} />&nbsp;
                                        Đồng ý
                                    </Button>
                                </Col>
                                <Col sm="auto">
                                    <Button
                                        variant="dark"
                                        style={{
                                            background: '#898C8D',      // Custom background color
                                            fontSize: '1rem',           // Larger font size
                                            fontWeight: 'bold',
                                            border: 'none'         // Make the text bold
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShow(false)
                                        }}
                                    >
                                        <ImCancelCircle size={14} />&nbsp;
                                        Bỏ qua
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    );
}

const Add_TypeRoom = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
        <>
            <small
                style={{ fontSize: '13px' }}
                onClick={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện truyền lên Accordion header
                    setShow(true);
                }}
                id='add-type-room'
            >
            </small>
            <Modal
                show={show}
                onHide={handleClose}
                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
                dialogClassName='modal-wides'
            >
                <Modal.Header closeButton>
                    <h5>Thêm loại phòng mới</h5>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="info"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="info" title="Thông tin">
                            <Card style={{ border: 'none', boxShadow: 'none' }}>
                                <Card.Body>
                                    <Row>
                                        <Col md={12} style={{ marginBottom: '1rem' }}>
                                            <Form className="custom-form">
                                                <Form.Group as={Row} controlId="formRoomCode" className='mt-3'>
                                                    <Form.Label column sm={3}>Mã hạng phòng</Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="text" placeholder="Nhập mã hạng phòng" />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formRoomName" className='mt-3'>
                                                    <Form.Label column sm={3}>Tên hạng phòng</Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="text" placeholder="Nhập tên hạng phòng" />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPriceHour" className='mt-3'>
                                                    <Form.Label column sm={3}>Giá giờ</Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="number" placeholder="Nhập giá giờ" />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPriceDay" className='mt-3'>
                                                    <Form.Label column sm={3}>Giá cả ngày</Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="number" placeholder="Nhập giá cả ngày" />
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </Col>

                                        <Col md={12} style={{ marginBottom: '1rem' }}>
                                            <Card>
                                                <Card.Header style={{ fontSize: '0.9rem', background: '#ECECEE' }}>
                                                    <h6>Phụ thu quá giờ (Khi quá thời gian quy định)</h6>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Text style={{ fontSize: '0.85rem' }}>
                                                        <Row>
                                                            <Col md={5}>
                                                                <Form.Group as={Row} controlId="formRoomCode" className='mt-3'>
                                                                    <Form.Label column sm={4}><strong style={{ fontSize: '0.85rem' }}>Hình thức</strong></Form.Label>
                                                                    <Col sm={8}>
                                                                        <Form.Control as="select" defaultValue="" style={{ fontSize: '0.85rem' }}>
                                                                            <option value="room1">Tính tiền theo mỗi giờ</option>
                                                                            <option value="room2">Tính theo % tiền phòng</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                </Form.Group>
                                                                <Form.Group as={Row} controlId="formRoomFee" className='mt-5'>
                                                                    <Col sm={1}>
                                                                        <Form.Check
                                                                            type="checkbox"
                                                                            label="" // No need for a label inside the checkbox; it's in the Form.Label
                                                                            name="roomFeeDefault" // Name for the checkbox
                                                                            id="roomFeeDefault"
                                                                            style={{ fontSize: '0.85rem' }}
                                                                        />
                                                                    </Col>
                                                                    <Form.Label column sm={11} style={{ fontSize: '0.85rem' }}>
                                                                        <p style={{ fontSize: '0.85rem' }}>Mặc định tính phụ thu cho hạng phòng</p>
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Row} controlId="formRoomFee" className='mt-3'>
                                                                    <Col sm={1}>
                                                                        <Form.Check
                                                                            type="checkbox"
                                                                            label="" // No need for a label inside the checkbox; it's in the Form.Label
                                                                            name="roomFeeDefault" // Name for the checkbox
                                                                            id="roomFeeDefault"
                                                                            style={{ fontSize: '0.85rem' }}
                                                                        />
                                                                    </Col>
                                                                    <Form.Label column sm={11} style={{ fontSize: '0.85rem' }}>
                                                                        <p style={{ fontSize: '0.85rem' }}>Áp dụng cho tất cả hạng phòng</p>
                                                                    </Form.Label>
                                                                </Form.Group>

                                                            </Col>
                                                            <Col md={7}>
                                                                <Row>
                                                                    <Col md={6}>
                                                                        <Form.Group as={Row} controlId="formEarlyCheckin" className='mt-3'>
                                                                            <Form.Label column sm={6} style={{ fontSize: '0.85rem' }}><strong style={{ fontSize: '0.85rem' }}>Nhận sớm từ</strong></Form.Label>
                                                                            <Col sm={6}>
                                                                                <Form.Control type="number" placeholder="1" style={{ fontSize: '0.85rem' }} />
                                                                            </Col>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <Form.Group as={Row} controlId="formLateFee" className='mt-3'>
                                                                            <Form.Label column sm={6} style={{ fontSize: '0.85rem' }}><strong style={{ fontSize: '0.85rem' }}>Giờ, phụ thu</strong></Form.Label>
                                                                            <Col sm={6} style={{ position: 'relative' }}>
                                                                                <Form.Control
                                                                                    type="number"
                                                                                    placeholder="0"
                                                                                    style={{ fontSize: '0.85rem', paddingRight: '2rem' }} // Add padding for the "%" symbol
                                                                                />
                                                                                <span style={{
                                                                                    position: 'absolute',
                                                                                    right: '10px',
                                                                                    top: '50%',
                                                                                    transform: 'translateY(-50%)',
                                                                                    fontSize: '0.85rem'
                                                                                }}>
                                                                                    %
                                                                                </span>
                                                                            </Col>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md={6}>
                                                                        <Form.Group as={Row} controlId="formEarlyCheckin" className='mt-3'>
                                                                            <Form.Label column sm={6} style={{ fontSize: '0.85rem' }}><strong style={{ fontSize: '0.85rem' }}>Trả muộn từ</strong></Form.Label>
                                                                            <Col sm={6}>
                                                                                <Form.Control type="number" placeholder="1" style={{ fontSize: '0.85rem' }} />
                                                                            </Col>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <Form.Group as={Row} controlId="formLateFee" className='mt-3'>
                                                                            <Form.Label column sm={6} style={{ fontSize: '0.85rem' }}><strong style={{ fontSize: '0.85rem' }}>Giờ, phụ thu</strong></Form.Label>
                                                                            <Col sm={6} style={{ position: 'relative' }}>
                                                                                <Form.Control
                                                                                    type="number"
                                                                                    placeholder="0"
                                                                                    style={{ fontSize: '0.85rem', paddingRight: '2rem' }} // Add padding for the "%" symbol
                                                                                />
                                                                                <span style={{
                                                                                    position: 'absolute',
                                                                                    right: '10px',
                                                                                    top: '50%',
                                                                                    transform: 'translateY(-50%)',
                                                                                    fontSize: '0.85rem'
                                                                                }}>
                                                                                    %
                                                                                </span>
                                                                            </Col>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={12}>
                                            <Card>
                                                <Card.Header style={{ fontSize: '0.9rem', background: '#ECECEE' }}>
                                                    <h6>Sức chứa</h6>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        <Col md={8}>
                                                            <Row>
                                                                {/* Tiêu chuẩn */}
                                                                <Col md={12}>
                                                                    <Form.Group as={Row} controlId="formStandardCapacity" className="mt-3">
                                                                        <Form.Label column sm={4} style={{ fontSize: '0.85rem' }}>
                                                                            <strong>Tiêu chuẩn</strong>
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Row>
                                                                                <Col sm="auto">
                                                                                    <Form.Control type="number" placeholder="1" style={{ width: '60px', fontSize: '0.85rem', display: 'inline-block' }} />
                                                                                </Col>
                                                                                <Col sm="auto" style={{ padding: 0, marginRight: '8px' }}>
                                                                                    người lớn và
                                                                                </Col>
                                                                                <Col sm="auto">
                                                                                    <Form.Control type="number" placeholder="1" style={{ width: '60px', fontSize: '0.85rem', display: 'inline-block' }} />
                                                                                </Col>
                                                                                <Col sm="auto" style={{ padding: 0 }}>
                                                                                    trẻ em
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Form.Group>
                                                                </Col>

                                                                {/* Tối đa */}
                                                                <Col md={12}>
                                                                    <Form.Group as={Row} controlId="formMaxCapacity" className="mt-3">
                                                                        <Form.Label column sm={4} style={{ fontSize: '0.85rem' }}>
                                                                            <strong>Tối đa</strong>
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Row>
                                                                                <Col sm="auto">
                                                                                    <Form.Control type="number" placeholder="1" style={{ width: '60px', fontSize: '0.85rem', display: 'inline-block' }} />
                                                                                </Col>
                                                                                <Col sm="auto" style={{ padding: 0, marginRight: '8px' }}>
                                                                                    người lớn và
                                                                                </Col>
                                                                                <Col sm="auto">
                                                                                    <Form.Control type="number" placeholder="1" style={{ width: '60px', fontSize: '0.85rem', display: 'inline-block' }} />
                                                                                </Col>
                                                                                <Col sm="auto" style={{ padding: 0 }}>
                                                                                    trẻ em
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md={4}></Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                    </Row>

                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="profile" title="Hình ảnh, mô tả">
                            <ImageListSlider />
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Row className="mt-3 justify-content-end">
                        <Col sm="auto">
                            <Button
                                variant="success"
                                style={{
                                    padding: '0.75rem 1.5rem',  // Increase padding for larger size
                                    fontSize: '1rem',           // Larger font size
                                    fontWeight: 'bold'          // Make the text bold
                                }}
                                onClick={handleClose}
                            >
                                <FaSave size={14} />&nbsp;
                                Lưu
                            </Button>
                        </Col>
                        <Col sm="auto">
                            <Button
                                variant="dark"
                                style={{
                                    background: '#898C8D',      // Custom background color
                                    padding: '0.75rem 1.5rem',  // Increase padding for larger size
                                    fontSize: '1rem',           // Larger font size
                                    fontWeight: 'bold',
                                    border: 'none'         // Make the text bold
                                }}
                                onClick={handleClose}
                            >
                                <ImCancelCircle size={14} />&nbsp;
                                Bỏ qua
                            </Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal >
        </>
    );
}


export { Add_Floor, Add_TypeRoom };