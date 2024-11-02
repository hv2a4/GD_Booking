import React from "react";

const BookingHistory = () => {
    return (
        <table className="table mt-3">
            <thead className="table-primary">
                <tr>
                    <th scope="col">Mã đặt phòng</th>
                    <th scope="col">Phòng</th>
                    <th scope="col">Thời gian đặt</th>
                    <th scope="col">Nhân viên đặt</th>
                    <th scope="col">Thanh toán</th>
                    <th scope="col">Tổng cộng</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">BK003</th>
                    <td>P.209</td>
                    <td>22/10/2024</td>
                    <td>Lê Minh Khôi</td>
                    <td>Đã thanh toán</td>
                    <td>1,000,000</td>
                </tr>
                <tr>
                    <th scope="row">BK004</th>
                    <td>P.304</td>
                    <td>23/10/2024</td>
                    <td>Lê Minh Khôi</td>
                    <td>Chưa thanh toán</td>
                    <td>2,000,000</td>
                </tr>
                <tr>
                    <th scope="row">BK005</th>
                    <td>P.102</td>
                    <td>12/09/2024</td>
                    <td>Lê Minh Khôi</td>
                    <td>Đã thanh toán</td>
                    <td>900,000</td>
                </tr>
            </tbody>
        </table>
    )
}

export default BookingHistory;