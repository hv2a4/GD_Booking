import React from "react";

const SelectedRoomsPage = ({ selectedRooms, handleRemoveRoom, calculateTotalPrice, handleBooking, loading }) => {
    return (
        <div className="selected-rooms-page">
            <h2>Danh sách phòng đã chọn</h2>
            <ul>
                {selectedRooms.map((room) => (
                    <li key={room.roomId}>
                        <span className="room-name">{room.roomName}</span>
                        <span className="room-price">
                            {room.price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </span>
                        <button onClick={() => handleRemoveRoom(room.roomId)}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </li>
                ))}
            </ul>

            <div className="total-price">
                <span>Tổng tiền:</span>
                <span>
                    {calculateTotalPrice().toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </span>
            </div>

            <button onClick={handleBooking} className="btn btn-primary">
                {loading ? "Đang đặt phòng..." : "Đặt phòng"}
            </button>
        </div>
    );
};

export default SelectedRoomsPage;
