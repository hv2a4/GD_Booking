import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { getBookingRoomIds, getBookingRoomInformation } from "../../../../services/employee/booking-manager";
import Alert from "../../../../config/alert";
import { formatDate, formatDateTime } from "../../../../config/formatPrice";
import InsertCustomer from "../modalInsertCustomer";
import AlertComfirm from "../../../../config/alert/comfirm";
import { deleteCustomer } from "../../../../services/employee/customer";

const TTNhanPhong = ({ onHide, bookingRoomIds }) => {
    const [showModalInsertCustomer, setShowModalInsertCustomer] = useState(false);
    const [showModalUpdateCustomer, setShowModalUpdateCustomer] = useState(false);
    const [isSelect, setIsSelect] = useState({});
    const [customerInformation, setCustomerInformation] = useState([]);
    const [bookingRoom, setBookingRoom] = useState([]);
    const [alert, setAlert] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(2);
    useEffect(() => {
        handleCustomer();
        handleBookingRoom();
    }, [bookingRoomIds]);

    const handleShowModalInsertCustomer = () => {
        setShowModalInsertCustomer(true);
    }

    const handleShowModalUpdateCustomer = (item) => {
        setIsSelect(item);
        setShowModalUpdateCustomer(true);
    }
 

    const handleCloseModalInsertCustomer = () => {
        setShowModalInsertCustomer(false);
        setShowModalUpdateCustomer(false);
    }
    const handleDeleteCustomer = async (item) => {
        const confirmation = await AlertComfirm.confirm({
            type: "warning",
            title: "Xác nhận xóa",
            text: "Bạn có chắc chắn muốn xóa khách hàng này không?",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });
        if (confirmation) {
            try {
                const response = await deleteCustomer(item.customerInformationDto.id, item.bookingRoomDto.id); 
                if (response) {
                    setAlert({ type: "success", title: "Xóa thành công!" });
                    handleCustomer();
                } else {
                    setAlert({ type: "error", title: "Xóa thất bại!" });
                }
            } catch (error) {
                setAlert({ type: "error", title: "Đã xảy ra lỗi khi xóa!" });
            }
        }
    };
    
    const handleCloseTTNhanPhong = () => {
        onHide();
    }
    const handleBookingRoom = async () => {
        const idBookingRoom = bookingRoomIds.join(',');
        const data = await getBookingRoomIds(idBookingRoom);

        if (data) {
            setBookingRoom(data);
        } else {
            setAlert({ type: "error", title: "Lỗi! Dữ liệu này không có" });
        }

    }
    const handleCustomer = async () => {
        const idBookingRoom = bookingRoom.map((e) => e.id);
        const idBookingRoomString = idBookingRoom.join(",");
        const data = await getBookingRoomInformation(idBookingRoomString);
        setCustomerInformation(data);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = customerInformation.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div className="modal-content modal-fill">
                <Modal.Header closeButton>
                    {alert && <Alert type={alert.type} title={alert.title} />}
                    <Modal.Title id="exampleModalLabel">Thông tin nhận phòng - {bookingRoom[0]?.booking.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowY: "auto", maxHeight: "500px" }}>
                    <div className="boxster ng-star-inserted">
                        <div className="row row-padding-4 row-line-left spacer-4 spacer-column">
                            <div className="col-md-6 col-lg-4">
                                <label className="text-neutral font-sm mb-1">Khách hàng</label>
                                <div className="font-medium">
                                    <span className="ng-star-inserted">{bookingRoom[0]?.booking?.accountDto?.fullname}</span>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <label className="text-neutral font-sm mb-1">Khách lưu trú</label>
                                <div className="font-medium">
                                    <span className="ng-star-inserted">{customerInformation.length} người</span>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <label className="text-neutral font-sm mb-1">Số phòng nhận</label>
                                <div className="font-medium d-flex">
                                    <span className="text-clamp-1 ng-star-inserted" title="P.301">{bookingRoom.length} phòng</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <label className="text-neutral font-sm mb-1">Nhận phòng</label>
                                <div className="font-medium">{formatDateTime(bookingRoom[0]?.checkIn)}</div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <label className="text-neutral font-sm mb-1">Trả phòng</label>
                                <div className="font-medium">{formatDateTime(bookingRoom[0]?.checkOut)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-5">
                        <button class="btn btn-outline-success" onClick={handleShowModalInsertCustomer}>
                            <i className="fa fa-plus-circle me-2"></i>
                            <span translate="">Thêm khách ở cùng</span>
                        </button>
                    </div>
                    <div className="table-responsive boxster mt-2">
                        <table className="table table-striped table-borderless table-fill">
                            <thead>
                                <tr>
                                    <td>Họ tên</td>
                                    <td>Giới tính/SDT/Ngày sinh</td>
                                    <td>CCCD</td>
                                    <td>Phòng</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((item, index) => (
                                        <tr key={index} className="text-center">
                                            <td>{item.customerInformationDto.fullname}</td>
                                            <td>{item.customerInformationDto.gender ? "Nam" : "Nữ"}
                                                / {item.customerInformationDto.phone}
                                                / {formatDate(item.customerInformationDto.birthday)}
                                            </td>
                                            <td>{item.customerInformationDto.cccd}</td>
                                            <td>P.{item.bookingRoomDto.room.roomName.replace("Phòng ", "")}</td>
                                            <td>
                                                <button className="btn btn-sm btn-icon-only btn-circle text-neutral" onClick={() => handleShowModalUpdateCustomer(item)}>
                                                    <i className="fa fa-pen"></i>
                                                </button>
                                                <button className="btn btn-sm btn-icon-only btn-circle text-danger" onClick={() => handleDeleteCustomer(item)}>
                                                    <i className="fa fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">Không có khách ở cùng</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center mt-4">
                            <nav>
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => paginate(currentPage - 1)}>Trước</button>
                                    </li>
                                    {[...Array(Math.ceil(customerInformation.length / itemsPerPage))].map((_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <Button variant="success" className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</Button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === Math.ceil(customerInformation.length / itemsPerPage) ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => paginate(currentPage + 1)}>Sau</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="d-flex row spacer-lg justify-content-between w-100 align-items-start mt-3 ng-star-inserted">
                        {/* <div className="col-md-6">
                            <div className="form-row form-labels-50">
                                <label className="col-form-label font-semibold text-nowrap">Ghi chú </label>
                                <div className="col-form-control">
                                    <textarea id="note-booking-calendar" maxlength="1000"
                                        name="note"
                                        className="form-control form-control-line max-width-400 ng-pristine ng-valid ng-touched"
                                        style={{ height: "2rem", width: "18em" }}>
                                    </textarea>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="payment-suggest-money p-4 boxster col-md-6">
                            <div className="payment-form-row form-row mt-1">
                                <div className="payment-form-label col-form-label">
                                    <span> Còn cần trả</span>
                                </div>
                                <div className="payment-form-control col-form-control payment-total-amount font-regular">
                                    <span> 150,000</span>
                                </div>
                            </div>
                            <div className="payment-form-row form-row ng-star-inserted">
                                <div className="payment-form-label col-form-label">
                                    <span> Khách thanh toán </span>
                                </div>
                                <div className="payment-form-control col-form-control text-primary">
                                    <input id="txt-payment"
                                        type="text"
                                        className="form-control"
                                        style={{ borderBottom: "1px solid gray" }} />
                                </div>
                            </div>
                            <div className="payment-form-row form-row ng-star-inserted">
                                <div className="payment-form-label col-form-label">
                                    <span>Tiền thừa </span>
                                </div>
                                <div className="payment-form-control col-form-control text-primary">
                                    <div className="payment-form-control col-form-control payment-total-amount font-regular">
                                        <span> 150,000</span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link to="/employee/edit-room">
                        <button className="btn btn-outline-success">Cập nhật đặt phòng</button>
                    </Link>
                    <button className="btn btn-success" onClick={handleCloseTTNhanPhong}>Xong</button>
                </Modal.Footer>
                {showModalInsertCustomer && <InsertCustomer onClose={handleCloseModalInsertCustomer} bookingRoom={bookingRoom} rooms={bookingRoom.map((e) => e.room)} fetchData={handleCustomer}/>}
                {showModalUpdateCustomer && <InsertCustomer onClose={handleCloseModalInsertCustomer} item={isSelect} bookingRoom={bookingRoom} rooms={bookingRoom.map((e) => e.room)} />}
            </div>
        </>
    )
}

export default TTNhanPhong;