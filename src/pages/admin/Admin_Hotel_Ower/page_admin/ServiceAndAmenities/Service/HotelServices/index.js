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

    useEffect(()=>{
        handleGetData();
    }, []);

    const toggleHotelServiceSelection = (id) => {
        setSelectedHotelService(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };
    
    const handleGetData = async() => {
        const response = await request({method:"GET", path:"api/service-hotel/getAll"});
        setDataService(response);
        
    } 
 


    return (
        <div className="table-responsive mt-3">
            <table className="table table-striped table-hover" style={{ cursor: 'pointer' }}>
                <thead className="table-info">
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={() => {
                                    const allSelected = selectedHotelService.length === dataServiceHotel.length;
                                    setSelectedHotelService(allSelected ? [] : dataServiceHotel.map(hotelService => hotelService.id));
                                }}
                                checked={selectedHotelService.length === dataServiceHotel.length}
                            />
                        </th>
                        <th>Mã dịch vụ khách sạn</th>
                        <th>Tên dịch vụ khách sạn</th>
                        <th>Giá</th>
                    </tr>
                </thead>
                <tbody>
                    {dataServiceHotel.map((item) => (
                        <React.Fragment key={item?.id}>
                            <tr onClick={(e) => {
                                if (e.target.type !== "checkbox") {
                                    handleRowClick(item?.id);
                                }
                            }}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedHotelService.includes(item?.id)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            toggleHotelServiceSelection(item?.id);
                                        }}
                                    />
                                </td>
                                <td>{`SV${item?.id.toString().padStart(3, '0')}`}</td>
                                <td>{item?.serviceHotelName}</td>
                                <td>{item?.price} VNĐ</td>
                            </tr>

                            {/* Hàng chi tiết mở rộng */}
                            {expandedRow === item?.id && (
                                <tr>
                                    <td colSpan="10">
                                        <Card>
                                            <Card.Body>
                                                <Row>
                                                    <div className="container-fluid">
                                                        <div className="tab-pane fade show active mt-5" style={{ minHeight: 'auto' }}>
                                                            <Row className="mb-4 align-items-start">
                                                                <Col md={4} className="d-flex justify-content-center">
                                                                    <img src={item?.image} alt="" width={200} height={200}/>
                                                                </Col>
                                                                <Col md={8}>
                                                                    <p><strong>Mã dịch vụ khách sạn:</strong>{item?.id}</p>
                                                                    <p><strong>Tên dịch vụ khách sạn:</strong> {item?.serviceHotelName}</p>
                                                                    <p><strong>Giá:</strong> {item?.price} VND</p>
                                                                </Col>
                                                            </Row>
                                                            <div className="d-flex justify-content-end">
                                                                <HotelServiceFormModal item={item} />
                                                                <DeleteHotelServiceModal id={item?.id} serviceHotelName={item?.serviceHotelName} />
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
