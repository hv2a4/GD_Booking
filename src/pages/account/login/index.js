import React, { useEffect, useState } from "react";
import "../../../assets/css/account/login/app.css";
import "../../../assets/css/account/login/style.css";
import Header from "../../../components/common/Header";
const Login = () => {
    const [isSignUpVisible, setIsSignUpVisible] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpVisible(true);
    };

    const handleSignInClick = () => {
        setIsSignUpVisible(false);
    };

    return (
        <>
            <Header />
            <div className="App">
                <div className={`containerlogin ${isSignUpVisible ? 'right-panel-active' : ''}`} id="containerlogin">
                    <div className="form-container sign-up-container">
                        <form className="form-login" action="#">
                            <h1>Đăng Ký</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>Hoặc sử dụng email của bạn để đăng ký</span>
                            <input className="input-login" type="text" placeholder="Họ và tên" required />
                            <input className="input-login" type="email" placeholder="Email" required />
                            <input className="input-login" type="password" placeholder="Mật khẩu" required />
                            <button type="submit">Đăng Ký</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form className="form-login" action="#">
                            <h1>Đăng Nhập</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>Hoặc sử dụng tài khoản của bạn</span>
                            <input className="input-login" type="email" placeholder="Email" required />
                            <input className="input-login" type="password" placeholder="Mật khẩu" required />
                            <a href="#">Quên mật khẩu?</a>
                            <button type="submit">Đăng Nhập</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Chào Mừng !</h1>
                                <p>Để kết nối với chúng tôi, vui lòng đăng nhập với thông tin cá nhân của bạn.</p>
                                <button className="ghost" id="signIn" onClick={handleSignInClick}>Đăng Nhập</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Xin Chào, Bạn !</h1>
                                <p>Nhập thông tin cá nhân của bạn và bắt đầu hành trình cùng chúng tôi tại Hotel Starts.</p>
                                <button className="ghost" id="signUp" onClick={handleSignUpClick}>Đăng Ký</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;