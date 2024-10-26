import React from "react";

const RecentlyViewed = () => {
    return (
        <div>
            <h3>Xem gần đây</h3>
            <div className="row hotel-card">
                <div className="col-md-4">
                    <img src="./img/hotel/PhuQuoc/NovotelResort.jpg" className="img-fluid"
                        alt="Night Sea Hotel" />
                </div>
                <div className="col-md-8 d-flex justify-content-between">
                    <div className="hotel-info">
                        <h5 className="hotel-name">NIGHT SEA HOTEL</h5>
                        <p className="rating">★★★ Khách sạn</p>
                        <p><i className="bi bi-geo-alt"></i> Dương Đông</p>
                        <p className="review-score">7.8 - Tốt (9 đánh giá)</p>
                        <i className="bi bi-heart favourite-icon" onclick="toggleFavourite(this)"></i>
                    </div>
                    <div className="hotel-pricing">
                        <p>1 đêm, 2 người lớn</p>
                        <p className="text-success" style={{fontWeight: "bolder"}}>VND 2.547.000</p>
                        <p>Đã bao gồm thuế và phí</p>
                        <button className="btn btn-success mt-2">Xem Chi Tiết</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RecentlyViewed;