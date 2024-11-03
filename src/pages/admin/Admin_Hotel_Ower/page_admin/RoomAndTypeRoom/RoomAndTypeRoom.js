import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import UpdateTypeRoom from "./UpdateTypeRoom";
import { DeleteModelTypeRoom, DeleteModelRoom } from "./DeleteModel";
import { UpdateRoomModal } from "./Rom/RoomModal";
import { Add_TypeRoom } from "./Rom/AddAndUpdate";
import { AddRoomModal } from "./Rom/RoomModal";
import { SearchBox, StatusSelector, RoomTypeSelector, FloorSelector } from "./Filter/FilterTypeRoom";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useToken } from "../Service/GetTokens";
import axios from "axios";
import typeRoomImage from "../../../../../assets/images/about-1.jpg";
const RoomAndTypeRoom = () => {
    const decodedToken = useToken();
    const [activeTab, setActiveTab] = useState("roomType");
    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null); // State to track expanded rows
    const [expandedTab, setExpandedTab] = useState("info"); // State to track expanded tab
    const [selectedRoomIds, setSelectedRoomIds] = useState([]);
    const [expandedRowId, setExpandedRowId] = useState(null);
    const [currentTab, setCurrentTab] = useState('info'); // Đổi tên biến ở đây
    const [hotelId, setHotelId] = useState(null);
    const [listTypeRoom, setListTypeRoom] = useState([]);
    const URL_API_ACCOUNT = "http://localhost:8080/api";
    const [listRoomDetail, setListRoomDetail] = useState([]);
    const [getFloors, setFloors] = useState([]);
    const [floor, setFloor] = useState(null);
    const selectedTypeRoomIdRef = useRef(''); // UseRef for non-rendering updates

    const roomTypes = [
        { id: 1, typeRoomName: "Loại phòng 1", quantity: 5, price: 800000, idTypeBed: 1, guestLimit: 1, bedCount: 1 },
    ];

    const rooms = [
        { id: 1, name: "Phòng A1", roomType: "Loại phòng 1", floor: "Tầng 1", pricDay: 800000, status: "Còn trống", notes: "Gần hồ bơi" },
        { id: 2, name: "Phòng A2", roomType: "Loại phòng 2", floor: "Tầng 2", pricDay: 900000, status: "Đang sử dụng", notes: "Có cửa sổ hướng biển" },
        { id: 3, name: "Phòng A3", roomType: "Loại phòng 3", floor: "Tầng 1", pricDay: 850000, status: "Còn trống", notes: "Thích hợp cho gia đình" },
        { id: 4, name: "Phòng A4", roomType: "Loại phòng 1", floor: "Tầng 3", pricDay: 800000, status: "Còn trống", notes: "Gần quầy lễ tân" },
        { id: 5, name: "Phòng B1", roomType: "Loại phòng 2", floor: "Tầng 2", pricDay: 900000, status: "Còn trống", notes: "Có minibar" },
        { id: 6, name: "Phòng C1", roomType: "Loại phòng 3", floor: "Tầng 1", pricDay: 850000, status: "Đang sửa chữa", notes: "Sửa chữa định kỳ" },
    ];
    const roomInfo = {
        name: "Phòng VIP",
        floor: "Khu A",
        priceHour: 500000,
        priceDay: 1000000,
        status: "Đang hoạt động",
        notes: "Phòng có máy lạnh và wifi miễn phí."
    };

    const bookingHistory = [
        { id: 1, time: "2024-09-23 14:30", employee: "Nguyễn Văn A", total: "500,000 VNĐ" },
        { id: 2, time: "2024-09-24 10:15", employee: "Trần Thị B", total: "1,000,000 VNĐ" }
    ];

    const transactionHistory = [
        { id: 1, time: "2024-09-23 15:00", cashier: "Nguyễn Văn A", total: "500,000 VNĐ" },
        { id: 2, time: "2024-09-24 11:00", cashier: "Trần Thị B", total: "1,000,000 VNĐ" }
    ];

    const cleaningHistory = [
        { time: "2024-09-23 12:00", cleaner: "Nguyễn Văn A", role: "Nhân viên dọn phòng", status: "Đã hoàn thành" },
        { time: "2024-09-24 09:00", cleaner: "Trần Thị B", role: "Nhân viên dọn phòng", status: "Đã hoàn thành" },
        { id: 1, checkIn: "2024-09-23", checkOut: "2024-09-25", client: "Nguyễn Văn A" },
        { id: 2, checkIn: "2024-09-25", checkOut: "2024-09-26", client: "Trần Thị B" }
    ];

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
    const getDataSelectFloor = useCallback(async (id) => {
        try {
            const response = await axios.get(`${URL_API_ACCOUNT}/Floors/getDataFloor/${id}`);
            console.log("Dữ liệu tầng nhận được: ", response.data);
            setFloors(response.data); // Cập nhật dữ liệu tầng vào state
        } catch (error) {
            console.log("Lỗi call API tầng: ", error);
        }
    }, []);
    const getDataTypeRoom = useCallback(async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/account/getTypeRoom`, {
                headers: {
                    'hotelId': id // Gửi hotelId trong header
                }
            });
            setListTypeRoom(response.data);
        } catch (error) {
            console.log("Lỗi call api", error); // Thêm error để dễ dàng xác định lỗi
        }
    }, []);

    const getValueFloors = (value) => {
        if (value == null || value === "Chọn số tầng") {
            setFloor("Tầng 1"); // Gán giá trị mặc định
        } else {
            console.log("Tầng bạn đã chọn là: ", value);
            setFloor(value); // Gán giá trị tầng đã chọn
        }
    };


    console.log("Dữ liệu bạn lấy được: ", floor);
    console.log("hhhhhhh" + decodedToken);
    useEffect(() => {
        const sendTokenToServer = async () => {
            if (decodedToken) {
                const tokenId = decodedToken;
                setHotelId(tokenId.hotel.id);
            } else {
                console.log("Token is not available yet or invalid");
            }
        };

        sendTokenToServer();

    }, [decodedToken]);
    // Lấy token đã giải mã
    // Theo dõi thay đổi của hotelId để gọi getDataTypeRoom khi hotelId đã được thiết lập

    useEffect(() => {
        console.log("listRoomDetail updated:", listRoomDetail);
    }, [listRoomDetail]);

    const typeRoomDetails = async (typeRoomId, floorName, hotelIds) => {
        try {
            const response = await axios.get(`${URL_API_ACCOUNT}/account/typeRoomDetails`, {
                params: {
                    typeRoomId: typeRoomId || '',
                    floorName: floorName || '', // Mã hóa giá trị floorName
                    hotelId: hotelIds || ''
                }
            });
            setListRoomDetail(response.data);
            console.log("Dữ liệu loại phòng:", response.data);
        } catch (error) {
            console.log("Lỗi call api: ", error);
        }
    };
    console.log("Mã khách sạn của bạn là: ", hotelId);
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                if (hotelId) {
                    console.log("Fetching data for hotelId:", hotelId);
                    // Fetch room types, floor details, and room details
                    await getDataTypeRoom(hotelId);
                    await getDataSelectFloor(hotelId);
                }
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };

        fetchInitialData();
    }, [hotelId]);

    const handleTypeRoomSelect = async (id) => {

        console.log("ID đã chọn:", id); // Thêm dòng này để kiểm tra giá trị ID
        selectedTypeRoomIdRef.current = id;

        if (!hotelId) {
            console.error("Hotel ID chưa được thiết lập!");
            return; // Ngừng thực thi nếu hotelId không hợp lệ
        }

        if (!floor) {
            console.error("Tầng không hợp lệ! Vui lòng chọn một tầng.");
            return; // Ngừng thực thi nếu floor không hợp lệ
        }

        try {
            console.log("Gọi API với loại phòng đã chọn:", id);
            console.log("Sử dụng floor:", floor);
            await typeRoomDetails(selectedTypeRoomIdRef.current, floor, hotelId);
        } catch (error) {
            console.error("Lỗi khi gọi API typeRoomDetails:", error);
        }
    };

    const handlAddRoomClick = (e) => {
        e.preventDefault();
        const addRoom = document.getElementById('add-room');
        if (addRoom) {
            addRoom.click();
        }
    };

    const handlAddTypeRoomClick = (e) => {
        e.preventDefault();
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
                                            <Add_TypeRoom />
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
                                        <th>Loại giường</th>
                                        <th>Sức chứa</th>
                                        <th>Số giường</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {roomTypes.map(({ id, typeRoomName, quantity, price, idTypeBed, guestLimit, bedCount }) => (
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
                                                <td onClick={() => handleTypeRoomSelect(id)}>LP{id}</td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{typeRoomName}</td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{quantity} </td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{price} VNĐ</td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{idTypeBed}</td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{guestLimit} người/phòng</td>
                                                <td onClick={() => handleTypeRoomSelect(id)}>{bedCount} giường</td>
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
                                                                                            <img src={typeRoomImage} alt="Hạng phòng" style={{ width: '100%', height: '100%' }} />
                                                                                        </Col>

                                                                                        {/* Cột chứa thông tin loại phòng */}
                                                                                        <Col md={4}>
                                                                                            <div style={{ overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                                                                                                <p><strong>Mã loại phòng:</strong> {id}</p>
                                                                                                <p><strong>Tên loại phòng:</strong> {typeRoomName}</p>
                                                                                                <p><strong>Số lượng phòng:</strong> {quantity}</p>
                                                                                                <p><strong>Loại giường:</strong> {idTypeBed}</p>
                                                                                                <p><strong>Số giường:</strong> {bedCount}</p>
                                                                                                <p><strong>Sức chứa tối đa:</strong> {guestLimit} người/phòng</p>
                                                                                            </div>
                                                                                        </Col>

                                                                                        {/* Cột chứa thông tin giá cả và địa chỉ */}
                                                                                        <Col md={4}>
                                                                                            <div style={{ overflowY: "auto", scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                                                                                <p><strong>Giá cả ngày:</strong> {price} VNĐ</p>
                                                                                                <p><strong>Phụ thu quá giờ:</strong> Tính tiền mỗi giờ</p>
                                                                                            </div>
                                                                                        </Col>
                                                                                    </Row>

                                                                                    {/* Các nút cập nhật và xóa */}
                                                                                    <div className="d-flex justify-content-end">
                                                                                        <UpdateTypeRoom />
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
                                                                                                        onChange={(e) => getValueFloors(e.target.value)}
                                                                                                    >
                                                                                                        <option value="">Chọn số tầng</option>
                                                                                                        {getFloors.map((item, index) => (
                                                                                                            <option key={index} value={item.floorName}>
                                                                                                                {item.floorName}
                                                                                                            </option>
                                                                                                        ))}
                                                                                                    </Form.Select>
                                                                                                </div>
                                                                                            </Card.Body>
                                                                                        </Card>
                                                                                        <table className="table">
                                                                                            <thead className="thead-dark">
                                                                                                <tr>
                                                                                                    <th>Tên phòng</th>
                                                                                                    <th>Khu vực</th>
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
                                        <th>Tầng</th>
                                        <th>Giá cả ngày</th>
                                        <th>Trạng thái</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.map(({ id, name, floor, priceDay, status, notes }) => (
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
                                                <td onClick={() => toggleRowExpansion(id)} style={{ cursor: 'pointer' }}>{floor}</td>
                                                <td onClick={() => toggleRowExpansion(id)} style={{ cursor: 'pointer' }}>{priceDay} VNĐ</td>
                                                <td onClick={() => toggleRowExpansion(id)} style={{ cursor: 'pointer' }}>{status}</td>
                                                <td onClick={() => toggleRowExpansion(id)} style={{ cursor: 'pointer' }}>{notes}</td>
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
                                                                                        <p><strong>Tên phòng:</strong> {roomInfo.name}</p>
                                                                                        <p><strong>Tầng:</strong> {roomInfo.floor}</p>
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                        <p><strong>Trạng thái:</strong> {roomInfo.status}</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row mb-3">
                                                                                    <div className="col-6">
                                                                                        <p><strong>Giá cả ngày:</strong> {roomInfo.priceDay} VNĐ</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <strong>Ghi chú:</strong>
                                                                                    <p>{roomInfo.notes}</p>
                                                                                </div>
                                                                                <div className="d-flex justify-content-end">
                                                                                    <UpdateRoomModal />
                                                                                    <DeleteModelRoom Name_Room={roomInfo.name} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {currentTab === 'bookingHistory' && (
                                                                    <div className="tab-pane fade show active" style={{ minHeight: 'auto' }}>
                                                                        <h5 className="mt-3 mt-4">Lịch sử đặt phòng</h5>
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
                                                                                {bookingHistory.map(booking => (
                                                                                    <tr key={booking.id}>
                                                                                        <th scope="row">{booking.id}</th>
                                                                                        <td>{booking.checkIn}</td>
                                                                                        <td>{booking.checkOut}</td>
                                                                                        <td>{booking.client}</td>
                                                                                    </tr>
                                                                                ))}
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

