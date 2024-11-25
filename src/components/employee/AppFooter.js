import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4" style={{ marginTop: 0, paddingTop: 0 }}>
      <div>
        <a href="http://localhost:3000/client/home" target="_blank" rel="noopener noreferrer">
          Khách Sạn HotelStars
        </a>
        <span className="ms-1">&copy; 2024 Khách Sạn HotelStars. Mọi quyền được bảo lưu.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Vận hành bởi</span>
        <a href="http://localhost:3000/admin/home" target="_blank" rel="noopener noreferrer">
          Hệ Thống Quản Lý Khách Sạn
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
