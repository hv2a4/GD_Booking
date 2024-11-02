import React, { useState } from 'react';
import LayoutClient from '../../../components/layout/cilent';

const PageBookRoom = () => {
    const [checkInTimeVisible, setCheckInTimeVisible] = useState(false);
    const [checkOutTimeVisible, setCheckOutTimeVisible] = useState(false);
    const [checkPayVisible, setCheckPayVisible] = useState(false);
    const [specialRequestVisible, setSpecialRequestVisible] = useState(false);
    const [specialRequest, setSpecialRequest] = useState('');
    const [smokingOption, setSmokingOption] = useState('');
    const [bedOption, setBedOption] = useState('');

    const toggleCheckInTime = () => {
        setCheckInTimeVisible(!checkInTimeVisible);
    };

    const toggleCheckOutTime = () => {
        setCheckOutTimeVisible(!checkOutTimeVisible);
    };
    const togglePayTime = () => {
        setCheckPayVisible(!checkPayVisible);
    };

    const toggleSpecialRequest = () => {
        setSpecialRequestVisible(!specialRequestVisible);
    };

    const handleSmokingChange = (event) => {
        setSmokingOption(event.target.value);
    };

    const handleBedChange = (event) => {
        setBedOption(event.target.value);
    };
    return (
        <LayoutClient>
            <div className="page-box-content page-hotel">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h3>Điền thông tin liên hệ</h3>
                            <div className="box-content">
                                <form action="" method="post" id="form-hotel-create-booking" className="box-submit-form create-booking" novalidate>
                                    <div className="row mb-3">
                                        <div className="col-lg-12 col-md-12">
                                            <label for="txt_fullname">Họ và tên <span className="required">*</span></label>
                                            <input id="txt_fullname" autocomplete="off" required type="text" className="form-control" name="txt_fullname" />
                                            <span className="help-block"></span>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-lg-7 col-md-7">
                                            <label for="txt_email">Email <span className="required">*</span></label>
                                            <input id="txt_email" autocomplete="off" required type="email" className="form-control" name="txt_email" />
                                            <span className="help-block"></span>
                                        </div>
                                        <div className="col-lg-5 col-md-5">
                                            <label for="txt_phone">Số điện thoại <span className="required">*</span></label>
                                            <input id="txt_phone" autocomplete="off" required type="text" className="form-control" name="txt_phone" />
                                            <span className="help-block"></span>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-lg-12 col-md-12 box-full-services-extra">
                                            <label for="info_services_extra">Hãy cho chúng tôi biết Quý khách cần gì?</label>
                                            <div className="box-services-extra">
                                                <div className="note">Lưu ý tất cả các yêu cầu chỉ được đáp ứng tùy theo khách sạn</div>
                                                <div className="box-services-extra-inner">
                                                    <div className="box-item type-radio">
                                                        <label htmlFor="rad-item-1">
                                                            <input
                                                                id="rad-item-1"
                                                                type="radio"
                                                                value="0"
                                                                checked={smokingOption === '0'}
                                                                onChange={handleSmokingChange}
                                                            />
                                                            Phòng không hút thuốc
                                                        </label>
                                                        <label htmlFor="rad-item-2">
                                                            <input
                                                                id="rad-item-2"
                                                                type="radio"
                                                                value="1"
                                                                checked={smokingOption === '1'}
                                                                onChange={handleSmokingChange}
                                                            />
                                                            Phòng hút thuốc
                                                        </label>
                                                    </div>
                                                    <div className="box-item type-radio">
                                                        <label htmlFor="rad-item-3">
                                                            <input
                                                                id="rad-item-3"
                                                                type="radio"
                                                                value="3"
                                                                checked={bedOption === '3'}
                                                                onChange={handleBedChange}
                                                            />
                                                            Tôi muốn lấy giường lớn
                                                        </label>
                                                        <label htmlFor="rad-item-4">
                                                            <input
                                                                id="rad-item-4"
                                                                type="radio"
                                                                value="4"
                                                                checked={bedOption === '4'}
                                                                onChange={handleBedChange}
                                                            />
                                                            Tôi muốn lấy giường đôi
                                                        </label>
                                                    </div>
                                                    <div className="box-checkbox-services">
                                                        <div className="box-item">
                                                            <label for="chk-item-1">
                                                                <input id="chk-item-1" type="checkbox" value="1" /> Tôi muốn lấy phòng tầng cao
                                                            </label>
                                                        </div>
                                                        <div className="box-item">
                                                            <label for="chk-item-2">
                                                                <input id="chk-item-2" type="checkbox" value="1" /> Thêm nôi trẻ em (có thể áp dụng phụ phí)
                                                            </label>
                                                        </div>
                                                        <div className="box-item">
                                                            <label htmlFor="chk-item-3">
                                                                <input
                                                                    id="chk-item-3"
                                                                    type="checkbox"
                                                                    value="1"
                                                                    onChange={toggleCheckInTime}
                                                                />
                                                                Giờ nhận phòng
                                                            </label>
                                                            <div className={`box-content-item chk-item-3 ${checkInTimeVisible ? '' : 'hidden'}`}>
                                                                <input
                                                                    value="14:00"
                                                                    type="time"
                                                                    id="txt_room_time_checkin"
                                                                    name="info_services_extra[time_checkin]"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="box-item">
                                                            <label htmlFor="chk-item-4">
                                                                <input
                                                                    id="chk-item-4"
                                                                    type="checkbox"
                                                                    value="1"
                                                                    onChange={toggleCheckOutTime}
                                                                />
                                                                Giờ trả phòng
                                                            </label>
                                                            <div className={`box-content-item chk-item-4 ${checkOutTimeVisible ? '' : 'hidden'}`}>
                                                                <input
                                                                    value="12:00"
                                                                    type="time"
                                                                    id="txt_room_time_checkout"
                                                                    name="info_services_extra[time_checkout]"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="box-checkbox-payment">
                                                        <div className="box-item">
                                                            <label htmlFor="chk-item-5">
                                                                <input
                                                                    id="chk-item-5"
                                                                    type="checkbox"
                                                                    value="1"
                                                                    onChange={togglePayTime}
                                                                />
                                                                Chọn phương thức thanh toán
                                                            </label>
                                                            <div
                                                                className={`box-content-item chk-item-5 ${checkPayVisible ? '' : 'hidden'}`}
                                                                style={{
                                                                    display: checkPayVisible ? 'block' : 'none',
                                                                    padding: '10px',
                                                                    border: '1px solid #ddd',
                                                                    borderRadius: '5px',
                                                                    backgroundColor: '#f9f9f9',
                                                                }}
                                                            >
                                                                <label style={{ display: 'block', marginBottom: '8px' }}>
                                                                    <input
                                                                        value="Thanh toán tại quầy"
                                                                        type="radio"
                                                                        name="info_pay_extra"
                                                                        style={{ marginRight: '8px' }}
                                                                    />
                                                                    Thanh toán tại quầy
                                                                </label>

                                                                <label style={{ display: 'block', marginBottom: '8px' }}>
                                                                    <input
                                                                        value="Thanh toán bằng VNPay"
                                                                        type="radio"
                                                                        name="info_pay_extra"
                                                                        style={{ marginRight: '8px' }}
                                                                    />
                                                                    Thanh toán bằng VNPay
                                                                </label>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="help-block"></span>
                                        </div>
                                    </div>
                                    <div className="hotel-box-note">
                                        <div className="box-title" onClick={toggleSpecialRequest}>
                                            <i className={`fa ${specialRequestVisible ? 'fa-minus-circle' : 'fa-plus-circle'}`}></i>
                                            Thêm yêu cầu đặc biệt
                                        </div>
                                        <textarea
                                            id="txt_note"
                                            autoComplete="off"
                                            maxLength="200"
                                            className={`form-control txt_note ${specialRequestVisible ? '' : 'hidden'}`}
                                            name="info_services_extra[note]"
                                            value={specialRequest}
                                            onChange={(e) => setSpecialRequest(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <span className="help-block"></span>
                                    <div className="box-submit">
                                        <button type="submit" className="btn-submit-contact-booking">Tiếp tục</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <div className="col-md-4">
                            <h3>Thông tin đặt phòng</h3>
                            <div className="hotel-page-sidebar">
                                <div className="box-summary">
                                    <div className="summary-main">
                                        <div className="box-img">
                                            <img className="" src="https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_353355/mini_7e0ab78439aba7749488a253455b5f22.jpg" alt="" />
                                        </div>
                                        <div className="box-title">
                                            <h3>Khách sạn Vias Vũng Tàu</h3>
                                            <div className="description">
                                                Phòng Deluxe Hướng Phố
                                            </div>
                                        </div>
                                    </div>
                                    <div className="summary-total">
                                        <table className="tlb-info">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="title">
                                                            <i className="fa fa-calendar"></i> Ngày nhận phòng
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="info-right">
                                                            14/09/2024
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="title">
                                                            <i className="fa fa-calendar-o"></i> Ngày trả phòng
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="info-right">
                                                            15/09/2024
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="title">
                                                            <i className="fa fa-user"></i> Số khách phòng
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="info-right">
                                                            2 khách, 1 phòng
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="summary-total">
                                        <table className="tlb-info tlb-info-price">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="title"> 1 phòng x 1 đêm </div>
                                                    </td>
                                                    <td>
                                                        <div className="info-right">3,353,666 VND</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="title box-promo">Promo giảm 40%</div>
                                                    </td>
                                                    <td>
                                                        <div className="info-right">- 1,341,466 VND</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="title type-tax">Phí dịch vụ</div>
                                                    </td>
                                                    <td>
                                                        <div className="info-right type-tax">MIỄN PHÍ</div>
                                                    </td>
                                                </tr>
                                                <tr className="tr-total">
                                                    <td>
                                                        <div className="title">Tổng tiền</div>
                                                    </td>
                                                    <td>
                                                        <div data-price-format="2,012,200 VND" className="info-right">2,012,200 VND</div>
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