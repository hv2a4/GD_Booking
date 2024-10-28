import React, { useState} from "react";
import { Table } from "react-bootstrap";
import '../../../../../assets/css/admin/css/chart.css'; // Custom CSS

const RoomTable = () => {
    const [selectedRoom, setSelectedRoom] = useState(null); // State to track selected room
  
    const handleRowClick = (room) => {
        // Toggle the selected room
        if (selectedRoom && selectedRoom.id === room.id) {
            setSelectedRoom(null); // Collapse if the same row is clicked
        } else {
            setSelectedRoom(room); // Set the selected room
        }
    };

    const roomData = [
        { id: 1, name: "Phòng 101", type: "Đơn", price: "1.500.000 VNĐ", status: "Còn trống" },
        { id: 2, name: "Phòng 102", type: "Đôi", price: "2.000.000 VNĐ", status: "Đã đặt" },
        { id: 3, name: "Phòng 103", type: "Suite", price: "3.500.000 VNĐ", status: "Còn trống" },
        { id: 4, name: "Phòng 104", type: "Đơn", price: "1.800.000 VNĐ", status: "Đã đặt" },
        { id: 5, name: "Phòng 105", type: "Đôi", price: "2.200.000 VNĐ", status: "Còn trống" },
    ];

    const roomDetails = {
        1: [
            { detail: "Diện tích", info: "25 m²" },
            { detail: "Giường", info: "1 Giường đơn" },
            { detail: "Tiện nghi", info: "Máy lạnh, TV, Wi-Fi" },
        ],
        2: [
            { detail: "Diện tích", info: "30 m²" },
            { detail: "Giường", info: "1 Giường đôi" },
            { detail: "Tiện nghi", info: "Máy lạnh, TV, Wi-Fi" },
        ],
        3: [
            { detail: "Diện tích", info: "50 m²" },
            { detail: "Giường", info: "1 Giường đôi lớn" },
            { detail: "Tiện nghi", info: "Máy lạnh, TV, Wi-Fi, Bồn tắm" },
        ],
        4: [
            { detail: "Diện tích", info: "25 m²" },
            { detail: "Giường", info: "1 Giường đơn" },
            { detail: "Tiện nghi", info: "Máy lạnh, TV" },
        ],
        5: [
            { detail: "Diện tích", info: "30 m²" },
            { detail: "Giường", info: "1 Giường đôi" },
            { detail: "Tiện nghi", info: "Máy lạnh, TV, Wi-Fi" },
        ],
    };
  
    return (
        <div className="container-fluid mt-4"> {/* Main container */}
            <div className="card"> {/* Card for content */}
                <div className="card-body body-card"> {/* Main content of the card */}
                    <div className="row align-items-center mb-3"> {/* Row for title and date selection */}
                        <div className="col-12 col-md-4"> {/* Title section */}
                            <h5 className="card-title">Top 10 hạng phòng theo doanh thu</h5> {/* Chart title */}
                        </div>
                        <div className="col-12 col-md-4 text-end"> {/* Revenue selection */}
                            <select className="form-select form-select-sm w-slot" aria-label="Select revenue">
                                <option value="1" selected>Theo doanh thu</option>
                                <option value="2">Theo số lượng</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-4 text-end"> {/* Date selection */}
                            <select className="form-select form-select-sm w-slot" aria-label="Select date">
                                <option value="1" selected>Hôm nay</option>
                                <option value="2">Hôm qua</option>
                                <option value="3">7 ngày qua</option>
                                <option value="4">Tháng này</option>
                                <option value="5">Tháng trước</option>
                            </select>
                        </div>
                    </div>

                    <Table striped bordered hover responsive> {/* Table for room data */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên phòng</th>
                                <th>Loại phòng</th>
                                <th>Giá</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roomData.map(room => (
                                <React.Fragment key={room.id}>
                                    <tr onClick={() => handleRowClick(room)}> {/* Clickable row */}
                                        <td>{room.id}</td>
                                        <td>{room.name}</td>
                                        <td>{room.type}</td>
                                        <td>{room.price}</td>
                                        <td>{room.status}</td>
                                    </tr>
                                    {selectedRoom && selectedRoom.id === room.id && ( // Show details if selected
                                        <tr>
                                            <td colSpan={5}>
                                                <Table striped bordered hover size="sm" className="mt-2">
                                                    <thead>
                                                        <tr>
                                                            <th>Chi tiết</th>
                                                            <th>Thông tin</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {roomDetails[room.id]?.map((detail, index) => (
                                                            <tr key={index}>
                                                                <td>{detail.detail}</td>
                                                                <td>{detail.info}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default RoomTable;
