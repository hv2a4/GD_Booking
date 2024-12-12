import React from 'react';

const BookingInfo = ({ token, rooms, selectedRooms, totalPrice, discount }) => {
    const formatDate = (date, format = "DD/MM/YYYY") => {
        if (!date) return "";
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        if (format === "DD/MM/YYYY") {
            return `${day}/${month}/${year}`;
        }
        return d.toLocaleDateString(); // Hoặc bạn có thể thêm các định dạng khác nếu cần.
    };


    const discountPercent = discount ? discount.percent : 0;
    const discountAmount = discountPercent > 0 ? (totalPrice * discountPercent) / 100 : 0;
    const discountedPrice = totalPrice - discountAmount;

    return (
        <div className="col-md-5">
            <h3 className='booking-title'>Xác thực thông tin</h3>
            <div className="hotel-page-sidebar" style={{ background: '#f9f9f9', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <div className="box-summary">
                    {/* Thông tin cá nhân */}
                    <div className="summary-total" style={{ marginTop: '20px' }}>
                        <h4>Thông tin khách hàng</h4>
                        <table className="tlb-info" style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        <div className="title">Họ và tên</div>
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                        <div className="info-right">{token.fullname}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        <div className="title">Email</div>
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                        <div className="info-right">{token.email}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        <div className="title">Số điện thoại</div>
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                        <div className="info-right">{token.phone}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Thông tin phòng đã chọn */}
                    <div className="summary-total" style={{ marginTop: '20px' }}>
                        <h4>Chi tiết phòng</h4>
                        <table className="tlb-info" style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        <div className="title">
                                            <i className="fa fa-calendar" style={{ marginRight: '5px' }}></i> Ngày nhận phòng
                                        </div>
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                        <div className="info-right">{rooms.startDate ? formatDate(rooms.startDate) : "N/A"}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        <div className="title">
                                            <i className="fas fa-calendar-check" style={{ marginRight: '5px' }}></i> Ngày trả phòng
                                        </div>
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                        <div className="info-right">{rooms.endDate ? formatDate(rooms.endDate) : "N/A"}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Thông tin giá phòng */}
                    <div className="summary-total" style={{ marginTop: '20px' }}>
                        <h4>Chi phí phòng</h4>
                        <table className="tlb-info tlb-info-price" style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                {selectedRooms.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                            <div className="title">{item.roomName}</div>
                                        </td>
                                        <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                            <div className="info-right">
                                                {item.price.toLocaleString()} VND
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {discountPercent > 0 && (
                                    <tr>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                            <div className="title">Giảm giá</div>
                                        </td>
                                        <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                            <div className="info-right" style={{ color: '#d9534f' }}>
                                                {discountAmount.toLocaleString()} VND
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                <tr className="tr-total">
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        <div className="title">Số tiền cần thanh toán</div>
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                        <div className="info-right" style={{ fontWeight: 'bold', color: '#d9534f' }}>
                                            {discountedPrice.toLocaleString()} VND
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingInfo;
