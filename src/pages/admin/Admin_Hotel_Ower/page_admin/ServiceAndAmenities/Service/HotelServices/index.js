import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { DeleteHotelServiceModal } from './FormModal';



const HotelService = () => {
    const [selectedHotelService, setSelectedHotelService] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowClick = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const toggleHotelServiceSelection = (id) => {
        setSelectedHotelService(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const hotelServices = [
        { id: '1', serviceHotelName: 'a', price: 1000000, icon: '<i class="fa fa-bed text-orange me-2"></i>', image: '', id_hotel: 1 },
        { id: '2', serviceHotelName: 'b', price: 2000000, icon: '<i class="fa fa-bed"></i>', image: '', id_hotel: 1 }
    ];

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
                                <td>{id}</td>
                                <td>{serviceHotelName}</td>
                                <td>{price} VNĐ</td>
                                <td dangerouslySetInnerHTML={{ __html: icon }}></td>
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
