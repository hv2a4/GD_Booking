import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

const PopupPayment = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button
                className="btn btn-outline-success"
                type="button"
                onClick={handleShow}
            >
                Thanh toán
            </button>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end"
                style={{ width: "80%", maxWidth: "80%", height: "100%" }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Thanh toán DP000008 - Lê Minh Khôi</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-8">
                                <div className="row">
                                    <div className="col-lg-12 mb-4">
                                        <h5>Tiền phòng</h5>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">STT</th>
                                                    <th>Hạng mục</th>
                                                    <th className="text-center">Số lượng</th>
                                                    <th className="text-end">Đơn giá</th>
                                                    <th className="text-end">Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">1</td>
                                                    <td>
                                                        Phòng 01 giường đôi và 1 giường đơn cho 3 người
                                                        <br />
                                                        <small className="text-muted">P.402</small>
                                                    </td>
                                                    <td className="text-center">1 Tháng</td>
                                                    <td className="text-end">29,000,000</td>
                                                    <td className="text-end">29,000,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Bảng sản phẩm/dịch vụ/phụ thu */}
                                    <div className="col-lg-12 mb-4">
                                        <h5>Sản phẩm/Dịch vụ/Phụ thu</h5>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">STT</th>
                                                    <th>Hạng mục</th>
                                                    <th className="text-center">Số lượng</th>
                                                    <th className="text-end">Đơn giá</th>
                                                    <th className="text-end">Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">1</td>
                                                    <td>Thuê ô tô</td>
                                                    <td className="text-center">1</td>
                                                    <td className="text-end">29,000,000</td>
                                                    <td className="text-end">29,000,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <div className="border p-3 rounded">
                                    <h5>Chi tiết thanh toán</h5>
                                    <div className="mb-3">
                                        <label className="form-label">Nhân viên tạo HĐ</label>
                                        <select className="form-select">
                                            <option selected>Chưa xác định</option>
                                            <option value="1">Nhân viên 1</option>
                                            <option value="2">Nhân viên 2</option>
                                            <option value="3">Nhân viên 3</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Thời gian tạo HĐ</label>
                                        <input type="datetime-local" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <span>Tổng cộng</span>
                                            <strong>31,500,000</strong>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <span>Giảm giá</span>
                                            <strong>0</strong>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <span>Thu khác</span>
                                            <strong>0</strong>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <strong>Còn cần trả</strong>
                                            <strong>31,500,000</strong>
                                        </div>
                                    </div>
                                    <h5>Phương thức thanh toán</h5>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            id="cash"
                                        />
                                        <label className="form-check-label" htmlFor="cash">
                                            Tiền mặt
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            id="bankTransfer"
                                        />
                                        <label className="form-check-label" htmlFor="bankTransfer">
                                            Chuyển khoản
                                        </label>
                                    </div>
                                    <div className="mt-3">
                                        <button className="btn btn-outline-success w-100">
                                            Hoàn thành
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default PopupPayment;
