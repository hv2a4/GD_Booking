import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../staff/index';
import "../../../assets/css/staff/style.css";

export default function LayoutStaff({ children }) {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          {children}
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

