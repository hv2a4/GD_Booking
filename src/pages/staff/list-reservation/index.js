import React from "react";
import LayoutStaff from "../../../components/layout/staff";
import DatPhong from "./modalDatPhong";
import XacNhan from "./modalXacNhan";
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";
import ModalNhanPhong from "../floor_map/modalNhanPhong";

const ListReservation = () => {
    const [date, setDate] = useState(null);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
    };
    const [ShowInserRoom, setShowInsertRoom] = useState(false);

    const handleShowModalInserRoom = () => {
        setShowInsertRoom(true);
    };
    const handleCloseModalInserRoom = () => {
        setShowInsertRoom(false);
    };
    const [showModalNhanPhong, setShowModalNhanPhong] = useState(false);

    const handleShowModalNhanPhong = () => {
        setShowModalNhanPhong(true);
    }
    const handleCloseModalNhanPhong = () => {
        setShowModalNhanPhong(false);
    }
    return (
        <LayoutStaff>
            <div className="container-fluid">
                <div className="toolbar-item justify-content-end mb-3 d-flex align-items-center" style={{ flexWrap: "wrap" }}>
                    <div className="toolbar-select mb-2 me-3" style={{ flex: "0 0 auto" }}>
                        <select className="form-select" aria-label="Default select example">
                            <option value="">Chọn thời gian</option>
                            <option value="1">Ngày</option>
                            <option value="2">Tuần</option>
                            <option value="3">Tháng</option>
                        </select>
                    </div>
                    <div className="date-picker-container mb-2" style={{ flex: "0 1 auto"}}>
                        <DatePicker
                            id="date-picker"
                            selected={date}
                            onChange={handleDateChange}
                            className="custom-date-picker"
                            style={{minHeight: "44px"}}
                        />
                    </div>
                    <button
                        className="mx-3 mb-2"
                        onClick={handleShowModalInserRoom}
                        style={{ borderRadius: "0.6rem" }}>
                        <i className="fa fa-plus icon-btn"></i>
                        <span className="m-2">Đặt phòng</span>
                    </button>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <ul className="nav nav-pills mb-3 flex-wrap flex-column flex-lg-row override-flex-wrap" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link btn-choxacnhan active" id="pills-choxacnhan-tab"
                                data-bs-toggle="pill" data-bs-target="#pills-choxacnhan"
                                type="button" role="tab"
                                aria-controls="pills-choxacnhan"
                                aria-selected="false">Chờ xác nhận</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link btn-datra" id="pills-datra-tab"
                                data-bs-toggle="pill" data-bs-target="#pills-datra"
                                type="button" role="tab" aria-controls="pills-datra"
                                aria-selected="false">Đã trả</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link btn-dattruoc"
                                id="pills-dattruoc-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-dattruoc" type="button"
                                role="tab" aria-controls="pills-dattruoc"
                                aria-selected="false">Đã đặt trước</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link btn-dangsudung"
                                id="pills-dangsudung-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-dangsudung" type="button"
                                role="tab" aria-controls="pills-dangsudung"
                                aria-selected="false">Đang sử dụng</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link btn-quagio" id="pills-quagio-tab"
                                data-bs-toggle="pill" data-bs-target="#pills-quagio"
                                type="button" role="tab" aria-controls="pills-quagio"
                                aria-selected="false">Quá giờ trả</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link btn-chotaohoadon"
                                id="pills-chotaohoadon-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-chotaohoadon" type="button"
                                role="tab" aria-controls="pills-chotaohoadon"
                                aria-selected="false">Chờ tạo hoá đơn</button>
                        </li>
                    </ul>
                    <div className="product-search">
                        <div className="form-control-wrapper">
                            <div className="form-control autocomplete">
                                <input type="text" className="input-unstyled ng-pristine ng-valid ng-touched" id="cart-product-search-id" placeholder="Tìm theo mã, tên khách hàng" />
                            </div>
                            <div className="form-control-prefix">
                                <i className="fa fa-search icon-mask" style={{ marginLeft: "10px" }}></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-choxacnhan"
                        role="tabpanel" aria-labelledby="pills-choxacnhan-tab">
                        <div className="table-responsive" style={{ minHeight: "470px" }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã đặt phòng</th>
                                        <th>Phòng</th>
                                        <th>Khách đặt</th>
                                        <th>Giờ nhận</th>
                                        <th>Giờ trả</th>
                                        <th>Tổng cộng</th>
                                        <th>Khách đã trả</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="tr-center">
                                        <td>1</td>
                                        <td>DP000011</td>
                                        <td></td>
                                        <td>Khách hàng A</td>
                                        <td>19/12, 11:20</td>
                                        <td>24/12, 14:20</td>
                                        <td>9,300,000</td>
                                        <td>9,300,000</td>
                                        <td className="d-flex">
                                            <XacNhan />
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
                                                    <li><a className="dropdown-item" href="#">Sửa đặt phòng</a></li>
                                                    <li><a className="dropdown-item" href="#">Hủy đặt phòng</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-datra" role="tabpanel"
                        aria-labelledby="pills-datra-tab">
                        <div className="table-responsive" style={{ minHeight: "470px" }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã đặt phòng</th>
                                        <th>Phòng</th>
                                        <th>Khách đặt</th>
                                        <th>Giờ nhận</th>
                                        <th>Giờ trả</th>
                                        <th>Tổng cộng</th>
                                        <th>Khách đã trả</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="tr-center">
                                        <td>1</td>
                                        <td>DP000011</td>
                                        <td>P.309</td>
                                        <td>Khách hàng A</td>
                                        <td>19/12, 11:20</td>
                                        <td>24/12, 14:20</td>
                                        <td>9,300,000</td>
                                        <td>9,300,000</td>
                                        <td className="d-flex align-items-center">
                                            <span>Đã thanh toán</span>
                                            <div className="dropdown-center">
                                                <button
                                                    style={{ backgroundColor: "transparent", border: "none" }}
                                                    className="btn dropdown-toggle"
                                                    type="button"
                                                    data-bs-toggle="dropdown">
                                                    <i
                                                        className="fas fa-ellipsis-v"
                                                        style={{ color: "black", fontSize: "15px", marginTop: "auto" }}></i>
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-light">
                                                    <li><a className="dropdown-item" href="#">Xem chi tiết</a></li>
                                                    <li><a className="dropdown-item" href="#">Xem lịch sử hóa đơn</a></li>
                                                    <li><a className="dropdown-item" href="#">Hủy đặt phòng</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-dattruoc" role="tabpanel"
                        aria-labelledby="pills-dattruoc-tab">
                        <div className="table-responsive" style={{ minHeight: "470px" }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã đặt phòng</th>
                                        <th>Phòng</th>
                                        <th>Khách đặt</th>
                                        <th>Giờ nhận</th>
                                        <th>Giờ trả</th>
                                        <th>Tổng cộng</th>
                                        <th>Khách đã trả</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="tr-center">
                                        <td>1</td>
                                        <td>DP000011</td>
                                        <td>P.309</td>
                                        <td>Khách hàng A</td>
                                        <td>19/12, 11:20</td>
                                        <td>24/12, 14:20</td>
                                        <td>9,300,000</td>
                                        <td>9,300,000</td>
                                        <td className="d-flex">
                                            <button className="btn-tt"
                                                style={{
                                                    fontSize: '12px',
                                                    width: '127px',
                                                    height: '36px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: '#02963d'
                                                }} onClick={handleShowModalNhanPhong}>Nhận phòng</button>
                                            <div className="dropdown-center">
                                                <button
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        border: 'none'
                                                    }}
                                                    className="btn dropdown-toggle"
                                                    type="button"
                                                    data-bs-toggle="dropdown">
                                                    <i
                                                        className="fas fa-ellipsis-v"
                                                        style={{
                                                            color: 'black',
                                                            fontSize: '15px',
                                                            marginTop: 'auto'
                                                        }}></i>
                                                </button>
                                                <ul
                                                    className="dropdown-menu dropdown-menu-light ">
                                                    <li><a className="dropdown-item"
                                                        href="#">Thêm sản phẩm, dịch
                                                        vụ</a></li>
                                                    <li><a className="dropdown-item"
                                                        href="#">Sửa đặt
                                                        phòng</a></li>
                                                    <li><a className="dropdown-item"
                                                        href="#">Hủy đặt
                                                        phòng</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-dangsudung" role="tabpanel"
                        aria-labelledby="pills-dangsudung-tab">
                        <div className="table-responsive" style={{ minHeight: "470px" }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã đặt phòng</th>
                                        <th>Phòng</th>
                                        <th>Khách đặt</th>
                                        <th>Giờ nhận</th>
                                        <th>Giờ trả</th>
                                        <th>Tổng cộng</th>
                                        <th>Khách đã trả</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="tr-center">
                                        <td>1</td>
                                        <td>DP000011</td>
                                        <td>P.309</td>
                                        <td>Khách hàng A</td>
                                        <td>19/12, 11:20</td>
                                        <td>24/12, 14:20</td>
                                        <td>9,300,000</td>
                                        <td>9,300,000</td>
                                        <td className="d-flex">
                                            <Link to="/staff/edit-room">
                                                <button className="btn-tt"
                                                    style={{
                                                        fontSize: '12px',
                                                        width: '127px',
                                                        height: '36px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: '#04aeba'
                                                    }}>Trả phòng</button>
                                            </Link>
                                            <div className="dropdown-center">
                                                <button
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        border: 'none'
                                                    }}
                                                    className="btn dropdown-toggle"
                                                    type="button"
                                                    data-bs-toggle="dropdown">
                                                    <i
                                                        className="fas fa-ellipsis-v"
                                                        style={{
                                                            color: 'black',
                                                            fontSize: '15px',
                                                            marginTop: 'auto'
                                                        }}></i>
                                                </button>
                                                <ul
                                                    className="dropdown-menu dropdown-menu-light ">
                                                    <li><a className="dropdown-item"
                                                        href="#">Thêm sản phẩm, dịch
                                                        vụ</a></li>
                                                    <li><a className="dropdown-item"
                                                        href="#">Sửa đặt
                                                        phòng</a></li>
                                                    <li><a className="dropdown-item"
                                                        href="#">Hủy đặt
                                                        phòng</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-quagio" role="tabpanel"
                        aria-labelledby="pills-quagio-tab">
                        <div className="table-responsive" style={{ minHeight: "470px" }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã đặt phòng</th>
                                        <th>Phòng</th>
                                        <th>Khách đặt</th>
                                        <th>Giờ nhận</th>
                                        <th>Giờ trả</th>
                                        <th>Tổng cộng</th>
                                        <th>Khách đã trả</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="tr-center">
                                        <td>1</td>
                                        <td>DP000011</td>
                                        <td>P.309</td>
                                        <td>Khách hàng A</td>
                                        <td>19/12, 11:20</td>
                                        <td>24/12, 14:20</td>
                                        <td>9,300,000</td>
                                        <td>9,300,000</td>
                                        <td className="d-flex">
                                            <Link to="/staff/edit-room">
                                                <button className="btn-tt"
                                                    style={{
                                                        fontSize: '12px',
                                                        width: '127px',
                                                        height: '36px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: '#04aeba'
                                                    }}>Trả phòng</button>
                                            </Link>
                                            <div className="dropdown-center">
                                                <button
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        border: 'none'
                                                    }}
                                                    className="btn dropdown-toggle"
                                                    type="button"
                                                    data-bs-toggle="dropdown">
                                                    <i
                                                        className="fas fa-ellipsis-v"
                                                        style={{
                                                            color: 'black',
                                                            fontSize: '15px',
                                                            marginTop: 'auto'
                                                        }}></i>
                                                </button>
                                                <ul
                                                    className="dropdown-menu dropdown-menu-light ">
                                                    <li><a className="dropdown-item"
                                                        href="#">Thêm sản phẩm, dịch
                                                        vụ</a></li>
                                                    <li><a className="dropdown-item"
                                                        href="#">Sửa đặt
                                                        phòng</a></li>
                                                    <li><a className="dropdown-item"
                                                        href="#">Hủy đặt
                                                        phòng</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="tab-pane fade" id="pills-chotaohoadon"
                        role="tabpanel" aria-labelledby="pills-chotaohoadon-tab">
                        <div className="table-responsive" style={{ minHeight: "470px" }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã đặt phòng</th>
                                        <th>Phòng</th>
                                        <th>Khách đặt</th>
                                        <th>Giờ nhận</th>
                                        <th>Giờ trả</th>
                                        <th>Tổng cộng</th>
                                        <th>Khách đã trả</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="tr-center">
                                        <td>1</td>
                                        <td>DP000011</td>
                                        <td>P.309</td>
                                        <td>Khách hàng A</td>
                                        <td>19/12, 11:20</td>
                                        <td>24/12, 14:20</td>
                                        <td>9,300,000</td>
                                        <td>9,300,000</td>
                                        <td className="d-flex">
                                            <button className="btn-tt"
                                                style={{
                                                    fontSize: '12px',
                                                    width: '127px',
                                                    height: '36px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: '#04ba25'
                                                }}>Thanh toán</button>
                                            <div className="dropdown-center">
                                                <button
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        border: 'none'
                                                    }}
                                                    className="btn dropdown-toggle"
                                                    type="button"
                                                    data-bs-toggle="dropdown">
                                                    <i
                                                        className="fas fa-ellipsis-v"
                                                        style={{
                                                            color: 'black',
                                                            fontSize: '15px',
                                                            marginTop: 'auto'
                                                        }}></i>
                                                </button>
                                                <ul
                                                    className="dropdown-menu dropdown-menu-light ">
                                                    <li><a className="dropdown-item"
                                                        href="#">Thêm sản phẩm, dịch
                                                        vụ</a></li>
                                                    <li><a className="dropdown-item"
                                                        href="#">Sửa đặt
                                                        phòng</a></li>
                                                    <li><a className="dropdown-item"
                                                        href="#">Hủy đặt
                                                        phòng</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <div className="d-flex spacer pb-4 pt-4 flex-center-between ng-star-inserted">
                    <div className="spacer align-items-center">
                        <span>Tổng <strong className="text-success">1</strong> đặt phòng</span>
                        <button className="btn btn-sm btn-outline-success">
                            <i className="fa fa-rotate icon-btn"></i>
                            <span>Tải lại</span>
                        </button>
                    </div>
                </div>
            </div>
            {ShowInserRoom && <DatPhong onClose={handleCloseModalInserRoom} />}
            {showModalNhanPhong && <ModalNhanPhong onClose={handleCloseModalNhanPhong} />}
        </LayoutStaff>
    )
}

export default ListReservation;