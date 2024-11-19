import React, { useEffect, useState } from 'react';
import LayoutClient from '../../../components/layout/cilent';
import './custom.css';
import { decodeToken } from '../../../services/client/Booking/BookingService';

const PageBookRoom = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [specialRequest, setSpecialRequest] = useState('');
    const [specialRequestVisible, setSpecialRequestVisible] = useState(false);
    const [token, setToken] = useState({});
    const [bookedRooms, setBookedRooms] = useState([]);
    const toggleSpecialRequest = () => {
        setSpecialRequestVisible(!specialRequestVisible);
    };
    const [selectedRooms, setSelectedRooms] = useState([
        { roomName: 'Phòng Deluxe', capacity: 2 },
        { roomName: 'Phòng Suite', capacity: 4 },
    ]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log({
            fullName,
            email,
            phone,
            checkinDate,
            checkoutDate,
            selectedRooms,
            specialRequest,
        });
    };

    useEffect(() => {
        const decode = decodeToken();
        console.log("Token đã được giả mã: ", decode);
        setToken(decode);
    }, []);

    // Log dữ liệu khi có thay đổi
    useEffect(() => {
        if (checkinDate) console.log("Thời gian bắt đầu: ", checkinDate);
        if (checkoutDate) console.log("Thời gian trả phòng: ", checkoutDate);
    }, [checkinDate, checkoutDate]);

    useEffect(() => {
        const fetchBookedRooms = () => {
            // Lấy dữ liệu từ sessionStorage
            const rooms = sessionStorage.getItem("bookedRooms");

            if (!rooms) {
                console.warn('Không có dữ liệu trong sessionStorage với key "bookedRooms"');
                return;
            }

            try {
                // Giải mã chuỗi JSON thành mảng
                const parsedRooms = JSON.parse(rooms);

                if (Array.isArray(parsedRooms)) {
                    console.log('Dữ liệu giải mã thành công:', parsedRooms);
                    // Cập nhật state với danh sách phòng
                    setBookedRooms(parsedRooms);
                } else {
                    console.error('Dữ liệu không phải là mảng:', parsedRooms);
                }
            } catch (error) {
                // Ghi log nếu xảy ra lỗi khi giải mã JSON
                console.error('Lỗi khi giải mã JSON:', error.message);
            }
        };

        fetchBookedRooms();

        // Cleanup không cần thiết vì không có timeout hay subscription
    }, []); // Chỉ chạy một lần khi component được mount

    return (
        <LayoutClient>
            <div className="page-box-content page-hotel">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h3 className="booking-title">Thông tin đặt phòng</h3>
                            <div className="box-content mb-5">
                                <form id="form-hotel-booking" className="create-booking" onSubmit={handleSubmit} noValidate>
                                    {/* Thông tin khách hàng */}
                                    <div className="row mb-4">
                                        <div className="col-lg-12 col-md-12">
                                            <label htmlFor="txt_fullname" className="form-label">Họ và tên <span className="required">*</span></label>
                                            <input
                                                id="txt_fullname"
                                                value={token.fullname}
                                                onChange={(e) => setFullName(e.target.value)}
                                                required
                                                type="text"
                                                className="form-control"
                                                name="txt_fullname"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-lg-7 col-md-7">
                                            <label htmlFor="txt_email" className="form-label">Email <span className="required">*</span></label>
                                            <input
                                                id="txt_email"
                                                value={token.email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                type="email"
                                                className="form-control"
                                                name="txt_email"
                                            />
                                        </div>
                                        <div className="col-lg-5 col-md-5">
                                            <label htmlFor="txt_phone" className="form-label">Số điện thoại <span className="required">*</span></label>
                                            <input
                                                id="txt_phone"
                                                value={token.phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                                type="text"
                                                className="form-control"
                                                name="txt_phone"
                                            />
                                        </div>
                                    </div>

                                    {/* Ngày nhận phòng và trả phòng */}
                                    <div className="row mb-4">
                                        <div className="col-lg-6 col-md-6">
                                            <label htmlFor="txt_checkin_date" className="form-label">
                                                Ngày nhận phòng <span className="required">*</span>
                                            </label>
                                            <input
                                                id="txt_checkin_date"
                                                value={checkinDate}
                                                onChange={(e) => setCheckinDate(e.target.value)}
                                                type="date"
                                                className="form-control"
                                                name="checkin_date"
                                                min={new Date().toISOString().split('T')[0]}
                                                required
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <label htmlFor="txt_checkout_date" className="form-label">
                                                Ngày trả phòng <span className="required">*</span>
                                            </label>
                                            <input
                                                id="txt_checkout_date"
                                                value={checkoutDate}
                                                onChange={(e) => setCheckoutDate(e.target.value)}
                                                type="date"
                                                className="form-control"
                                                name="checkout_date"
                                                min={new Date().toISOString().split('T')[0]}
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/* Danh sách phòng đã chọn */}
                                    <div className="row mb-4">
                                        <div className="col-lg-12 col-md-12">
                                            <label htmlFor="selected_rooms" className="form-label">Danh sách phòng đã chọn</label>
                                            <div className="box-selected-rooms">
                                                <ul id="selected_rooms" className="list-group">
                                                    {selectedRooms.map((room, index) => (
                                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                            <span>{`Phòng ${index + 1}: ${room.roomName}`}</span>
                                                            <div>
                                                                <span className="badge badge-secondary me-2">{`${room.capacity} người`}</span>
                                                                <span className="badge badge-info">Đã chọn</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Yêu cầu đặc biệt */}
                                    <div className="hotel-box-note">
                                        <div className="box-title" onClick={toggleSpecialRequest}>
                                            <i className={`fa ${specialRequestVisible ? 'fa-minus-circle' : 'fa-plus-circle'}`}></i>
                                            Thêm yêu cầu đặc biệt
                                        </div>
                                        {specialRequestVisible && (
                                            <textarea
                                                id="txt_note"
                                                value={specialRequest}
                                                onChange={(e) => setSpecialRequest(e.target.value)}
                                                maxLength="200"
                                                className="form-control txt_note"
                                                name="info_services_extra[note]"
                                                placeholder="Nhập yêu cầu đặc biệt tại đây..."
                                            ></textarea>
                                        )}
                                    </div>

                                    {/* Nút Submit */}
                                    <div className="box-submit mt-4">
                                        <button type="submit" className="btn-submit-contact-booking btn btn-primary">Tiếp tục</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Thông tin đặt phòng</h3>
                            <div className="hotel-page-sidebar" style={{ background: '#f9f9f9', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                                <div className="box-summary">
                                    <div className="summary-main" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                        <div className="box-img" style={{ flex: '1' }}>
                                            <img
                                                className="hotel-image"
                                                src="https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_353355/mini_7e0ab78439aba7749488a253455b5f22.jpg"
                                                alt="Khách sạn Vias Vũng Tàu"
                                                style={{ width: '100%', borderRadius: '8px' }}
                                            />
                                        </div>
                                        <div className="box-title" style={{ flex: '2', paddingLeft: '15px' }}>
                                            <div className="description" style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#444', textAlign: 'center', marginTop: '10px' }}>
                                                Phòng Deluxe Hướng Phố
                                            </div>
                                        </div>
                                    </div>

                                    <div className="summary-total" style={{ marginTop: '20px' }}>
                                        <table className="tlb-info" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                                        <div className="title">
                                                            <i className="fa fa-calendar" style={{ marginRight: '5px' }}></i> Ngày nhận phòng
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                                        <div className="info-right">14/09/2024</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                                        <div className="title">
                                                            <i className="fa fa-calendar-o" style={{ marginRight: '5px' }}></i> Ngày trả phòng
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                                        <div className="info-right">15/09/2024</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                                        <div className="title">
                                                            <i className="fa fa-user" style={{ marginRight: '5px' }}></i> Số khách phòng
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                                        <div className="info-right">2 khách, 1 phòng</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="summary-total" style={{ marginTop: '20px' }}>
                                        <table className="tlb-info tlb-info-price" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                                        <div className="title">1 phòng x 1 đêm</div>
                                                    </td>
                                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                                        <div className="info-right">3,353,666 VND</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                                        <div className="title box-promo">Promo giảm 40%</div>
                                                    </td>
                                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                                        <div className="info-right">- 1,341,466 VND</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                                        <div className="title type-tax">Phí dịch vụ</div>
                                                    </td>
                                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                                        <div className="info-right type-tax">MIỄN PHÍ</div>
                                                    </td>
                                                </tr>
                                                <tr className="tr-total">
                                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                                        <div className="title">Tổng tiền</div>
                                                    </td>
                                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                                        <div data-price-format="2,012,200 VND" className="info-right" style={{ fontWeight: 'bold', color: '#d9534f' }}>2,012,200 VND</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </LayoutClient>
    )
}

export default PageBookRoom;