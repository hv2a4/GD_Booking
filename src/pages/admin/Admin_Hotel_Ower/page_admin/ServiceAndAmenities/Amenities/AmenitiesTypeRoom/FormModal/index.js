import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Card, Row, Col, Form } from 'react-bootstrap';
import { FaClipboardCheck, FaSave } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { GiCancel } from "react-icons/gi";
import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify'; 
import axios from 'axios';

const AmenitiesTypeRoomFormModal = ({ idAmenitiesTypeRoom, amenitiesTypeRoomName, icon, refeshTable }) => {
    const [show, setShow] = useState(false);
    const { register, handleSubmit,  setValue, reset  } = useForm(); // Khởi tạo useForm
    const [formEdit, setFormEdit] = useState({
        id : "",
        amenitiesTypeRoomName : "",
        icon : ""
    })

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        reset(); // Reset form khi đóng modal
    };


    const handleEdit = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/amenities-type-room/getById/${id}`);
            // console.log(res.data);
            setFormEdit(res.data.data)
        } catch (error) {
            console.log(error);
            
        }
    };
    // Khi idAmenitiesTypeRoom có giá trị, gọi handleEdit để tải dữ liệu
    useEffect(() => {
        if (idAmenitiesTypeRoom) {
            handleEdit(idAmenitiesTypeRoom);  // Gọi handleEdit nếu có id
        } else {
            reset({ amenitiesTypeRoomName: '', icon: '' });  // Reset form nếu không có id
        }
    }, [idAmenitiesTypeRoom, reset]);

    const onSubmit = (data) => {
        const { amenitiesTypeRoomName, icon } = formEdit;
        if (idAmenitiesTypeRoom) {
            axios.put(`http://localhost:8080/api/amenities-type-room/update/${idAmenitiesTypeRoom}`, { amenitiesTypeRoomName, icon })
                .then(response => {
                    console.log("Cập nhật thành công", response);
                    handleClose();
                    refeshTable(true);
                    alert("Cập nhật thành công!"); // Hiển thị thông báo alert
                })
                .catch(error => {
                    console.log(error);
                    alert("Đã xảy ra lỗi khi cập nhật!"); // Thông báo lỗi nếu có
                });
        } else {
            axios.post('http://localhost:8080/api/amenities-type-room/add', { amenitiesTypeRoomName, icon })
                .then(response => {
                    console.log("Thêm mới thành công", response);
                    handleClose();
                    refeshTable(true);
                    alert("Đã thêm thành công!"); // Hiển thị thông báo alert
                })
                .catch(error => {
                    console.log(error);
                    alert("Đã xảy ra lỗi khi thêm!"); // Thông báo lỗi nếu có
                });
        }
    };

    //Hàm xử lí thay đổi dữ liệu
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormEdit((pre) => ({
            ...pre,
            [name]: value,
        }));
    };

    return (
        <>
            {(() => {
                if (!idAmenitiesTypeRoom) {
                    return (
                        <small style={{ fontSize: '13px', cursor: 'pointer' }} id="amenitie-type-room-form" onClick={handleShow}>
                            Thêm
                        </small>
                    );
                } 
                // else {
                //     return (
                //         <small className="btn btn-success me-2" style={{ fontSize: '13px', cursor: 'pointer' }} onClick={handleShow}>
                //             <FaClipboardCheck />&nbsp;Cập nhật
                //         </small>
                //     );
                // }
            })()} 

            <small
                className={idAmenitiesTypeRoom ? "btn btn-success me-2" : ""}
                style={{ fontSize: '13px', cursor: 'pointer' }}
                onClick={handleShow}
            >
                {idAmenitiesTypeRoom ? <><FaClipboardCheck />&nbsp;Cập nhật</> : 'Thêm'}
            </small>

            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-wides"
                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5>{idAmenitiesTypeRoom ? 'Cập nhật' : 'Thêm'} Tiện Nghi Loại Phòng</h5>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={12}>
                                    <Form onSubmit={handleSubmit(onSubmit)}> {/* Thêm onSubmit vào form */}
                                        <Form.Group as={Row} controlId="idAmenitiesTypeRoom" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Mã tiện nghi loại phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Mã tiện nghi loại phòng tự động" disabled
                                                    name='id'
                                                    value={formEdit.id}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="amenitiesTypeRoomName" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Tên tiện nghi loại phòng
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập tên tiện nghi loại phòng..."
                                                    name='amenitiesTypeRoomName'
                                                    value={formEdit.amenitiesTypeRoomName}
                                                    onChange={handleInputChange}
                                                    // {...register('amenitiesTypeRoomName', { required: true })}
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="icon" className="mt-3">
                                            <Form.Label column sm={4}>
                                                Icon
                                            </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                     type="text"
                                                     placeholder="Nhập icon..."
                                                     name="icon"
                                                     value={formEdit.icon}
                                                     onChange={handleInputChange}
                                                    //  {...register('icon', { required: true })}
                                                />
                                            </Col>
                                        </Form.Group>
                                        {/* Nút Lưu ẩn, sẽ được kích hoạt khi nhấn vào nút Lưu trong footer */}
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
                                        btnSubmit.click();  // Kích hoạt submit form khi nhấn Lưu
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

const DeleteAmenitiesTypeRoomModal = ({ id, amenitiesTypeRoomName }) => {
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
                    <Modal.Title>Xóa tiện nghi loại phòng </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa tiện nghi loại phòng <strong>{amenitiesTypeRoomName}</strong> này?
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

export { AmenitiesTypeRoomFormModal, DeleteAmenitiesTypeRoomModal };
