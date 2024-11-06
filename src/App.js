import React, { useEffect, useState } from "react";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./assets/css/admin/scss/style.scss";
import {
  Home,
  Booking,
  AboutUs,
  Contact,
  PageNotFound,
  RoomClient,
  Services,
  // Team,
  Testimonial,
} from "./pages/client/index";
import { Navigate } from 'react-router-dom';
import { jwtDecode as jwt_decode } from "jwt-decode";
import HomeAdmin from "./pages/admin/home";
import RoomAdmin from "./pages/admin/home/Room";
import RoomPriceManager from "./pages/admin/home/RoomPriceManager";
import InvoiceManagement from "./pages/admin/home/InvoiceManagement"
import BookingManger from "./pages/admin/home/BookingManger";
import Login from "./pages/account/login";
import Profile from "./pages/account/profile";
import EditRoom from "./pages/employee/edit-room";
import Homeemployee from "./pages/employee/home";
import ListReservation from "./pages/employee/list-reservation";
import FloorMap from "./pages/employee/floor_map";
import AccountClient from "./pages/admin/accountManagement/account-client";
import Accountemployee from "./pages/admin/accountManagement/account-employee";
import HotelInfo from "./pages/admin/hotel-info";
import PageBookRoom from "./pages/client/booking-room";
import Invoice from "./pages/client/invoice";
import RevenueReport from "./pages/admin/report-generation/revenue";
import ServicesPage from "./pages/admin/home/Services";
import ReservationReport from "./pages/admin/report-generation/reservation-report";
import RoomClassReport from "./pages/admin/report-generation/room-class-report";
import EmployeeReport from "./pages/admin/report-generation/employee-report";

function App() {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(`;`).shift();
    return null;
  };
  const isAdmin = (token) => {
    try {
      const cookieToken = getCookie("token") ? getCookie("token") : null;
      const decodedToken = jwt_decode(cookieToken); // Giải mã token
      return decodedToken.role.roleName === 'Admin'; // Kiểm tra quyền admin
    } catch (error) {
      console.error("Error decoding token:", error);
      return false; // Nếu có lỗi, không phải admin
    }
  };
  const cookieTokens = getCookie("token") ? getCookie("token") : null;
  const ProtectedRoute = ({ element }) => {
    const tokens = getCookie("token") ? getCookie("token") : null;
    const isAdmins = isAdmin(tokens); // Kiểm tra quyền admin
    console.log('admin1: ' + isAdmins);
    if (!isAdmins) {
      return <Navigate to="/" />; // Nếu không phải admin, điều hướng về trang chính
    }
    return element; // Nếu là admin, trả về element
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" >
        <Route index element={<Navigate to="/client/home" />} />
        <Route path="/client">
            <Route path="home" element={<Home />} />
            <Route path="booking" element={<Booking />} />
            {/* <Route path="team" element={<Team />} /> */}
            <Route path="testimonial" element={<Testimonial />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="rooms" element={<RoomClient />} />
            <Route path="services" element={<Services />} />
            <Route path="profile" element={<Profile />} />
            <Route path="booking-room" element={<PageBookRoom />} />
            <Route path="invoice" element={<Invoice />} />
        </Route>
        <Route path="/employee">
          <Route path="home" element={<Homeemployee />} />
          <Route path="edit-room" element={<EditRoom />} />
          <Route path="list-booking-room" element={<ListReservation />} />
          <Route path="Floor/:id" element={<FloorMap />} />
        </Route>
        <Route path="/admin" >
          <Route path="home" element={<HomeAdmin />} />
          <Route path="room" element={<RoomAdmin />} />
          <Route path="booking-manager" element={<BookingManger />} />
          <Route path="room-pricing" element={<RoomPriceManager />} />
          <Route path="invoice-room" element={<InvoiceManagement />} />
          <Route path="account-client" element={<AccountClient />} />
          <Route path="account-employee" element={<Accountemployee />} />
          <Route path="hotel-info" element={<HotelInfo />} />
          <Route path="revenue" element={<RevenueReport />} />
          {/* <Route path="service-room-management" element={<ServiceRoom />} /> */}
          <Route path="service" element={<ServicesPage />} />
          <Route path="reservation-report" element={<ReservationReport />} />
          <Route path="room-class-report" element={<RoomClassReport />} />
          <Route path="employee-report" element={<EmployeeReport />} />
        </Route>
          <Route path="/account" element={<Login />} />
    </Route >
    )
  );
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};
export default App;
