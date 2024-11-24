import React, { useEffect, useState } from 'react';
import LayoutClient from '../../../components/layout/cilent';
import './custom.css';
import { decodeToken } from '../../../services/client/Booking/BookingService';
import { useNavigate } from 'react-router-dom';
import { bookingRoom, getDataListTypeRoom } from './Service';
import Swal from 'sweetalert2';
const PageBookRoom = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [token, setToken] = useState({});
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [rooms, setRooms] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [roomIdss, setRoomId] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log({
            fullName,
            email,
            phone,
        });
    };

    const getDataListRoomData = async (roomIdList) => {
        try {
            // Gọi API với chuỗi roomIdList
            const res = await getDataListTypeRoom(roomIdList);
            setSelectedRooms(res); // Lưu trữ kết quả vào state
        } catch (error) {
            console.log(error);
        }
    };


    const handleBookingRooms = async () => {
        try {
            // Lấy giá trị phone hiện tại
            const currentPhone = phone ? phone.trim() : "";

            if (!currentPhone) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Thông báo',
                    text: 'Bạn chưa nhập số điện thoại. Vui lòng cập nhật thông tin trước khi đặt phòng.',
                    confirmButtonText: 'Cập nhật ngay',
                }).then(() => {
                    navigate('/client/profile'); // Chuyển hướng đến trang cập nhật số điện thoại
                });
                return; // Dừng hàm nếu không có số điện thoại hợp lệ
            }

            // Xử lý roomIdss
            let roomIdArray = [];
            if (Array.isArray(roomIdss)) {
                roomIdArray = [...roomIdss]; // Sao chép nếu là mảng
            } else {
                const roomIdNumber = parseInt(roomIdss); // Chuyển kiểu dữ liệu
                if (!isNaN(roomIdNumber)) {
                    roomIdArray.push(roomIdNumber); // Thêm vào mảng nếu hợp lệ
                } else {
                    console.error("roomIdss không hợp lệ:", roomIdss);
                }
            }

            // Tạo payload để gửi đi
            const payload = {
                userName: token.username + "",
                startDate: rooms.startDate,
                endDate: rooms.endDate,
                roomId: roomIdArray,
                discountName: ""
            };

            console.log("Payload trước khi gửi:", payload);

            // Gọi API đặt phòng
            await bookingRoom(payload, navigate);

        } catch (error) {
            console.error("Đặt phòng thất bại:", error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi đặt phòng. Vui lòng thử lại.',
                confirmButtonText: 'Đóng',
            });
        }
    };


    useEffect(() => {
        // Giải mã token và lưu vào state
        const decode = decodeToken();
        console.log("Token đã được giả mã: ", decode);
        setToken(decode);
    }, []);

    useEffect(() => {
        if (token && token.phone) {
            setPhone(token.phone.trim());
        }
    }, [token]);

    useEffect(() => {
        const fetchBookedRooms = async () => {
            const roomsData = sessionStorage.getItem("bookedRooms");

            if (!roomsData) {
                console.warn('Không có dữ liệu trong sessionStorage với key "bookedRooms"');
                return;
            }

            try {
                // Giải mã dữ liệu chuỗi JSON thành mảng đối tượng
                const parsedRooms = JSON.parse(roomsData);

                // Kiểm tra nếu dữ liệu là mảng
                if (Array.isArray(parsedRooms)) {
                    // Lấy các roomId từ mảng phòng để gọi API
                    const roomIds = parsedRooms.map(room => room.roomId);
                    setRoomId(roomIds);
                    await getDataListRoomData(roomIds.join(',')); // Gọi API với danh sách roomId
                } else {
                    console.warn('Dữ liệu không phải là mảng.');
                }
            } catch (error) {
                console.error('Lỗi khi giải mã JSON:', error.message);
            }
        };

        fetchBookedRooms();
    }, []); // Chạy chỉ một lần khi component mount

    useEffect(() => {
        const bookingDataJSON = sessionStorage.getItem('booking'); // Lấy dữ liệu từ sessionStorage

        if (bookingDataJSON) {
            try {
                // Giải mã chuỗi JSON thành đối tượng JavaScript
                const bookingData = JSON.parse(bookingDataJSON);

                // Truy xuất các thuộc tính của đối tượng booking
                const { startDate, endDate, guestLimit } = bookingData;

                // Cập nhật state rooms với đối tượng chứa thông tin về booking
                setRooms({ startDate, endDate, guestLimit });
            } catch (error) {
                console.error('Lỗi khi giải mã booking:', error.message);
            }
        } else {
            console.warn('Không có dữ liệu booking trong sessionStorage');
        }
    }, []);


    useEffect(() => {
        // Tính tổng tiền từ mảng selectedRooms
        const total = selectedRooms.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    }, [selectedRooms]);

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
                                    <div className="form-row">
                                        <div className="col-lg-12 col-md-12">
                                            <label htmlFor="txt_fullname" className="custom-form-label">Họ và tên <span className="required">*</span></label>
                                            <input
                                                id="txt_fullname"
                                                value={token.fullname}
                                                onChange={(e) => setFullName(e.target.value)}
                                                required
                                                type="text"
                                                className="custom-form-control"
                                                name="txt_fullname"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-lg-6 col-md-6">
                                            <label htmlFor="txt_email" className="custom-form-label">Email <span className="required">*</span></label>
                                            <input
                                                id="txt_email"
                                                value={token.email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                type="email"
                                                className="custom-form-control"
                                                name="txt_email"
                                                disabled
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <label htmlFor="txt_phone" className="custom-form-label">Số điện thoại <span className="required">*</span></label>
                                            <input
                                                id="txt_phone"
                                                value={token.phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                                type="text"
                                                className="custom-form-control"
                                                name="txt_phone"
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    {/* Danh sách phòng đã chọn */}
                                    <div className="form-row">
                                        <div className="col-lg-12 col-md-12">
                                            <label htmlFor="selected_rooms" className="custom-form-label">Danh sách phòng đã chọn</label>
                                            <div className="box-selected-rooms">
                                                <ul id="selected_rooms" className="list-group">
                                                    {selectedRooms.map((room, index) => (
                                                        <li
                                                            key={index}
                                                            className="room-items"
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                marginBottom: '10px',
                                                                padding: '10px',
                                                                border: '1px solid #ddd',
                                                                borderRadius: '8px'
                                                            }}
                                                        >
                                                            {/* Hình ảnh phòng */}
                                                            <div style={{ flex: '1', maxWidth: '100px', marginRight: '15px' }}>
                                                                <img
                                                                    src={room.listImageName[0]} // Lấy tấm hình đầu tiên từ danh sách
                                                                    alt={`${room.roomName}`}
                                                                    style={{ width: '100%', borderRadius: '5px' }}
                                                                />
                                                            </div>
                                                            {/* Thông tin phòng */}
                                                            <div style={{ flex: '2' }}>
                                                                <span
                                                                    className="room-name"
                                                                    style={{ fontWeight: 'bold', fontSize: '1.1em', color: '#333' }}
                                                                >
                                                                    {`${room.roomName}: ${room.typeRoomName}`}
                                                                </span>
                                                                <div
                                                                    className="room-price"
                                                                    style={{
                                                                        marginTop: '5px',
                                                                        fontSize: '1.1em',
                                                                        fontWeight: 'bold',
                                                                        color: '#feaf39',
                                                                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                                                                    }}
                                                                >
                                                                    {`Giá: ${room.price.toLocaleString()} VND/ngày`}
                                                                </div>
                                                                <div
                                                                    className="guest-limit"
                                                                    style={{ marginTop: '5px' }}
                                                                >
                                                                    <span
                                                                        className="badge"
                                                                        style={{
                                                                            backgroundColor: '#feaf39',
                                                                            color: '#fff',
                                                                            padding: '5px 10px',
                                                                            borderRadius: '15px'
                                                                        }}
                                                                    >
                                                                        {`Tối đa ${room.guestLimit} người`}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nút Submit */}
                                    <div className="box-submit mt-4">
                                        <button type="button" className="custom-submit-btn" onClick={handleBookingRooms}>Xác nhận</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-4">
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
                                                        <div className="info-right">{rooms.startDate}</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                                        <div className="title">
                                                            <i className="fas fa-calendar-check" style={{ marginRight: '5px' }}></i> Ngày trả phòng
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                                        <div className="info-right">{rooms.endDate}</div>
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
                                                <tr className="tr-total">
                                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                                        <div className="title">Tổng tiền</div>
                                                    </td>
                                                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                                        <div data-price-format="2,012,200 VND" className="info-right" style={{ fontWeight: 'bold', color: '#d9534f' }}>
                                                            {totalPrice.toLocaleString()} VND
                                                        </div>
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
        </LayoutClient >
    )
}

export default PageBookRoom;