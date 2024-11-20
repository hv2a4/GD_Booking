import React from 'react';
import { Modal, Button, Image, ListGroup, Row, Col, Carousel, Card } from 'react-bootstrap';
import './style.css'; // Import CSS file
import { FaStar, FaRegStar, FaWifi, FaRegSnowflake, FaTv, FaTshirt, FaConciergeBell, FaCoffee, FaTaxi } from 'react-icons/fa'; // For star icons

const RoomDetailModal = ({ show, onClose, room }) => {
  // Helper function to render star ratings
  const renderStars = (stars) => {
    return [...Array(5)].map((_, i) => (
      i < stars ? <FaStar key={i} className="text-warning" /> : <FaRegStar key={i} className="text-muted" />
    ));
  };
  const getAmenityIcon = (amenityName) => {
    switch (amenityName) {
      case "WiFi":
        return <FaWifi style={{ color: '#FEA116' }} />;
      case "Điều Hoà":
        return <FaRegSnowflake style={{ color: '#FEA116' }} />;
      case "TV":
        return <FaTv style={{ color: '#FEA116' }} />;
      case "Mini Bar":
        return <FaTshirt style={{ color: '#FEA116' }} />;
      case "Dịch Vụ Phòng":
        return <FaConciergeBell style={{ color: '#FEA116' }} />;
      case "Bữa sáng miễn phí":
        return <FaCoffee style={{ color: '#FEA116' }} />;
      case "Giặt ủi":
        return <FaTshirt style={{ color: '#FEA116' }} />;
      case "Đưa Đón":
        return <FaTaxi style={{ color: '#FEA116' }} />;
      default:
        return <span>No icon</span>;
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered className="room-detail-modal" size="lg">
      <Modal.Header closeButton>
        <Modal.Title className=''>
          <h2>
            Chi tiết {room.typeRoomName}
          </h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {/* Phần hình ảnh phòng */}
          <Col xs={12} md={6}>
            <Carousel>
              {room.imageList?.map((img, index) => (
                <Carousel.Item key={index}>
                  <Image
                    src={img}
                    alt={`Phòng ${room.typeRoomName} - Hình ảnh ${index + 1}`}
                    fluid
                    className="d-block w-100 room-carousel-image"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          {/* Phần thông tin chi tiết phòng */}
          <Col xs={12} md={6}>
            <div className="room-detail-info">
              <p><strong>Tên loại phòng:</strong> {room.typeRoomName}</p>
              <p><strong>Số khách tiêu chuẩn:</strong> {room.guestLimit} người</p>
              <p><strong>Giường:</strong> {room.bedName}</p>
              <p><strong>Diện tích:</strong> {room.acreage} m²</p>

              <strong>Tiện nghi:</strong>
              <Row>
                <Col xs={6}>
                  <ListGroup variant="flush">
                    {room.amenitiesList?.slice(0, 2).map((amenity, index) => (
                      <ListGroup.Item key={index}>{amenity.amenitiesTypeRoomName}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col xs={6}>
                  <ListGroup variant="flush">
                    {room.amenitiesList?.slice(2).map((amenity, index) => (
                      <ListGroup.Item key={index}>{amenity.amenitiesTypeRoomName}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
              <p className="room-detail-description">{room.describes || 'Chưa có mô tả'}</p>
            </div>
          </Col>
        </Row>

        {/* Phần đánh giá */}
        <div className="room-feedback mt-4">
          <h5>Đánh giá của khách hàng</h5>
          <p>
            <strong>Đánh giá trung bình:</strong> {room.averageFeedBack}{' '}
            {renderStars(Math.round(room.averageFeedBack))}
          </p>
          {room.feedBack?.length > 0 ? (
            <div className="feedback-container">
              {room.feedBack.map((feedback) => (
                <div key={feedback.id} className="mb-3">
                  <Card className="feedback-card shadow-sm">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="me-3 feedback-avatar">
                          <img
                            src={room.image}
                            alt={`Ảnh của ${room.typeRoomName}`}
                            className="room-avatar"
                          />
                        </div>
                        <div>
                          <Card.Title className="mb-1 feedback-username">
                            <strong>{room.accountName}</strong>
                          </Card.Title>
                          <Card.Text className="mb-0 text-muted feedback-date">
                            {new Date(feedback.createAt).toLocaleDateString('vi-VN')}
                          </Card.Text>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="mb-2">{feedback.content}</p>
                        <div>{renderStars(feedback.stars)}</div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">Chưa có đánh giá nào.</p>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span><strong>Giá phòng</strong></span>
          <span className="room-detail-price">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.price)}
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RoomDetailModal;
