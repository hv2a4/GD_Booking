import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
// import UpdateTypeRoom from "./UpdateTypeRoom";
import { DeleteModelTypeRoom, DeleteModelRoom } from "./DeleteModel";
import { UpdateRoomModal } from "./Rom/RoomModal";
import { Add_Update_TypeRoom } from "./Rom/AddAndUpdate";
import { AddRoomModal } from "./Rom/RoomModal";
import { SearchBox, StatusSelector, RoomTypeSelector, FloorSelector } from "./Filter/FilterTypeRoom";
import { Card, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import typeRoomImage from "../../../../../assets/images/about-1.jpg";
const RoomAndTypeRoom = () => {
    const [activeTab, setActiveTab] = useState("roomType");
    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null); // State to track expanded rows
    const [expandedTab, setExpandedTab] = useState("info"); // State to track expanded tab
    const [selectedRoomIds, setSelectedRoomIds] = useState([]);
    const [expandedRowId, setExpandedRowId] = useState(null);
    const [currentTab, setCurrentTab] = useState('info'); // Đổi tên biến ở đây
    const [listRoomDetail, setListRoomDetail] = useState([]);
    const selectedTypeRoomIdRef = useRef(''); // UseRef for non-rendering updates

    const roomTypes = [
        { id: 1, typeRoomName: "Loại phòng 1", quantity: 5, price: 800000, idTypeBed: 'Giường đơn', guestLimit: '1-1;1-2', bedCount: 2, acreage: 5 },
        { id: 2, typeRoomName: "Loại phòng 2", quantity: 7, price: 900000, idTypeBed: 'Giường đôi', guestLimit: '1-2;2-2', bedCount: 1, acreage: 6 },
    ];

    const getGuestLimit = (guestLimit) => {
        if (guestLimit && typeof guestLimit === 'string') {
            const parts = guestLimit.split(';');

            // Kiểm tra nếu không tách được đúng hai phần
            if (parts.length < 2) {
                return "Dữ liệu không hợp lệ: không có đủ phần 'standard' và 'max'";
            }

            const [standard, max] = parts;

            // Kiểm tra nếu không tách được đúng định dạng người lớn - trẻ em
            const standardParts = standard.split('-').map(Number);
            const maxParts = max.split('-').map(Number);

            if (standardParts.length < 2 || maxParts.length < 2) {
                return "Dữ liệu không hợp lệ: định dạng của 'standard' hoặc 'max' không đúng";
            }

            const [adultsStandard, childrenStandard] = standardParts;
            const [adultsMax, childrenMax] = maxParts;

            const guestLimits = {
                adultsStandard,
                childrenStandard,
                adultsMax,
                childrenMax
            };
            return guestLimits;
        }
        return "Dữ liệu không hợp lệ: guestLimit không tồn tại hoặc không phải chuỗi hợp lệ";
    };


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

    // console.log("Đây là danh loai phòng lấy được", listTypeRoom);
    // console.log("Mã loại phòng đã chọn:", selectedTypeRoomIdRef.current);
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
                                            <Col md={3}></Col>
                                            <Col md={3}>
                                                <SearchBox placeholder="Tìm kiếm loại phòng." />
                                            </Col>
                                            <Col md={3}>
                                                <StatusSelector />
                                            </Col>
                                            <Col md={3}></Col>
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
                                                    const allSelected = selectedRoomTypes.length === roomTypes.length;
                                                    setSelectedRoomTypes(allSelected ? [] : roomTypes.map(room => room.id));
                                                }}
                                                checked={selectedRoomTypes.length === roomTypes.length}
                                            />
                                        </th>
                                        <th>Mã loại phòng</th>
                                        <th>Tên loại phòng</th>
                                        <th>Số lượng phòng</th>
                                        <th>Giá cả ngày</th>
                                        <th>Giường</th>
                                        <th>Sức chứa tiêu chuẩn</th>
                                        <th>Sức chứa tối đa</th>
                                        <th>Diện tích</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {roomTypes.map(({ id, typeRoomName, quantity, price, idTypeBed, guestLimit, bedCount, acreage }) => (
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
                                                <td onClick={() => handleTypeRoomSelect(id)}>{quantity} </td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{price} VNĐ</td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{bedCount + ' ' + idTypeBed}</td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{getGuestLimit(guestLimit)?.adultsStandard + ' người lớn và ' +
                                                    getGuestLimit(guestLimit)?.childrenStandard + ' trẻ em'}</td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{getGuestLimit(guestLimit)?.adultsMax + ' người lớn và ' +
                                                    getGuestLimit(guestLimit)?.childrenMax + ' trẻ em'}</td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{acreage} m2</td>
                                            </tr>

                                            {/* Hàng chi tiết mở rộng */}
                                            {expandedRow === id && (
                                                <tr>
                                                    <td colSpan="10">
                                                        <Card>
                                                            <Card.Body>
                                                                <Row>
                                                                    <div className="container-fluid">
                                                                        <ul className="nav nav-tabs">
                                                                            <li className="nav-item">
                                                                                <button className={`nav-link ${expandedTab === "info" ? "active" : ""}`} onClick={() => setExpandedTab("info")}>
                                                                                    Thông tin
                                                                                </button>
                                                                            </li>
                                                                            <li className="nav-item">
                                                                                <button className={`nav-link ${expandedTab === "roomList" ? "active" : ""}`} onClick={() => setExpandedTab("roomList")}>
                                                                                    Danh sách phòng
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                        <div className="tab-content">
                                                                            {expandedTab === "info" && (
                                                                                <div className="tab-pane fade show active mt-5">
                                                                                    <Row className="mb-4 align-items-start">
                                                                                        {/* Cột chứa hình ảnh */}
                                                                                        <Col md={4} className="d-flex justify-content-center">
                                                                                            <img src={typeRoomImage} alt="Hạng phòng" />
                                                                                        </Col>

                                                                                        {/* Cột chứa thông tin loại phòng */}
                                                                                        <Col md={4}>
                                                                                            <div style={{ overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                                                                                                <p><strong>Mã loại phòng:</strong> {id}</p>
                                                                                                <p><strong>Tên loại phòng:</strong> {typeRoomName}</p>
                                                                                                <p><strong>Số lượng phòng:</strong> {quantity}</p>
                                                                                                <p><strong>Giường:</strong> {bedCount + ' ' + idTypeBed}</p>
                                                                                                <p><strong>Diện tích:</strong> {acreage} m2</p>
                                                                                            </div>
                                                                                        </Col>

                                                                                        {/* Cột chứa thông tin giá cả và địa chỉ */}
                                                                                        <Col md={4}>
                                                                                            <div style={{ overflowY: "auto", scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                                                                                <p><strong>Sức chứa tiêu chuẩn:</strong> {getGuestLimit(guestLimit)?.adultsStandard + ' người lớn và ' +
                                                                                                    getGuestLimit(guestLimit)?.childrenStandard + ' trẻ em'}</p>
                                                                                                <p><strong>Sức chứa tối đa:</strong> {getGuestLimit(guestLimit)?.adultsMax + ' người lớn và ' +
                                                                                                    getGuestLimit(guestLimit)?.childrenMax + ' trẻ em'}</p>
                                                                                                <p><strong>Giá cả ngày:</strong> {price} VNĐ</p>
                                                                                                <p><strong>Phụ thu quá giờ:</strong> Tính tiền mỗi giờ</p>
                                                                                            </div>
                                                                                        </Col>
                                                                                    </Row>

                                                                                    {/* Các nút cập nhật và xóa */}
                                                                                    <div className="d-flex justify-content-end">
                                                                                        <Add_Update_TypeRoom idTypeRoom={id} />
                                                                                        <DeleteModelTypeRoom ID_Room={typeRoomName} />
                                                                                    </div>
                                                                                </div>
                                                                            )}

                                                                            {expandedTab === "roomList" && (
                                                                                <div className="tab-pane fade show active mt-4">
                                                                                    <div className="table-responsive">
                                                                                        <Card>
                                                                                            <Card.Body>
                                                                                                <div className="d-flex justify-content-end">
                                                                                                    <Form.Select
                                                                                                        aria-label="Chọn số tầng"
                                                                                                        className="ms-auto"
                                                                                                        style={{ width: 'auto' }}
                                                                                                        onChange={''}
                                                                                                    >
                                                                                                        <option value="">Chọn số tầng</option>
                                                                                                    </Form.Select>
                                                                                                </div>
                                                                                            </Card.Body>
                                                                                        </Card>
                                                                                        <table className="table">
                                                                                            <thead className="thead-dark">
                                                                                                <tr>
                                                                                                    <th>Tên phòng</th>
                                                                                                    <th>Tầng</th>
                                                                                                    <th>Trạng thái</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                {listRoomDetail && listRoomDetail.length > 0 ? (
                                                                                                    listRoomDetail.map((item, index) => (
                                                                                                        <tr key={index}>
                                                                                                            <td>{item.roomName}</td>
                                                                                                            <td>{item.floorName}</td>
                                                                                                            <td>{item.statusRoomName}</td>
                                                                                                        </tr>
                                                                                                    ))
                                                                                                ) : (
                                                                                                    <tr>
                                                                                                        <td colSpan="3">Không có dữ liệu</td>
                                                                                                    </tr>
                                                                                                )}
                                                                                            </tbody>

                                                                                        </table>
                                                                                    </div>
                                                                                </div>
                                                                            )}
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

