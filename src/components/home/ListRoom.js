import React, { useEffect, useState } from "react";
import CommonHeading from "../common/CommonHeading";
import { getDetailListTypeRoom, getListRoom } from "../../services/client/home";
import Alert from "../../config/alert";
import { Button, Spinner } from "react-bootstrap";
import {
    FaWifi,
    FaTv,
    FaRegSnowflake,
    FaTshirt,
    FaConciergeBell,
    FaCoffee,
    FaTaxi,
} from "react-icons/fa";
import RoomDetail from "../../pages/client/Room/modal-room/RoomDetail";
import { useNavigate } from "react-router-dom";
import "../../assets/css/custom/Sticky.css";
const amenityIcons = {
    "WiFi": <FaWifi style={{ color: "#FEA116" }} />,
    "Điều Hoà": <FaRegSnowflake style={{ color: "#FEA116" }} />,
    "TV": <FaTv style={{ color: "#FEA116" }} />,
    "Mini Bar": <FaTshirt style={{ color: "#FEA116" }} />,
    "Dịch Vụ Phòng": <FaConciergeBell style={{ color: "#FEA116" }} />,
    "Bữa sáng miễn phí": <FaCoffee style={{ color: "#FEA116" }} />,
    "Giặt ủi": <FaTshirt style={{ color: "#FEA116" }} />,
    "Đưa Đón": <FaTaxi style={{ color: "#FEA116" }} />
};

