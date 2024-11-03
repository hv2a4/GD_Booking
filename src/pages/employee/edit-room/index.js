import React, {useState} from "react";
import Layoutemployee from "../../../components/layout/employee";
import PopupPayment from "./payment";
// import InsertCustomer from "../../../../../FE_HotelBooking/src/pages/employee/list-reservation/modalInsertCustomer";

const EditRoom = () => {
    const [showModalInsertCustomer, setShowModalInsertCustomer] = useState(false);

    const handleShowModalInsertCustomer = () => {
        setShowModalInsertCustomer(true);
    }
    const handleCloseModalInsertCustomer = () => {
        setShowModalInsertCustomer(false);
    }
    return (
        <Layoutemployee>
            <div>
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
                                    <div className="cashier-info-capacity">
                                        <button className="form-control d-flex align-items-center text-neutral justify-content-between" onClick={handleShowModalInsertCustomer}>
                                            <span><i className="fa-regular fa-user"></i> 1</span>
                                            <span className="mx-1">•</span>
                                            <span><i className="fa fa-baby"></i> 0</span>
                                            <span className="mx-1">•</span>
                                            <span><i className="fa fa-id-card"></i> 1</span>
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
                <div className="cashier-body row">
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
                                                    <input type="text" className="input-unstyled ng-pristine ng-valid ng-touched" id="cart-product-search-id" placeholder="Tìm theo tên, mã hàng hóa" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-hotel mt-3">
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="pills-allService-tab" data-bs-toggle="pill" data-bs-target="#pills-allService" type="button" role="tab" aria-controls="pills-allService" aria-selected="true">
                                                    Tất cả
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-foodService-tab" data-bs-toggle="pill" data-bs-target="#pills-foodService" type="button" role="tab" aria-controls="pills-foodService" aria-selected="false">
                                                    Đồ ăn
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-drinkService-tab" data-bs-toggle="pill" data-bs-target="#pills-drinkService" type="button" role="tab" aria-controls="pills-drinkService" aria-selected="false">
                                                    Đồ uống
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent" style={{ maxHeight: "370px", overflowY: "auto" }}>
                                            <div className="tab-pane fade show active" id="pills-allService" role="tabpanel" aria-labelledby="pills-allService-tab">
                                                <div className="products-grid">
                                                    <div className="product-item">
                                                        <div className="product-item-thumb">
                                                            <img src="https://d30s6klq0kc2zb.cloudfront.net/sample_data_20230310/product/service20.jpg" alt="Product Image" />
                                                        </div>
                                                        <div className="product-item-info">
                                                            <h6 className="product-item-name" title="Đánh golf (Ngày)"> Đánh golf</h6>
                                                            <span className="product-item-price">
                                                                <span>3,000,000</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="product-item">
                                                        <div className="product-item-thumb">
                                                            <img src="https://d30s6klq0kc2zb.cloudfront.net/sample_data_20230310/product/service20.jpg" alt="Product Image" />
                                                        </div>
                                                        <div className="product-item-info">
                                                            <h6 className="product-item-name" title="Đánh golf (Ngày)"> Đánh golf</h6>
                                                            <span className="product-item-price">
                                                                <span>3,000,000</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pills-foodService" role="tabpanel" aria-labelledby="pills-foodService-tab">
                                                <div className="products-grid">
                                                    <div className="product-item">
                                                        <div className="product-item-thumb">
                                                            <img src="https://d30s6klq0kc2zb.cloudfront.net/sample_data_20230310/product/product9.jpg" alt="Product Image" />
                                                        </div>
                                                        <div className="product-item-info">
                                                            <h6 className="product-item-name" title="Bim Bim Plays"> Bim Bim Plays</h6>
                                                            <span className="product-item-price">
                                                                <span>30,000</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pills-drinkService" role="tabpanel" aria-labelledby="pills-drinkService-tab">
                                                Đồ uống
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="pills-ds" role="tabpanel" aria-labelledby="pills-ds-tab">
                                    <div className="cashier-aside-tab-content">
                                        <div className="group-room" style={{ maxHeight: "450px", overflowY: "auto" }}>
                                            <div className="group-room-list">
                                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                                Phòng 1 giường đơn
                                                            </button>
                                                        </h2>
                                                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                            <div className="accordion-body">
                                                                <div className="group-room-item mb-1">
                                                                    <div className="d-flex justify-content-between">
                                                                        <div>
                                                                            <strong className="mr-2">P.502</strong>
                                                                            <span className="tag text-success">Đang sử dụng</span>
                                                                        </div>
                                                                        <div className="cell-price fw-bolder">800,000</div>
                                                                    </div>
                                                                    <div className="text-neutral">19 thg 9, 16:06 - 20 thg 9, 12:00</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                                Phòng 2 giường đơn
                                                            </button>
                                                        </h2>
                                                        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                            <div className="accordion-body">
                                                                <div className="group-room-item mb-1">
                                                                    <div className="d-flex justify-content-between">
                                                                        <div>
                                                                            <strong className="mr-2">P.503</strong>
                                                                            <span className="tag text-success">Đang sử dụng</span>
                                                                        </div>
                                                                        <div className="cell-price fw-bolder">1,000,000</div>
                                                                    </div>
                                                                    <div className="text-neutral">19 thg 9, 16:06 - 20 thg 9, 12:00</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group-room-footer">
                                            <div className="text-orange fw-bolder">Tổng cộng: 800,000</div>
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
                                                    <h3 className="mb-0 mr-2">P.502 - Phòng 02 giường đơn</h3>
                                                    <a className="btn btn-sm btn-text-neutral btn-icon-only btn-circle mr-2">
                                                        <i className="fa fa-images icon-btn"></i>
                                                    </a>
                                                    <div className="text-orange">
                                                        <span>Đang sử dụng: 1 ngày</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cart-item-note">
                                                <i className="fa-solid fa-pen icon-xs icon-mask mr-1"></i>
                                                <span> Nhập ghi chú ... </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cart-body">
                                        <div className="d-block mb-4">
                                            <div className="cart-info-box">
                                                <div className="row g-3">
                                                    <div className="col-12 col-md-auto">
                                                        <label className="text-neutral font-sm mb-1">Phòng</label>
                                                        <select className="form-select">
                                                            <option></option>
                                                            <option value="1">P.509</option>
                                                            <option value="2">P.409</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-12 col-md-auto">
                                                        <label className="text-neutral font-sm mb-1">Nhận phòng</label>
                                                        <input className="form-select" type="datetime-local" value="2024-09-20T01:29" />
                                                    </div>
                                                    <div className="col-12 col-md-auto">
                                                        <label className="text-neutral font-sm mb-1">Trả phòng</label>
                                                        <input className="form-select" type="datetime-local" value="2024-09-20T01:29" />
                                                    </div>
                                                    <div className="col-12 col-md-auto">
                                                        <label className="text-neutral font-sm mb-1">Lưu trú</label>
                                                        <span className="form-control">1 ngày</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="cart-list">
                                            <table className="table" style={{margin: "12px"}}>
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
                                                            <button className="form-control w-auto">600,000</button>
                                                        </td>
                                                        <td className="col-5 col-lg-2 d-flex justify-content-center font-semibold">600,000</td>
                                                        <td className="col-auto"></td>
                                                    </tr>
                                                    <tr className="cart-item row align-items-center">
                                                        <td className="col-2 col-lg-1 text-start">2</td>
                                                        <td className="col-5 col-lg-3">
                                                            <h6 className="cart-item-name mb-0">Đánh golf (Ngày)</h6>
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
                                                            <button className="form-control w-auto">3,000,000</button>
                                                        </td>
                                                        <td className="col-5 col-lg-2 d-flex justify-content-center font-semibold">3,000,000</td>
                                                        <td className="col-auto">
                                                            <button className="btn btn-sm btn-text-neutral btn-icon-only btn-circle">
                                                                <i className="fas fa-ellipsis icon-btn"></i>
                                                            </button>
                                                        </td>
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
                                        <button className="btn btn-outline-neutral btn-icon-only" title="Xem lịch sử đặt phòng">
                                            <i className="fa fa-clock-rotate-left icon-btn"></i>
                                        </button>
                                    </div>
                                    <PopupPayment></PopupPayment>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* {showModalInsertCustomer && <InsertCustomer onClose={handleCloseModalInsertCustomer} />} */}
        </Layoutemployee>
    )
}

export default EditRoom;