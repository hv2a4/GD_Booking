import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Form, InputGroup, Row, Table, Toast } from "react-bootstrap";
import { CiFilter } from "react-icons/ci";
import '../styles/disible.css';
import { FaSave } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { RiLoopLeftFill } from "react-icons/ri";
import { request } from "../../../../../../config/configApi";
import { getDataReservations } from "../../../../../../services/admin/crudServiceReservations";
import Alert from "../../../../../../config/alert";
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
    const [dataReservations, setDataReservations] = useState([]);
    const [alert, setAlert] = useState(null);

    const handleTableOpenAndClose = (rowId) => {
        if (activeRow === rowId) {
            setActiveRow(null); // Nếu bấm lại thì đóng thông tin chi tiết
        } else {
            setActiveRow(rowId); // Mở thông tin chi tiết cho dòng hiện tại
        }
    }

    function formatDateForInput(date) {
        // Kiểm tra xem date có phải là một giá trị hợp lệ không
        if (!date || isNaN(Date.parse(date))) {
            console.error('Invalid date value:', date);
            return ''; // Hoặc trả về một giá trị mặc định hợp lệ
        }
        return new Date(date).toISOString().slice(0, 16); // Chuyển đổi thành ISO string
    }


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
    const formatDates = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0'); // Thêm '0' nếu ngày có 1 chữ số
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm '0' nếu cần
        const year = date.getFullYear(); // Lấy năm của ngày đã chọn
        const currentYear = new Date().getFullYear(); // Năm hiện tại

        // Nếu năm khác năm hiện tại, hiển thị cả năm; nếu không, chỉ hiển thị ngày/tháng
        return year !== currentYear ? `${day}${month}${year}` : `${day}${month}`;
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
    const handleGetReservations = async () => {
        try {
            const res = await getDataReservations();  // Lấy dữ liệu từ API

            // Kiểm tra xem `res` có phải là mảng hay không
            if (Array.isArray(res)) {
                const user = res.filter((e) => e.roleName === 'Customer');
                setDataReservations(user);
            } else {
                throw new Error("Dữ liệu không phải là mảng");
            }
        } catch (error) {
            setAlert({ type: 'error', title: 'Lỗi khi tải dữ liệu đặt phòng' });
            console.log("Lỗi khi tải dữ liệu đặt phòng: ", error);
        }
    }

    const formatCurrencyVND = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    useEffect(() => {
        handleGetReservations();
    }, []);


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
                        {alert && <Alert type={alert.type} title={alert.title} />}
                        <Table responsive bordered className="mt-5">
                            <thead>
                                <tr className="table-limited-text" >
                                    <th>Số hiệu đặt phòng</th>
                                    <th>Tên khách hàng</th>
                                    <th>Ngày đến</th>
                                    <th>Ngày đi</th>
                                    <th>Số lượng khách</th>
                                    <th>Trạng thái đặt phòng</th>
                                    <th>Tổng giá trị đặt phòng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataReservations.map((booking) => (
                                    <React.Fragment key={booking.bookingId}>
                                        <tr
                                            onClick={() => handleTableOpenAndClose(booking.bookingId)}
                                            className="table-limited-text"  
                                        >
                                            <td>BK{booking.bookingId} {formatDates(booking.createAt)}</td>
                                            <td>{booking.accountFullname}</td>
                                            <td>{formatDate(booking.startAt)}</td>
                                            <td>{formatDate(booking.endAt)}</td>
                                            <td>{booking.max_guests}</td>
                                            <td>{booking.statusBookingName}</td>
                                            <td>{formatCurrencyVND(booking.total_amount)}</td>
                                        </tr>

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
