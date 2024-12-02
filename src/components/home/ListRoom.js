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
import "../../assets/css/custom/cardBorder.css";
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
    // Tính toán tổng số trang
    const totalPageCount = Math.ceil(selectedRooms.length / roomsPerPage);

    // Hàm tính danh sách phòng hiện tại cho danh sách phòng đã chọn
    const currentRooms = selectedRooms.slice(
        (currentPageIndex - 1) * roomsPerPage,
        currentPageIndex * roomsPerPage
    );

    // Xử lý thay đổi trang
    const handlePageChanges = (pageIndex) => {
        setCurrentPageIndex(pageIndex);
    };

    // Hàm gọi API danh sách phòng
    const fetchRooms = async () => {
        try {
            const res = await getListRoom(currentPage - 1, pageSize); // Lấy phòng dựa trên trang hiện tại
            setTypeRoom(res.rooms);
            setTotalPages(res.totalPages); // Tổng số trang từ API
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

    const handleSelectRoom = ({ Object, roomId }) => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        console.log("Dữ liệu item: ", Object);  // Kiểm tra dữ liệu item
        console.log("Dữ liệu roomId: ", roomId);  // Kiểm tra roomId

        // Kiểm tra người dùng đã đăng nhập chưa
        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'Yêu cầu đăng nhập',
                text: 'Bạn cần đăng nhập để thực hiện chức năng đặt phòng.',
                confirmButtonText: 'Đăng nhập ngay',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/account"); // Chuyển hướng đến trang đăng nhập
                }
            });
            return; // Ngừng hàm nếu chưa đăng nhập
        }

        // Tìm đối tượng phòng dựa trên roomId
        const selectedRoomIndex = Object.roomId.indexOf(roomId);

        if (selectedRoomIndex === -1) {
            console.log("Không tìm thấy phòng với roomId:", roomId);
            return; // Ngừng nếu không tìm thấy phòng
        }

        // Lấy thông tin phòng
        const roomDetails = {
            roomId: roomId,
            roomName: Object.roomName[selectedRoomIndex],
            price: Object.price,
            typeRoomName: Object.typeRoomName,
            description: Object.description,
            imageList: Object.imageList,
        };

        console.log("Thông tin phòng đã chọn: ", roomDetails);

        // Cập nhật danh sách phòng đã chọn
        setSelectedRooms((prev) => {
            // Kiểm tra nếu phòng đã được chọn thì loại bỏ, nếu chưa thì thêm vào
            if (prev.some((r) => r.roomId === roomDetails.roomId)) {
                return prev.filter((r) => r.roomId !== roomDetails.roomId); // Loại bỏ phòng nếu đã chọn
            }
            return [...prev, roomDetails]; // Thêm phòng mới vào danh sách
        });
    };

    const handleRemoveRoom = (roomId) => {
        setSelectedRooms((prev) => {
            const updatedRooms = prev.filter((room) => room.roomId !== roomId);
            // Kiểm tra nếu số phòng còn lại không đủ cho trang hiện tại, chuyển về trang đầu tiên
            if (updatedRooms.length <= (currentPageIndex - 1) * roomsPerPage) {
                setCurrentPageIndex(1); // Chuyển về trang đầu tiên
            }
            return updatedRooms;
        });
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

    // Hàm xử lý lọc phòng
    const handleDataFilter = async (startDate, endDate, guestLimit) => {
        console.log("handleDataFilter nhận giá trị:", startDate, endDate, guestLimit);

        // Cập nhật dữ liệu lọc vào state
        setDataFilterBook({ startDate, endDate, guestLimit });
        setCurrentPage(1); // Reset về trang đầu
        setDates({ checkin: startDate, checkout: endDate });

        // Gọi API lọc và cập nhật danh sách phòng
        try {
            const res = await getFilterBooking(startDate, endDate, guestLimit, 1, pageSize); // Trang đầu tiên
            setTypeRoom(res.content); // Cập nhật danh sách phòng
            setTotalPages(res.totalPages); // Cập nhật tổng số trang từ API
        } catch (error) {
            console.error("Lỗi khi gọi API filterBooking:", error);
        }
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

    const handleDeselectRoom = (roomId) => {
        // Logic to deselect the room
        setSelectedRooms((prevSelectedRooms) => prevSelectedRooms.filter((room) => room.roomId !== roomId));
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
                                <div className="row border-cutom">
                                    {/* Phần hiển thị phòng */}
                                    <div className="room-item rounded overflow-hidden col-md-4" style={{ padding: '0' }}>
                                        <div className="position-relative">
                                            <img
                                                className="img-fluid w-100"
                                                style={{ height: '271px' }}
                                                src={item?.imageList?.[0]}
                                                alt={item?.typeRoomName || "Room Image"}
                                            />
                                            <div className="d-flex align-items-center position-absolute start-0 top-100 translate-middle-y ms-4">
                                                <small className="bg-warning text-white rounded py-1 px-3">
                                                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item?.price)}/ <strong>Ngày</strong>
                                                </small>
                                            </div>
                                        </div>

                                        {/* Thông tin phòng */}
                                        <div className="p-4 mt-2" style={{ borderRight: '1px soild' }}>
                                            <h5 className="mb-3"><strong>{item?.typeRoomName}</strong></h5>
                                            <div className="mb-3" style={{ fontSize: "1rem" }}>
                                                <strong>Sức chứa: </strong>Tối đa {item?.guestLimit} người
                                            </div>

                                            {/* Tiện nghi phòng */}
                                            <div className="mb-3">
                                                <strong>Tiện nghi phòng:</strong>
                                                <div className="d-flex flex-wrap mt-2">
                                                    {item?.amenitiesDetails?.slice(0, 3).map((amenity, idx) => (
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
                                                <div className="d-flex justify-content-between mt-4">
                                                    <Button className="btn btn-sm btn-primary rounded py-2 px-4" onClick={() => getDataDetail(item.typeRoomId)}>
                                                        Chi tiết
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Danh sách đặt phòng */}
                                    <div className="col-12 col-md-8">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card border-0">
                                                    <div className="card-header text-center bg-white">
                                                        <h3>Danh sách phòng</h3>
                                                    </div>
                                                    <div className="card-body bg-white">
                                                        {/* Nút sổ danh sách phòng trên màn hình điện thoại */}
                                                        <button
                                                            className="btn btn-primary d-block d-md-none w-100 mb-3"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#roomList"
                                                            aria-expanded="false"
                                                            aria-controls="roomList"
                                                        >
                                                            Danh sách phòng
                                                        </button>

                                                        {/* Danh sách phòng sẽ sổ xuống trên màn hình điện thoại */}
                                                        <div className="collapse d-md-block" id="roomList">
                                                            <ul className="list-group">
                                                                {item?.roomId?.length > 0 ? (
                                                                    item.roomId.map((roomId, subIndex) => {
                                                                        const isRoomSelected = selectedRooms.some((room) => room.roomId === roomId);

                                                                        return (
                                                                            <li
                                                                                className={`list-group-item ${isRoomSelected ? 'list-group-item-secondary' : ''}`}
                                                                                key={`${roomId}-${subIndex}`}  // Sử dụng roomId và subIndex làm key duy nhất
                                                                                className="d-flex justify-content-between align-items-center py-3 px-2"
                                                                                aria-disabled={isRoomSelected}
                                                                            >
                                                                                <span>{item.roomName[subIndex]}</span>
                                                                                <button
                                                                                    className={`btn ${isRoomSelected ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                                                                                    onClick={() => {
                                                                                        if (isRoomSelected) {
                                                                                            handleDeselectRoom(roomId);
                                                                                        } else {
                                                                                            handleSelectRoom({ Object: item, roomId: roomId });
                                                                                        }
                                                                                    }}
                                                                                    disabled={isRoomSelected}
                                                                                    style={{
                                                                                        fontSize: '12px',
                                                                                    }}
                                                                                >
                                                                                    {isRoomSelected ? 'Bỏ chọn' : 'Chọn phòng'}
                                                                                </button>
                                                                            </li>
                                                                        );
                                                                    })
                                                                ) : (
                                                                    <li className="list-group-item text-center">Không có phòng nào để hiển thị.</li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </div>
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
                        Trang {currentPage} trên {totalPages}
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
            {
                selectedRooms.length > 0 && (
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
                )
            }

            <RoomDetail show={showModal} onClose={() => setShowModal(false)} room={roomItem} />
        </div >
    );
}
