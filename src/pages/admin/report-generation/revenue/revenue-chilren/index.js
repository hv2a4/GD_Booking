import React from "react";

const RevenueChilren = () => {
    return (
        <tr>
            <td colSpan="4" style={{ padding: '0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '4px' }}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#f7f3d6', padding: '8px', border: '1px solid #ddd' }}>Mã giao dịch</th>
                            <th style={{ backgroundColor: '#f7f3d6', padding: '8px', border: '1px solid #ddd' }}>Thời gian</th>
                            <th style={{ backgroundColor: '#f7f3d6', padding: '8px', border: '1px solid #ddd' }}>Khách hàng</th>
                            <th style={{ backgroundColor: '#f7f3d6', padding: '8px', border: '1px solid #ddd' }}>Doanh thu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '8px', border: '1px solid #ddd', color: '#1976d2', cursor: 'pointer' }}>HD000077</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>01/11/2024 14:22</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>Khách lẻ</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>29,000,000</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '8px', border: '1px solid #ddd', color: '#1976d2', cursor: 'pointer' }}>HD000076</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>01/11/2024 14:22</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>Khách lẻ</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>23,200,000</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '8px', border: '1px solid #ddd', color: '#1976d2', cursor: 'pointer' }}>HD000075</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>01/11/2024 14:21</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>3sds</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>720,000</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    )
}

export default RevenueChilren;