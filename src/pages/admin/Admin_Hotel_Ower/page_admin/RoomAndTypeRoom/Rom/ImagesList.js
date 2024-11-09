import React, { useState } from 'react';
import { Button, Container, Row, Col, Card } from "react-bootstrap";

const ImageListSlider = ({ onImagesChange, maxImages, img }) => {
    const [images, setImages] = useState([]);

    // Xử lý thay đổi ảnh khi thêm
    const handleImageChange = (e) => {
        if (images.length >= maxImages) {
            alert(`Chỉ có thể thêm tối đa ${maxImages} ảnh.`);
            return;
        }

        const file = e.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            const updatedImages = [...images, newImageUrl];
            setImages(updatedImages);
            onImagesChange(file); // Truyền file mới vào callback
            e.target.value = ""; // Reset input sau khi chọn ảnh
        }
    };

    // Sửa ảnh
    const handleEditImage = (index) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const newImageUrl = URL.createObjectURL(file);
                const updatedImages = [...images];
                updatedImages[index] = newImageUrl;
                setImages(updatedImages);
                onImagesChange(file); // Truyền file mới vào callback
            }
        };
        input.click();
    };

    // Xóa ảnh
    const handleDeleteImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        // Không truyền gì cho onImagesChange khi xóa ảnh
    };

    return (
        <Container>
            <div className="image-gallery mt-3">
                <Row>
                    {images.map((image, index) => (
                        <Col key={index} xs={6} sm={4} md={2} className="mb-3">
                            <Card className="image-card">
                                <Card.Img
                                    variant="top"
                                    src={image || img || "https://via.placeholder.com/100"}
                                />
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
                    {images.length < maxImages && (
                        <Col xs={6} sm={4} md={2} className="mb-3">
                            <Card className="add-image-card">
                                <Button
                                    variant="outline-secondary"
                                    className="add-image-placeholder"
                                    onClick={() => document.getElementById("image-upload").click()}
                                    style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <span>+</span>
                                    <p>Thêm ảnh</p>
                                </Button>
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
    );
};

export default ImageListSlider;
