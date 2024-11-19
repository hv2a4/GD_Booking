import React, { useState } from 'react';
import './index.css';
import user_icon from '../../../assets/images/person.png';
import password_icon from '../../../assets/images/password.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username || !password) {
            toast.error('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        // Placeholder for API call
        if (username === "admin" && password === "admin123") {
            toast.success('Đăng nhập thành công!');
            // navigate('/dashboard'); // Điều hướng tới trang dashboard
        } else {
            toast.error('Tên tài khoản hoặc mật khẩu không đúng!');
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Đăng Nhập Tài Khoản</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt='User Icon' />
                    <input
                        type='text'
                        placeholder='Tên tài khoản'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt='Password Icon' />
                    <input
                        type='password'
                        placeholder='Mật khẩu'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="forgot-password">
                Quên mật khẩu?{' '}
                <span onClick={() => navigate('/admin/forgot-password')}>
                    Bấm vào đây!
                </span>
            </div>
            <div className="submit-container">
                <button className="submit" onClick={handleLogin}>
                    Đăng Nhập
                </button>
            </div>
        </div>
    );
};

export default LoginAdmin;
