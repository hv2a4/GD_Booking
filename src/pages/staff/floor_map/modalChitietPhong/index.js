import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";

const ModalDetailFloor = ({ onClose }) => {
    return (
        <>
            <Modal className="custom-modal-width modal-noneBg" show={true} onHide={onClose} centered>
                <div className="modal-content modal-fill">
                    <Modal.Header closeButton>
                        <Modal.Title id="exampleModalLabel">Chi tiết P.309</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="boxster ng-star-inserted">
                            <div className="row">
                                <div className="spacer align-items-center">
                                    <h3 className="font-semibold mb-0">Phòng 01 giường đơn</h3>
                                    <div className="ht-spacer">
                                        <span className="text-success ng-star-inserted">Đang sử dụng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="row row-padding-4 spacer-4 spacer-column">
                                <div className="row row-line-left">
                                    <div className="col-6 col-lg-6">
                                        <label className="text-neutral font-sm mb-1">
                                            Khách hàng
                                        </label>
                                        <div className="font-medium">
                                            <span className="ng-star-inserted">
                                                Khách lẻ
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-3 col-lg-3">
                                        <label
                                            className="text-neutral font-sm mb-1">Khách
                                            lưu trú</label>
                                        <div className="font-medium">
                                            <span className="ng-star-inserted">1
                                                người</span>
                                        </div>
                                    </div>
                                    <div className="col-3 col-lg-3">
                                        <label
                                            className="text-neutral font-sm mb-1">Mã đặt phòng</label>
                                        <div className="font-medium d-flex">
                                            <span
                                                className="text-clamp-1 ng-star-inserted"
                                                title="P.301"> DP0987876
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row row-line-left mt-3">
                                    <div className="col-3 col-lg-3">
                                        <label
                                            className="text-neutral font-sm mb-1">
                                            Nhận phòng
                                        </label>
                                        <div className="font-medium"> 19 thg 9,
                                            16:25</div>
                                    </div>
                                    <div className="col-3 col-lg-3">
                                        <label className="text-neutral font-sm mb-1">Trả
                                            phòng</label>
                                        <div className="font-medium"> 19 thg 9,
                                            17:06</div>
                                    </div>
                                    <div className="col-3 col-lg-3">
                                        <label className="text-neutral font-sm mb-1 d-block">Thời gian thuê</label>
                                        <span className="font-medium"> 1 ngày </span>
                                        <span className="font-medium tag tag-light-neutral fs-6 ng-star-inserted">Đã sử dụng: 1 tiếng</span>
                                    </div>
                                </div>

                            </div>
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
                                <div className="payment-form-row form-row ng-star-inserted">
                                    <div className="payment-form-label col-form-label">
                                        <span>P.309 </span>
                                    </div>
                                    <div className="payment-form-control col-form-control">
                                        <div className="payment-form-control col-form-control payment-total-amount font-regular">
                                            <span> 150,000</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="payment-form-row form-row ng-star-inserted">
                                    <div className="payment-form-label col-form-label">
                                        <span>Khách đã trả </span>
                                    </div>
                                    <div className="payment-form-control col-form-control">
                                        <div className="payment-form-control fw-bolder col-form-control payment-total-amount font-regular">
                                            <span> 150,000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <div className="modal-footer">
                        <Link to="/staff/edit-room">
                        <button className="btn btn-outline-primary">Sửa đặt
                            phòng</button>
                        </Link>
                        <Link to="/staff/edit-room">
                        <button className="btn btn-primary">Trả phòng</button>
                        </Link>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ModalDetailFloor;