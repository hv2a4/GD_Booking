import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHome,
  cilList,
  cilBuilding,
  cilLayers,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Sơ đồ',
    to: '/employee/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />, // Home icon for layout overview
  },
  {
    component: CNavItem,
    name: 'Danh sách đặt phòng',
    to: '/employee/list-booking-room',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />, // List icon for reservations
  },
  {
    component: CNavGroup,
    name: 'Quản lý tầng',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />, // Building icon for floor management
    items: [
      {
        component: CNavItem,
        name: 'Tầng 1',
        to: '/employee/Floor/1',
        icon: <CIcon icon={cilLayers} customClassName="nav-icon" />, // Layer icon for individual floors
      },
      {
        component: CNavItem,
        name: 'Tầng 2',
        to: '/employee/Floor/2',
        icon: <CIcon icon={cilLayers} customClassName="nav-icon" />, // Layer icon reused for consistency
      },
    ],
  },
]

export default _nav
