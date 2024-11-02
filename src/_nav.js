import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilBuilding,
  cilLayers,
  cilPeople,
  cilBriefcase,
  cilClipboard,
  cilCash,
  cilRoom,
  cilCloud,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

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
    component: CNavItem,
    name: 'Thông tin khách sạn',
    to: "/admin/hotel-info",
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Phòng',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
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
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
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
    component: CNavGroup,
    name: 'Quản lý tài khoản',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Khách hàng',
        to: '/admin/account-client',
      },
      {
        component: CNavItem,
        name: 'Nhân viên',
        to: '/admin/account-employee',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Báo cáo',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
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
        to: '/admin/revenue',
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
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
  },
]

export default _nav
