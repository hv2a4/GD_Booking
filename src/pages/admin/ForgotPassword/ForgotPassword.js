import React, { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
// import "./forgotpassword.css";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import email_icon from '../../../assets/images/email.png'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className='container'>
            <div className="header">
                <div className="text">Khôi phục tài khoản</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={email_icon} alt='' />
                    <input type='email' placeholder='Email'/>
                </div>
                {/* <div className="input">
                    <img src={password_icon} alt='' />
                    <input type='password' placeholder='Mật khẩu'/>
                </div> */}
            </div>
            <div className="submit-container">
                <div className="submit" onClick={() => navigate('/admin/otp-code')}>
                    Gửi mã OTP
                </div>
            </div>
    </div>
  );
};

export default ForgotPassword;
