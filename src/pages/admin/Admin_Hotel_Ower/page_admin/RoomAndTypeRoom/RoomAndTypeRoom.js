import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
// import UpdateTypeRoom from "./UpdateTypeRoom";
import { DeleteModelTypeRoom, DeleteModelRoom } from "./DeleteModel";
import { UpdateRoomModal } from "./Rom/RoomModal";
import { Add_Update_TypeRoom, Update_Images_TypeRoom } from "./Rom/AddAndUpdate";
import { AddRoomModal } from "./Rom/RoomModal";
import { SearchBox, StatusSelector, RoomTypeSelector, FloorSelector } from "./Filter/FilterTypeRoom";
import { Card, CardHeader, CardTitle, Col, Form, Row } from "react-bootstrap";
import { request } from '../../../../../config/configApi';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';


const RoomAndTypeRoom = () => {
    const [activeTab, setActiveTab] = useState("roomType");
    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null); // State to track expanded rows
    const [expandedTab, setExpandedTab] = useState("info"); // State to track expanded tab
    const [selectedRoomIds, setSelectedRoomIds] = useState([]);
    const [expandedRowId, setExpandedRowId] = useState(null);
    const [currentTab, setCurrentTab] = useState('info'); // Đổi tên biến ở đây
    const selectedTypeRoomIdRef = useRef(''); // UseRef for non-rendering updates
    const [roomTypes, setRoomTypes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchRoomTypes = async () => {
            const response = await request({
                method: "GET",
                path: "/api/type-room/getAll",
                token: Cookies.get('token'), // Thay thế bằng token nếu cần
            });

            if (response) {
                setRoomTypes(response);
            }
        };
        fetchRoomTypes();
    }, [location]);

    useEffect(() => {
        setFilteredData(roomTypes);
    }, [roomTypes]);


    const rooms = [
        { id: 1, name: "Phòng A1", id_TypeRoom: 1, id_floor: 1, status: "Còn trống" },
        { id: 2, name: "Phòng A2", id_TypeRoom: 2, id_floor: 2, status: "Đang sử dụng" },
        { id: 3, name: "Phòng A3", id_TypeRoom: 3, id_floor: 3, status: "Còn trống" },
        { id: 4, name: "Phòng A4", id_TypeRoom: 4, id_floor: 4, status: "Còn trống" },
        { id: 5, name: "Phòng B1", id_TypeRoom: 5, id_floor: 5, status: "Còn trống" },
        { id: 6, name: "Phòng C1", id_TypeRoom: 6, id_floor: 6, status: "Đang sửa chữa" },
    ]

    const handleRoomSelection = (id, event) => {
        event.stopPropagation(); // Ngăn chặn sự kiện click tiếp tục
        setSelectedRoomIds((prev) =>
            prev.includes(id) ? prev.filter(roomId => roomId !== id) : [...prev, id]
        );
    };

    const toggleRowExpansion = (id) => {
        setExpandedRowId(expandedRowId === id ? null : id);
    };


    const toggleRoomTypeSelection = (id) => {
        setSelectedRoomTypes(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleRowClick = (id) => {
        setExpandedRow(prev => (prev === id ? null : id)); // Expand or collapse row
        setExpandedTab("info"); // Reset to "info" tab when expanding row
    };


    const handleTypeRoomSelect = async (id) => {
        selectedTypeRoomIdRef.current = id;
    };

    const handlAddRoomClick = (e) => {
        const addRoom = document.getElementById('add-room');
        if (addRoom) {
            addRoom.click();
        }
    };

    const handlAddTypeRoomClick = (e) => {
        const addTypeRoom = document.getElementById('add-type-room');
        if (addTypeRoom) {
            addTypeRoom.click();
        }
    }

    const handleSearchTypeRoom = (query) => {
        const searchResults = roomTypes.filter((item) =>
            item.typeRoomName.toLowerCase().includes(query.toLowerCase()) ||
            item.id.toString().includes(query)
        );
        setFilteredData(searchResults);
    };

    return (
        <div className="container-fluid">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">Loại phòng & Phòng</h2>
                    <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-10">
                            {activeTab === 'roomType' ?
                                <Card>
                                    <Card.Body>
                                        <Row>
                                            <Col md={4}></Col>
                                            <Col md={4}>
                                                <SearchBox onSearch={handleSearchTypeRoom} placeholder="Tìm kiếm loại phòng." />
                                            </Col>
                                            <Col md={4}></Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                :
                                <Card>
                                    <Card.Body>
                                        <Row>
                                            <Col md={3}>
                                                <SearchBox placeholder="Tìm kiếm phòng." />
                                            </Col>
                                            <Col md={3}>
                                                <RoomTypeSelector />
                                            </Col>
                                            <Col md={3}>
                                                <FloorSelector />
                                            </Col>
                                            <Col md={3}>
                                                <StatusSelector />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            }
                        </div>
                        <div className="col-12 col-md-2 text-md-end">
                            <div className="btn-group">
                                <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <MdAdd />&nbsp;
                                    Thêm mới
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a
                                            className="dropdown-item" href="#"
                                            onClick={handlAddTypeRoomClick}
                                        >
                                            <MdAdd />
                                            Loại phòng
                                        </a>
                                        <div className="d-none">
                                            <Add_Update_TypeRoom />
                                        </div>
                                    </li>

                                    <li>
                                        <a className="dropdown-item" href="#" onClick={handlAddRoomClick}>
                                            <MdAdd />
                                            Phòng
                                            <div className="d-none">
                                                <AddRoomModal />
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Tabs */}
                    <ul className="nav nav-tabs mt-4">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "roomType" ? "active" : ""}`}
                                onClick={() => setActiveTab("roomType")}
                            >
                                Loại phòng
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "room" ? "active" : ""}`}
                                onClick={() => setActiveTab("room")}
                            >
                                Danh sách phòng
                            </button>
                        </li>
                    </ul>

                    {/* Nội dung bảng dựa trên tab */}
                    {activeTab === "roomType" && (
                        <div className="table-responsive mt-3">
                            <table className="table" style={{ cursor: 'pointer' }}>
                                <thead className="table-info">
                                    <tr>
                                        <th>
                                            <input
                                                type="checkbox"
                                                onChange={() => {
                                                    const allSelected = selectedRoomTypes.length === filteredData.length;
                                                    setSelectedRoomTypes(allSelected ? [] : filteredData.map(roomType => roomType.id));
                                                }}
                                                checked={selectedRoomTypes.length === filteredData.length}
                                            />
                                        </th>
                                        <th>Mã loại phòng</th>
                                        <th>Tên loại phòng</th>
                                        <th>Giá</th>
                                        <th>Giường</th>
                                        <th>Sức chứa</th>
                                        <th>Diện tích</th>
                                        <th>Hình ảnh</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map(({ id, typeRoomName, price, typeBedDto, guestLimit, bedCount, acreage, typeRoomImageDto }) => (
                                        <React.Fragment key={id}>
                                            <tr onClick={(e) => {
                                                // Chỉ mở rộng thông tin nếu không nhấn vào checkbox
                                                if (e.target.type !== "checkbox") {
                                                    handleRowClick(id);
                                                }
                                            }}
                                            >
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRoomTypes.includes(id)}
                                                        onChange={(e) => {
                                                            e.stopPropagation(); // Ngăn chặn sự kiện lan truyền
                                                            toggleRoomTypeSelection(id);
                                                        }}
                                                    />
                                                </td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{id}</td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{typeRoomName}</td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{price} VNĐ</td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{bedCount + ' ' + typeBedDto.bedName}</td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{guestLimit + ' người'}</td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{acreage} m2</td>
                                                <td onClick={(e) => {
                                                    e.stopPropagation();
                                                }}>
                                                    <Update_Images_TypeRoom typeRoomImage={typeRoomImageDto} typeRoomName={typeRoomName} idTypeRoom={id} />
                                                </td>
                                            </tr>

                                            {/* Hàng chi tiết mở rộng */}
                                            {expandedRow === id && (
                                                <tr>
                                                    <td colSpan="10">
                                                        <Card>
                                                            <Card.Body>
                                                                <CardTitle>Thông tin</CardTitle>
                                                                <Row>
                                                                    <div className="container-fluid">
                                                                        <div className="tab-pane fade show active mt-5">
                                                                            <Row className="mb-4 align-items-start">
                                                                                {/* Cột chứa thông tin loại phòng */}
                                                                                <Col md={6}>
                                                                                    <div style={{ overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                                                                                        <p><strong>Mã loại phòng:</strong> {id}</p>
                                                                                        <p><strong>Tên loại phòng:</strong> {typeRoomName}</p>
                                                                                        <p><strong>Giường:</strong> {bedCount + ' ' + typeBedDto.bedName}</p>
                                                                                        <p><strong>Sức chứa:</strong> {guestLimit + ' người'}</p>
                                                                                    </div>
                                                                                </Col>

                                                                                {/* Cột chứa thông tin giá cả và địa chỉ */}
                                                                                <Col md={6}>
                                                                                    <div style={{ overflowY: "auto", scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                                                                        <p><strong>Diện tích:</strong> {acreage} m2</p>
                                                                                        <p><strong>Giá cả ngày:</strong> {price} VNĐ</p>
                                                                                        <p><strong>Phụ thu quá giờ:</strong> Tính tiền mỗi giờ</p>
                                                                                    </div>
                                                                                </Col>

                                                                            </Row>

                                                                            {/* Các nút cập nhật và xóa */}
                                                                            <div className="d-flex justify-content-end">
                                                                                <Add_Update_TypeRoom idTypeRoom={id} />
                                                                                <DeleteModelTypeRoom idTypeRoom={id} />
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
                    )}

                    {activeTab === "room" && (
                        <div className="table-responsive mt-3">
                            <table className="table">
                                <thead className="table-info">
                                    <tr>
                                        <th>
                                            <input
                                                type="checkbox"
                                                onChange={() => {
                                                    const allSelected = selectedRoomIds.length === rooms.length;
                                                    setSelectedRoomIds(allSelected ? [] : rooms.map(room => room.id));
                                                }}
                                                checked={selectedRoomIds.length === rooms.length}
                                                aria-label="Chọn tất cả"
                                            />
                                        </th>
                                        <th>Tên phòng</th>
                                        <th>Loại phòng</th>
                                        <th>Tầng</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.map(({ id, name, id_TypeRoom, id_floor, status }) => (
                                        <React.Fragment key={id}>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRoomIds.includes(id)}
                                                        onChange={(e) => handleRoomSelection(id, e)}
                                                    />
                                                </td>
                                                <td onClick={() => toggleRowExpansion(id)} style={{ cursor: 'pointer' }}>{name}</td>
                                                <td onClick={() => toggleRowExpansion(id)} style={{ cursor: 'pointer' }}>{id_TypeRoom}</td>
                                                <td onClick={() => toggleRowExpansion(id)} style={{ cursor: 'pointer' }}>{id_floor}</td>
                                                <td onClick={() => toggleRowExpansion(id)} style={{ cursor: 'pointer' }}>{status}</td>
                                            </tr>
                                            {expandedRowId === id && (
                                                <tr>
                                                    <td colSpan="8">
                                                        <div>
                                                            <ul className="nav nav-tabs" role="tablist">
                                                                <li className="nav-item">
                                                                    <button
                                                                        className={`nav-link ${currentTab === 'info' ? 'active' : ''}`}
                                                                        onClick={() => setCurrentTab('info')}
                                                                    >
                                                                        Thông tin
                                                                    </button>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <button
                                                                        className={`nav-link ${currentTab === 'bookingHistory' ? 'active' : ''}`}
                                                                        onClick={() => setCurrentTab('bookingHistory')}
                                                                    >
                                                                        Lịch sử đặt phòng
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                            <div className="tab-content">
                                                                {currentTab === 'info' && (
                                                                    <div className="tab-pane fade show active">
                                                                        <div className="card mb-3 mt-4" style={{ border: 'none' }}>
                                                                            <div className="card-body">
                                                                                <h5 className="card-title">Thông tin phòng</h5>
                                                                                <div className="row mb-3">
                                                                                    <div className="col-6">
                                                                                        <p><strong>Tên phòng:</strong> {name}</p>
                                                                                        <p><strong>Tầng:</strong> {id_floor}</p>
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                        <p><strong>Loại phòng:</strong> {id_TypeRoom}</p>
                                                                                        <p><strong>Trạng thái:</strong> {status}</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-flex justify-content-end">
                                                                                    <UpdateRoomModal />
                                                                                    <DeleteModelRoom Name_Room={name} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {currentTab === 'bookingHistory' && (
                                                                    <div className="tab-pane fade show active" style={{ minHeight: 'auto' }}>
                                                                        <table className="table table-striped mt-3">
                                                                            <thead className="table-primary">
                                                                                <tr>
                                                                                    <th scope="col">Mã phòng</th>
                                                                                    <th scope="col">Check in</th>
                                                                                    <th scope="col">Check out</th>
                                                                                    <th scope="col">Khách hàng</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomAndTypeRoom;

