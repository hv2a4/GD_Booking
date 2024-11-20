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
  Testimonial,
} from "./pages/client/index";
import { Navigate } from 'react-router-dom';
import { jwtDecode as jwt_decode } from "jwt-decode";
import HomeAdmin from "./pages/admin/home";
import RoomAdmin from "./pages/admin/home/Room";
import RoomPriceManager from "./pages/admin/home/RoomPriceManager";
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
import AmenitiesPage from "./pages/admin/home/Amenities";
import Cookies from 'js-cookie';
import { Outlet } from "react-router-dom";

const App = () => {
  const getUserRole = () => {
    try {
      const cookieToken = Cookies.get("token") || null;
      if (cookieToken) {
        const decodedToken = jwt_decode(cookieToken);
        return decodedToken.role; // Return the roleName
      }
      return null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const ProtectedRoute = ({ element }) => {
    const token = Cookies.get("token") || null;
    const userRole = token ? getUserRole() : null;
    const path = window.location.pathname;
    let hasAccess = false;

    if (path.startsWith('/admin') || path.startsWith('/employee')) {
      hasAccess = userRole === 'HotelOwner' || (userRole === 'Staff' && path.startsWith('/employee'));
    }

    if (!hasAccess) {
      return <Navigate to="/" />;
    }

    return element;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" >
        <Route index element={<Navigate to="/client/home" />} />

        {/* Routes for Client */}
        <Route path="/client" >
          <Route path="home" element={<Home />} />
          <Route path="booking" element={<Booking />} />
          <Route path="testimonial" element={<Testimonial />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="rooms" element={<RoomClient />} />
          <Route path="services" element={<Services />} />
          <Route path="profile" element={<Profile />} />
          <Route path="booking-room" element={<PageBookRoom />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Routes for Employee */}
        <Route path="/employee" element={<ProtectedRoute element={<Outlet />} />}>
          <Route path="home" element={<Homeemployee />} />
          <Route path="edit-room" element={<EditRoom />} />
          <Route path="list-booking-room" element={<ListReservation />} />
          <Route path="Floor/:id" element={<FloorMap />} />
        </Route>

        {/* Routes for Admin */}
        <Route path="/admin" element={<ProtectedRoute element={<Outlet />} />}>
          <Route path="home" element={<HomeAdmin />} />
          <Route path="room" element={<RoomAdmin />} />
          <Route path="booking-manager" element={<BookingManger />} />
          <Route path="room-pricing" element={<RoomPriceManager />} />
          <Route path="invoice-room" element={<InvoiceManagement />} />
          <Route path="account-client" element={<AccountClient />} />
          <Route path="account-employee" element={<Accountemployee />} />
          <Route path="hotel-info" element={<HotelInfo />} />
          <Route path="revenue" element={<RevenueReport />} />
          <Route path="service" element={<ServicesPage />} />
          <Route path="amenities" element={<AmenitiesPage />} />
          <Route path="reservation-report" element={<ReservationReport />} />
          <Route path="room-class-report" element={<RoomClassReport />} />
          <Route path="employee-report" element={<EmployeeReport />} />
        </Route>

        <Route path="account" element={<Login />} />
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;