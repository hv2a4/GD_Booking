import React from 'react';
import { Modal } from 'react-bootstrap';
const InsertCustomer = ({ onClose }) => {
    return (
        <>
            <Modal show={true} className="modal-dialog-centered modal-customer modal-noneBg" onHide={onClose} keyboard={false} centered>
                <div className="modal-content modal-fill" style={{ border: "1px solid #525d6a" }}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title">Thêm thông tin khách lưu
                            trú</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label for="phong"
                                        className="form-label">Phòng</label>
                                    <select className="form-select" id="phong">
                                        <option selected>Chọn phòng</option>
                                        <option selected>P.308</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label for="diachi" className="form-label">Địa
                                        chỉ</label>
                                    <input type="text" className="form-control form-insert"
                                        id="diachi" placeholder="Nhập địa chỉ" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label for="hovaten" className="form-label">Họ
                                        và tên</label>
                                    <div className="input-group input-insert">
                                        <input type="text" className="form-control form-insert"
                                            id="hovaten"
                                            placeholder="Nhập họ và tên" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label for="phong"
                                        className="form-label">Loại giấy tờ</label>
                                    <select className="form-select" id="phong">
                                        <option selected>Chọn phòng</option>
                                        <option>CCCD</option>
                                        <option>CMND</option>
                                        <option>Hộ chiếu</option>
                                        <option>Khác</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label for="sodienthoai"
                                        className="form-label">Số điện thoại</label>
                                    <input type="text" className="form-control form-insert"
                                        id="sodienthoai"
                                        placeholder="Nhập số điện thoại" />
                                </div>
                                <div className="col-md-6">
                                    <label for="lydoluutru"
                                        className="form-label">Số giấy tờ</label>
                                    <input type="text" className="form-control form-insert"
                                        id="lydoluutru"
                                        placeholder="Nhập số giấy tờ" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Giới tính</label>
                                    <div className="d-flex flex-column flex-md-row">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gioitinh" id="nam" value="nam" checked />
                                            <label className="form-check-label" htmlFor="nam">Nam</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gioitinh" id="nu" value="nu" />
                                            <label className="form-check-label" htmlFor="nu">Nữ</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gioitinh" id="khac" value="khac" />
                                            <label className="form-check-label" htmlFor="khac">Khác</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label for="lydoluutru"
                                        className="form-label">Lý do lưu trú</label>
                                    <input type="text" className="form-control form-insert"
                                        id="lydoluutru"
                                        placeholder="Nhập lý do lưu trú" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label for="ngaysinh"
                                        className="form-label">Ngày sinh</label>
                                    <input type="text" className="form-control form-insert"
                                        id="ngaysinh" placeholder="DD/MM/YYYY" />
                                </div>
                                <div className="col-md-6">
                                    <label for="ghichu" className="form-label">Ghi
                                        chú</label>
                                    <textarea className="form-control form-insert" id="ghichu"
                                        rows="1"
                                        placeholder="Nhập ghi chú"></textarea>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit"
                            className="btn btn-success">Lưu</button>
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
};
export default InsertCustomer;
