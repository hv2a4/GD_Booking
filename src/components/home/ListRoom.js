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
import "../../assets/css/custom/Filter.css";
import BookingFillter from "../../pages/account/Filter/FilterBooking";
import { getFilterBooking } from "../../services/client/home";
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
    const [dataFilterBook, setDataFilterBook] = useState({
        startDate: '', endDate: '', guestLimit: ''
    });
    const [dates, setDates] = useState({});
    // Định nghĩa state phân trang
    const roomsPerPage = 3; // Số lượng phòng trên mỗi trang
    const [currentPageIndex, setCurrentPageIndex] = useState(1); // Trang hiện tại

    // Tính toán tổng số trang
    const totalPageCount = Math.ceil(selectedRooms.length / roomsPerPage);

    // Lấy danh sách phòng cho trang hiện tại
    const currentRooms = selectedRooms.slice(
        (currentPageIndex - 1) * roomsPerPage,
        currentPageIndex * roomsPerPage
    );

    // Xử lý thay đổi trang
    const handlePageChanges = (pageIndex) => {
        setCurrentPageIndex(pageIndex);
    };

    // Hàm lấy dữ liệu phòng từ API danh sách phòng
    const fetchRooms = async () => {
        try {
            const res = await getListRoom(currentPage - 1, pageSize); // Lấy phòng dựa trên trang hiện tại
            setTypeRoom(res.rooms);
            setTotalPages(res.totalPages); // Tổng số trang từ API danh sách phòng
        } catch (error) {
            console.log("Lỗi API trả về: ", error);
        }
    };

    // Effect để gọi API khi trang thay đổi
    useEffect(() => {
        if (dataFilterBook.startDate || dataFilterBook.endDate || dataFilterBook.guestLimit) {
            filterBooking(dataFilterBook.startDate, dataFilterBook.endDate, dataFilterBook.guestLimit, currentPage, pageSize);
        } else {
            fetchRooms();
        }
    }, [currentPage, dataFilterBook]); // Khi currentPage hoặc dataFilterBook thay đổi, sẽ gọi lại API tương ứng


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
        const total = selectedRooms.reduce((total, room) => total + room.price, 0);
        return total;
    };

    // Hàm xử lý đặt phòng
    const handleBooking = () => {
        if (selectedRooms.length > 0) {
            const roomDetails = selectedRooms.map((room) => ({
                roomId: room.roomId,
                price: room.price,
                checkin: dates.checkin,
                checkout: dates.checkout
            }));

            console.log("Đang đặt phòng:", roomDetails);
            console.log(`Bạn đã đặt thành công ${selectedRooms.length} phòng.`);

            // Dữ liệu tạm thời để lưu vào state và sessionStorage
            const updateFilterBooking = { startDate: dates.checkin ,endDate: dates.checkout};

            // Lưu danh sách roomId vào sessionStorage
            saveArrayToSession("bookedRooms", roomDetails);
            const bookingDataJSON = JSON.stringify(updateFilterBooking);
            sessionStorage.setItem('booking', bookingDataJSON);

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

    // Hàm xử lý lọc
    const handleDataFilter = (startDate, endDate, guestLimit) => {
        console.log(`${startDate}, ${endDate}, ${guestLimit}`);
        setDataFilterBook({ startDate, endDate, guestLimit });
        setCurrentPage(1); // Khi lọc lại, reset về trang 1
        setDates({ checkin: startDate, checkout: endDate })
        filterBooking(startDate, endDate, guestLimit, 1, pageSize); // Gọi lại API lọc

    };


    const filterBooking = async (startDate, endDate, guestLimit, page, size) => {
        try {
            const res = await getFilterBooking(startDate, endDate, guestLimit, page, size);
            setTypeRoom(res.content);
            setTotalPages(res.totalPages); // Assuming totalPages is part of the response from filter API
            console.log(res.content);
        } catch (error) {
            console.log("Lỗi API trả về: ", error);
        }
    };

    const handleDatesFromChild = (checkin, checkout) => {
        setDates({ checkin, checkout }); // Lưu dữ liệu từ file con vào state
        console.log("Received dates from child:", { checkin, checkout });
    };

    // Show alert if there's an error
    const renderAlert = alert && <Alert type={alert.type} title={alert.title} />;

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <BookingFillter onFilter={handleDataFilter} onSendDates={handleDatesFromChild} />
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
                                        <div className="d-flex align-items-center position-absolute start-0 top-100 translate-middle-y ms-4">
                                            <small className="bg-warning text-white rounded py-1 px-3">
                                                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item?.price)}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="p-4 mt-2">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h5 className="mb-0">{item?.typeRoomName} ({item?.roomName})</h5>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="ps-2" style={{ fontSize: "1rem" }}>Tối đa {item?.guestLimit} người</div>
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
                        Trước
                    </Button>
                    <span className="d-flex align-items-center">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        className="btn btn-secondary ms-2"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Tiếp theo
                    </Button>
                </div>
            </div>
            {/* Sticky Selected Room Bar */}
            {selectedRooms.length > 0 && (
                <div className="sticky-bar">
                    <h5>Phòng đã chọn:</h5>
                    <ul>
                        {currentRooms.map((room) => (
                            <li key={room.roomId}>
                                <span className="room-type">{room.roomName} ({room.typeRoomName})</span>
                                {/* Loại phòng có thể bỏ qua nếu không cần thiết */}
                                <span className="room-price">
                                    Giá:{" "}
                                    {room.price.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </span>
                                <button onClick={() => handleRemoveRoom(room.roomId)}>
                                    <i className="bi bi-trash"></i> {/* Sử dụng biểu tượng thùng rác từ Bootstrap Icons */}
                                </button>

                            </li>
                        ))}
                    </ul>

                    {/* Hiển thị tổng tiền */}
                    <div className="total-price">
                        <span>Tổng tiền:</span>
                        <span>
                            {calculateTotalPrice().toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </span>
                    </div>

                    {/* Nút Đặt phòng */}
                    <button onClick={handleBooking}>
                        {loading ? (
                            <>
                                Đang đặt phòng... <Spinner animation="border" size="sm" />
                            </>
                        ) : (
                            "Đặt phòng"
                        )}
                    </button>

                    {/* Điều khiển phân trang */}
                    {totalPageCount > 1 && (
                        <div className="pagination-controls">
                            <button
                                onClick={() => handlePageChanges(currentPageIndex - 1)}
                                disabled={currentPageIndex === 1}
                            >
                                Trước
                            </button>
                            <span>
                                Trang {currentPageIndex} / {totalPageCount}
                            </span>
                            <button
                                onClick={() => handlePageChanges(currentPageIndex + 1)}
                                disabled={currentPageIndex === totalPageCount}
                            >
                                Tiếp theo
                            </button>
                        </div>
                    )}
                </div>
            )}

            <RoomDetail show={showModal} onClose={() => setShowModal(false)} room={roomItem} />
        </div>
    );
}
