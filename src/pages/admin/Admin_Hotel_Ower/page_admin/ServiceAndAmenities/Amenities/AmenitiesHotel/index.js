import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { AmenitiesHotelFormModal, DeleteAmenitiesHotelModal } from "./FormModal";



const AmenitiesHotel = () => {
    const [selectedAmenitiesHotel, setSelectedAmenitiesHotel] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowClick = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const toggleAmenitiesHotelSelection = (id) => {
        setSelectedAmenitiesHotel(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const amenitiesHotels = [
        { id: '1', amenitiesHotelName: 'a', icon: '', id_hotel: 1},
        { id: '2', amenitiesHotelName: 'b', icon: '', id_hotel: 1}
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
                                    const allSelected = selectedAmenitiesHotel.length === amenitiesHotels.length;
                                    setSelectedAmenitiesHotel(allSelected ? [] : amenitiesHotels.map(amenitiesHotel => amenitiesHotel.id));
                                }}
                                checked={selectedAmenitiesHotel.length === amenitiesHotels.length}
                            />
                        </th>
                        <th>Mã tiện nghi khách sạn</th>
                        <th>Tên tiện nghi khách sạn</th>
                        <th>Icon</th>
                    </tr>
                </thead>
                <tbody>
                    {amenitiesHotels.map(({ id, amenitiesHotelName, icon}) => (
                        <React.Fragment key={id}>
                            <tr onClick={(e) => {
                                if (e.target.type !== "checkbox") {
                                    handleRowClick(id);
                                }
                            }}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedAmenitiesHotel.includes(id)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            toggleAmenitiesHotelSelection(id);
                                        }}
                                    />
                                </td>
                                <td>{id}</td>
                                <td>{amenitiesHotelName}</td>
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
                                                            <Col md={4}></Col>
                                                                <Col md={4}>
                                                                    <p><strong>Mã tiện nghi khách sạn: </strong>{id}</p>
                                                                    <p><strong>Tên tiện nghi khách sạn: </strong> {amenitiesHotelName}</p>
                                                                    <p><strong>Icon:</strong> <span dangerouslySetInnerHTML={{ __html: icon }}></span></p>
                                                                </Col>
                                                                <Col md={4}></Col>
                                                            </Row>
                                                            <div className="d-flex justify-content-end">
                                                                <AmenitiesHotelFormModal idAmenitiesHotel={id} />
                                                                <DeleteAmenitiesHotelModal id={id} amenitiesHotelName={amenitiesHotelName} />
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

export default AmenitiesHotel;