export default function ListRoom() {
    const [showModal, setShowModal] = useState(false);
    const [roomItem, setRoomItem] = useState([]);
    const [typeRoom, setTypeRoom] = useState([]);
    const [alert, setAlert] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [totalPages, setTotalPages] = useState(1); // Total pages state
    const pageSize = 9;
    const [selectedRooms, setSelectedRooms] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Fetch rooms based on current page
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await getListRoom(currentPage - 1, pageSize);
                if (data) {
                    setTypeRoom(data.rooms);
                    setTotalPages(data.totalPages); // Assuming totalPages is part of the response
                } else {
                    setAlert({ type: "error", title: "Không thể tải dữ liệu phòng." });
                }
            } catch (error) {
                setAlert({ type: "error", title: error.message });
            }
        };
        fetchRooms();
    }, [currentPage]); // Dependency array includes currentPage

    // Fetch room details
    const getDataDetail = async (id) => {
        try {
            const res = await getDetailListTypeRoom(id);
            if (res) {
                setRoomItem(res[0]);
                setShowModal(true);
            } else {
                setAlert({ type: "error", title: "Không tìm thấy chi tiết phòng." });
            }
        } catch (error) {
            setAlert({ type: "error", title: error.message });
        }
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSelectRoom = (room) => {
        setSelectedRooms((prev) => {
            if (prev.some((r) => r.roomId === room.roomId)) {
                return prev.filter((r) => r.roomId !== room.roomId);
            } else {
                return [...prev, room];
            }
        });
    };

    const handleRemoveRoom = (roomId) => {
        setSelectedRooms((prev) => prev.filter((room) => room.roomId !== roomId));
    };

    const saveArrayToSession = (key, array) => {
        const jsonString = JSON.stringify(array); // Chuyển mảng thành chuỗi JSON
        sessionStorage.setItem(key, jsonString); // Lưu vào sessionStorage
    };

    // Hàm tính tổng tiền sau khi giảm giá
    const calculateTotalPrice = () => {
        return selectedRooms.reduce((total, room) => {
            const price = room.finalPrice > 0 ? room.finalPrice : room.price;
            return total + price;
        }, 0);
    };

    // Hàm xử lý đặt phòng
    const handleBooking = () => {
        if (selectedRooms.length > 0) {
            const roomDetails = selectedRooms.map((room) => ({
                roomId: room.roomId,
                price: room.price,
                finalPrice: room.finalPrice,
            }));

            console.log("Đang đặt phòng:", roomDetails);
            console.log(`Bạn đã đặt thành công ${selectedRooms.length} phòng.`);

            // Lưu danh sách roomId vào sessionStorage
            saveArrayToSession("bookedRooms", roomDetails);

            //Bất đầu tải trang
            setLoading(true);

            // Điều hướng tới trang đặt phòng
            setTimeout(() => {
                navigate("/client/booking-room");
            }, 1000);


            //Dừng tải lại trang
            setLoading(false);

            // Reset danh sách phòng
            setSelectedRooms([]);
            return roomDetails;
        } else {
            console.log("Vui lòng chọn phòng trước khi đặt!");
            return null;
        }
    };

    // Show alert if there's an error
    const renderAlert = alert && <Alert type={alert.type} title={alert.title} />;

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <CommonHeading heading="Phòng của chúng tôi" title="Phòng" subtitle="Khám phá" />
                {renderAlert}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {typeRoom.length === 0 ? (
                        <div className="col-12 text-center">Không có phòng nào để hiển thị.</div>
                    ) : (
                        typeRoom.map((item, key) => (
                            <div className="col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="0.1s" key={key}>
                                <div className="room-item shadow rounded overflow-hidden">
                                    <div className="position-relative">
                                        <img className="img-fluid w-100" src={item?.imageList?.[0]} alt={item?.typeRoomName || "Room Image"} />

                                        {/* Hiển thị giá gốc và giá giảm nếu có */}
                                        <div className="d-flex align-items-center position-absolute start-0 top-100 translate-middle-y ms-4">
                                            {item?.percent && item?.finalPrice !== 0 ? (
                                                <>
                                                    {/* Giá gốc gạch chân */}
                                                    <small className="bg-warning text-white rounded py-1 px-3" style={{ textDecoration: 'line-through', marginRight: '8px' }}>
                                                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item?.price)}
                                                    </small>
                                                    {/* Giá giảm */}
                                                    <small className="bg-danger text-white rounded py-1 px-3">
                                                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item?.finalPrice)}
                                                    </small>
                                                </>
                                            ) : (
                                                <small className="bg-warning text-white rounded py-1 px-3">
                                                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item?.price)}
                                                </small>
                                            )}
                                        </div>

                                        {/* Thêm phần giảm giá */}
                                        {item?.percent && item?.finalPrice !== 0 && (
                                            <small className="position-absolute end-0 top-0 translate-middle-y bg-danger text-white rounded py-1 px-3 me-4 mt-4">
                                                -{item?.percent}% Giảm
                                            </small>
                                        )}
                                    </div>

                                    <div className="p-4 mt-2">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h5 className="mb-0">{item?.typeRoomName} ({item?.roomName})</h5>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="ps-2" style={{ fontSize: "1rem" }}>Tiêu chuẩn {item?.guestLimit} người</div>
                                        </div>
                                        <div className="d-flex mb-3">
                                            {item?.amenitiesDetails?.slice(0, 3).map((amenity, idx) => (
                                                <small
                                                    className="border-end me-3 pe-3 d-flex align-items-center"
                                                    key={idx}
                                                    style={{ fontSize: "1.2rem" }}
                                                >
                                                    {amenityIcons[amenity]}
                                                    <span
                                                        style={{
                                                            fontSize: "1rem",
                                                            maxWidth: "82px",
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"
                                                        }}
                                                        title={amenity}
                                                    >
                                                        &nbsp;{amenity}
                                                    </span>
                                                </small>
                                            ))}
                                            {item?.amenitiesDetails?.length > 3 && (
                                                <small
                                                    className="more-amenities"
                                                    style={{ fontSize: "1.2rem", color: "#FEA116" }}
                                                    title="Click to see more amenities"
                                                >
                                                    &nbsp;...
                                                </small>
                                            )}
                                        </div>
                                        <p
                                            className="text-body mb-3"
                                            style={{
                                                height: "80px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                lineHeight: "1.5",
                                            }}
                                        >
                                            {item.description}
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <Button className="btn btn-sm btn-primary rounded py-2 px-4" onClick={() => getDataDetail(item.roomId)}>
                                                Chi tiết
                                            </Button>
                                            <Button
                                                className="btn btn-primary"
                                                onClick={() => handleSelectRoom(item)}
                                            >
                                                {selectedRooms.some((r) => r.roomId === item.roomId)
                                                    ? "Bỏ chọn"
                                                    : "Chọn"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination buttons */}
                <div className="pagination mt-4 d-flex justify-content-center">
                    <Button
                        className="btn btn-secondary me-2"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Prev
                    </Button>
                    <span className="d-flex align-items-center">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        className="btn btn-secondary ms-2"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>
            {/* Sticky Selected Room Bar */}
            {selectedRooms.length > 0 && (
                <div className="sticky-bar">
                    <h5>Phòng đã chọn:</h5>
                    <ul>
                        {selectedRooms.map((room) => (
                            <li key={room.roomId}>
                                <span>
                                    <span className="room-type">{room.typeRoomName}</span>
                                    <span className="room-info">Số phòng: {room.roomName}</span>
                                    <span className="room-price">
                                        Giá:{" "}
                                        {room.finalPrice > 0
                                            ? room.finalPrice.toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })
                                            : room.price.toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                    </span>
                                    {room.finalPrice > 0 && (
                                        <span className="room-discount">
                                            <strong>Giảm giá:</strong> {room.percent}% ({room.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} → {room.finalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })})
                                        </span>
                                    )}
                                </span>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleRemoveRoom(room.roomId)}
                                >
                                    Xóa
                                </Button>
                            </li>
                        ))}
                    </ul>
                    {/* Hiển thị tổng tiền */}
                    <div>
                        <strong>Tổng tiền: </strong>
                        {calculateTotalPrice().toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </div>

                    {/* Nút Đặt phòng */}
                    <Button
                        onClick={handleBooking}
                        className="align-self-end"
                        style={{
                            backgroundColor: "#feaa16",
                            color: "white",
                            fontWeight: "bold",
                        }}
                    >
                        {loading ? (
                            <>
                                Đang đặt phòng... <Spinner animation="border" size="sm" />
                            </>
                        ) : (
                            "Đặt phòng"
                        )}
                    </Button>
                </div>
            )}

            <RoomDetail show={showModal} onClose={() => setShowModal(false)} room={roomItem} />
        </div>
    );
}
