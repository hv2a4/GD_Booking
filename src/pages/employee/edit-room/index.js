import React, { useEffect, useState } from "react";
import Layoutemployee from "../../../components/layout/employee";
import PopupPayment from "./payment";
import InsertCustomer from "../list-reservation/modalInsertCustomer";
import useGetParams from "../../../config/Params";
import { getBookingId } from "../../../services/employee/booking-manager";
import { getByIdBookingRoom } from "../../../services/employee/booking-room";
import { formatCurrency, formatDateTime } from "../../../config/formatPrice";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Alert from "../../../config/alert";
import { getAllService } from "../../../services/employee/type-room-service";
// import InsertCustomer from "../../../../../FE_HotelBooking/src/pages/employee/list-reservation/modalInsertCustomer";

const EditRoom = () => {
    const encodedIdBooking = useGetParams("idBookingRoom");
    const idBookingRoom = encodedIdBooking ? atob(encodedIdBooking) : null;
    const [showModalInsertCustomer, setShowModalInsertCustomer] = useState(false);
    const [bookingRoom, setBookingRoom] = useState({});
    const [booking, setBooking] = useState({});
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const [typeServiceRoom, setTypeServiceRoom] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [selectedService, setSelectedService] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [totalRoomPrice, setTotalRoomPrice] = useState(0);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };
    useEffect(() => {
        // console.log(totalPriceRoom);

        hanhdleBooking();
    }, [encodedIdBooking]);

    const hanhdleBooking = async () => {
        try {
            if (idBookingRoom) {
                setLoading(true);
                const bookingRoom = await getByIdBookingRoom(idBookingRoom);
                const booking = await getBookingId(bookingRoom.booking.id);
                setBookingRoom(bookingRoom);
                setBooking(booking);
                const totalPriceRoom = booking.bookingRooms.map((e) => e.room?.typeRoomDto?.price || 0);
                const totalRoomPrice = totalPriceRoom.reduce((sum, price) => sum + price, 0);
                setTotalRoomPrice(totalRoomPrice);
                console.log(totalPriceRoom);

            }
            const service = await getAllService();
            setTypeServiceRoom(service);
        } catch (error) {
            setAlert({ type: "error", title: "Lỗi khi tải dữ liệu" });
        } finally {
            setLoading(false);
        }
    }

    const renderServiceItem = (service) => (
        <div
            key={service.id}
            className="product-item"
            onClick={() => handleSelectService(service)}
            style={{
                cursor: "pointer",
                border: selectedService?.id === service.id ? "2px solid #02963d" : "1px solid #ddd",
                borderRadius: "8px",
                padding: "8px",
            }}
        >
            <div
                className="product-item-thumb"
                style={{
                    width: "100px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    backgroundColor: "#f8f8f8",
                    position: "relative",
                }}
            >
                {!isImageLoaded && (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#e0e0e0",
                        }}
                    >
                        <span style={{ fontSize: "12px", color: "#888" }}>Đang tải...</span>
                    </div>
                )}
                <img
                    src={service.imageName || "https://via.placeholder.com/150"}
                    alt={service.serviceRoomName}
                    onLoad={() => setIsImageLoaded(true)} // Mark image as loaded
                    onError={() => setIsImageLoaded(true)} // Handle failed loading
                    style={{
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        display: isImageLoaded ? "block" : "none", // Hide image until loaded
                    }}
                />
            </div>
            <div className="product-item-info">
                <h6 className="product-item-name">{service.serviceRoomName}</h6>
                <span className="product-item-price">
                    {service.price ? `${formatCurrency(service.price)}` : "Liên hệ"}
                </span>
            </div>
        </div>
    );

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filteredServices = (services) => {
        if (!searchValue) {
            return typeServiceRoom.flatMap((category) => category?.serviceRoomDtos || []);
        }

        const normalizedSearchValue = removeAccents(searchValue);

        if (Array.isArray(services)) {
            return services.filter((room) => {
                const normalizedRoomName = removeAccents(room.serviceRoomName);
                return (
                    normalizedRoomName.includes(normalizedSearchValue) ||
                    (room.id && room.id.toString().toLowerCase().includes(normalizedSearchValue))
                );
            });
        }

        return (services || []).flatMap((service) => {
            if (service?.serviceRoomDtos) {
                return service.serviceRoomDtos.filter((room) => {
                    const normalizedRoomName = removeAccents(room.serviceRoomName);
                    return (
                        normalizedRoomName.includes(normalizedSearchValue) ||
                        (room.id && room.id.toString().toLowerCase().includes(normalizedSearchValue))
                    );
                });
            }
            return [];
        });
    };

    const renderTabContent = (tab) => {
        const allServices = typeServiceRoom.flatMap((category) => category.serviceRoomDtos || []);

        if (tab === "all") {
            const filteredAllServices = filteredServices(allServices);
            return filteredAllServices.map(renderServiceItem);
        } else {
            const category = typeServiceRoom.find((cat) => cat.serviceRoomName === tab);

            if (!category) {
                return <p>Không có dịch vụ</p>;
            }
            const filteredCategoryServices = searchValue
                ? filteredServices(category.serviceRoomDtos || [])
                : category.serviceRoomDtos || [];

            return filteredCategoryServices.map(renderServiceItem);
        }
    };

    const calculateUsageDuration = (checkIn) => {
        if (!checkIn) return 'N/A';
    
        const start = new Date(checkIn);
        const now = new Date();
    
        if (isNaN(start) || now < start) return 'N/A';
    
        const diffMs = now - start;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Số giờ còn lại
    
        if (diffDays > 0) {
            return `${diffDays} ngày ${diffHours} giờ`;
        } else {
            return `${diffHours} giờ`;
        }
    };
    

    const handleSelectService = (service) => {
        setSelectedService(service);
        console.log("Selected service:", service);
    };
    const handleShowModalInsertCustomer = () => {
        setShowModalInsertCustomer(true);
    }
    const handleCloseModalInsertCustomer = () => {
        setShowModalInsertCustomer(false);
    }
    return (
        <Layoutemployee>
            <div className="mb-3">
                {loading ? (
                    <div className="overlay-loading">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : ""}
                {alert && <Alert type={alert.type} title={alert.title} />}
                <div className="cashier-head">
                    <div className="cashier-info">
                        <button className="navbar-toggler custom-toggler d-block d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#cashierInfoCollapse" aria-controls="cashierInfoCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse d-md-block" id="cashierInfoCollapse">
                            <div className="cashier-info-row row">
                                <div className="cashier-info-col col-md-3 col-12 mb-2">
                                    <label className="cashier-info-label">Khách hàng</label>
                                    <div className="cashier-info-customer-search">
                                        <div className="customer-search">
                                            <div className="auto-complete-wrapper form-control-wrapper d-flex">
                                                <a className="customer-search-name form-control text-info font-medium" title="Lê Minh Khôi | Nợ: 0 Số lượng mua: 0">
                                                    Lê Minh Khôi
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cashier-info-col col-md-3 col-12 mb-2">
                                    <label className="cashier-info-label">Khách lưu trú</label>
                                    <div className="cashier-info-capacity" onClick={handleShowModalInsertCustomer}>
                                        <button className="form-control d-flex align-items-center text-neutral justify-content-between" onClick={handleShowModalInsertCustomer}>
                                            <span><i className="fa fa-user icon-mask icon-xs w-auto"></i> 0</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="cashier-info-col col-md-3 col-12">
                                    <label className="cashier-info-label">Ghi chú</label>
                                    <div className="cashier-info-note">
                                        <div className="form-control">
                                            <span className="note-text">Đặt phòng online: e</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cashier-body row m-0">
                    <div className="col-12 col-md-4">
                        <div className="cashier-aside" style={{ height: "auto" }}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link nav-dichvu active" id="pills-sp-tab" data-bs-toggle="pill" data-bs-target="#pills-sp" type="button" role="tab" aria-controls="pills-sp" aria-selected="false">
                                            Sản phẩm/Dịch vụ
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link nav-dichvu" id="pills-ds-tab" data-bs-toggle="pill" data-bs-target="#pills-ds" type="button" role="tab" aria-controls="pills-ds" aria-selected="false">
                                            Danh sách
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-sp" role="tabpanel" aria-labelledby="pills-sp-tab">
                                    <div className="products-filter">
                                        <div className="product-search">
                                            <div className="form-control-wrapper w-100">
                                                <div className="form-control-prefix">
                                                    <i className="fa fa-search icon-mask" style={{ marginLeft: "10px" }}></i>
                                                </div>
                                                <div className="form-control autocomplete">
                                                    <input
                                                        type="text"
                                                        className="input-unstyled"
                                                        id="cart-product-search-id"
                                                        placeholder="Tìm theo tên, mã dịch vụ"
                                                        value={searchValue} // Liên kết giá trị
                                                        onChange={handleSearchChange} // Gọi hàm khi thay đổi giá trị
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-hotel mt-3">
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${activeTab === "all" ? "active" : ""}`}
                                                    onClick={() => setActiveTab("all")}
                                                >
                                                    Tất cả
                                                </button>
                                            </li>
                                            {typeServiceRoom.map((category) => (
                                                <li key={category.id} className="nav-item" role="presentation">
                                                    <button
                                                        className={`nav-link ${activeTab === category.serviceRoomName ? "active" : ""}`}
                                                        onClick={() => setActiveTab(category.serviceRoomName)}
                                                    >
                                                        {category.serviceRoomName}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent" style={{ maxHeight: "370px", overflowY: "auto" }}>
                                            <div className="tab-pane fade show active">
                                                <div className="products-grid">{renderTabContent(activeTab)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="pills-ds" role="tabpanel" aria-labelledby="pills-ds-tab">
                                    <div className="cashier-aside-tab-content">
                                        <div className="group-room" style={{ maxHeight: "450px", overflowY: "auto" }}>
                                            <div className="group-room-list">
                                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                                    {booking.bookingRooms && booking.bookingRooms.length > 0 ? (
                                                        booking.bookingRooms.map((item, index) => {
                                                            const encodedIdBookingRoom = btoa(item.id);
                                                            return (
                                                                <div className="accordion-item mb-2" key={index}>

                                                                    <h2 className="accordion-header">
                                                                        <button
                                                                            className="accordion-button collapsed"
                                                                            type="button"
                                                                            data-bs-toggle="collapse"
                                                                            data-bs-target={`#flush-collapse${index}`}
                                                                            aria-expanded="false"
                                                                            aria-controls={`flush-collapse${index}`}
                                                                            style={{ border: "1px solid #ccc", borderRadius: "0.6rem", boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 12%" }}
                                                                        >
                                                                            {item.room.roomName}
                                                                        </button>
                                                                    </h2>
                                                                    <Link to={`/employee/edit-room?idBookingRoom=${encodedIdBookingRoom}`} style={{ backgroundColor: 'lightblue', transition: 'none' }}>
                                                                        <div id={`flush-collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                                            <div className="accordion-body">
                                                                                <div className="group-room-item mb-1">
                                                                                    <div className="d-flex justify-content-between">
                                                                                        <div>
                                                                                            <strong className="me-1 text-success">{item.room.roomName}</strong>
                                                                                            <span className="tag text-success">{item.room.statusRoomDto.statusRoomName}</span>
                                                                                        </div>
                                                                                        <div className="cell-price fw-bolder text-success">{formatCurrency(item.price)}</div>
                                                                                    </div>
                                                                                    <div className="text-neutral">{formatDateTime(item.checkIn)} - {formatDateTime(item.checkOut)}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            );
                                                        })
                                                    ) : (
                                                        <p>Không có phòng</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group-room-footer">
                                            <div className="text-success text-right fw-bolder">Tổng cộng: {formatCurrency(totalRoomPrice)} VNĐ</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-8">
                        <div className="cashier-cart">
                            <div className="cashier-cart-body">
                                <div className="cart-container">
                                    <div className="cart-head">
                                        <div className="active">
                                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <div className="cart-head-title d-flex align-items-center">
                                                    <h3 className="mb-0 mr-2">{bookingRoom?.room?.roomName} - {bookingRoom?.room?.typeRoomDto.typeRoomName}</h3>
                                                    <a className="btn btn-sm btn-text-neutral btn-icon-only btn-circle mr-2">
                                                        <i className="fa fa-images icon-btn"></i>
                                                    </a>
                                                    <div className="text-success">
                                                        <span>Đang sử dụng: {calculateUsageDuration(bookingRoom.checkIn)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cart-item-note">
                                                <i className="fa fa-pen icon-xs icon-mask mr-1"></i>
                                                <span> Nhập ghi chú ... </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cart-body">
                                        <div className="d-block mb-4">
                                            <div className="cart-info-box">
                                                <div className="row g-3">
                                                    <div className="col-12 col-md-auto">
                                                        <label className="text-neutral font-sm">Phòng</label>
                                                        <span className="form-control">{bookingRoom?.room?.roomName}</span>
                                                    </div>
                                                    <div className="col-12 col-md-auto">
                                                        <label className="text-neutral font-sm d-block">Nhận phòng</label>
                                                        <DatePicker
                                                            selected={bookingRoom.checkIn}
                                                            className="custom-date-picker"
                                                            onChange=""
                                                            disabled
                                                            showTimeSelect
                                                            timeFormat="HH:mm"
                                                            timeIntervals={15}
                                                            timeCaption="Time"
                                                            dateFormat="dd/MM/yyyy, HH:mm"
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-auto">
                                                        <label className="text-neutral font-sm d-block">Trả phòng</label>
                                                        <DatePicker
                                                            selected={bookingRoom.checkOut}
                                                            className="custom-date-picker"
                                                            onChange=""
                                                            showTimeSelect
                                                            timeFormat="HH:mm"
                                                            timeIntervals={15}
                                                            timeCaption="Time"
                                                            dateFormat="dd/MM/yyyy, HH:mm"
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-auto">
                                                        <label className="text-neutral font-sm">Lưu trú</label>
                                                        <span className="form-control">1 ngày</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="cart-list">
                                            <table className="table" style={{ margin: "12px" }}>
                                                <thead className="cart-item cart-list-head px-3 font-semibold">
                                                    <tr className="row font-weight-bold align-items-center">
                                                        <th className="col-2 col-lg-1 text-start">STT</th>
                                                        <th className="col-5 col-lg-3">Hạng mục</th>
                                                        <th className="col-4 col-lg-2 text-center">Số lượng</th>
                                                        <th className="col-5 col-lg-3 text-center">Đơn giá</th>
                                                        <th className="col-5 col-lg-2 text-center">Thành tiền</th>
                                                        <th className="col-auto"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="cart-item row align-items-center">
                                                        <td className="col-2 col-lg-1 text-start">1</td>
                                                        <td className="col-5 col-lg-3">
                                                            <h6 className="cart-item-name mb-0">Phòng 01 giường đơn (Ngày)</h6>
                                                        </td>
                                                        <td className="col-4 col-lg-2 text-center">
                                                            <div className="form-number form-number-sm d-flex justify-content-center align-items-center">
                                                                <button type="button" className="btn btn-icon-only btn-text-neutral btn-circle down">
                                                                    <i className="fa fa-minus-circle icon-btn"></i>
                                                                </button>
                                                                <input type="text" className="form-control mx-1 text-center" value="1" style={{ maxWidth: "50px" }} />
                                                                <button type="button" className="btn btn-icon-only btn-text-neutral btn-circle up">
                                                                    <i className="fa fa-plus-circle icon-btn"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="col-5 col-lg-3 d-flex justify-content-center">
                                                            <span className="w-auto">600,000</span>
                                                        </td>
                                                        <td className="col-5 col-lg-2 d-flex text-danger fw-bolder justify-content-center font-semibold">600,000</td>
                                                        <td className="col-auto"></td>
                                                    </tr>
                                                    <tr className="cart-item row align-items-center">
                                                        <td className="col-2 col-lg-1 text-start">1</td>
                                                        <td className="col-5 col-lg-3">
                                                            <h6 className="cart-item-name mb-0">Phòng 01 giường đơn (Ngày)</h6>
                                                        </td>
                                                        <td className="col-4 col-lg-2 text-center">
                                                            <div className="form-number form-number-sm d-flex justify-content-center align-items-center">
                                                                <button type="button" className="btn btn-icon-only btn-text-neutral btn-circle down">
                                                                    <i className="fa fa-minus-circle icon-btn"></i>
                                                                </button>
                                                                <input type="text" className="form-control mx-1 text-center" value="1" style={{ maxWidth: "50px" }} />
                                                                <button type="button" className="btn btn-icon-only btn-text-neutral btn-circle up">
                                                                    <i className="fa fa-plus-circle icon-btn"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="col-5 col-lg-3 d-flex justify-content-center">
                                                            <span className="w-auto">600,000</span>
                                                        </td>
                                                        <td className="col-5 col-lg-2 d-flex text-danger fw-bolder justify-content-center font-semibold">600,000</td>
                                                        <td className="col-auto"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="cart-footer">
                                            <div className="text-success fw-bold font-semibold">
                                                <div className="row">
                                                    <div className="col text-right">Tổng tiền</div>
                                                    <div className="col text-right">17,740,000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cashier-cart-footer">
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="d-flex align-items-center">
                                        <button type="button" className="btn btn-outline-neutral btn-icon-only" title="Hủy đặt phòng">
                                            <i className="fa fa-trash-alt icon-btn"></i>
                                        </button>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-outline-secondary ng-star-inserted mx-2" type="button">Lưu</button>
                                        <PopupPayment></PopupPayment>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModalInsertCustomer && <InsertCustomer onClose={handleCloseModalInsertCustomer} />}
        </Layoutemployee >
    )
}

export default EditRoom;