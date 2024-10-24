import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FaClipboardCheck } from "react-icons/fa";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import { Button, Col, Row } from 'react-bootstrap';
import { Form, Table } from 'react-bootstrap';
import { FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import ImageGalleryWithEditor from './ImageGalleryWithEditor ';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { BsBuildingFillAdd } from "react-icons/bs";

function UpdateTypeRoom() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [rooms, setRooms] = useState([
        { id: 1, name: 'P.301', floor: 'Tầng 2', status: 'Đang hoạt động' },
        { id: 2, name: 'P.302', floor: 'Tầng 2', status: 'Đang hoạt động' },
        { id: 3, name: 'P.303', floor: 'Tầng 2', status: 'Đang hoạt động' },
        { id: 4, name: 'abc', floor: 'Tầng 4', status: 'Đang hoạt động' },
    ]);
    const [showModal, setShowModal] = useState(false); // Trạng thái mở/đóng của Modal
    const [roomStatus, setRoomStatus] = useState(''); // Trạng thái chọn hạng phòng
    const [selectedRoom, setSelectedRoom] = useState({ name: 'P.301' }); // Mặc định tên phòng là P.301

    const handleConfirm = () => {
        // Xử lý logic khi xác nhận thay đổi trạng thái phòng
        if (roomStatus) {
            console.log(`Chuyển ${selectedRoom?.name} sang hạng ${roomStatus}`);
        } else {
            console.log(`Chuyển ${selectedRoom?.name} sang hạng chưa xác định`);
        }
        setShowModal(false); // Đóng modal sau khi xử lý
    };

    const handleDelete = (room) => {
        setSelectedRoom(room);
        setShowModal(true);
    };
    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                Loại phòng được sử dụng cho các phòng khác nhau
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <button className="btn btn-success me-2" onClick={() => setShow(true)}>
                <FaClipboardCheck />&nbsp;Cập nhật
            </button>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-wide"
                aria-labelledby="example-custom-modal-styling-title"
                className='overflowY'
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <h5> Sửa loại phòng</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="infomation" // Đặt mặc định là tab "Thông tin"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="infomation" title="Thông tin">
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

                        <Tab eventKey="ImageNote" title="Hình ảnh, mô tả">
                            <ImageGalleryWithEditor />
                        </Tab>

                        <Tab eventKey="ListRoom" title="Danh sách phòng">
                            <Card>
                                <Card.Body>
                                    <Form className="custom-form">
                                        <Form.Group as={Row} controlId="formRoomCode" className=''>
                                            <Form.Label column sm={3}>
                                                Chọn phòng
                                                <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                                    <i className="bi bi-info-circle" style={{ fontSize: '1rem', marginLeft: '8px', cursor: 'pointer' }}></i>
                                                </OverlayTrigger>
                                            </Form.Label>
                                            <Col sm={9}>
                                                <Form.Control type="text" placeholder="Nhập mã loại phòng và tên loại phòng" />
                                            </Col>
                                        </Form.Group>
                                    </Form>

                                    {/* Danh sách phòng */}
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên phòng</th>
                                                <th>Khu vực</th>
                                                <th>Trạng thái</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rooms.map((room, index) => (
                                                <tr key={room.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{room.name}</td>
                                                    <td>{room.floor}</td>
                                                    <td>{room.status}</td>
                                                    <td>
                                                        <button className='btn btn-danger justify-content-center' onClick={() => handleDelete(room)}>
                                                            <BsBuildingFillAdd />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>

                            {/* Modal */}
                            <Modal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                                dialogClassName="modal-cus"
                                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
                            >
                                <Modal.Header closeButton style={{ background: '#ECECEE' }}>
                                    <Modal.Title style={{ fontSize: '18px' }}>Thay đổi trạng thái phòng</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group as={Row} style={{ fontSize: '14px', alignItems: 'center' }}>
                                            <Col sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                                                <Form.Check
                                                    type="radio"
                                                    label={`Chuyển ${selectedRoom?.name} sang `}
                                                    name="statusOptions"
                                                    checked={roomStatus !== undefined}
                                                    onChange={() => setRoomStatus('choose')}
                                                    style={{ marginBottom: 0 }}
                                                />
                                            </Col>
                                            <Col sm={8}>
                                                <Form.Control
                                                    as="select"
                                                    onChange={(e) => setRoomStatus(e.target.value)}
                                                    disabled={roomStatus === undefined}
                                                    style={{ fontSize: '14px' }}
                                                >
                                                    <option value="">--Lựa chọn--</option>
                                                    <option value="Hạng A">Hạng A</option>
                                                    <option value="Hạng B">Hạng B</option>
                                                    <option value="Hạng C">Hạng C</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group style={{ fontSize: '14px' }}>
                                            <Form.Check
                                                type="radio"
                                                label={`Chuyển ${selectedRoom?.name} sang loại "Chưa xác định"`}
                                                name="statusOptions"
                                                checked={roomStatus === undefined}
                                                onChange={() => setRoomStatus(undefined)}
                                                style={{ marginBottom: 0 }}
                                            />
                                        </Form.Group>
                                    </Form>
                                    <p style={{ fontSize: '13px' }}>Lưu ý: Các đặt phòng đã phát sinh sẽ không bị ảnh hưởng bởi thay đổi này.</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Row className="mt-3 justify-content-end">
                                        <Col sm="auto">
                                            <Button
                                                variant="success"
                                                style={{
                                                    fontSize: '1rem',           // Larger font size
                                                    fontWeight: 'bold'          // Make the text bold
                                                }}
                                                onClick={handleConfirm}
                                            >
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
                                                onClick={() => setShowModal(false)}
                                            >
                                                <ImCancelCircle size={14} />&nbsp;
                                                Bỏ qua
                                            </Button>
                                        </Col>
                                    </Row>
                                </Modal.Footer>
                            </Modal>
                        </Tab>


                    </Tabs>
                    <Card.Footer>
                        <Row className="mt-3 justify-content-end">
                            <Col sm="auto">
                                <Button
                                    variant="success"
                                    style={{
                                        padding: '0.75rem 1.5rem',  // Increase padding for larger size
                                        fontSize: '1rem',           // Larger font size
                                        fontWeight: 'bold'          // Make the text bold
                                    }}
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
                    </Card.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
}


export default UpdateTypeRoom;