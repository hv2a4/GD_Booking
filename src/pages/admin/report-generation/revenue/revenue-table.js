import React, { useState } from 'react';
import RevenueChilren from './revenue-chilren';
import * as XLSX from 'xlsx';
import "./style.css";

const RevenueTable = () => {
    const [expandedRows, setExpandedRows] = useState({});
    const [exportType, setExportType] = useState('');

    const toggleExpand = (date) => {
        setExpandedRows((prevExpandedRows) => ({
            ...prevExpandedRows,
            [date]: !prevExpandedRows[date],
        }));
    };

    const handleExportPDF = () => {
        window.print();
    };
    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(rows); // Chuyển dữ liệu JSON sang định dạng sheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Revenue Report"); // Tạo workbook và thêm sheet
        XLSX.writeFile(workbook, "RevenueReport.xlsx"); // Xuất file với tên "RevenueReport.xlsx"
    };
    const handleExport = () => {
        if (exportType === 'excel') {
            handleExportExcel();
        } else if (exportType === 'pdf') {
            handleExportPDF();
        }
    };
    const rows = [
        {
            date: '01/11/2024',
            revenue: '52,920,000',
            refund: '0',
            netRevenue: '52,920,000',
        },
        {
            date: '02/11/2024',
            revenue: '35,000,000',
            refund: '0',
            netRevenue: '35,000,000',
        },
    ];

    return (
        <div
            style={{
                maxWidth: '800px',
                margin: '20px auto',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                border: '2px solid #ddd',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                backgroundColor: '#fff',
            }}
            className="revenue-content"
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <select
                    value={exportType}
                    onChange={(e) => setExportType(e.target.value)}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '10px'
                    }}
                >
                    <option value="">Chọn loại xuất</option>
                    <option value="excel">Xuất Excel</option>
                    <option value="pdf">Xuất PDF</option>
                </select>
                <h2 style={{ marginRight: '80px' }}>Báo cáo doanh thu </h2>
                
                <button
                    onClick={handleExport}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                    disabled={!exportType} // Vô hiệu hóa khi chưa chọn loại xuất
                >
                    Xuất
                </button>
            </div>
            <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>Từ ngày 28/10/2024 đến ngày 03/11/2024</p>
            <table style={{ border: '1px solid #ddd', width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: '#FEA116', padding: '10px', border: '1px solid #ddd' }}>Thời gian</th>
                        <th style={{ backgroundColor: '#FEA116', padding: '10px', border: '1px solid #ddd' }}>Doanh thu</th>
                        <th style={{ backgroundColor: '#FEA116', padding: '10px', border: '1px solid #ddd' }}>Giá trị trả</th>
                        <th style={{ backgroundColor: '#FEA116', padding: '10px', border: '1px solid #ddd' }}>Doanh thu thuần</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ backgroundColor: '#f7f3d6', fontWeight: 'bold', textAlign: 'center' }}>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>Tổng</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>87,920,000</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>0</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>87,920,000</td>
                    </tr>
                    {rows.map((row, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <button
                                        onClick={() => toggleExpand(row.date)}
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                            color: '#1976d2',
                                            background: 'none',
                                            border: 'none',
                                            padding: '0',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {expandedRows[row.date] ? '+' : '−'} {row.date}
                                    </button>
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{row.revenue}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{row.refund}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{row.netRevenue}</td>
                            </tr>
                            {!expandedRows[row.date] && (
                                <RevenueChilren />
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RevenueTable;
