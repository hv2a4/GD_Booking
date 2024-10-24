import React, { useState,useEffect,useRef } from "react";
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { AddRoomPriceModal, EditRoomPriceModal, DeletePriceModal, ListPriceModal } from "./ModalRoomPrice";
import './Style/BranchInfo.css';
import './Style/RoomRatesTable.css';
import { FaPen } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RoomPriceSearchAndAdd = () => {
    const [searchTerm, setSearchTerm] = useState("");
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        // Bạn có thể thêm logic tìm kiếm ở đây
    };
    
   
    return (
        <div className="d-flex justify-content-between align-items-center p-3">
            <InputGroup style={{ maxWidth: "400px" }}>
                <InputGroup.Text>
                    <BsSearch />
                </InputGroup.Text>
                <FormControl
                    placeholder="Tìm kiếm hạng phòng"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ border: '1px solid #eee' }}
                />
            </InputGroup>
            {/* Thêm giá mới */}
            <AddRoomPriceModal />
            {/* Thêm giá mới */}
        </div>
    );
}

const BranchInfo = () => {
    const smallTextStyle = { fontSize: '0.9rem' }; // Kích thước chữ và line-height nhỏ

    return (
        <div className="p-3">
            {/* Row đầu tiên */}
            <Row className="align-items-center d-flex ms-4">
                <Col md={3}>
                    <p style={smallTextStyle} className="mb-0"><strong>Phạm vi:</strong> Toàn hệ thống</p>
                </Col>
                <Col md={4}>
                    <p style={smallTextStyle} className="mb-0">
                        <strong>Hiệu lực:</strong> 27/09/2024 đến 27/09/2025
                    </p>
                </Col>
                <Col md={3}>
                    <p style={smallTextStyle} className="mb-0"><strong>Ghi chú: </strong></p>
                </Col>
                <Col md={1} className="text-end">
                    <EditRoomPriceModal labelName={<><FaPen /> &nbsp; Sửa</>} />
                </Col>
            </Row>

            {/* Row thứ hai */}
            <Row className="align-items-center d-flex ms-4">
                <Col md={3}>
                    <p style={smallTextStyle} className="mb-0"><strong>Khách hàng:</strong> Toàn bộ khách hàng</p>
                </Col>
                <Col md={4}>
                    <p style={smallTextStyle} className="mb-0"><strong>Thời gian lưu trú:</strong> 25/09/2024 đến 30/09/2024</p>
                </Col>
                <Col md={3}></Col>
                <Col md={1}></Col>
            </Row>
        </div>
    );
};

const RoomRatesTable = () => {
    const { id } = useParams();
    const didMountRef = useRef(false);
    const [roomPricingData, setRoomPricingData] = useState([]);
    useEffect(() => {
        const fetchRoomPricingData = async () => {
            try {
                console.log("Fetching data for ID:", id);
                const response = await axios.get(`http://localhost:8080/api/typeRoom/getTPBy/${id}`);
                console.log('Received data:', response.data);
                setRoomPricingData(response.data);
            } catch (error) {
                console.error('Error fetching room pricing data:', error.message);
            }
        };

        if (id && !didMountRef.current) {
            didMountRef.current=true;
            fetchRoomPricingData();
        }
    }, [id]);
    return (
        <Table responsive size="sm">
            <thead className="table-info">
                <tr>
                    <th>
                        <ListPriceModal />
                    </th>
                    <th>Hạng phòng</th>
                    <th>Loại giá</th>
                    <th>Mặc định</th>
                    <th>Giảm giá</th>
                </tr>
            </thead>
            <tbody>
                {/* Dòng 1 */}
                 {roomPricingData.map((item,index)=>(

                
                <tr > 
                    <td>
                        <DeletePriceModal />
                    </td>
                    <td>
                        <strong>{item.typeRoomName}</strong>
                        <p></p>
                    </td>
                    <td>
                        <Row>
                            <Col>
                                <p>Giá giờ</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Cả ngày</p>
                            </Col>
                        </Row>
                    </td>
                    <td>
                        <div className="mt-0">
                            <Row>
                                <Col>
                                    <input
                                        type="text"
                                        style={{
                                            width: "100%",
                                            border: "none",
                                            borderBottom: "1px solid #ccc",
                                        }}
                                        value={item.price}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-3">
                                    <input
                                        type="text"
                                        style={{
                                            width: "100%",
                                            border: "none",
                                            borderBottom: "1px solid #ccc",
                                        }}
                                        value={item.priceTime}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </td>
                    <td>
                        <Row>
                            <Col>
                                <select
                                    style={{
                                        border: 'none',
                                        width: "100%",
                                        padding: '5px',
                                        outline: 'none',
                                        borderBottom: '1px solid #ccc'
                                    }}
                                >
                                    <option>20%</option>
                                    <option>15%</option>
                                    <option>10%</option>
                                    <option>5%</option>
                                </select>
                            </Col>
                        </Row>
                    </td>
                </tr>
                 ))}
            </tbody>
        </Table>
    );
};



export { RoomPriceSearchAndAdd, BranchInfo, RoomRatesTable };
