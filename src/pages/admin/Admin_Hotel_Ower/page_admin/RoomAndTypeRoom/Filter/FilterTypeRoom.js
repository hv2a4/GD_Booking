import React, { useState } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import '../Filter/style/customCss.css';
import { Add_Floor } from '../Rom/AddAndUpdate';
import Select from 'react-select';
import { RiAddCircleLine } from "react-icons/ri";

// Component tìm kiếm chung
function SearchBox({ placeholder }) {
    return (
        <Form>
            <Form.Group controlId="search">
                <Form.Control type="text" placeholder={placeholder} />
            </Form.Group>
        </Form>
    );
}

// Component chọn trạng thái với combobox
function StatusSelector() {
    const [status, setStatus] = useState('dangKinhDoanh');

    return (
        <Form>
            <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="activeBusiness">Còn trống</option>
                <option value="inactiveBusiness">Đang sử dụng</option>
                <option value="getAll">Tất cả</option>
            </Form.Select>
        </Form>
    );
}

// Component chọn loại phòng với combobox có tìm kiếm
function RoomTypeSelector() {
    const [searchTerm, setSearchTerm] = useState(null);

    const roomTypes = [
        'Phòng 01 giường đôi cho 2 người',
        'Phòng 01 giường đôi và 1 giường đơn cho 3 người',
        'Phòng 01 giường đơn',
        'Phòng 02 giường đơn',
        'Vip',
    ];

    const options = roomTypes.map(room => ({ value: room, label: room }));

    return (
        <Form>
            <Form.Group controlId="searchRoomType">
                <Select
                    options={options}
                    placeholder="Tìm kiếm loại phòng..."
                    value={searchTerm}
                    onChange={setSearchTerm}
                    isClearable
                    isSearchable
                />
            </Form.Group>
        </Form>
    );
}

// Component chọn khu vực với combobox có tìm kiếm và nút thêm
function FloorSelector() {
    const [selectedFloor, setSelectedFloor] = useState(null);

    const floors = ['Tất cả', 'Tầng 2', 'Tầng 3', 'Tầng 4', 'Tầng 5'];
    const options = [{
        value: 'addNew',
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <RiAddCircleLine size={20} />
                <div className='ms-1'>Thêm tầng</div>
            </div>
        )
    }, ...floors.map(floor => ({ value: floor, label: floor }))];

    const handleFloorChange = (selectedOption) => {
        if (selectedOption) {
            if (selectedOption.value === 'addNew') {
                setSelectedFloor(null);
                const addFloorBtn = document.getElementById('add-area');
                if (addFloorBtn) {
                    addFloorBtn.click();
                }
            } else {
                setSelectedFloor(selectedOption);
            }
        } else {
            setSelectedFloor(null); // Xử lý trường hợp giá trị null
        }
    };

    return (
        <Form>
            <Form.Group controlId="searchArea">
                <div className='d-none'>
                    <Add_Floor className="add-area-btn" />
                </div>
                <Select
                    options={options}
                    placeholder="Tìm kiếm tầng..."
                    value={selectedFloor}
                    onChange={handleFloorChange}
                    isClearable
                    isSearchable
                />
            </Form.Group>
        </Form>
    );
}

// Xuất các component chính
export { SearchBox, StatusSelector, RoomTypeSelector, FloorSelector };
