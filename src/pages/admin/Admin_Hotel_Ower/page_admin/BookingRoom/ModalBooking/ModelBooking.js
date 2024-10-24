import React, { useRef, useState } from "react";
import { Card, Col, Form, InputGroup, Row, Table, Toast } from "react-bootstrap";
import { CiFilter } from "react-icons/ci";
import '../styles/disible.css';
import { FaSave } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { RiLoopLeftFill } from "react-icons/ri";

const DatePicker = ({ label, id, value, onChange }) => {
    return (
        <Form.Group className="mb-3" controlId={id}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="date"
                value={value}
                onChange={onChange}
                style={{ fontSize: '12px' }}
            />
        </Form.Group>
    );
};

const SearchBooking = () => {
    const [status, setStatus] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [timeRange, setTimeRange] = useState("");
    const [selectedRadio, setSelectedRadio] = useState("selectOption"); // Mặc định ô đầu tiên được chọn
    const [selectedTimeOption, setSelectedTimeOption] = useState(""); // Giá trị select
    const [booking, setBooking] = useState(null);
    const [activeRow, setActiveRow] = useState(null);
    const [selectedRows, setSelectedRows] = useState(new Set());

    const handleTableOpenAndClose = (rowId) => {
        if (activeRow === rowId) {
            setActiveRow(null); // Nếu bấm lại thì đóng thông tin chi tiết
        } else {
            setActiveRow(rowId); // Mở thông tin chi tiết cho dòng hiện tại
        }
    }

    const formatDateForInput = (date) => {
        return new Date(date).toISOString().slice(0, 16);
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setBooking((prevBooking) => ({
            ...prevBooking,
            thoiGianDat: value, // Cập nhật giá trị thoiGianDat
        }));
    };

    const handleToggle = () => setStatus(!status);
    const handleShowToast = () => setShowToast(true);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0'); // Thêm '0' nếu ngày có 1 chữ số
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm '0' nếu cần
        const year = date.getFullYear(); // Lấy năm của ngày đã chọn
        const currentYear = new Date().getFullYear(); // Năm hiện tại

        // Nếu năm khác năm hiện tại, hiển thị cả năm; nếu không, chỉ hiển thị ngày/tháng
        return year !== currentYear ? `${day}/${month}/${year}` : `${day}/${month}`;
    };

    const handleSaveDateRange = () => {
        if (startDate && endDate) {
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);
            setTimeRange(`${formattedStartDate} - ${formattedEndDate}`);
            setShowToast(false);
        }
    };
    
    const handleTimeOptionChange = (e) => {
        setSelectedTimeOption(e.target.value);
    };

    const handleRadioChange = (radio) => {
        setSelectedRadio(radio);  // Cập nhật radio được chọn
    };

    const bookings = [
        {
            id: "DP000013",
            maDatPhong: "P302",
            maHoaDon: "HĐ001",
            trangThaiThanhToan: "Chưa thanh toán",
            trangThaiDatPhong: "Đang xử lý",
            thoiGianDat: "03/10/2024 13:17",
            thoiGianNhan: "03/10/2024 14:00",
            thoiGianTra: "03/10/2024 14:17",
            tenPhong: "Phòng 01 giường đơn (Giờ)",
            khachHang: "Khách lẻ",
            bangGia: "121212",
            kenhBan: "Khách đến trực tiếp",
            trangThai: "Đang xử lý",
            chiNhanh: "Chi nhánh trung tâm",
            nhanVienDat: "Chưa xác định",
            taiKhoanTao: "Nguyễn Anh Hảo",
            chiTiet: {
                maHangHoa: "Single Bedroom",
                tenHang: "Phòng 01 giường đơn (Giờ) P.302",
                soLuong: 1,
                donGia: 150000, // Giá đơn vị
                giamGia: 0, // Không có giảm giá
                giaBan: 150000, // Giá bán
                thanhTien: 150000, // Thành tiền
            },
            tongTien: 150000,
            giamGia: 0,
            khachDaTra: 0,
            conCanTra: 150000,
        },
        {
            id: "DP000014",
            maDatPhong: "P303",
            maHoaDon: "HĐ002",
            trangThaiThanhToan: "Đã thanh toán",
            trangThaiDatPhong: "Hoàn thành",
            thoiGianDat: "04/10/2024 10:00",
            thoiGianNhan: "04/10/2024 11:00",
            thoiGianTra: "04/10/2024 12:00",
            tenPhong: "Phòng 02 giường đôi (Ngày)",
            khachHang: "Khách lẻ",
            bangGia: "232323",
            kenhBan: "Đặt qua web",
            trangThai: "Hoàn thành",
            chiNhanh: "Chi nhánh thứ 2",
            nhanVienDat: "Nguyễn Văn A",
            taiKhoanTao: "Nguyễn Văn B",
            chiTiet: {
                maHangHoa: "Double Bedroom",
                tenHang: "Phòng 02 giường đôi (Ngày) P.303",
                soLuong: 1,
                donGia: 300000, // Giá đơn vị
                giamGia: 50000, // Giảm giá 50,000 VNĐ
                giaBan: 250000, // Giá bán sau khi giảm
                thanhTien: 250000, // Thành tiền sau khi giảm
            },
            tongTien: 250000,
            giamGia: 50000,
            khachDaTra: 250000,
            conCanTra: 0,
        },
    ];

    const toggleRowSelection = (rowId) => {
        setSelectedRows((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(rowId)) {
                newSelected.delete(rowId);
            } else {
                newSelected.add(rowId);
            }
            return newSelected;
        });
    }

    const toggleAllRows = () => {
        if (selectedRows.size === bookings.length) {
            setSelectedRows(new Set());
        } else {
            setSelectedRows(new Set(bookings.map((booking) => booking.id)));
        }
    }

    const employees = ["Nguyễn Văn A", "Nguyễn Văn B", "Chưa xác định"];

    return (
        <>
            <Card style={{ border: 'none', boxShadow: 'none' }}>
                <Card.Body>
                    <Row>
                        <Col md={12} className="text-end">
                            <button
                                className="btn"
                                style={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    color: '#000',
                                    padding: '5px 10px',
                                    boxShadow: 'none'
                                }}
                                onClick={handleToggle}
                            >
                                <CiFilter size={20} />
                            </button>
                        </Col>
                        {status && (
                            <Row className="mt-3">
                                <Col md={6}>
                                    <Row>
                                        <Col md={6}>
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>Tìm kiếm</Card.Title>
                                                    <Form.Group className="mb-3" controlId="Id">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Theo mã đặt phòng"
                                                            style={{ fontSize: '12px' }}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="customerInfo">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Theo mã, tên, điện thoại KH"
                                                            style={{ fontSize: '12px' }}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Tìm kiếm theo loại phòng"
                                                            style={{ fontSize: '12px' }}
                                                        />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6}>
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>Thời gian đặt</Card.Title>

                                                    {/* Radio cho phần chọn select */}
                                                    <Form.Group className="mb-3" controlId="timeOption">
                                                        <InputGroup>
                                                            <InputGroup.Radio
                                                                name="timeOption"
                                                                checked={selectedRadio === 'selectOption'}
                                                                onChange={() => handleRadioChange('selectOption')}
                                                                aria-label="Radio button for following select input"
                                                            />
                                                            <Form.Select
                                                                aria-label="Select input with radio button"
                                                                style={{ border: '1px solid #eee' }}
                                                                value={selectedTimeOption} // Giá trị select lưu vào state
                                                                onChange={handleTimeOptionChange} // Hàm thay đổi giá trị select
                                                                disabled={selectedRadio !== 'selectOption'} // Disable nếu radio không được chọn
                                                            >
                                                                <option value="">Hôm nay</option>
                                                                <option value="1">Hôm qua</option>
                                                                <option value="2">Tuần này</option>
                                                                <option value="3">Tuần trước</option>
                                                                <option value="4">7 ngày</option>
                                                            </Form.Select>
                                                        </InputGroup>
                                                    </Form.Group>

                                                    {/* Radio cho phần chọn khoảng thời gian (date range) */}
                                                    <Form.Group className="mb-3" controlId="timeOptionText">
                                                        <InputGroup>
                                                            <InputGroup.Radio
                                                                name="timeOption"
                                                                checked={selectedRadio === 'textInput'}
                                                                onChange={() => handleRadioChange('textInput')}
                                                                aria-label="Radio button for following text input"
                                                            />
                                                            <Form.Control
                                                                aria-label="Text input with date range picker"
                                                                value={timeRange} // Giá trị được lưu ở đây sau khi chọn ngày
                                                                placeholder="Chọn thời gian"
                                                                className={selectedRadio === 'textInput' ? 'input-enabled' : 'input-disabled'}
                                                                onClick={handleShowToast}  // Hiển thị Toast khi nhấp vào ô thứ 2
                                                                readOnly
                                                                disabled={selectedRadio !== 'textInput'} // Disable nếu radio không được chọn
                                                            />
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={6}>
                                    <Row>
                                        <Col md={6}>
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>Trạng thái</Card.Title>
                                                    <Form className="checkbox-group">
                                                        <Form.Check
                                                            type="checkbox"
                                                            label="Chờ xác nhận"
                                                        />
                                                        <Form.Check
                                                            type="checkbox"
                                                            label="Đang xử lý"
                                                        />
                                                        <Form.Check
                                                            type="checkbox"
                                                            label="Hoàn thành"
                                                        />
                                                        <Form.Check
                                                            type="checkbox"
                                                            label="Đã hủy"
                                                        />
                                                    </Form>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6}>
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>Trạng thái thanh toán</Card.Title>
                                                    <Form className="checkbox-group">
                                                        <Form.Check
                                                            type="checkbox"
                                                            label="Chưa thanh toán"
                                                        />
                                                        <Form.Check
                                                            type="checkbox"
                                                            label="Tạm ứng"
                                                        />
                                                        <Form.Check
                                                            type="checkbox"
                                                            label="Đã thanh toán hết"
                                                        />
                                                    </Form>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )}
                    </Row>
                    <Row>
                        <Table responsive bordered className="mt-5">
                            <thead>
                                <tr className="table-limited-text" >
                                    <th>
                                        <Form.Check
                                            type="checkbox"
                                            checked={selectedRows.size === bookings.length}
                                            onChange={toggleAllRows}
                                        />
                                    </th>

                                    <th>Mã đặt phòng</th>
                                    <th>Mã hóa đơn</th>
                                    <th>Trạng thái</th>
                                    <th>Trạng thái</th>
                                    <th>Thời gian đặt</th>
                                    <th>Thời gian nhận</th>
                                    <th>Thời gian thời gian trả</th>
                                    <th>Tên phòng</th>
                                    <th>khách hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <React.Fragment key={booking.id}>
                                        <tr
                                            onClick={() => handleTableOpenAndClose(booking.id)}
                                            className="table-limited-text"
                                        >
                                            <td>
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={selectedRows.has(booking.id)}
                                                    onChange={() => toggleRowSelection(booking.id)}
                                                    onClick={(e) => e.stopPropagation()} // Prevents checkbox clicks from selecting the entire row
                                                />
                                            </td>
                                            <td>{booking.maDatPhong}</td>
                                            <td>{booking.maHoaDon}</td>
                                            <td>{booking.trangThaiThanhToan}</td>
                                            <td>{booking.trangThaiDatPhong}</td>
                                            <td>{booking.thoiGianDat}</td>
                                            <td>{booking.thoiGianNhan}</td>
                                            <td>{booking.thoiGianTra}</td>
                                            <td>{booking.tenPhong}</td>
                                            <td>{booking.khachHang}</td>
                                        </tr>

                                        {/* Hiển thị thông tin chi tiết nếu activeRow === booking.id */}
                                        {activeRow === booking.id && (
                                            <tr>
                                                <td colSpan="10">
                                                    <div className="booking-details">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <p>
                                                                    <strong>Mã đặt phòng:</strong>	&nbsp;
                                                                    <input
                                                                        type="text"
                                                                        value={booking.id}
                                                                        onChange={(e) => handleInputChange(e, 'id')}
                                                                        className="custom-input"
                                                                        disabled
                                                                    />
                                                                </p>
                                                                <p>
                                                                    <strong>Thời gian:</strong>&nbsp;
                                                                    <input
                                                                        type="datetime-local"
                                                                        value={formatDateForInput(booking.thoiGianDat)}
                                                                        onChange={(e) => handleInputChange(e, 'thoiGianDat')}
                                                                        className="custom-input"
                                                                    />
                                                                </p>
                                                                <p>
                                                                    <strong>Khách hàng:</strong>&nbsp;
                                                                    <input
                                                                        type="text"
                                                                        value={booking.khachHang}
                                                                        onChange={(e) => handleInputChange(e, 'khachHang')}
                                                                        className="custom-input"
                                                                        disabled
                                                                    />
                                                                </p>
                                                                <p>
                                                                    <strong>Bảng giá:</strong>	&nbsp;
                                                                    <input
                                                                        type="text"
                                                                        value={booking.bangGia}
                                                                        onChange={(e) => handleInputChange(e, 'bangGia')}
                                                                        className="custom-input"
                                                                        disabled
                                                                    />
                                                                </p>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <p>
                                                                    <strong>Trạng thái:</strong>&nbsp;
                                                                    <input
                                                                        type="text"
                                                                        value={booking.trangThai}
                                                                        onChange={(e) => handleInputChange(e, 'trangThai')}
                                                                        className="custom-input"
                                                                        disabled
                                                                    />
                                                                </p>
                                                                <p>
                                                                    <strong>Chi nhánh:</strong>&nbsp;
                                                                    <input
                                                                        type="text"
                                                                        value={booking.chiNhanh}
                                                                        onChange={(e) => handleInputChange(e, 'chiNhanh')}
                                                                        className="custom-input"
                                                                        disabled
                                                                    />
                                                                </p>
                                                                <p>
                                                                    <strong>Nhân viên:</strong> &nbsp;
                                                                    <select
                                                                        onChange={(e) => handleInputChange(e, 'nhanVienDat')}
                                                                        className="custom-input"
                                                                    >
                                                                        {employees.map((employee, index) => (
                                                                            <option key={index} value={employee}>
                                                                                {employee}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </p>

                                                                <p>
                                                                    <strong>Tài khoản tạo:</strong>&nbsp;
                                                                    <input
                                                                        type="text"
                                                                        value={booking.taiKhoanTao}
                                                                        onChange={(e) => handleInputChange(e, 'taiKhoanTao')}
                                                                        className="custom-input"
                                                                        disabled
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <table className="table border table-hover">
                                                            <thead className="table-info">
                                                                <tr>
                                                                    <th>Mã hàng hóa</th>
                                                                    <th>Tên hàng</th>
                                                                    <th>Số lượng</th>
                                                                    <th>Đơn giá</th>
                                                                    <th>Giảm giá</th>
                                                                    <th>Giá bán</th>
                                                                    <th>Thành tiền</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>{booking.chiTiet.maHangHoa}</td>
                                                                    <td>
                                                                        {booking.chiTiet.tenHang} <br />
                                                                        <span>{booking.chiTiet.phong} - {booking.chiTiet.ngayDat} ({booking.chiTiet.thoiGianSuDung})</span>
                                                                    </td>
                                                                    <td>{booking.chiTiet.soLuong}</td>
                                                                    <td>{new Intl.NumberFormat('vi-VN').format(booking.chiTiet.donGia)} VNĐ</td>
                                                                    <td>{new Intl.NumberFormat('vi-VN').format(booking.chiTiet.giamGia)} VNĐ</td>
                                                                    <td>{new Intl.NumberFormat('vi-VN').format(booking.chiTiet.giaBan)} VNĐ</td>
                                                                    <td>{new Intl.NumberFormat('vi-VN').format(booking.chiTiet.thanhTien)} VNĐ</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <div className="row">
                                                            <div className="col-md-8"></div>
                                                            <div className="col-md-4">
                                                                <p><strong>Tổng tiền hàng:</strong> {new Intl.NumberFormat('vi-VN').format(booking.tongTien)} VNĐ</p>
                                                                <p><strong>Giảm giá:</strong> {new Intl.NumberFormat('vi-VN').format(booking.giamGia)} VNĐ</p>
                                                                <p><strong>Khách đã trả:</strong> {new Intl.NumberFormat('vi-VN').format(booking.khachDaTra)} VNĐ</p>
                                                                <p><strong>Còn cần trả:</strong> {new Intl.NumberFormat('vi-VN').format(booking.conCanTra)} VNĐ</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-content-end mt-3">
                                                            <button className="btn btn-success">
                                                                <RiLoopLeftFill /> &nbsp;                                                            &nbsp;
                                                                Xử lý đặt phòng
                                                            </button> &nbsp; &nbsp;
                                                            <button className="btn btn-success">
                                                                <FaSave /> &nbsp;
                                                                Lưu
                                                            </button> &nbsp; &nbsp;
                                                            <button className="btn btn-danger">
                                                                <MdCancelPresentation />&nbsp;
                                                                Hủy đặt phòng
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}

                                    </React.Fragment>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Card.Body>
            </Card>

            {/* Toast cho ô nhập thứ 2 */}
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', zIndex: 999999999 }}
            >
                <Toast.Header>
                    <strong className="me-auto">Chọn khoảng thời gian</strong>
                </Toast.Header>
                <Toast.Body>
                    <Row>
                        <Col md={6}>
                            <DatePicker
                                label="Từ ngày"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Col>
                        <Col md={6}>
                            <DatePicker
                                label="Đến ngày"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <button className="btn btn-primary mt-3" onClick={handleSaveDateRange}>
                        Lưu
                    </button>
                </Toast.Body>
            </Toast>
        </>
    );
};

export { SearchBooking };
