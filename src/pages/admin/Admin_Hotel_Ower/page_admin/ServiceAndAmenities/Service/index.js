import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { Card, Col, Form, Row } from "react-bootstrap";
import HotelService from "./HotelServices";
import { HotelServiceFormModal } from './HotelServices/FormModal';


const ServicesPageComponent = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const renderTabContent = () => {
        switch (currentTab) {
            case 0:
                return (<HotelService />);
            case 1:
                return (<>2</>);
            case 2:
                return (<>3</>);
            default:
                return null;
        }
    };
    const handlAddHotelServiceClick = (e) => {
        e.preventDefault();
        const addRoom = document.getElementById('hotel-service-form');
        if (addRoom) {
            addRoom.click();
        }
    };

    return (
        <div className="container-fluid">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">Dịch vụ</h2>
                    <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-10">
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col md={4}></Col>
                                        <Col md={4}>

                                        </Col>
                                        <Col md={4}></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-12 col-md-2 text-md-end">
                            <div className="btn-group">
                                <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <MdAdd />&nbsp;
                                    Thêm mới
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a
                                            className="dropdown-item" href="#"
                                            onClick={handlAddHotelServiceClick}
                                        >
                                            <MdAdd />
                                            Khách sạn
                                        </a>
                                        <div className="d-none">
                                            <HotelServiceFormModal />
                                        </div>
                                    </li>

                                    <li>
                                        <a className="dropdown-item" href="#" onClick={''}>
                                            <MdAdd />
                                            Loại phòng
                                            <div className="d-none">

                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={''}>
                                            <MdAdd />
                                            Phòng
                                            <div className="d-none">

                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Tabs */}
                    <ul className="nav nav-tabs mt-4">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${currentTab === 0 ? "active" : ""}`}
                                onClick={() =>  setCurrentTab(0)}
                            >
                                Khách sạn
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${currentTab === 1 ? "active" : ""}`}
                                onClick={() =>  setCurrentTab(1)}
                            >
                                Gói dịch vụ
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${currentTab === 2 ? "active" : ""}`}
                                onClick={() =>  setCurrentTab(2)}
                            >
                                Phòng
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ServicesPageComponent;