import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, InputGroup, Button, Dropdown, Row, Col } from 'react-bootstrap';

export default function BookingFillter({ onFilter, onSendDates }) {
    const [checkinDate, setCheckinDate] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);
    const [guestDropdownVisible, setGuestDropdownVisible] = useState(false);
    const [adultCount, setAdultCount] = useState(1);
    const [guestSummary, setGuestSummary] = useState("1 khách");


    useEffect(() => {
        const today = new Date();
        setCheckinDate(today);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        setCheckoutDate(tomorrow);

        if (onSendDates) {
            onSendDates(
                formatDateToYYYYMMDD(today),
                formatDateToYYYYMMDD(tomorrow)
            );
        }
    }, []);

    // Format ngày về yyyy-MM-dd
    const formatDateToYYYYMMDD = (date) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // Hàm toggle dropdown
    const toggleGuestDropdown = () => {
        setGuestDropdownVisible(!guestDropdownVisible);
    };

    // Thay đổi số người lớn
    const changeCount = (type, value) => {
        if (type === "adult") {
            setAdultCount((prevCount) => Math.max(1, prevCount + value)); // Tối thiểu 1 người lớn
        }
    };

    // Áp dụng lựa chọn và cập nhật summary
    const applyGuestSelection = () => {
        setGuestSummary(`${adultCount} khách`);
        setGuestDropdownVisible(false);
    };

    const handleSubmit = () => {
        onFilter(formatDateToYYYYMMDD(checkinDate), formatDateToYYYYMMDD(checkoutDate), adultCount);
    };

    // Xử lý khi thay đổi ngày nhận phòng
    const handleCheckinChange = (date) => {
        setCheckinDate(date);

        // Nếu ngày trả phòng không hợp lệ, tự động điều chỉnh
        if (checkoutDate && date >= checkoutDate) {
            const correctedDate = new Date(date);
            correctedDate.setDate(correctedDate.getDate() + 1); // Ngày trả phòng phải ít nhất 1 ngày sau ngày nhận phòng
            setCheckoutDate(correctedDate);
        }
    };

    // Xử lý khi thay đổi ngày trả phòng
    const handleCheckoutChange = (date) => {
        if (checkinDate && date <= checkinDate) {
            const correctedDate = new Date(checkinDate);
            correctedDate.setDate(correctedDate.getDate() + 1); // Tự động sửa ngày trả phòng
            setCheckoutDate(correctedDate);
        } else {
            setCheckoutDate(date);
        }
    };

    return (
        <>
            <div
                className="container-fluid booking pb-5 wow fadeIn"
                data-wow-delay="0.1s"
            >
                <div className="container">
                    <div className="bg-white shadow" style={{ padding: "35px" }}>
                        <div className="row g-2">
                            <div className="col-md-10">
                                <div className="row g-2">
                                    <div className="col-md-3">
                                        <label htmlFor="checkin" className="form-label">Nhận phòng</label>
                                        <div className="input-group flex-nowrap">
                                            <span className="input-group-text"><i className="bi bi-calendar-minus"></i></span>
                                            <DatePicker
                                                selected={checkinDate}
                                                onChange={handleCheckinChange}
                                                className="form-control mt-0"
                                                placeholderText="Chọn ngày nhận khách"
                                                dateFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="checkout" className="form-label">Trả phòng</label>
                                        <div className="input-group flex-nowrap">
                                            <span className="input-group-text"><i className="bi bi-calendar-minus"></i></span>
                                            <DatePicker
                                                selected={checkoutDate}
                                                onChange={handleCheckoutChange}
                                                className="form-control mt-0"
                                                placeholderText="Chọn ngày"
                                                dateFormat="dd/MM/yyyy"
                                                minDate={checkinDate ? new Date(checkinDate).setDate(new Date(checkinDate).getDate() + 1) : new Date()}
                                            />
                                        </div>
                                    </div>
                                    <Col md={6} className="position-relative">
                                        <Form.Group controlId="guests">
                                            <Form.Label>Số khách</Form.Label>
                                            <InputGroup className="flex-nowrap">
                                                <InputGroup.Text>
                                                    <i className="bi bi-person"></i>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type="text"
                                                    placeholder={guestSummary}
                                                    readOnly
                                                    onClick={toggleGuestDropdown}
                                                    style={{ background: '#fff' }}
                                                />
                                            </InputGroup>
                                        </Form.Group>

                                        {guestDropdownVisible && (
                                            <Dropdown.Menu
                                                show
                                                align="end"
                                                className="p-3 border rounded shadow-sm guest-dropdown"
                                                style={{ position: 'absolute', top: '100%', zIndex: 1 }}
                                            >
                                                <Dropdown.Item as="div" className="guest-option">
                                                    <Row className="d-flex justify-content-between align-items-center mb-2">
                                                        <Col>Số lượng người ở</Col>
                                                        <Col className="d-flex justify-content-end">
                                                            <Button
                                                                variant="outline-secondary"
                                                                size="sm"
                                                                onClick={() => changeCount('adult', -1)}
                                                            >
                                                                -
                                                            </Button>
                                                            <span className="mx-2">{adultCount}</span>
                                                            <Button
                                                                variant="outline-secondary"
                                                                size="sm"
                                                                onClick={() => changeCount('adult', 1)}
                                                            >
                                                                +
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Dropdown.Item>

                                                <Button variant="primary" onClick={applyGuestSelection} className="w-100">
                                                    Xong
                                                </Button>
                                            </Dropdown.Menu>
                                        )}
                                    </Col>
                                </div>
                            </div>
                            <div className="col-md-2" style={{ marginTop: "40px" }}>
                                <button className="btn btn-primary w-100" onClick={handleSubmit} style={{ height: '44px' }}>Tìm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
