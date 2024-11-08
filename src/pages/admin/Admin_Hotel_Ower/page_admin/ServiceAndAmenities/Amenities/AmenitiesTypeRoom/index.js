import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { AmenitiesTypeRoomFormModal, DeleteAmenitiesTypeRoomModal } from "./FormModal";



const AmenitiesTypeRoom = () => {
    const [selectedAmenitiesTypeRoom, setSelectedAmenitiesTypeRoom] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowClick = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const toggleAmenitiesTypeRoomSelection = (id) => {
        setSelectedAmenitiesTypeRoom(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const amenitiesTypeRooms = [
        { id: '1', amenitiesTypeRoomName: 'a', icon: ''},
        { id: '2', amenitiesTypeRoomName: 'b', icon: ''}
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
                                    const allSelected = selectedAmenitiesTypeRoom.length === amenitiesTypeRooms.length;
                                    setSelectedAmenitiesTypeRoom(allSelected ? [] : amenitiesTypeRooms.map(amenitiesTypeRoom => amenitiesTypeRoom.id));
                                }}
                                checked={selectedAmenitiesTypeRoom.length === amenitiesTypeRooms.length}
                            />
                        </th>
                        <th>Mã tiện nghi loại phòng</th>
                        <th>Tên tiện nghi loại phòng</th>
                        <th>Icon</th>
                    </tr>
                </thead>
                <tbody>
                    {amenitiesTypeRooms.map(({ id, amenitiesTypeRoomName, icon}) => (
                        <React.Fragment key={id}>
                            <tr onClick={(e) => {
                                if (e.target.type !== "checkbox") {
                                    handleRowClick(id);
                                }
                            }}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedAmenitiesTypeRoom.includes(id)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            toggleAmenitiesTypeRoomSelection(id);
                                        }}
                                    />
                                </td>
                                <td>{id}</td>
                                <td>{amenitiesTypeRoomName}</td>
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
                                                                    <p><strong>Mã tiện nghi loại phòng: </strong>{id}</p>
                                                                    <p><strong>Tên tiện nghi loại phòng: </strong> {amenitiesTypeRoomName}</p>
                                                                    <p><strong>Icon:</strong> <span dangerouslySetInnerHTML={{ __html: icon }}></span></p>
                                                                </Col>
                                                                <Col md={4}></Col>
                                                            </Row>
                                                            <div className="d-flex justify-content-end">
                                                                <AmenitiesTypeRoomFormModal idAmenitiesTypeRoom={id} />
                                                                <DeleteAmenitiesTypeRoomModal id={id} amenitiesTypeRoomName={amenitiesTypeRoomName} />
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

export default AmenitiesTypeRoom;
