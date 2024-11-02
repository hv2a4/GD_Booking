import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilDescription,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Tổng quan',
    to: '/admin/home',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Phòng',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Loại phòng & phòng',
        to: '/admin/room',
      },
      {
        component: CNavItem,
        name: 'Thiết lập giá',
        to: '/admin/room-pricing',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Dịch vụ & Tiện nghi',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Dịch vụ',
        to: '/admin/service',
      },
      {
        component: CNavItem,
        name: 'Tiện nghi',
        to: '/admin/amenities',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Giao dịch',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Đặt phòng',
        to: '/admin/booking-manager',
      },
      {
        component: CNavItem,
        name: 'Hóa đơn',
        to: '/admin/invoice-room',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Nhân viên',
    to: '/#',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Báo cáo',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Cuối ngày',
        to: '/#',
      },
      {
        component: CNavItem,
        name: 'Đặt phòng',
        to: '/#',
      },
      {
        component: CNavItem,
        name: 'Doanh thu',
        to: '/#',
      },
      {
        component: CNavItem,
        name: 'Phòng',
        to: '/#',
      },
      {
        component: CNavItem,
        name: 'Khách hàng',
        to: '/#',
      },
      {
        component: CNavItem,
        name: 'Nhân viên',
        to: '/#',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Lễ tân',
    to: '/#',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
]

export default _nav
