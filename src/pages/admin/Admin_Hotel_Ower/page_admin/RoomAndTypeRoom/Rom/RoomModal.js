import React, { useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaClipboardCheck } from "react-icons/fa";
import { RiAddFill } from "react-icons/ri";
import { Add_Area, Add_TypeRoom } from "./AddAndUpdate";
import './modelCus.css';
import { MdAdd } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

const UpdateRoomModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [roomName, setRoomName] = useState('');
    const [area, setArea] = useState('');
    const [roomType, setRoomType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [notes, setNotes] = useState('');
    const [images, setImages] = useState(Array(9).fill(null)); // Using Array(9).fill(null) for better readability
    const fileInputRef = useRef(null); // Tạo reference cho input file
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    // Xử lý click vào ô thêm ảnh
    const handleAddImageClick = (index) => {
        setSelectedImageIndex(index);
        // Kích hoạt sự kiện click vào input file ẩn
        fileInputRef.current.click();
    };

    // Xử lý việc chọn ảnh
    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[selectedImageIndex] = URL.createObjectURL(file);
            setImages(newImages);
        }
    };

    const getPrice = () => {
        if (roomType === 'Phòng VIP') {
            return {
                hourPrice: '300,000',
                dayPrice: '1,000,000',
                nightPrice: '1,000,000',
                overtimeFee: 'Tính tiền mỗi giờ'
            };
        } else {
            return {
                hourPrice: '200,000',
                dayPrice: '800,000',
                nightPrice: '800,000',
                overtimeFee: 'Tính tiền mỗi giờ'
            };
        }
    };

    const prices = getPrice();

    const handleSave = () => {
        const roomData = {
            roomName,
            area,
            roomType,
            startDate,
            notes,
            images
        };
        console.log("Room data saved:", roomData);
        handleClose();
    };

    return (
        <>
            <button className="btn btn-success me-2" onClick={handleShow}>
                <FaClipboardCheck />
                &nbsp; Cập nhật
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-wide"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5>Sửa thông tin phòng</h5>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group as={Row} controlId="formRoomName" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Tên phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập tên phòng"
                                                    value={roomName}
                                                    onChange={(e) => setRoomName(e.target.value)}
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formArea" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Khu vực
                                            </Form.Label>
                                            <Col sm={8}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <Form.Control
                                                        as="select"
                                                        value={area}
                                                        onChange={(e) => setArea(e.target.value)}
                                                        style={{ fontSize: "0.85rem", marginRight: "5px" }} // Thêm khoảng cách bên phải
                                                    >
                                                        <option value="">--Lựa chọn khu vực--</option>
                                                        <option value="Tầng 1">Tầng 1</option>
                                                        <option value="Tầng 2">Tầng 2</option>
                                                        <option value="Tầng 3">Tầng 3</option>
                                                        <option value="Tầng 4">Tầng 4</option>
                                                        <option value="Tầng 5">Tầng 5</option>
                                                    </Form.Control>
                                                    {/* Biểu tượng nằm sau ô chọn */}
                                                    <Add_Area />
                                                </div>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formRoomType" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Loại phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <Form.Control
                                                        as="select"
                                                        value={roomType}
                                                        onChange={(e) => setRoomType(e.target.value)}
                                                        style={{ fontSize: "0.85rem", marginRight: "5px" }} // Thêm khoảng cách bên phải
                                                    >
                                                        <option value="">--Lựa chọn loại phòng--</option>
                                                        <option value="Phòng thường">Phòng thường</option>
                                                        <option value="Phòng VIP">Phòng VIP</option>
                                                    </Form.Control>
                                                    {/* Biểu tượng nằm sau ô chọn */}
                                                    < Add_TypeRoom NameButton={<RiAddFill />} />
                                                </div>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formStartDate" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Bắt đầu sử dụng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="date"
                                                    value={startDate}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formNotes" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Ghi chú
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Nhập ghi chú"
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col md={6}>
                                    <Card style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "8px" }}>
                                        <Card.Body>
                                            <Row>
                                                <Col md={12}>
                                                    <Card.Text>
                                                        <strong>Phòng sẽ được áp dụng theo giá của hạng phòng:</strong>
                                                    </Card.Text>
                                                    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                                                        <li>
                                                            <span>• Giá giờ:</span> <strong>{prices.hourPrice}</strong>
                                                        </li>
                                                        <li>
                                                            <span>• Giá cả ngày:</span> <strong>{prices.dayPrice}</strong>
                                                        </li>
                                                        <li>
                                                        </li>
                                                        <li>
                                                            <span>• Phụ thu quá giờ:</span> <strong>{prices.overtimeFee}</strong>
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <div className="slider">
                                    <div className="image-container">
                                        {images.map((img, index) => (
                                            <div
                                                key={index}
                                                className="image-box"
                                                onClick={() => handleAddImageClick(index)}
                                            >
                                                {img ? <img src={img} alt={`Slide ${index + 1}`} /> : <span className="add-text">+ Thêm</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Input file ẩn */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }} // Ẩn input file
                                />

                            </Row>
                        </Card.Body>
                    </Card>
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
                                onClick={handleSave}
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
};

const AddRoomModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [roomName, setRoomName] = useState('');
    const [area, setArea] = useState('');
    const [roomType, setRoomType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [notes, setNotes] = useState('');
    const [images, setImages] = useState(Array(9).fill(null)); // Using Array(9).fill(null) for better readability
    const fileInputRef = useRef(null); // Tạo reference cho input file
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    // Xử lý click vào ô thêm ảnh
    const handleAddImageClick = (index) => {
        setSelectedImageIndex(index);
        // Kích hoạt sự kiện click vào input file ẩn
        fileInputRef.current.click();
    };

    // Xử lý việc chọn ảnh
    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[selectedImageIndex] = URL.createObjectURL(file);
            setImages(newImages);
        }
    };

    const getPrice = () => {
        if (roomType === 'Phòng VIP') {
            return {
                hourPrice: '300,000',
                dayPrice: '1,000,000',
                nightPrice: '1,000,000',
                overtimeFee: 'Tính tiền mỗi giờ'
            };
        } else {
            return {
                hourPrice: '200,000',
                dayPrice: '800,000',
                nightPrice: '800,000',
                overtimeFee: 'Tính tiền mỗi giờ'
            };
        }
    };

    const prices = getPrice();

    const handleSave = () => {
        const roomData = {
            roomName,
            area,
            roomType,
            startDate,
            notes,
            images
        };
        console.log("Room data saved:", roomData);
        handleClose();
    };

    return (
        <>
            <small style={{ fontSize: '13px' }} onClick={handleShow}>
                <MdAdd />
                Phòng
            </small>
            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-wide"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5>Thêm thông tin phòng</h5>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group as={Row} controlId="formRoomName" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Tên phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập tên phòng"
                                                    value={roomName}
                                                    onChange={(e) => setRoomName(e.target.value)}
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formArea" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Khu vực
                                            </Form.Label>
                                            <Col sm={8}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <Form.Control
                                                        as="select"
                                                        value={area}
                                                        onChange={(e) => setArea(e.target.value)}
                                                        style={{ fontSize: "0.85rem", marginRight: "5px" }} // Thêm khoảng cách bên phải
                                                    >
                                                        <option value="">--Lựa chọn khu vực--</option>
                                                        <option value="Tầng 1">Tầng 1</option>
                                                        <option value="Tầng 2">Tầng 2</option>
                                                        <option value="Tầng 3">Tầng 3</option>
                                                        <option value="Tầng 4">Tầng 4</option>
                                                        <option value="Tầng 5">Tầng 5</option>
                                                    </Form.Control>
                                                    {/* Biểu tượng nằm sau ô chọn */}
                                                    <Add_Area />
                                                </div>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formRoomType" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Loại phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <Form.Control
                                                        as="select"
                                                        value={roomType}
                                                        onChange={(e) => setRoomType(e.target.value)}
                                                        style={{ fontSize: "0.85rem", marginRight: "5px" }} // Thêm khoảng cách bên phải
                                                    >
                                                        <option value="">--Lựa chọn loại phòng--</option>
                                                        <option value="Phòng thường">Phòng thường</option>
                                                        <option value="Phòng VIP">Phòng VIP</option>
                                                    </Form.Control>
                                                    {/* Biểu tượng nằm sau ô chọn */}
                                                    < Add_TypeRoom NameButton={<RiAddFill />} />
                                                </div>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formStartDate" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Bắt đầu sử dụng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="date"
                                                    value={startDate}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formNotes" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Ghi chú
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Nhập ghi chú"
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col md={6}>
                                    <Card style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "8px" }}>
                                        <Card.Body>
                                            <Row>
                                                <Col md={12}>
                                                    <Card.Text>
                                                        <strong>Phòng sẽ được áp dụng theo giá của hạng phòng:</strong>
                                                    </Card.Text>
                                                    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                                                        <li>
                                                            <span>• Giá giờ:</span> <strong>{prices.hourPrice}</strong>
                                                        </li>
                                                        <li>
                                                            <span>• Giá cả ngày:</span> <strong>{prices.dayPrice}</strong>
                                                        </li>
                                                        <li>
                                                        </li>
                                                        <li>
                                                            <span>• Phụ thu quá giờ:</span> <strong>{prices.overtimeFee}</strong>
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <div className="slider">
                                    <div className="image-container">
                                        {images.map((img, index) => (
                                            <div
                                                key={index}
                                                className="image-box"
                                                onClick={() => handleAddImageClick(index)}
                                            >
                                                {img ? <img src={img} alt={`Slide ${index + 1}`} /> : <span className="add-text">+ Thêm</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Input file ẩn */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }} // Ẩn input file
                                />

                            </Row>
                        </Card.Body>
                    </Card>
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
                                onClick={handleSave}
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
};
export { UpdateRoomModal, AddRoomModal };
