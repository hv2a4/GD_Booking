import React, { useState } from "react";
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecentlyViewed.css';

const RecentlyViewed = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const roomsPerPage = 3;
    const [rating, setRating] = useState(0); // Để lưu sao đánh giá của người dùng
    const [review, setReview] = useState(""); // Để lưu nội dung đánh giá
    const [hoveredRating, setHoveredRating] = useState(0);
    const mockBookings = [
        {
            id: "1",
            roomName: "Phòng Deluxe",
            imageUrl: "https://hoanghaihotel.vn/Data/images/tintuc/10032021170917-gioi-thieu-ve-khach-san-hoang-hai.jpg",
            checkInDate: "2024-12-01",
            checkOutDate: "2024-12-05",
            totalPrice: 2000000,
            rating: 4,
            username: "Nguyễn Văn A",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
            id: "2",
            roomName: "Phòng Standard",
            imageUrl: "https://hoanghaihotel.vn/Data/images/tintuc/10032021170917-gioi-thieu-ve-khach-san-hoang-hai.jpg",
            checkInDate: "2024-11-25",
            checkOutDate: "2024-11-28",
            totalPrice: 1500000,
            rating: 3,
            username: "Nguyễn Văn B",
            avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        {
            id: "3",
            roomName: "Phòng Suite",
            imageUrl: "https://hoanghaihotel.vn/Data/images/tintuc/10032021170917-gioi-thieu-ve-khach-san-hoang-hai.jpg",
            checkInDate: "2024-11-20",
            checkOutDate: "2024-11-23",
            totalPrice: 3000000,
            rating: 5,
            username: "Nguyễn Văn C",
            avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        {
            id: "4",
            roomName: "Phòng VIP",
            imageUrl: "https://hoanghaihotel.vn/Data/images/tintuc/10032021170917-gioi-thieu-ve-khach-san-hoang-hai.jpg",
            checkInDate: "2024-11-15",
            checkOutDate: "2024-11-18",
            totalPrice: 5000000,
            rating: 4
        }
    ];



    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const currentRooms = mockBookings.slice(
        currentPage * roomsPerPage,
        (currentPage + 1) * roomsPerPage
    );
    const handleRatingClick = (stars) => {
        setRating(stars);
    };

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
                            <img src={booking.imageUrl} className="card-img-top" alt={booking.roomName} />
                            <div className="card-body">
                                <h5 className="card-title">{booking.roomName}</h5>
                                <p className="card-text">
                                    <strong>Nhận phòng:</strong> {booking.checkInDate}
                                </p>
                                <p className="card-text">
                                    <strong>Trả phòng:</strong> {booking.checkOutDate}
                                </p>
                                <p className="custom-price-text">
                                    <strong>Tổng giá:</strong> {booking.totalPrice.toLocaleString()} VND
                                </p>
                                <p className="card-text">
                                    <strong>Đánh giá:</strong> {Array(booking.rating).fill("⭐").join("")}
                                </p>
                                <div className="text-center">
                                    <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target={`#reviewModal-${booking.id}`}>
                                        Đánh giá
                                    </button>
                                    <button className="btn btn-primary ms-2 btn-sm" data-bs-toggle="modal" data-bs-target={`#detailModal-${booking.id}`}>
                                        Chi tiết
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Modal Chi Tiết */}
                        <div
                            className="modal fade"
                            id={`detailModal-${booking.id}`}
                            tabIndex="-1"
                            aria-labelledby={`detailModalLabel-${booking.id}`}
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-headers modal-header">
                                        <h5 className="modal-title" id={`detailModalLabel-${booking.id}`}>
                                            Chi Tiết Phòng
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        {/* Phần thông tin phòng */}
                                        <div className="room-info mb-4">
                                            <h5>{booking.roomName}</h5>
                                            <p><strong>Loại giường:</strong> {booking.bedType || "Không xác định"}</p>
                                        </div>

                                        {/* Phần thời gian */}
                                        <div className="time-info mb-4">
                                            <p><strong>Nhận phòng:</strong> {booking.checkInDate}</p>
                                            <p><strong>Trả phòng:</strong> {booking.checkOutDate}</p>
                                        </div>

                                        {/* Phần giá phòng */}
                                        <div className="price-info mb-4">
                                            <p><strong>Tổng giá:</strong> {booking.totalPrice.toLocaleString()} VND</p>
                                        </div>

                                        {/* Phần tiện nghi */}
                                        <div className="amenities-info mb-4">
                                            <p><strong>Tiện nghi:</strong> {booking.amenities || "Chưa có thông tin"}</p>
                                        </div>

                                        {/* Phần đánh giá */}
                                        <div className="rating-info mb-4">
                                            <p><strong>Đánh giá:</strong> {Array(booking.rating).fill("⭐").join("")}</p>
                                        </div>
                                    </div>
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
                        <div className="modal fade" id={`reviewModal-${booking.id}`} tabIndex="-1" aria-labelledby={`reviewModalLabel-${booking.id}`} aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-headers modal-header">
                                        <h5 className="modal-title" id={`reviewModalLabel-${booking.id}`}>Đánh Giá Phòng</h5>
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
                    containerClassName={"pagination"}
                    activeClassName={"active"}
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
