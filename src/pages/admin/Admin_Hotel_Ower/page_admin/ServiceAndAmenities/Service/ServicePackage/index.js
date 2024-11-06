import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { PackedServiceFormModal, DeletePackedServiceModal } from "./FormModal";



const PackedService = () => {
    const [selectedPackedService, setSelectedPackedService] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowClick = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const togglePackedServiceSelection = (id) => {
        setSelectedPackedService(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const packedServices = [
        { id: '1', servicePackageName: 'a', price: 1000000},
        { id: '2', servicePackageName: 'b', price: 2000000}
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
                                    const allSelected = selectedPackedService.length === packedServices.length;
                                    setSelectedPackedService(allSelected ? [] : packedServices.map(packedService => packedService.id));
                                }}
                                checked={selectedPackedService.length === packedServices.length}
                            />
                        </th>
                        <th>Mã gói dịch vụ</th>
                        <th>Tên gói dịch vụ</th>
                        <th>Giá</th>
                    </tr>
                </thead>
                <tbody>
                    {packedServices.map(({ id, servicePackageName, price}) => (
                        <React.Fragment key={id}>
                            <tr onClick={(e) => {
                                if (e.target.type !== "checkbox") {
                                    handleRowClick(id);
                                }
                            }}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedPackedService.includes(id)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            togglePackedServiceSelection(id);
                                        }}
                                    />
                                </td>
                                <td>{id}</td>
                                <td>{servicePackageName}</td>
                                <td>{price} VNĐ</td>
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
                                                                    <p><strong>Mã gói dịch vụ: </strong>{id}</p>
                                                                    <p><strong>Tên dịch vụ khách sạn: </strong> {servicePackageName}</p>
                                                                    <p><strong>Giá: </strong> {price} VND</p>
                                                                </Col>
                                                                <Col md={4}></Col>
                                                            </Row>
                                                            <div className="d-flex justify-content-end">
                                                                <PackedServiceFormModal idPackedService={id} />
                                                                <DeletePackedServiceModal id={id} servicePackageName={servicePackageName} />
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

export default PackedService;
