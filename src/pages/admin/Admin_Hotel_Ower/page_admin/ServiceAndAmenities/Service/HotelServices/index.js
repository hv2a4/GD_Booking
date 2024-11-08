import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { DeleteHotelServiceModal, HotelServiceFormModal } from './FormModal';
import { request } from "../../../../../../../config/configApi";
import { get } from "jquery";


const HotelService = () => {
    const [selectedHotelService, setSelectedHotelService] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [dataServiceHotel, setDataService] = useState([]);
    const handleRowClick = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const toggleHotelServiceSelection = (id) => {
        setSelectedHotelService(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };
    
    const getData = async() => {
        const response = await request({method:"GET", path:"api/service-hotel/getAll"});
        setDataService(response);        
    } 

    const hotelServices = dataServiceHotel.map((item) => ({
        id: item.id,
        serviceHotelName: item.serviceHotelName,
        price: item.price,
        icon: item.icon,
        image: item.image,
        id_hotel: item.id_hotel
    }));
 

    useEffect(()=>{
        getData()
    },[]);

    return (
        <div className="table-responsive mt-3">
            <table className="table table-striped table-hover" style={{ cursor: 'pointer' }}>
                <thead className="table-info">
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={() => {
                                    const allSelected = selectedHotelService.length === hotelServices.length;
                                    setSelectedHotelService(allSelected ? [] : hotelServices.map(hotelService => hotelService.id));
                                }}
                                checked={selectedHotelService.length === hotelServices.length}
                            />
                        </th>
                        <th>Mã dịch vụ khách sạn</th>
                        <th>Tên dịch vụ khách sạn</th>
                        <th>Giá</th>
                        <th>Icon</th>
                    </tr>
                </thead>
                <tbody>
                    {hotelServices.map(({ id, serviceHotelName, price, icon }) => (
                        <React.Fragment key={id}>
                            <tr onClick={(e) => {
                                if (e.target.type !== "checkbox") {
                                    handleRowClick(id);
                                }
                            }}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedHotelService.includes(id)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            toggleHotelServiceSelection(id);
                                        }}
                                    />
                                </td>
                                <td>{`SV${id.toString().padStart(3, '0')}`}</td>
                                <td>{serviceHotelName}</td>
                                <td>{price} VNĐ</td>
                                <td><i className={icon}></i></td>
                            </tr>

                            {/* Hàng chi tiết mở rộng */}
                            {expandedRow === id && (
                                <tr>
                                    <td colSpan="10">
                                        <Card>
                                            <Card.Body>
                                                <Row>
                                                    <div className="container-fluid">
                                                        <div className="tab-pane fade show active mt-5" style={{ minHeight: 'auto' }}>
                                                            <Row className="mb-4 align-items-start">
                                                                <Col md={4} className="d-flex justify-content-center">
                                                                    <img src={''} alt="" style={{ width: '100%', height: '100%' }} />
                                                                </Col>
                                                                <Col md={8}>
                                                                    <p><strong>Mã dịch vụ khách sạn:</strong>{id}</p>
                                                                    <p><strong>Tên dịch vụ khách sạn:</strong> {serviceHotelName}</p>
                                                                    <p><strong>Giá:</strong> {price} VND</p>
                                                                    <p><strong>Icon:</strong> <span dangerouslySetInnerHTML={{ __html: icon }}></span></p>
                                                                </Col>
                                                            </Row>
                                                            <div className="d-flex justify-content-end">
                                                                <HotelServiceFormModal idHotelService={id} />
                                                                <DeleteHotelServiceModal id={id} serviceHotelName={serviceHotelName} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HotelService;
