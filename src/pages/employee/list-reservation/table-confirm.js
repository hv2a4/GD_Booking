import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { formatCurrency } from "../../../config/formatPrice";
import XacNhan from "./modalXacNhan";
import { Button } from "react-bootstrap";

const Confirm = ({ item }) => {
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const itemsPerPage = 10; // Số lượng bản ghi trên mỗi trang
    const totalPages = Math.ceil(item?.length / itemsPerPage); // Tổng số trang

    const formatDate = (dateString) => {
        return format(new Date(dateString), "dd-MM-yyyy HH:mm:ss");
    };

    // Lấy dữ liệu của trang hiện tại
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return item?.slice(startIndex, endIndex) || [];
    };

    // Xử lý khi chuyển trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Tạo phạm vi trang hiển thị (có thể thay đổi giới hạn này nếu cần)
    const pageRange = () => {
        const range = [];
        let startPage = currentPage - 2 > 0 ? currentPage - 2 : 1;
        let endPage = currentPage + 2 <= totalPages ? currentPage + 2 : totalPages;

        // Nếu có quá nhiều trang, chỉ hiển thị vài trang xung quanh trang hiện tại
        if (endPage - startPage < 4) {
            if (startPage === 1) endPage = Math.min(startPage + 4, totalPages);
            else if (endPage === totalPages) startPage = Math.max(endPage - 4, 1);
        }

        // Thêm các trang vào phạm vi
        for (let i = startPage; i <= endPage; i++) {
            range.push(i);
        }
        return range;
    };

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đặt phòng</th>
                        <th>Phòng</th>
                        <th>Khách hàng</th>
                        <th>Giờ nhận</th>
                        <th>Giờ trả</th>
                        <th>Tổng cộng</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {getCurrentPageItems().map((booking, index) => {
                        const roomNames = booking.bookingRooms
                            .map(room => room.room?.roomName.replace("Phòng ", ""))
                            .join(", ");
                        const totalPrice = booking.bookingRooms.reduce(
                            (total, room) => total + (room.price || 0),
                            0
                        );
                        return (
                            <tr key={index} className="tr-center">
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>{booking.id}</td>
                                <td>Phòng {roomNames}</td>
                                <td>{booking.accountDto.fullname}</td>
                                <td>{formatDate(booking.startAt)}</td>
                                <td>{formatDate(booking.endAt)}</td>
                                <td>{formatCurrency(totalPrice)}</td>
                                <td style={{ color: booking.statusPayment ? "green" : "red" }}>
                                    {booking.statusPayment ? "Đã thanh toán" : "Chưa thanh toán"}
                                </td>
                                <td className="d-flex">
                                    <XacNhan bookingRoom={booking.bookingRooms} />
                                    <div className="dropdown-center d-flex align-item-center">
                                        <button
                                            style={{ backgroundColor: "transparent", border: "none" }}
                                            className="btn dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown">
                                            <i className="fas fa-ellipsis-v"
                                                style={{ color: "black", fontSize: "15px", marginTop: "auto" }}></i>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-light">
                                            <li><a className="dropdown-item" href="#">Thêm sản phẩm, dịch vụ</a></li>
                                            <li><a className="dropdown-item" href="#">Cập nhật đặt phòng</a></li>
                                            <li><a className="dropdown-item" href="#">Hủy đặt phòng</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* Hiển thị phân trang */}
            <div className="pagination">
                {/* Hiển thị nút "Previous" */}
                {currentPage > 1 && (
                    <Button
                        variant="secondary"
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="page-link"
                        style={{ margin: "0 5px" }}
                    >
                        <i className="fas fa-angle-double-left text-secondary"></i>
                    </Button>
                )}

                {/* Hiển thị số trang */}
                {pageRange().map(page => (
                    <Button
                        key={page}
                        variant="success"
                        onClick={() => handlePageChange(page)}
                        className={`page-link ${currentPage === page ? "active" : ""}`}
                        style={{ margin: "0 5px" }}
                    >
                        {page}
                    </Button>
                ))}

                {/* Hiển thị nút "Next" */}
                {currentPage < totalPages && (
                    <Button
                        variant="secondary"
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="page-link"
                        style={{ margin: "0 5px" }}
                    >
                        <i className="fas fa-angle-double-right text-secondary"></i>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Confirm;