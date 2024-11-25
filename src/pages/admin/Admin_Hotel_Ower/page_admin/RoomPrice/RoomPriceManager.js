import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { AddRoomPriceModal, ListPriceModal } from "./ModalRoomPrice";
import './Style/BranchInfo.css';
import './Style/RoomRatesTable.css';
import { request } from "../../../../../config/configApi";
import Cookies from 'js-cookie';

const RoomPriceSearchAndAdd = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        // Bạn có thể thêm logic tìm kiếm ở đây
    };


    return (
        <div className="d-flex justify-content-between align-items-center p-3">
            <InputGroup style={{ maxWidth: "400px"}}>
                <InputGroup.Text>
                    <BsSearch style={{fontSize: "28px"}}/>
                </InputGroup.Text>
                <FormControl
                    placeholder="Tìm kiếm giảm giá"
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


const RoomRatesTable = () => {
    const [discounts, setDiscounts] = useState([]);
    useEffect(() => {
        const fetchDiscountData = async () => {
            const response = await request({
                method: "GET",
                path: '/api/discount/getAll',
                token: Cookies.get("token"),
            });
            if(response){
                setDiscounts(response);
                console.log(response);
            }
        };
        fetchDiscountData();
    }, []);
    return (
        <Table responsive size="sm">
            <thead className="table-info">
                <tr>
                    <th>STT</th>
                    <th>Tên giảm giá</th>
                    <th>Phần trăm giảm</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Loại phòng</th>
                </tr>
            </thead>
            <tbody>
                {/* Dòng 1 */}
                {discounts.map((item, index) => (
                    <tr >
                        <td>{item.index}</td>
                        <td>{item.discountName}</td>
                        <td>{item.percent} %</td>
                        <td>{item.startDate.substring(0, 10)}</td>
                        <td>{item.endDate.substring(0, 10)}</td>
                        <td>{item.typeRoomDto.typeRoomName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};



export { RoomPriceSearchAndAdd, RoomRatesTable };
