import React, { useState, useEffect } from "react";
import CommonHeading from "../common/CommonHeading";
import { getAllServiceHotel } from "../../services/client/home";
import Alert from "../../config/alert";
import { FaCoffee, FaParking, FaTaxi, FaTshirt, FaWalking } from "react-icons/fa";

export default function Services() {
  const [services, setService] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    handleServiceHotel();
  }, []);
  const handleServiceHotel = async () => {
    try {
      const data = await getAllServiceHotel();
      if (data) {
        setService(data);
      } else {
        setAlert({ type: "error", title: "Lỗi không tải được dữ liệu" });
      }
    } catch (error) {
      setAlert({ type: "error", title: error });
    }
  }

  const getServiceIcon = (serviceName) => {
    switch (serviceName) {
      case "Giao Thức Ăn":
        return <FaCoffee />;
      case "Giặt Ủi":
        return <FaTshirt />;
      case "Tham Quan Có Hướng Dẫn":
        return <FaWalking />;
      case "Đỗ Xe":
        return <FaParking />;
      case "Dịch Vụ Xe Đưa Đón":
        return <FaTaxi />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="container-xxl py-5">
        {alert && <Alert type={alert.type} title={alert.title} />}
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <CommonHeading
              heading="Dịch vụ phòng của chúng tôi"
              title="Dịch vụ"
              subtitle="Khám phá"
            />
          </div>
          <div className="row g-4">
            {(services.length > 6 ? services.slice(0, 6) : services).map((item, index) => (
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <a className="service-item rounded text-orange" href="">
                  <div className="service-icon bg-transparent border rounded p-1">
                    <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                      {getServiceIcon(item?.serviceHotelName)}
                    </div>
                  </div>
                  <h5 className="mb-3">{item?.serviceHotelName}</h5>
                  <p className="text-body mb-0">{item?.hotel?.descriptions}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
