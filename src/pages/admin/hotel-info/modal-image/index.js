import React, { useState } from "react";
import { Modal, Button, Container, Row, Col, Card } from "react-bootstrap";
import "./style.css";
import { carouselData } from "../../../../components/data/Data";

const ModalImage = ({ show, handleClose }) => {
    const [images, setImages] = useState(carouselData.map(data => data.img)); // Chỉ lưu trữ URL hình ảnh

    // Hàm xử lý chọn ảnh
    const handleImageChange = (e) => {
        if (images.length >= 10) {
            alert("Chỉ có thể thêm tối đa 10 ảnh.");
            return;
        }

        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImages((prevImages) => [...prevImages, imageUrl]); // Thêm ảnh mới vào danh sách
        }
    };

    const handleEditImage = (index) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setImages((prevImages) => {
                    const updatedImages = [...prevImages];
                    updatedImages[index] = imageUrl; // Cập nhật hình ảnh tại vị trí index
                    return updatedImages;
                });
            }
        };

        input.click(); // Mở hộp thoại chọn file
    };

    const handleDeleteImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Thêm ảnh</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <div className="image-gallery mt-3">
                        <Row>
                            {images.map((image, index) => (
                                <Col key={index} xs={6} sm={4} md={2} className="mb-3">
                                    <Card className="image-card">
                                        <Card.Img variant="top" src={image || "https://via.placeholder.com/100"} />
                                    </Card>
                                    <div className="button-container">
                                        <Button variant="warning" size="sm" onClick={() => handleEditImage(index)}>
                                            Sửa
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteImage(index)}>
                                            Xóa
                                        </Button>
                                    </div>
                                </Col>
                            ))}
                            {images.length < 10 && (
                                <Col xs={6} sm={4} md={2} className="mb-3">
                                    <Card className="add-image-card">
                                        <label htmlFor="image-upload" className="add-image-placeholder">
                                            <span>+</span>
                                            <p>Thêm ảnh</p>
                                        </label>
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={handleImageChange}
                                        />
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Lưu thay đổi
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalImage;
