import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { AppSidebarNav } from './AppSidebarNav';

import logo from '../../assets/brand/b4914d4d-5284-4df4-875e-c745fdd240e5-removebg-preview.png';
import { sygnet } from '../../assets/brand/sygnet';
import { createNavData } from '../../_navemployee';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [navigation, setNavigation] = useState([]); // State lưu trữ dữ liệu điều hướng

  useEffect(() => {
    const fetchNavData = async () => {
      const navData = await createNavData(); // Lấy dữ liệu điều hướng
      setNavigation(navData); // Cập nhật state khi dữ liệu đã có
    };

    fetchNavData();
  }, []); // Chạy một lần khi component mount

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarHeader className="border-bottom d-flex justify-content-center">
        <CSidebarBrand to="/">
          <img className="sidebar-brand-full rounded-4 me-2" src={logo} height={100} width={150} alt="Logo" />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} /> {/* Truyền navigation đã được cập nhật */}
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
