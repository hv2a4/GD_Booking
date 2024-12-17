import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecentlyViewed.css';
import Cookies from "js-cookie";
import { jwtDecode as jwt_decode } from "jwt-decode";
import HistoryBookings from "./callApi";
const RecentlyViewed = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const roomsPerPage = 3;
    const [rating, setRating] = useState(0); // Để lưu sao đánh giá của người dùng
    const [review, setReview] = useState(""); // Để lưu nội dung đánh giá
    const [hoveredRating, setHoveredRating] = useState(0);
    const [mockBookings, setMockBookings] = useState([]);
   
    // Lấy token từ cookies và decode
    const intervalRef = useRef(null);
    const tokens = Cookies.get("token") || null;
    const decodedToken = tokens ? jwt_decode(tokens) : null;
    
    useEffect(() => {
        const fetchBookings = async () => {
            if (!decodedToken?.id) {
                console.error("Invalid token or missing account ID.");
                setMockBookings([]);
                return;
            }

            try {
                // Gọi API lấy lịch sử đặt phòng
                const response = await HistoryBookings(decodedToken.id);
                console.log("API response:", response);

                // Kiểm tra nếu API trả về mảng, lưu vào state
                if (Array.isArray(response)) {
                    setMockBookings(response);
                } else {
                    console.error("API response is not an array:", response);
                    setMockBookings([]);
                }
            } catch (error) {
                console.error("Error fetching booking history:", error);
                setMockBookings([]);
            }
        };
         // Cleanup interval nếu decodedToken thay đổi
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Gọi API ngay lần đầu
        if (decodedToken?.id) {
            fetchBookings();
            // Thiết lập interval gọi API mỗi 15 giây
            intervalRef.current = setInterval(() => {
                console.log("Gọi API sau 15 giây...");
                fetchBookings();
            }, 15000); // 15 giây
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [decodedToken?.id]);

    // Xử lý khi người dùng đổi trang
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    // Lấy các mục hiển thị trên trang hiện tại
    const currentRooms = Array.isArray(mockBookings)
        ? mockBookings.slice(
            currentPage * roomsPerPage,
            (currentPage + 1) * roomsPerPage
        )
        : [];

    // Xử lý sự kiện khi người dùng đánh giá sao
    const handleRatingClick = (stars) => {
        setRating(stars);
    };

    // Xử lý sự kiện khi người dùng nhập đánh giá
    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };


    return (
        <div className="container mt-5">
            <h2 className="text-center text-warning mb-4">Lịch sử đặt phòng</h2>
            <div className="row mt-3">
                {currentRooms.map((booking) => (
                    <div key={booking.id} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <img src={booking.image} className="card-img-top" alt={booking.fullname} />
                            <div className="card-body">
                                <h5 className="card-title">{booking.bkFormat}</h5>
                                <p className="card-text">
                                    <strong>Nhận phòng:</strong> {booking.startAt} 14:00
                                </p>
                                <p className="card-text">
                                    <strong>Trả phòng:</strong> {booking.endAt} 12:00
                                </p>
                                <p className="custom-price-text">
                                    <strong>Tổng giá:</strong> {booking.totalBooking.toLocaleString()}  VND
                                </p>
                                <p className="card-text">
                                    <strong>Đánh giá:</strong> {booking.stars ? Array(booking.stars).fill("⭐").join("") : "Chưa đánh giá"}
                                </p>
                                <div className="text-center">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#reviewModal-${booking.bkId}`}
                                        disabled={booking.ivId == null} // Disable button if booking.ivId is null
                                    >
                                        Đánh giá
                                    </button>
                                    <button className="btn btn-primary ms-2 btn-sm" data-bs-toggle="modal" data-bs-target={`#detailModal-${booking.bkId}`}>
                                        Chi tiết
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Modal Chi Tiết */}
                        <div
                            className="modal fade"
                            id={`detailModal-${booking.bkId}`}
                            tabIndex="-1"
                            aria-labelledby={`detailModalLabel-${booking.bkId}`}
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                    {/* Modal Header */}
                                    <div className="modal-headers modal-header">
                                        <h5 className="modal-title" id={`detailModalLabel-${booking.bkId}`}>
                                            Chi Tiết Phòng
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>

                                    {/* Modal Body */}
                                    <div className="modal-body">
                                        <div className="container">
                                            {/* Row 1: Thông tin phòng */}
                                            <div className="row mb-4">
                                                <div className="col-md-4">
                                                    <h5>Thông tin đặt phòng</h5>
                                                    <br />
                                                    <p><strong>Mã Đặt Phòng:</strong> {booking.bkFormat}</p>
                                                    <p><strong>Ngày đặt:</strong> {booking.createAt} </p>
                                                    <p><strong>Nhận phòng:</strong> {booking.startAt} 14:00</p>
                                                    <p><strong>Trả phòng:</strong> {booking.endAt} 12:00</p>
                                                    <p><strong>Trạng thái:</strong> <span style={{ color: '#FEA116' }}>{booking.statusBkName}</span></p>
                                                </div>
                                                <div className="col-md-8">
                                                    <h5>Chi tiết phòng</h5>
                                                    <br />
                                                    <p><strong>Phòng:</strong> {booking.roomInfo}</p>
                                                    <p><strong>Tiền Phòng:</strong> {booking.totalRoom.toLocaleString()} VND </p>
                                                    <p><strong>Dịch vụ:</strong> {booking.combinedServiceNames || "Chưa sử dụng dịch vụ"}</p>
                                                    <p><strong>Tiền Dịch Vụ:</strong> {booking.combinedTotalServices ? booking.combinedTotalServices.toLocaleString() : "0"} VND</p>
                                                    <p><strong>Tổng giá:</strong> <span style={{ color: '#E60000 ' }}>{booking.totalBooking.toLocaleString()} VND</span> </p>
                                                </div>
                                            </div>
                                            {/* Row 6: Đánh giá */}
                                            <div className="row mb-4">
                                                <div className="col-md-12">
                                                    <p><strong>Nội dung đánh giá:</strong> {booking.content || "Chưa đánh giá"}</p>
                                                    <p><strong>Đánh giá:</strong> {booking.stars ? Array(booking.stars).fill("⭐").join("") : "Chưa đánh giá"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="modal-footers modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Đóng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Đánh Giá */}
                        <div className="modal fade" id={`reviewModal-${booking.bkId}`} tabIndex="-1" aria-labelledby={`reviewModalLabel-${booking.bkId}`} aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-headers modal-header">
                                        <h5 className="modal-title" id={`reviewModalLabel-${booking.bkId}`}>Đánh Giá Phòng</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {/* Avatar và Tên người dùng */}
                                        <div className="d-flex align-items-center mb-3">
                                            <img src={booking.avatarUrl} alt={booking.username} className="rounded-circle" style={{ width: "50px", height: "50px", marginRight: "10px" }} />
                                            <div>
                                                <h6>{booking.username}</h6>
                                                <p>Mã hóa đơn: <strong>{booking.invoiceId}</strong></p>
                                            </div>
                                        </div>

                                        {/* Sao đánh giá */}
                                        <div>
                                            <h6>Đánh giá sao:</h6>
                                            <div>
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <button
                                                        key={star}
                                                        onClick={() => handleRatingClick(star)}
                                                        style={{ fontSize: '30px', width: '40px', height: '40px', padding: 0, border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                                                    >
                                                        {/* Dùng ký tự sao Unicode */}
                                                        <span className={`star ${rating >= star || hoveredRating >= star ? 'filled' : ''}`}>&#9733;</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>


                                        {/* Nội dung đánh giá */}
                                        <div className="mt-3">
                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                value={review}
                                                onChange={handleReviewChange}
                                                placeholder="Nhập nội dung đánh giá..."
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-footers modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                        <button type="button" className="btn btn-primary">Gửi đánh giá</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Phân trang */}
            <div className="d-flex justify-content-center mt-4">
                <ReactPaginate
                    previousLabel={"← Trước"}
                    nextLabel={"Tiếp →"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(mockBookings.length / roomsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"} // Sử dụng Bootstrap class
                    activeClassName={"active"} // Bootstrap đã có style cho active
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                />
            </div>

        </div>
    );
};

export default RecentlyViewed;
