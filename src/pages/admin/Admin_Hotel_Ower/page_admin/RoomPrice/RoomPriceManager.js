import React, { useState, useEffect } from "react";
import { Card, Container, Row, Table } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { DeletePriceModal, RoomPriceModal } from "./ModalRoomPrice";
import './Style/BranchInfo.css';
import './Style/RoomRatesTable.css';
import { request } from "../../../../../config/configApi";
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { RoomTypeSelector, SearchBox, SearchDateBox } from "../RoomAndTypeRoom/Filter/FilterTypeRoom";

const RoomRatesManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [discounts, setDiscounts] = useState([]);
    const [searchTermDate, setSearchTermDate] = useState("");
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchDiscountData = async () => {
            const response = await request({
                method: "GET",
                path: '/api/discount/getAll',
                token: Cookies.get("token"),
            });
            if (response) {
                setDiscounts(response);
            }
        };
        fetchDiscountData();
    }, [location]);

    const handleSearch = (value) => {
        setSearchTerm(value.toLowerCase());
    };

    const handleChange = (value) => {
        setSearchTermDate(value);
    };

    const handleSelected = (value) => {
        setSelectedRoomType(value);
    };

    return (
        <>
            <Container fluid>

                <Card>
                    <Card.Body>
                        <Row>
                            {/*Tìm kiếm và nút thêm */}
                            <RoomPriceSearchAndAdd onSearch={handleSearch} onChange={handleChange} onSelected={handleSelected}/>
                        </Row>
                    </Card.Body>
                </Card>
                <Card>
                    {/*Bảng hệ thống giảm giá*/}
                    <RoomRatesTable discounts={discounts} searchTerm={searchTerm} searchTermDate={searchTermDate}
                        selectedRoomType={selectedRoomType} />
                </Card>
            </Container>
        </>
    );
};

const RoomPriceSearchAndAdd = ({ onSearch, onChange, onSelected }) => {
    return (
        <div className="d-flex justify-content-between align-items-center p-3">
            <SearchBox
                onSearch={onSearch}
                placeholder="Tìm kiếm giảm giá..."
            />
            <div className="d-flex align-items-center">
                <span className="me-2">Ngày áp dụng: </span>
                <SearchDateBox onChange={onChange} />
            </div>
            <RoomTypeSelector
                onChange={onSelected}
            />
            {/* Thêm giá mới */}
            <RoomPriceModal />
        </div>
    );
};

const RoomRatesTable = ({ discounts, searchTerm, searchTermDate, selectedRoomType }) => {
    const formattedDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    };

    const filteredDiscounts = discounts.filter((item) => {
        const searchLower = searchTerm.toLowerCase();

        // Lọc theo tên giảm giá
        const isNameMatch = item.discountName.toLowerCase().includes(searchLower);

        // Lọc theo khoảng thời gian
        const searchDate = searchTermDate; // Giả sử searchTermDate là một giá trị ngày hợp lệ hoặc undefined
        const startDate = item.startDate.substring(0, 10);
        const endDate = item.endDate.substring(0, 10);

        const matchesRoomType = selectedRoomType
                ? item.typeRoomDto.id === selectedRoomType.value
                : true;

        const isDateMatch =
            !searchDate || (searchDate >= startDate && searchDate <= endDate); // Nếu searchDate không có, bỏ qua điều kiện lọc ngày

        // Chỉ giữ các mục thỏa mãn cả hai điều kiện
        return isNameMatch && isDateMatch && matchesRoomType;
    });


    return (
        <Table responsive size="sm">
            <thead className="table-info">
                <tr>
                    <th>STT</th>
                    <th>Tên giảm giá</th>
                    <th>Phần trăm giảm</th>
                    <th>Thời gian áp dụng</th>
                    <th>Loại phòng</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {filteredDiscounts.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.discountName}</td>
                        <td>{item.percent} %</td>
                        <td>
                            {item.startDate === item.endDate ? (
                                <span>
                                    {formattedDate(item.startDate.substring(0, 10))}
                                </span>
                            ) : (
                                <>
                                    <span>
                                        {formattedDate(item.startDate.substring(0, 10))}
                                    </span>
                                    <span style={{ color: 'gray', fontWeight: 'bold', margin: '0 5px' }}>
                                        {'->'}
                                    </span>
                                    <span>
                                        {formattedDate(item.endDate.substring(0, 10))}
                                    </span>
                                </>
                            )}
                        </td>
                        {/* <td>{item.typeRoomDto.typeRoomName}</td> */}
                        <td className="text-end">
                            <RoomPriceModal id={item.id} />
                            <DeletePriceModal id={item.id} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default RoomRatesManagement;
