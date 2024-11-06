import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { DeleteRoomServiceModal, RoomServiceFormModal } from './FormModal';


const RoomService = () => {
    const [selectedRoomService, setSelectedRoomService] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowClick = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const toggleRoomServiceSelection = (id) => {
        setSelectedRoomService(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const roomServices = [
        { id: '1', serviceRoomName: 'a', price: 1000000, description: 'mô tả 1', image: '', id_typeServiceRoom: 1 },
        { id: '2', serviceRoomName: 'b', price: 2000000, description: 'mô tả 2', image: '', id_typeServiceRoom: 2 },
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
                                    const allSelected = selectedRoomService.length === roomServices.length;
                                    setSelectedRoomService(allSelected ? [] : roomServices.map(roomService => roomService.id));
                                }}
                                checked={selectedRoomService.length === roomServices.length}
                            />
                        </th>
                        <th>Mã dịch vụ phòng</th>
                        <th>Tên dịch vụ phòng</th>
                        <th>Giá</th>
                        <th>Loại dịch vụ phòng</th>
                        <th>Mô tả</th>
                    </tr>
                </thead>
                <tbody>
                    {roomServices.map(({ id, serviceRoomName, price, description, image, id_typeServiceRoom }) => (
                        <React.Fragment key={id}>
                            <tr onClick={(e) => {
                                if (e.target.type !== "checkbox") {
                                    handleRowClick(id);
                                }
                            }}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRoomService.includes(id)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            toggleRoomServiceSelection(id);
                                        }}
                                    />
                                </td>
                                <td>{id}</td>
                                <td>{serviceRoomName}</td>
                                <td>{price} VNĐ</td>
                                <td>{id_typeServiceRoom}</td>
                                <td>{description}</td>
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
                                                                    <p><strong>Mã dịch vụ phòng:</strong>{id}</p>
                                                                    <p><strong>Tên dịch vụ phòng:</strong> {serviceRoomName}</p>
                                                                    <p><strong>Giá:</strong> {price} VND</p>
                                                                    <p><strong>Loại dịch vụ phòng:</strong> {id_typeServiceRoom}</p>
                                                                    <p><strong>Mô tả:</strong>{description}</p>
                                                                </Col>
                                                            </Row>
                                                            <div className="d-flex justify-content-end">
                                                                <RoomServiceFormModal idRommService={id} />
                                                                <DeleteRoomServiceModal id={id} serviceRoomName={serviceRoomName} />
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

export default RoomService;
