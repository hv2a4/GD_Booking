import React, { useEffect } from "react";
import Layoutemployee from "../../../components/layout/employee";
import DatPhong from "./modalDatPhong";
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from "react-bootstrap";
import Confirm from "./table-confirm";
import CheckedOut from "./table-checked-out";
import Reserved from "./table-reserved";
import InUse from "./table-in-use";
import OverTime from "./table-overtime";
import CreateInvoice from "./create-invoice";
import { format } from "date-fns";
import { Cookies } from "react-cookie";
import { getAllBooking } from "../../../services/employee/order-room-manager";
import { useLocation } from 'react-router-dom';

const ListReservation = () => {
    const [filterType, setFilterType] = useState(null);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [ShowInserRoom, setShowInsertRoom] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const cookie = new Cookies();
    const token = cookie.get("token");
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const searchBookings = (bookings, searchTerm) => {
        if (!searchTerm) return bookings; // Nếu không có từ khóa tìm kiếm, trả về tất cả các bookings

        return bookings.filter((booking) => {
            const customerName = booking.accountDto?.fullname?.toLowerCase() || '';
            const bookingCode = booking.id?.toString().toLowerCase() || '';

            return customerName.includes(searchTerm.toLowerCase()) || bookingCode.includes(searchTerm.toLowerCase());
        });
    };

    // Áp dụng filterBookings và searchBookings
    const filteredAndSearchedBookings = searchBookings(bookings, searchTerm);

    useEffect(() => {
        handleBooking(filterType, formatDateTime(startDate), formatDateTime(endDate), token);
    }, [filterType, startDate, endDate, location,filteredBookings]);

    const handleStartDateChange = (selectedDate) => {
        setStartDate(selectedDate);
    };
    const handleEndDateChange = (selectedDate) => {
        setEndDate(selectedDate);
    };

    const handleShowModalInserRoom = () => {
        setShowInsertRoom(true);
    };
    const handleCloseModalInserRoom = () => {
        setShowInsertRoom(false);
    };

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const handleReload = () => {
        handleBooking(filterType, formatDateTime(startDate), formatDateTime(endDate), token);
    }

    const handleBooking = async (filterType, startDate, endDate, token) => {
        const data = await getAllBooking(filterType, startDate, endDate, token);
        if (data) {
            setBookings(data);
            setFilteredBookings(filterBookings(filteredAndSearchedBookings));
        }
    }

    const formatDateTime = (date) => {
        if (!date || isNaN(new Date(date))) {
            return null;
        }
        return format(new Date(date), 'yyyy-MM-dd');
    };
    const filterBookings = (bookings) => {
        return bookings.filter((booking) => {
            // Kiểm tra nếu tất cả các phòng đều có checkIn === null
            const allCheckInNull = booking.bookingRooms?.every(room => room.checkIn === null) ?? false;

            // Giữ lại nếu có ít nhất một phòng có checkIn khác null
            return !allCheckInNull;
        });
    };


    return (
        <Layoutemployee>
            <div className="container-fluid">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <div className="product-search">
                        <div className="form-control-wrapper">
                            <div className="form-control autocomplete">
                                <input
                                    type="text"
                                    className="input-unstyled"
                                    placeholder="Tìm theo mã, tên khách hàng"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="form-control-prefix">
                                <i className="fa fa-search icon-mask" style={{ marginLeft: "10px" }}></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="toolbar-item justify-content-end mb-3 d-flex align-items-center" style={{ flexWrap: "wrap" }}>
                    <div className="toolbar-select mb-2 me-3" style={{ flex: "0 0 auto" }}>
                        <select
                            className="form-select"
                            value={filterType}
                            onChange={handleFilterChange}
                            aria-label="Default select example"
                        >
                            <option value="">Chọn thời gian</option>
                            <option value="1">Ngày</option>
                            <option value="2">Tuần</option>
                            <option value="3">Tháng</option>
                        </select>
                    </div>
                    <div className="date-picker-container mb-2 me-2" style={{ flex: "0 1 auto" }}>
                        <DatePicker
                            id="date-picker"
                            selected={startDate}
                            placeholderText="Chọn ngày bắt đầu"
                            onChange={handleStartDateChange}
                            className="custom-date-picker"
                            style={{ minHeight: "44px" }}
                        />
                    </div>
                    <div className="date-picker-container mb-2" style={{ flex: "0 1 auto" }}>
                        <DatePicker
                            id="date-picker"
                            selected={endDate}
                            placeholderText="Chọn ngày kết thúc"
                            onChange={handleEndDateChange}
                            className="custom-date-picker"
                            style={{ minHeight: "44px" }}
                        />
                    </div>
                    <Button
                        className="mx-3 mb-2"
                        onClick={handleShowModalInserRoom}
                        variant="success">
                        <i className="fa fa-plus icon-btn"></i>
                        <span className="m-2">Đặt phòng</span>
                    </Button>
                </div>
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="pills-choxacnhan-tab"
                            data-bs-toggle="pill" data-bs-target="#pills-choxacnhan"
                            type="button" role="tab"
                            aria-controls="pills-choxacnhan"
                            aria-selected="false">Chờ xác nhận</button>
                        <button class="nav-link" id="pills-datra-tab"
                            data-bs-toggle="pill" data-bs-target="#pills-datra"
                            type="button" role="tab" aria-controls="pills-datra"
                            aria-selected="false">Đã trả</button>
                        <button class="nav-link" id="pills-dattruoc-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-dattruoc" type="button"
                            role="tab" aria-controls="pills-dattruoc"
                            aria-selected="false">Đã đặt trước</button>
                        <button class="nav-link" id="pills-dangsudung-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-dangsudung" type="button"
                            role="tab" aria-controls="pills-dangsudung"
                            aria-selected="false">Đang sử dụng</button>
                        <button class="nav-link" id="pills-quagio-tab"
                            data-bs-toggle="pill" data-bs-target="#pills-quagio"
                            type="button" role="tab" aria-controls="pills-quagio"
                            aria-selected="false">Quá giờ trả</button>
                        <button class="nav-link" id="pills-chotaohoadon-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-chotaohoadon" type="button"
                            role="tab" aria-controls="pills-chotaohoadon"
                            aria-selected="false">Chờ tạo hoá đơn</button>

                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="pills-choxacnhan"
                        role="tabpanel" aria-labelledby="pills-choxacnhan-tab">
                        <Confirm item={filteredAndSearchedBookings.filter((e) => e.statusBookingDto?.id === 2)} />
                    </div>
                    <div className="tab-pane fade" id="pills-datra" role="tabpanel"
                        aria-labelledby="pills-datra-tab">
                        <CheckedOut item={filteredAndSearchedBookings.filter((e) => e.statusBookingDto?.id === 8)} />
                    </div>
                    <div className="tab-pane fade" id="pills-dattruoc" role="tabpanel"
                        aria-labelledby="pills-dattruoc-tab">
                        <Reserved item={filteredAndSearchedBookings.filter((e) => e.statusBookingDto?.id === 4)} />
                    </div>
                    <div className="tab-pane fade" id="pills-dangsudung" role="tabpanel"
                        aria-labelledby="pills-dangsudung-tab">
                        <InUse item={filteredBookings} />
                    </div>
                    <div className="tab-pane fade" id="pills-quagio" role="tabpanel"
                        aria-labelledby="pills-quagio-tab">
                        <OverTime item={filteredAndSearchedBookings.filter(
                            (e) => e.statusBookingDto?.id === 4 && new Date(e.endAt) < new Date()
                        )} />
                    </div>
                    <div className="tab-pane fade" id="pills-chotaohoadon"
                        role="tabpanel" aria-labelledby="pills-chotaohoadon-tab">
                        <CreateInvoice />
                    </div>
                </div>


                <div className="tab-content" id="pills-tabContent">

                </div>
                <div className="d-flex spacer pb-4 pt-4 flex-center-between ng-star-inserted">
                    <div className="spacer align-items-center">
                        <span>Tổng <strong className="text-success">1</strong> đặt phòng</span>
                        <button className="btn btn-sm btn-outline-success" onClick={handleReload}>
                            <i className="fa fa-rotate icon-btn"></i>
                            <span>Tải lại</span>
                        </button>
                    </div>
                </div>
            </div>
            {ShowInserRoom && <DatPhong onClose={handleCloseModalInserRoom} />}
        </Layoutemployee>
    )
}

export default ListReservation;