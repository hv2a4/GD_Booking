import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { DeleteTypeServiceModal, RoomServiceRoomFormModal } from "./FormModal";



const TypeServiceRoom = () => {
    const [selectedTypeServiceRoom, setSelectedTypeServiceRoom] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowClick = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const toggleTypeServiceRoomSelection = (id) => {
        setSelectedTypeServiceRoom(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const typeServiceRooms = [
        { id: '1', typeServiceRoomName: 'a'},
        { id: '2', typeServiceRoomName: 'b'}
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
                                    const allSelected = selectedTypeServiceRoom.length === typeServiceRooms.length;
                                    setSelectedTypeServiceRoom(allSelected ? [] : typeServiceRooms.map(typeServiceRoom => typeServiceRoom.id));
                                }}
                                checked={selectedTypeServiceRoom.length === typeServiceRooms.length}
                            />
                        </th>
                        <th>Mã loại dịch vụ phòng</th>
                        <th>Tên gói dịch vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {typeServiceRooms.map(({ id, typeServiceRoomName}) => (
                        <React.Fragment key={id}>
                            <tr onClick={(e) => {
                                if (e.target.type !== "checkbox") {
                                    handleRowClick(id);
                                }
                            }}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedTypeServiceRoom.includes(id)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            toggleTypeServiceRoomSelection(id);
                                        }}
                                    />
                                </td>
                                <td>{id}</td>
                                <td>{typeServiceRoomName}</td>
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
                                                                    <p><strong>Mã loại dịch vụ phòng: </strong>{id}</p>
                                                                    <p><strong>Tên gói dịch vụ: </strong> {typeServiceRoomName}</p>
                                                                </Col>
                                                                <Col md={4}></Col>
                                                            </Row>
                                                            <div className="d-flex justify-content-end">
                                                                <RoomServiceRoomFormModal idTypeServiceRoom={id} />
                                                                <DeleteTypeServiceModal id={id} typeServiceRoomName={typeServiceRoomName} />
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

export default TypeServiceRoom;
