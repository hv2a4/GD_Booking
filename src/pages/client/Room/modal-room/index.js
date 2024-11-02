import React from 'react';
import { Modal, Button, Image, ListGroup, Row, Col } from 'react-bootstrap';
import './style.css'; // Import CSS file

const RoomDetailModal = ({ show, onClose, room }) => {
  return (
    <Modal show={show} onHide={onClose} centered className="room-detail-modal">
      <Modal.Header closeButton>
        <Modal.Title>{room.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex">
          <Image
            src={room.img}
            alt="Phòng 02 giường đơn"
            thumbnail
            style={{ maxWidth: '300px', marginRight: '20px' }}
          />
          <div className="room-detail-info" style={{ maxHeight: "300px", overflowY: "auto" }}>
            <p><strong>Số khách:</strong> 1 người lớn, 1 trẻ em</p>
            <ListGroup variant="flush">
              <ListGroup.Item>Số khách tiêu chuẩn: 1 người lớn, 1 trẻ em</ListGroup.Item>
              <ListGroup.Item>Số khách tối đa: 1 người lớn, 1 trẻ em</ListGroup.Item>
            </ListGroup>
            <strong>Tiện nghi:</strong>
            <Row>
              <Col xs={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>Wifi miễn phí</ListGroup.Item>
                  <ListGroup.Item>TV màn hình phẳng</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col xs={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>Điều hòa không khí</ListGroup.Item>
                  <ListGroup.Item>Máy sấy tóc</ListGroup.Item> {/* Ví dụ tiện nghi thêm */}
                </ListGroup>
              </Col>
            </Row>
            <p className="room-detail-description">{room.description || 'Chưa có mô tả'}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span><strong>Giá phòng</strong></span>
          <span className="room-detail-price">{room.price}₫</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => alert("Bạn đã chọn phòng!")}>
          Chọn
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RoomDetailModal;
