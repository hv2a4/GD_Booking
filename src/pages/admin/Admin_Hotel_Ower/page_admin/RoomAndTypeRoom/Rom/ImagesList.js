import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card } from "react-bootstrap";

const ImageListSlider = ({ onImagesChange, maxImages, img }) => {
    const [images, setImages] = useState(img ? [img] : []);

    useEffect(() => {
        if (img && !images.includes(img)) {
            setImages([img]);
        }
    }, [img]);

    const handleImageChange = (e, index = null) => {
        const file = e.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            const updatedImages = [...images];
            if (index !== null) {
                updatedImages[index] = newImageUrl; // Cập nhật ảnh
            } else if (images.length < maxImages) {
                updatedImages.push(newImageUrl); // Thêm ảnh mới
            }
            setImages(updatedImages);
            onImagesChange(file);
            e.target.value = ""; // Reset input
        }
    };

    const handleDeleteImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        onImagesChange(null); // Có thể thay đổi callback nếu muốn
    };

    return (
        <Container>
            <Row>
                {images.map((image, index) => (
                    <Col key={index} xs={6} sm={4} md={2} className="mb-3">
                        <Card className="image-card">
                            <Card.Img variant="top" src={image || "https://via.placeholder.com/100"} />
                        </Card>
                        <div className="button-container">
                            <Button variant="warning" size="sm" onClick={() => document.getElementById(`image-upload-${index}`).click()}>
                                Sửa
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleDeleteImage(index)}>
                                Xóa
                            </Button>
                            <input
                                id={`image-upload-${index}`}
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => handleImageChange(e, index)}
                            />
                        </div>
                    </Col>
                ))}
                {images.length < maxImages && (
                    <Col xs={6} sm={4} md={2} className="mb-3">
                        <Card className="image-card">
                            <Button
                                variant="outline-secondary"
                                className="add-image-placeholder"
                                onClick={() => document.getElementById("image-upload").click()}
                                style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <span>+</span>
                                <p>Thêm ảnh</p>
                            </Button>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => handleImageChange(e)}
                            />
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default ImageListSlider;
