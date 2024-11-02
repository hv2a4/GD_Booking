import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
const DatPhong = ({ onClose }) => {
    return (
        <>
            <Modal show={true} onHide={onClose} className="modal-noneBg modal-dialog-centered" centered>
                <div className="modal-content modal-fill">
                    <Modal.Header closeButton>
                        <Modal.Title className="fw-bolder" id="exampleModalLabel" style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>Chọn phòng</Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ minWidth: "auto", overflow: "auto", scrollbarWidth: "none" }}>
                        <div className="row row-gutter-12 text-start">
                            <div className="col-12 col-md-auto">
                                <div className="form-group">
                                    <label className="form-label">Nhận phòng</label>
                                    <div className="k-dropdown-time">
                                        <span className="k-widget k-datetimepicker">
                                            <span className="k-picker-wrap k-state-default">
                                                <input type="datetime-local" data-role="datetimepicker" className="k-input" />
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-auto">
                                <div className="form-group">
                                    <label className="form-label">Trả phòng</label>
                                    <div className="k-dropdown-time">
                                        <span className="k-widget k-datetimepicker">
                                            <span className="k-picker-wrap k-state-default">
                                                <input type="datetime-local" className="k-input" />
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <table className="table table-borderless table-responsive">
                            <thead>
                                <tr>
                                    <th className="text-start">Lựa chọn khác</th>
                                    <th className="cell-price text-end">Giá</th>
                                    <th className="cell-quantity text-center">Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="ng-star-inserted text-start">
                                    <td className="text-start">
                                        <div>
                                            <span className="fw-bolder" style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>Phòng 01 giường đôi cho 2 người</span>
                                            <a className="mr-2 text-decoration-none">
                                                <i className="fa fa-images icon-mask hover-text-orange"></i>
                                            </a>
                                            <span className="d-inline-block text-neutral" style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>(Còn 3 phòng trống)</span>
                                        </div>
                                        <div className="spacer-1 cursor-pointer d-flex align-items-center ng-star-inserted">
                                            <span>
                                                <i className="fa fa-user icon-mask icon-xs w-auto"></i> 1
                                            </span>
                                            <span className="icon-mask icon-xs">•</span>
                                            <span>
                                                <i class="fa-solid fa-baby icon-mask icon-xs w-auto"></i> 1
                                            </span>
                                        </div>
                                    </td>
                                    <td className="cell-price text-right">
                                        <div className="spacer flex-nowrap text-nowrap text-end">
                                            <span>180,000</span>
                                        </div>
                                    </td>
                                    <td className="cell-quantity text-center">
                                        <div className="form-number form-number-sm d-flex justify-content-center align-items-center">
                                            <input type="text" className="form-control mx-1 text-center" value="1" style={{ maxWidth: "90px" }} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>

                    <Modal.Footer>
                        <div className="cell-actions-text text-center ng-star-inserted">
                            <span className="fw-bolder fs-5 d-block">100,000</span>
                            <button className="btn btn-primary mt-2">Đặt phòng</button>
                        </div>
                    </Modal.Footer>
                </div>
            </Modal>

        </>
    )
}

export default DatPhong;