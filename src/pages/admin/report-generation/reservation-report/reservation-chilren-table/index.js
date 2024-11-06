import React from "react";

const ReservationChilrenTable = () => {
    return (
        <tr>
            <td colSpan={5} style={{ padding: '0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '4px' }}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#f7f3d6', padding: '8px', border: '1px solid #ddd' }}>Mã đặt phòng</th>
                            <th style={{ backgroundColor: '#f7f3d6', padding: '8px', border: '1px solid #ddd' }}>Thời gian</th>
                            <th style={{ backgroundColor: '#f7f3d6', padding: '8px', border: '1px solid #ddd' }}>Thời gian lưu trú</th>
                            <th style={{ backgroundColor: '#f7f3d6', padding: '8px', border: '1px solid #ddd' }}>Tên nhân viên</th>
                            <th style={{ backgroundColor: '#f7f3d6', padding: '8px', border: '1px solid #ddd' }}>Khách hàng</th>
                            <th style={{ backgroundColor: '#f7f3d6', padding: '8px', border: '1px solid #ddd' }}>SL đặt phòng</th>
                            <th style={{ backgroundColor: '#f7f3d6', padding: '8px', border: '1px solid #ddd' }}>Tên phòng</th>
                            <th style={{ backgroundColor: '#f7f3d6', padding: '8px', border: '1px solid #ddd' }}>Giá trị đặt phòng</th>
                            <th style={{ backgroundColor: '#f7f3d6', padding: '8px', border: '1px solid #ddd' }}>Khách đã trả</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '8px', border: '1px solid #ddd', color: '#1976d2', cursor: 'pointer' }}>HD000077</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>01/11/2024 14:21</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>01/11/2024 14:22 - 02/11/2024 16:00</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>Lê Minh Khôi</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>Nguyễn Văn A</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>1</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>P.209</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>29,000,000</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>0</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    )
}

export default ReservationChilrenTable;