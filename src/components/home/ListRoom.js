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
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/css/custom/Sticky.css";
import "../../assets/css/custom/Filter.css";
import BookingFillter from "../../pages/account/Filter/FilterBooking";
import { getFilterBooking } from "../../services/client/home";
import { Cookies } from 'react-cookie';
import Swal from 'sweetalert2';
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
    const location = useLocation();
    const [rooms,setRooms] = useState([]);
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
            setRooms(res.rooms);
        } catch (error) {
            console.log("Lỗi API trả về: ", error);
        }
    };

    useEffect(() => {
        // Lọc dữ liệu để lấy danh sách unique typeRoomName
        const uniqueTypeRooms = rooms.reduce((acc, room) => {
            if (!acc.some(item => item.typeRoomName === room.typeRoomName)) {
                acc.push(room);
            }
            return acc;
        }, []);
        console.log(uniqueTypeRooms);
        
        setTypeRoom(uniqueTypeRooms);
    }, [rooms]);

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
        const cookies = new Cookies(); // Tạo một instance của Cookies
        const token = cookies.get('token'); // Lấy cookie theo tên "token"

        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'Yêu cầu đăng nhập',
                text: 'Bạn cần đăng nhập để thực hiện chức năng đặt phòng.',
                confirmButtonText: 'Đăng nhập ngay'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/account"); // Điều hướng tới trang đăng nhập
                }
            });
            return; // Dừng hàm tại đây nếu chưa đăng nhập
        }

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
            const updateFilterBooking = { startDate: dates.checkin, endDate: dates.checkout };

            // Lưu danh sách roomId vào sessionStorage
            saveArrayToSession("bookedRooms", roomDetails);
            const bookingDataJSON = JSON.stringify(updateFilterBooking);
            sessionStorage.setItem('booking', bookingDataJSON);

            //Bất đầu tải trang
            setLoading(true);

            // Điều hướng tới trang đặt phòng
            setTimeout(() => {
                navigate("/client/booking-room");
                window.scrollTo(0, 0);
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
        console.log("handleDataFilter nhận giá trị:", startDate, endDate, guestLimit);

        setDataFilterBook({ startDate, endDate, guestLimit });
        setCurrentPage(1); // Reset về trang đầu
        setDates({ checkin: startDate, checkout: endDate });
        filterBooking(startDate, endDate, guestLimit, 1, pageSize); // Gọi API
    };

    useEffect(() => {
        if (location.state) {
            const { checkIn, checkOut, guest } = location.state;

            if (checkIn && checkOut && guest) {
                console.log("Dữ liệu hợp lệ từ location.state:", { checkIn, checkOut, guest });
                handleDataFilter(checkIn, checkOut, guest);
            } else {
                console.error("Dữ liệu từ location.state không đầy đủ!");
            }
        } else {
            console.log("Không có location.state.");
        }
    }, [location.state]);


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
                            <div className="col-lg-12 col-md-12 col-sm-12 wow fadeInUp" data-wow-delay="0.1s" key={key}>
                                <div className="row border">
                                    {/* Phần hiển thị phòng */}
                                    <div className="room-item rounded overflow-hidden col-md-5" style={{ padding: '0' }}>
                                        <div className="position-relative">
                                            <img
                                                className="img-fluid w-100"
                                                style={{ height: '271px' }}
                                                src={item?.imageList?.[0]}
                                                alt={item?.typeRoomName || "Room Image"}
                                            />
                                            <div className="d-flex align-items-center position-absolute start-0 top-100 translate-middle-y ms-4">
                                                <small className="bg-warning text-white rounded py-1 px-3" style={{ fontWeight: 'bold' }}>
                                                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item?.price)}/ <strong>Ngày</strong>
                                                </small>
                                            </div>
                                        </div>

                                        {/* Thông tin phòng */}
                                        <div className="p-4 mt-2" style={{borderRight: '1px soild'}}>
                                            <h5 className="mb-3"><strong>{item?.typeRoomName}</strong></h5>
                                            <div className="mb-3" style={{ fontSize: "1rem" }}>
                                                <strong>Sức chứa: </strong>Tối đa {item?.guestLimit} người
                                            </div>

                                            {/* Tiện nghi phòng */}
                                            <div className="mb-3">
                                                <strong>Tiện nghi phòng:</strong>
                                                <div className="d-flex flex-wrap mt-2">
                                                    {item?.amenitiesDetails?.map((amenity, idx) => (
                                                        <small
                                                            className="border-end me-3 pe-3 d-flex align-items-center mb-2"
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
                                            </div>

                                            {/* Nút hành động */}
                                            <div className="d-flex justify-content-end">
                                                <Button
                                                    className="btn btn-sm btn-primary rounded py-2 px-4"
                                                    onClick={() => getDataDetail(item.roomId)}
                                                >
                                                    Xem chi tiết
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Danh sách đặt phòng */}
                                    <div className="col-md-7">
                                        <div className="card border-0">
                                            <div className="card-header text-center bg-white">
                                                <h3>Danh sách phòng</h3>
                                            </div>
                                            <div className="card-body bg-white">
                                                <div className="d-flex flex-wrap justify-content-center">
                                                    {typeRoom.map((roomItem, key) => (
                                                        <Button
                                                            key={key}
                                                            className="btn btn-outline-primary m-3 shadow-none d-flex align-items-center justify-content-center"
                                                            style={{
                                                                width: '150px',
                                                                height: '80px',
                                                                fontWeight: 'bold',
                                                                textAlign: 'center',
                                                                padding: 0,
                                                                backgroundColor: 'transparent',
                                                                border: '2px solid #feaf39',
                                                                transition: 'all 0.3s ease',
                                                            }}
                                                        >
                                                            <i className="bi bi-door-open me-2" style={{ fontSize: '1.5rem' }}></i>
                                                            <div style={{ fontSize: '1rem', wordWrap: 'break-word' }}>
                                                                {roomItem?.roomName || `Phòng ${key + 1}`}
                                                            </div>
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
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
