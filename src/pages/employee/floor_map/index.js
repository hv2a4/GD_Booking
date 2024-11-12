import React, { useEffect, useState } from "react";
import Layoutemployee from "../../../components/layout/employee";
import ModalDetailFloor from "./modalChitietPhong";
import ModalORR from "./modal-order-receive-room";
import useGetParams from "../../../config/Params";
import { getRoomByFloorId } from "../../../services/employee/room";
import Alert from "../../../config/alert";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../../config/formatPrice";
const FloorMap = () => {
    const {id} = useParams();
    const [rooms, setRooms] = useState([]);
    const [alert, setAlert] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleShowModalDetail = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const [showModalOrder, setShowModalOrder] = useState(false);

    const handleShowModalOrder = () => {
        setShowModalOrder(true);
    };
    const handleCloseModalOrder = () => {
        setShowModalOrder(false);
    };

    useEffect(() => {
        handleRoomByFloor();
    }, [id]);

    const handleRoomByFloor = async () => {
        try {
            const data = await getRoomByFloorId(id);
            console.log(data);
            
            if (data) {
                setRooms(data);
            } else {
                setAlert({ type: "error", title: "Lỗi không có dữ liệu" });
            }
        } catch (error) {
            setAlert({ type: "error", title: error.message });
        }
    };

    return (
        <Layoutemployee>
            <div className="reception-wrapper min-height-400 container-fluid pb-3 ng-star-inserted">
                {alert && <Alert type={alert.type} title={alert.title} />}
                <div className="reception-floors ng-star-inserted mt-3">
                    <div className="divider">
                        <div className="spacer max-w-100">
                            <h2 className="d-flex align-items-center mb-0 max-w-100">
                                <span className="text-limit">Tầng {id.id}</span>
                                <span className="font-medium text-neutral my-1">({rooms.length})</span>
                            </h2>
                        </div>
                    </div>
                    <div className="row row-padding-3 ng-star-inserted">
                        {rooms.map((item, index) => (
                            item.statusRoomDto.id === 1 ? (
                                <div key={index} className="col-lg-3 col-md-4 col-12 mb-2 ng-star-inserted">
                                    <div className="reception-item">
                                        <div>
                                            <div className="reception-item-header row">
                                                <span className="badge badge-light-danger text-nowrap ng-star-inserted col-md-4 col-4 mx-3">
                                                    <i className="fa fa-broom badge-icon"></i> Chưa dọn
                                                </span>
                                                <div className="dropdown-center col-md-3 col-3">
                                                    <button
                                                        style={{ backgroundColor: 'transparent', border: 'none' }}
                                                        className="btn dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <i
                                                            className="fas fa-ellipsis-v"
                                                            style={{ color: "black", fontSize: "15px", marginTop: "auto" }}
                                                        ></i>
                                                    </button>
                                                    <div className="dropdown-menu mt-2 pt-1 pe-2 px-1 translateform" style={{ minWidth: "10px", borderRadius: "15px", marginRight: "15px" }}>
                                                        <a>Làm sạch</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="reception-item-body" onClick={handleShowModalOrder}>
                                                <div className="reception-info d-flex spacer align-items-center flex-nowrap mb-2">
                                                    <h2 className="reception-room-name mb-0 tag-neutral" title={item?.roomName}> {item?.roomName} </h2>
                                                </div>
                                                <div className="reception-info ng-star-inserted">
                                                    <h4 className="reception-room-name mb-1" title="Phòng 01 giường đôi cho 2 người"> {item.typeRoomDto.typeRoomName} </h4>
                                                    <div className="reception-room-price ng-star-inserted">
                                                        <i className="far fa-clock icon-mask icon-xs me-1"></i>{formatCurrency(item.typeRoomDto.price)} VNĐ
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : item.statusRoomDto.id === 2 ? (
                                <div key={index} className="col-lg-3 col-md-4 col-12 mb-2 ng-star-inserted">
                                    <div className="reception-item reception-item-over-checked-out">
                                        <div>
                                            <div className="reception-item-header row">
                                                <span className="badge badge-light-neutral text-nowrap ng-star-inserted col-md-4 col-4 mx-3">
                                                    <i className="fas fa-hand-sparkles badge-icon"></i> Sạch
                                                </span>
                                                <div className="dropdown-center col-md-3 col-3">
                                                    <button
                                                        style={{ backgroundColor: 'transparent', border: 'none' }}
                                                        className="btn dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <i
                                                            className="fas fa-ellipsis-v"
                                                            style={{ color: 'black', fontSize: '15px', marginTop: 'auto' }}
                                                        ></i>
                                                    </button>
                                                    <div className="dropdown-menu mt-2 pt-1 pe-2 px-1 translateform" style={{ minWidth: '10px', borderRadius: '15px', marginRight: '15px' }}>
                                                        <a>Chưa dọn</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="reception-item-body" onClick={handleShowModalDetail}>
                                                <div className="reception-info d-flex spacer align-items-center flex-nowrap mb-2">
                                                    <h2 className="reception-room-name mb-0" title={item?.roomName}> {item?.roomName} </h2>
                                                </div>
                                                <div className="reception-info ng-star-inserted">
                                                    <div className="reception-customer">
                                                        <h4 className="reception-room-name mb-0"> Lê Minh Khôi </h4>
                                                        <span className="reception-room-phone ng-star-inserted">&nbsp;</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="reception-item-footer ng-star-inserted">
                                                <div className="badge badge-light-warning text-limit ng-star-inserted">
                                                    <i className="fas fa-clock icon-badge icon-xs ht-mr-1"></i>
                                                    <span>69 giờ 46 phút / 0 giờ 41 phút</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div key={index} className="col-lg-3 col-md-4 col-12 mb-2 ng-star-inserted">
                                    <div className="reception-item reception-item-over-checked-in">
                                        <div>
                                            <div className="reception-item-header row">
                                                <span className="badge badge-light-neutral text-nowrap ng-star-inserted col-md-4 col-4 mx-3">
                                                    <i className="fas fa-hand-sparkles badge-icon"></i> Sạch
                                                </span>
                                                <div className="dropdown-center col-md-3 col-3">
                                                    <button
                                                        style={{ backgroundColor: 'transparent', border: 'none' }}
                                                        className="btn dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <i
                                                            className="fas fa-ellipsis-v"
                                                            style={{ color: 'black', fontSize: '15px', marginTop: 'auto' }}
                                                        ></i>
                                                    </button>
                                                    <div className="dropdown-menu mt-2 pt-1 pe-2 px-1 translateform" style={{ minWidth: '10px', borderRadius: '15px', marginRight: '15px' }}>
                                                        <a>Chưa dọn</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="reception-item-body" onClick={handleShowModalDetail}>
                                                <div className="reception-info d-flex spacer align-items-center flex-nowrap mb-2">
                                                    <h2 className="reception-room-name mb-0" title={item?.roomName}> {item?.roomName} </h2>
                                                </div>
                                                <div className="reception-info ng-star-inserted">
                                                    <div className="reception-customer">
                                                        <h4 className="reception-room-name mb-0"> Lê Minh Khôi </h4>
                                                        <span className="reception-room-phone ng-star-inserted">&nbsp;</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="reception-item-footer ng-star-inserted">
                                                <div className="badge badge-light-neutral text-limit ng-star-inserted">
                                                    <i className="fas fa-clock icon-badge icon-xs ht-mr-1"></i>
                                                    <span>1 tháng / 10 ngày</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}

                        {/* <div className="col-lg-3 col-md-4 col-12 mb-2 ng-star-inserted">
                            <div className="reception-item active">
                                <div>
                                    <div className="reception-item-header row">
                                        <span className="badge badge-light-neutral text-nowrap ng-star-inserted col-md-4 col-4 mx-3">
                                            <i className="fas fa-hand-sparkles badge-icon"></i> Sạch
                                        </span>
                                        <div className="dropdown-center col-md-3 col-3">
                                            <button style={{ backgroundColor: "transparent", border: "none" }}
                                                className="btn dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown">
                                                <i className="fas fa-ellipsis-v"
                                                    style={{ color: "black", fontSize: "15px", marginTop: "auto" }}>
                                                </i>
                                            </button>
                                            <div className="dropdown-menu mt-2 pt-1 pe-2 px-1 translateform" style={{
                                                minWidth: '10px',
                                                borderRadius: '15px',
                                                marginRight: '15px'
                                            }}>
                                                <a>Chưa dọn</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reception-item-body" onClick={handleShowModalOrder}>
                                        <div className="reception-info d-flex spacer align-items-center flex-nowrap mb-2">
                                            <h2 className="reception-room-name mb-0 tag-neutral" title="P.201"> P.201 </h2>
                                        </div>
                                        <div className="reception-info ng-star-inserted">
                                            <h4 className="reception-room-name mb-1" title="Phòng 01 giường đôi cho 2 người"> Phòng 01 giường đôi cho 2 người </h4>
                                            <div className="reception-room-price ng-star-inserted">
                                                <i className="fa-solid fa-clock icon-mask icon-xs me-1"></i>180,000
                                            </div>
                                            <div className="reception-room-price ng-star-inserted">
                                                <i className="fa-solid fa-sun icon-mask icon-xs me-1"></i> 720,000
                                            </div>
                                            <div className="reception-room-price ng-star-inserted">
                                                <i className="fa-solid fa-moon icon-mask icon-xs me-1"></i> 720,000
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-12 mb-2 ng-star-inserted">
                            <div className="reception-item reception-item-over-checked-out">
                                <div>
                                    <div className="reception-item-header row">
                                        <span className="badge badge-light-neutral text-nowrap ng-star-inserted col-md-4 col-4 mx-3">
                                            <i className="fas fa-hand-sparkles badge-icon"></i> Sạch
                                        </span>
                                        <div className="dropdown-center col-md-3 col-3">
                                            <button style={{
                                                backgroundColor: 'transparent',
                                                border: 'none'
                                            }}
                                                className="btn dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown">
                                                <i className="fas fa-ellipsis-v"
                                                    style={{
                                                        color: 'black',
                                                        fontSize: '15px',
                                                        marginTop: 'auto'
                                                    }}>
                                                </i>
                                            </button>
                                            <div className="dropdown-menu mt-2 pt-1 pe-2 px-1 translateform" style={{
                                                minWidth: '10px',
                                                borderRadius: '15px',
                                                marginRight: '15px'
                                            }}>
                                                <a>Chưa dọn</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reception-item-body" onClick={handleShowModalDetail}>
                                        <div className="reception-info d-flex spacer align-items-center flex-nowrap mb-2">
                                            <h2 className="reception-room-name mb-0" title="P.301"> P.301 </h2>
                                        </div>
                                        <div className="reception-info ng-star-inserted">
                                            <div className="reception-customer">
                                                <h4 className="reception-room-name mb-0"> Lê Minh Khôi </h4>
                                                <span className="reception-room-phone ng-star-inserted">&nbsp;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reception-item-footer ng-star-inserted">
                                        <div className="badge badge-light-warning text-limit ng-star-inserted">
                                            <i className="fas fa-clock icon-badge icon-xs ht-mr-1"></i>
                                            <span>69 giờ 46 phút / 0 giờ 41 phút</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-12 mb-2 ng-star-inserted">
                            <div className="reception-item reception-item-over-checked-in">
                                <div>
                                    <div className="reception-item-header row">
                                        <span className="badge badge-light-neutral text-nowrap ng-star-inserted col-md-4 col-4 mx-3">
                                            <i className="fas fa-hand-sparkles badge-icon"></i> Sạch
                                        </span>
                                        <div className="dropdown-center col-md-3 col-3">
                                            <button style={{
                                                backgroundColor: 'transparent',
                                                border: 'none'
                                            }}
                                                className="btn dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown">
                                                <i className="fas fa-ellipsis-v"
                                                    style={{
                                                        color: 'black',
                                                        fontSize: '15px',
                                                        marginTop: 'auto'
                                                    }}>
                                                </i>
                                            </button>
                                            <div className="dropdown-menu mt-2 pt-1 pe-2 px-1 translateform" style={{
                                                minWidth: '10px',
                                                borderRadius: '15px',
                                                marginRight: '15px'
                                            }}>
                                                <a>Chưa dọn</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reception-item-body" onClick={handleShowModalDetail}>
                                        <div className="reception-info d-flex spacer align-items-center flex-nowrap mb-2">
                                            <h2 className="reception-room-name mb-0" title="P.301"> P.301 </h2>
                                        </div>
                                        <div className="reception-info ng-star-inserted">
                                            <div className="reception-customer">
                                                <h4 className="reception-room-name mb-0"> Lê Minh Khôi </h4>
                                                <span className="reception-room-phone ng-star-inserted">&nbsp;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reception-item-footer ng-star-inserted">
                                        <div className="badge badge-light-neutral text-limit ng-star-inserted">
                                            <i className="fas fa-clock icon-badge icon-xs ht-mr-1"></i>
                                            <span>1 tháng / 10 ngày</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-12 mb-2 ng-star-inserted">
                            <div className="reception-item active">
                                <div>
                                    <div className="reception-item-header row">
                                        <span className="badge badge-light-danger text-nowrap ng-star-inserted col-md-4 col-4 mx-3">
                                            <i className="fa fa-broom badge-icon"></i> Chưa dọn
                                        </span>
                                        <div className="dropdown-center col-md-3 col-3">
                                            <button style={{
                                                backgroundColor: 'transparent',
                                                border: 'none'
                                            }}
                                                className="btn dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown">
                                                <i className="fas fa-ellipsis-v"
                                                    style={{
                                                        color: 'black',
                                                        fontSize: '15px',
                                                        marginTop: 'auto'
                                                    }}>
                                                </i>
                                            </button>
                                            <div className="dropdown-menu mt-2 pt-1 pe-2 px-1 translateform" style={{
                                                minWidth: '10px',
                                                borderRadius: '15px',
                                                marginRight: '15px'
                                            }}>
                                                <a>Làm sạch</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reception-item-body" onClick={handleShowModalOrder}>
                                        <div className="reception-info d-flex spacer align-items-center flex-nowrap mb-2">
                                            <h2 className="reception-room-name mb-0 tag-neutral" title="P.201"> P.201 </h2>
                                        </div>
                                        <div className="reception-info ng-star-inserted">
                                            <h4 className="reception-room-name mb-1" title="Phòng 01 giường đôi cho 2 người"> Phòng 01 giường đôi cho 2 người </h4>
                                            <div className="reception-room-price ng-star-inserted">
                                                <i className="fa-solid fa-clock icon-mask icon-xs me-1"></i>180,000
                                            </div>
                                            <div className="reception-room-price ng-star-inserted">
                                                <i className="fa-solid fa-sun icon-mask icon-xs me-1"></i> 720,000
                                            </div>
                                            <div className="reception-room-price ng-star-inserted">
                                                <i className="fa-solid fa-moon icon-mask icon-xs me-1"></i> 720,000
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            {showModal && <ModalDetailFloor onClose={handleCloseModal} />}
            {showModalOrder && <ModalORR onClose={handleCloseModalOrder} />}
        </Layoutemployee>
    )
}

export default FloorMap;