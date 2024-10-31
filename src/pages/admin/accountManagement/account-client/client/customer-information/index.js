import React from "react";
import {
    CButton,
} from "@coreui/react";
import { Col, Row, Form } from "react-bootstrap";
const CustomerInformation = ({item}) => {
    return (
        <>
            <Row className="mt-3">
                <Col xs={12} md={4}>
                    <div className="border-bottom-invoice">
                        <p>Mã nhân viên: <strong>{item.id}</strong></p>
                    </div>
                    <div className="border-bottom-invoice">
                        <p>Họ tên: <strong>Lê Minh Khôi</strong></p>
                    </div>
                    <div className="border-bottom-invoice">
                        <p>Tài khoản: <strong>mjkkhoi</strong></p>
                    </div>
                    <div className="border-bottom-invoice">
                        <p>Email: <strong>mjkkhoi1@gmail.com</strong></p>
                    </div>
                    <div className="border-bottom-invoice">
                        <p>Số điện thoại: <strong>0987887575</strong></p>
                    </div>
                </Col>
                <Col xs={12} md={4}>
                    <div className="form-check form-switch d-flex border-bottom-invoice ps-0 mb-3 mt-3">
                        <label className="form-check-label me-5">Trạng thái:</label>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                    </div>
                    <div className="border-bottom-invoice d-flex align-items-center" style={{ marginTop: "-19px" }}>
                        <p className="mb-0 me-2">Vai trò: <strong>Khách hàng</strong></p>
                    </div>
                    <div className="border-bottom-invoice d-flex">
                        <p>Giới tính:</p>
                        <div class="form-check form-check-inline mt-4 ms-2">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                            <label class="form-check-label" for="inlineRadio1">Nam</label>
                        </div>
                        <div class="form-check form-check-inline mt-4">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                            <label class="form-check-label" for="inlineRadio2">Nữ</label>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className="d-flex justify-content-end me-5">
                <CButton size="sm" color="info" className="mx-2">Cập nhật</CButton>
                <CButton size="sm" color="danger" className="ms-1">Delete</CButton>
            </div>
        </>
    )
}

export default CustomerInformation;
