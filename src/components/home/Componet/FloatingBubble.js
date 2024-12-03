import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/custom/Sticky.css";

const FloatingBubble = ({ selectedRooms, handleRemoveRoom, calculateTotalPrice, loading, handleBooking }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            {/* Bong bóng */}
            <div className="floating-bubble" onClick={() => setModalOpen(!isModalOpen)}>
                <i className="bi bi-door-open"></i>
                {selectedRooms.length > 0 && (
                    <div className="bubble-count">{selectedRooms.length}</div>
                )}
            </div>

            {/* Modal danh sách tóm tắt phòng */}
            <div className={`selected-room-modal ${isModalOpen ? "active" : ""}`}>
                <h5>Phòng đã chọn:</h5>
                <ul>
                    {selectedRooms.slice(0, 3).map((room) => ( // Hiển thị tối đa 3 phòng
                        <li key={room.roomId}>
                            <span className="room-name">{room.roomName}</span>
                            <span className="room-price">
                                {room.price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </span>
                        </li>
                    ))}
                </ul>

                {selectedRooms.length > 3 && (
                    <button
                        onClick={() => navigate("/selected-rooms")}
                        className="btn btn-link"
                    >
                        Xem danh sách đầy đủ ({selectedRooms.length} phòng)
                    </button>
                )}

                {/* Tổng tiền */}
                <div className="total-price">
                    <span>Tổng tiền:</span>
                    <span>
                        {calculateTotalPrice().toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </span>
                </div>

                {/* Nút đặt phòng */}
                <button onClick={handleBooking} className="btn btn-primary">
                    {loading ? "Đang đặt phòng..." : "Đặt phòng"}
                </button>
            </div>
        </>
    );
};

export default FloatingBubble;
