import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, TextField } from '@mui/material'
import person_icon from '../../../assets/images/person.png'
import password_icon from '../../../assets/images/password.png'
import './index.css'

const ChangePassword = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Đổi mật khẩu mới</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={person_icon} alt="" />
          <input type="text" placeholder="Tên tài khoản" value={"sonphan28"}/>
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Nhập mật khẩu mới" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Nhập mật khẩu mới" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Xác nhận mật khẩu" />
        </div>
      </div>
      {/* <div className="forgot-password">
                Quên mật khẩu? <span>Bấm vào đây!</span>
            </div> */}
      <div className="submit-container">
        <div className="submit">Lưu mật khẩu</div>
      </div>
    </div>
  )
}

export default ChangePassword
