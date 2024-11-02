import React,{ useState }  from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
const PopupPayment = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button className="btn btn-primary ng-star-inserted" type="button" onClick={handleShow}>Thanh toán</button>
            <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: "80%", maxWidth: "80%", height: "100%" }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasRightLabel">Thanh toán DP000008 - Lê Minh Khôi</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="offcanvas-body">
                    <div className="popup-payment-body popup-float-body ng-star-inserted container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-8">
                                <div className="popup-payment-cart">
                                    <div className="payment-cart ng-star-inserted">
                                        <div className="payment-cart-grid">
                                            <div className="popup-payment-section ng-star-inserted">
                                                <div className="spacer mb-2 ng-star-inserted">
                                                    <h4 className="mb-0">Tiền phòng</h4>
                                                </div>
                                                <div className="payment-cart-table">
                                                    <table className="table table-neutral table-fixed-head table-vertical-top">
                                                        <thead>
                                                            <tr className="text-nowrap">
                                                                <th className="cell-order text-center"> STT </th>
                                                                <th> Hạng mục </th>
                                                                <th className="cell-quantity-order text-center"> Số lượng </th>
                                                                <th className="cell-price-type text-right"> Đơn giá </th>
                                                                <th className="cell-price text-right"> Thành tiền </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="ng-star-inserted">
                                                                <td className="cell-order text-nowrap text-center ng-star-inserted">1.</td>
                                                                <td>
                                                                    <label className="d-inline p-0 m-0">
                                                                        <div className="spacer">
                                                                            <h4 className="mb-0">
                                                                                <span>Phòng 01 giường đôi và 1 giường đơn cho 3 người (15 Thg9 - 14 Thg10)</span>
                                                                            </h4>
                                                                            <div className="spacer">
                                                                                <span className="tag tag-light-neutral ng-star-inserted"> P.402</span>
                                                                            </div>
                                                                        </div>
                                                                    </label>
                                                                </td>
                                                                <td className="cell-quantity-order text-center"> 1 <span className="ng-star-inserted"> Tháng </span></td>
                                                                <td className="cell-price-type text-right"> 29,000,000</td>
                                                                <td className="cell-price text-right">
                                                                    <h4 className="mb-0"> 29,000,000 </h4>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="popup-payment-section ng-star-inserted">
                                                <div className="spacer mb-2 ng-star-inserted">
                                                    <h4 className="mb-0">Sản phẩm/Dịch vụ/Phụ thu</h4>
                                                </div>
                                                <div className="payment-cart-table">
                                                    <table className="table table-neutral table-fixed-head table-vertical-top">
                                                        <thead>
                                                            <tr className="text-nowrap">
                                                                <th className="cell-order text-center"> STT </th>
                                                                <th> Hạng mục </th>
                                                                <th className="cell-quantity-order text-center"> Số lượng </th>
                                                                <th className="cell-price-type text-right"> Đơn giá </th>
                                                                <th className="cell-price text-right"> Thành tiền </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="ng-star-inserted">
                                                                <td className="cell-order text-nowrap text-center ng-star-inserted">1.</td>
                                                                <td>
                                                                    <label className="d-inline p-0 m-0">
                                                                        <div className="spacer">
                                                                            <h4 className="mb-0">
                                                                                <span>Thuê ô tô</span>
                                                                            </h4>
                                                                            <div className="spacer">
                                                                                <span className="tag tag-light-neutral ng-star-inserted"> P.402</span>
                                                                            </div>
                                                                        </div>
                                                                    </label>
                                                                </td>
                                                                <td className="cell-quantity-order text-center">1</td>
                                                                <td className="cell-price-type text-right"> 29,000,000</td>
                                                                <td className="cell-price text-right">
                                                                    <h4 className="mb-0"> 29,000,000 </h4>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-4">
                                <div className="popup-payment-right">
                                    <div className="payment-container">
                                        <div className="payment-body">
                                            <div className="row">
                                                <div className="col-6 mb-3">
                                                    <label className="mb-1 font-sm">Nhân viên tạo HĐ</label>
                                                    <select className="form-select" aria-label="Default select example">
                                                        <option selected>Chưa xác định</option>
                                                        <option value="1">Nhân viên 1</option>
                                                        <option value="2">Nhân viên 2</option>
                                                        <option value="3">Nhân viên 3</option>
                                                    </select>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <label className="mb-1 font-sm">Thời gian tạo HĐ</label>
                                                    <input type="datetime-local" className="form-control" style={{ backgroundImage: "none" }} />
                                                </div>
                                            </div>
                                            <div className="payment-form ng-star-inserted">
                                                <div className="payment-form-block pt-3">
                                                    <div className="payment-form-row form-row">
                                                        <div className="payment-form-label col-form-label"> Tổng cộng </div>
                                                        <div className="payment-form-control col-form-control">
                                                            <div className="btn pl-0 pr-0 border-none">31,500,000</div>
                                                        </div>
                                                    </div>
                                                    <div className="payment-form-row form-row">
                                                        <div className="payment-form-label col-form-label"> Giảm giá </div>
                                                        <div className="payment-form-control col-form-control">
                                                            <button className="form-control form-control-line cell-change-price"> 0 </button>
                                                        </div>
                                                    </div>
                                                    <div className="payment-form-row form-row">
                                                        <div className="payment-form-label col-form-label"> Thu khác </div>
                                                        <div className="payment-form-control col-form-control">
                                                            <button type="button" className="form-control form-control-line cell-change-price"> 0 </button>
                                                        </div>
                                                    </div>
                                                    <div className="payment-form-row form-row">
                                                        <div className="payment-form-label col-form-label">
                                                            <strong>Còn cần trả</strong>
                                                        </div>
                                                        <div className="payment-to-pay payment-form-control col-form-control"> 31,500,000 </div>
                                                    </div>
                                                </div>
                                                <div className="payment-form-block mt-3">
                                                    <h3> Phương thức thanh toán </h3>
                                                    <div className="payment-form-row form-row mb-0 ng-star-inserted">
                                                        <div className="payment-form-label col-form-label pt-0">
                                                            <span> Khách thanh toán </span>
                                                            <button className="btn btn-icon-only btn-circle btn-ligprimary">
                                                                <i className="far fa-credit-card icon-btn"></i>
                                                            </button>
                                                        </div>
                                                        <div className="payment-customer-pay payment-form-control col-form-control">
                                                            <input id="payingAmountTxt" type="text" className="form-control form-control-line cell-change-price ng-pristine ng-valid ng-star-inserted ng-touched" />
                                                        </div>
                                                    </div>
                                                    <div className="ng-star-inserted">
                                                        <div className="payment-choose-method ng-star-inserted">
                                                            <label className="form-check">
                                                                <input type="radio" name="paymentMethod" className="form-check-input ng-valid ng-dirty ng-touched" />
                                                                <span className="form-check-text">Tiền mặt</span>
                                                            </label>
                                                            <label className="form-check">
                                                                <input type="radio" name="paymentMethod" className="form-check-input ng-valid ng-dirty ng-touched" />
                                                                <span className="form-check-text">Chuyển khoản</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="payment-return ng-star-inserted">
                                                        <div className="payment-form-row form-row mb-3 ng-star-inserted">
                                                            <div className="payment-form-label col-form-label"> Tiền thừa trả khách </div>
                                                            <div className="payment-form-control col-form-control payment-return-money ng-star-inserted"> 58,500,000 </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="payment-footer">
                                            <div className="payment-actions">
                                                <button type="button" className="btn btn-primary ng-star-inserted w-100"> Hoàn thành </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default PopupPayment;