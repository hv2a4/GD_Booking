import { Modal, Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import React, { useState } from "react";

// First modal component
function DeleteModelTypeRoom({ ID_Room }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="btn btn-danger" onClick={handleShow}>
                <MdDelete />&nbsp;Xóa
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ border: 'none' }}>
                    <Modal.Title>Xóa Loại phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Loại phòng "<strong>{ID_Room}</strong>" đang gắn với phòng. Bạn có chắc chắn muốn xóa không?
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

// Second modal component
function DeleteModelRoom({ Name_Room }) {
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
                    <Modal.Title>Xóa phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa phòng <strong>{Name_Room}</strong> Các lịch đặt và hóa đơn gắn với Phòng <strong>{Name_Room}</strong> vẫn được giữ nguyên và bạn không thể tiếp tục đặt lịch cho phòng này
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

export { DeleteModelRoom, DeleteModelTypeRoom };
