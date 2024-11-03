import React, { useState } from "react";
import InsertCustomer from "../modalInsertCustomer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";

const TTNhanPhong = () => {
    const [showModalInsertCustomer, setShowModalInsertCustomer] = useState(false);

    const handleShowModalInsertCustomer = () => {
        setShowModalInsertCustomer(true);
    }
    const handleCloseModalInsertCustomer = () => {
        setShowModalInsertCustomer(false);
    }
    return (
        <>
            <div className="modal-content modal-fill">
                <Modal.Header closeButton>
                    <Modal.Title id="exampleModalLabel">Thông tin nhận phòng - DP000013</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{overflowY: "auto" ,maxHeight: "500px"}}>
                    <div className="boxster ng-star-inserted">
                        <div className="row row-padding-4 row-line-left spacer-4 spacer-column">
                            <div className="col-md-6 col-lg-4">
                                <label className="text-neutral font-sm mb-1">Khách hàng</label>
                                <div className="font-medium">
                                    <span className="ng-star-inserted">Khách lẻ</span>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <label className="text-neutral font-sm mb-1">Khách lưu trú</label>
                                <div className="font-medium">
                                    <span className="ng-star-inserted">1 người</span>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <label className="text-neutral font-sm mb-1">Phòng nhận</label>
                                <div className="font-medium d-flex">
                                    <span className="text-clamp-1 ng-star-inserted" title="P.301">1 phòng</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <label className="text-neutral font-sm mb-1">Nhận phòng</label>
                                <div className="font-medium">19 thg 9, 16:25</div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <label className="text-neutral font-sm mb-1">Trả phòng</label>
                                <div className="font-medium">19 thg 9, 17:06</div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <label className="text-neutral font-sm mb-1">Kênh bán</label>
                                <div className="font-medium">Khách đến trực tiếp</div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-5">
                        <button class="btn btn-outline-success" onClick={handleShowModalInsertCustomer}>
                            <i className="fa fa-plus-circle me-2"></i>
                            <span translate="">Thêm người lưu trú</span>
                        </button>
                    </div>
                    <div className="table-responsive boxster mt-2">
                        <table className="table table-striped table-borderless table-fill">
                            <thead>
                                <tr>
                                    <td>Họ tên</td>
                                    <td>Thông tin cá nhân</td>
                                    <td>Giấy tờ</td>
                                    <td>Phòng</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center">
                                    <td>Lê Minh Khôi</td>
                                    <td>Nam/2024/09873882</td>
                                    <td>CCCD - 098787634</td>
                                    <td>P.309</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-icon-only btn-circle text-neutral">
                                            <i className="fa fa-pen"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-icon-only btn-circle text-orange">
                                            <i className="fa fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="text-center">
                                    <td>Nguyễn Hồ Vũ</td>
                                    <td>Nam/2024/098322</td>
                                    <td>CCCD - 07864333</td>
                                    <td>P.302</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-icon-only btn-circle text-neutral">
                                            <i className="fa fa-pen"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-icon-only btn-circle text-orange">
                                            <i className="fa fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex spacer spacer-lg justify-content-between w-100 align-items-start mt-3 ng-star-inserted">
                        <div className="flex-fill">
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
                        </div>
                        <div className="payment-suggest-money p-4 boxster">
                            <div className="payment-form-row form-row">
                                <div className="payment-form-label col-form-label">
                                    <span className="font-semibold"> Khách cần trả </span>
                                </div>
                                <div className="payment-customer-pay payment-form-control col-form-control">
                                    <button placement="left"
                                        outsideclick="true"
                                        containerclassName="min-width-320"
                                        className="form-control form-control-line cell-change-price">
                                        <strong className="text-orange">150,000</strong>
                                    </button>
                                </div>
                            </div>
                            <div className="payment-form-row form-row">
                                <div className="payment-form-label col-form-label">
                                    <span> Khách đã trả</span>
                                </div>
                                <div className="payment-form-control col-form-control payment-total-amount font-regular">0</div>
                            </div>
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
                                    <button className="btn btn-icon-only btn-circle btn-ligprimary">
                                        <i className="fa fa-credit-card icon-btn"></i>
                                    </button>
                                </div>
                                <div className="payment-form-control col-form-control text-orange">
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
                                <div className="payment-form-control col-form-control text-orange">
                                    <div className="payment-form-control col-form-control payment-total-amount font-regular">
                                        <span> 150,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link to="/employee/edit-room">
                    <button className="btn btn-outline-primary">Sửa đặt phòng</button>
                    </Link>
                    <button className="btn btn-primary">Xong</button>
                </Modal.Footer>
                {showModalInsertCustomer && <InsertCustomer onClose={handleCloseModalInsertCustomer} />}
            </div>
        </>
    )
}

export default TTNhanPhong;