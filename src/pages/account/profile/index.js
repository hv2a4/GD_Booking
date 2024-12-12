import React from "react";
import LayoutCilent from '../../../components/layout/cilent';
import MyProfile from "./my-profile";
import RecentlyViewed from "./recently-viewed";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import "../../../assets/css/account/profile/style.css"
import ChangePassword from "../../admin/ChangePassword";
const Profile = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        toast.success("Đăng Xuất thành công!");
        setTimeout(() => {
            Cookies.remove('token'); // Nếu bạn dùng `js-cookie` để quản lý cookie
            // Chuyển hướng về trang đăng nhập
            navigate('/client/home');
        }, 1200);
    };

    return (
        <LayoutCilent>
            <section className="my-profile-section" style={{ marginBottom: "30px" }}>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="d-flex flex-column p-3" style={{ width: "300px" }}>
                                <h4 className="mb-4">Tài khoản của bạn</h4>
                                <ul className="nav flex-column nav-tabs mb-2" role="tablist">
                                    <li className="nav-item mb-2">
                                        <a href="#tab-my-profile" className="nav-link nav-link-profile active" data-bs-toggle="tab" role="tab">Thông
                                            tin cá nhân</a>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <a href="#tab-recently-viewed" className="nav-link nav-link-profile" data-bs-toggle="tab" role="tab">Lịch sử đặt phòng</a>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <a href="#tab-favourites" className="nav-link nav-link-profile" data-bs-toggle="tab" role="tab">Đổi mật khẩu</a>
                                    </li>
                                </ul>
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a href="#" className="nav-link nav-link-profile text-decoration" data-bs-toggle="tab" role="tab" onClick={handleLogout}>Đăng xuất</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="tab-my-profile" role="tabpanel">
                                    <MyProfile />
                                </div>
                                <div className="tab-pane fade" id="tab-recently-viewed" role="tabpanel">
                                    <RecentlyViewed />
                                </div>
                                <div className="tab-pane fade" id="tab-favourites" role="tabpanel">
                                    <ChangePassword />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutCilent>
    )
}
export default Profile;