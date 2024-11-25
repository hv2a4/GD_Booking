import React from 'react';
import { Modal, Button, Image, ListGroup, Row, Col, Carousel } from 'react-bootstrap';
import './style.css'; // Import CSS file

const RoomDetail = ({ show, onClose, room }) => {
    const images = room?.imageNames || [];

    const priceFormatted = room.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.price) : "Chưa có giá";
    const finalPriceFormatted = room.finalPrice > 0 ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.finalPrice) : null;
    const discountPercent = room.percent > 0 ? `Giảm ${room.percent}%` : null;

    return (
        <Modal show={show} onHide={onClose} centered className="room-detail-modal" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    <h2>Chi tiết {room.typeRoomName}</h2>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    {/* Image Section */}
                    <Col xs={12} md={6}>
                        <Carousel>
                            {images.length > 0 ? images.map((img, index) => (
                                <Carousel.Item key={index}>
                                    <Image src={img} alt={`Phòng ${room.typeRoomName} - Hình ảnh ${index + 1}`} fluid className="d-block w-100 room-carousel-image" />
                                </Carousel.Item>
                            )) : <div>No images available</div>}
                        </Carousel>
                    </Col>

                    {/* Room Info Section */}
                    <Col xs={12} md={6}>
                        <div className="room-detail-info">
                            <p><strong>Tên loại phòng:</strong> {room.typeRoomName}</p>
                            <p><strong>Số khách tiêu chuẩn:</strong> {room.guestLimit} người</p>
                            <p><strong>Giường:</strong> {room.bedName}</p>
                            <p><strong>Diện tích:</strong> {room.acreage} m²</p>

                            <strong>Tiện nghi:</strong>
                            <Row>
                                {room.amenities?.map((amenity, index) => (
                                    <Col xs={4} key={index}>
                                        <ListGroup.Item>{amenity}</ListGroup.Item>
                                    </Col>
                                ))}
                            </Row>
                            <p className="room-detail-description">{room.describes || 'Chưa có mô tả'}</p>
                        </div>
                    </Col>
                </Row>

                {/* Price Section */}
                <div className="d-flex flex-column align-items-start mt-3">
                    <span><strong>Giá phòng:</strong></span>
                    {room.finalPrice > 0 ? (
                        <div className="room-detail-price-container">
                            <span className="price-original">{priceFormatted}</span>
                            <span className="discount-percent">{discountPercent}</span>
                            <span className="price-final">{finalPriceFormatted}</span>
                        </div>
                    ) : (
                        <span className="price-no-discount">{priceFormatted}</span>
                    )}
                </div>
            </Modal.Body>

            {/* Footer */}
            <Modal.Footer className="ms-auto">
                <Button variant="secondary" onClick={onClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RoomDetail;
