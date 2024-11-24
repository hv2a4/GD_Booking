import React from "react";
import { Button } from "react-bootstrap";

const CreateInvoice = () => {
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
                    <tr className="tr-center">
                        <td>1</td>
                        <td>DP000011</td>
                        <td>P.309</td>
                        <td>Khách hàng A</td>
                        <td>19/12, 11:20</td>
                        <td>24/12, 14:20</td>
                        <td>9,300,000</td>
                        <td>Đã thanh toán</td>
                        <td className="d-flex">
                            <Button className="btn-tt"
                            variant="success"
                                style={{
                                    fontSize: '12px',
                                    width: '127px',
                                    height: '36px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#04ba25'
                                }}>Thanh toán</Button>
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
    )
}

export default CreateInvoice;