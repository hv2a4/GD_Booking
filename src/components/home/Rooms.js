import React, { useEffect, useState } from "react";
import CommonHeading from "../common/CommonHeading";
import { facility, roomItems } from "../data/Data";
import RoomDetailModal from "../../pages/client/Room/modal-room";
import { getTypeRoomTop3 } from "../../services/client/home";
import Alert from "../../config/alert";

export default function Rooms() {
  const [showModal, setShowModal] = useState(false);
  const [roomItem, setRoomItem] = useState({});
  const [typeRoom, setTypeRoom] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    handleTypeRoom();
  }, []);
  const handleRoomItem = (item) => {
    setShowModal(true);
    setRoomItem(item);
  }

  const handleTypeRoom = async () => {
    try {
      const data = await getTypeRoomTop3();
      if (data) {
        setTypeRoom(data);
      } else {
        setAlert({ type: "error", title: "Lỗi không tải được dữ liệu" });
      }
    } catch (error) {
      setAlert({ type: "error", title: error });
    }
  }

  return (
    <>
      <div className="container-xxl py-5">
        {alert && <Alert type={alert.type} title={alert.title} />}
        <div className="container">
          <CommonHeading
            heading="Phòng của chúng tôi"
            title="Phòng"
            subtitle="Khám phá"
          />
          <div className="row g-4">
            {typeRoom.map((item, key) => (
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <div className="room-item shadow rounded overflow-hidden">
                  <div className="position-relative">
                    <img className="img-fluid" src={item?.img} alt="img" />
                    <small className="position-absolute start-0 top-100 translate-middle-y bg-orange text-white rounded py-1 px-3 ms-4">
                      {item?.price}
                    </small>
                  </div>
                  <div className="p-4 mt-2">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">{item?.typeRoomName}</h5>
                      <div className="ps-2">Tiêu chuẩn {item?.guestLimit} người</div>
                    </div>
                    <div className="d-flex mb-3">
                      {facility.map((item, index) => (
                        <small className="border-end me-3 pe-3">
                          {item.icon}
                          {item.quantity} {item.facility}
                        </small>
                      ))}
                    </div>
                    <p className="text-body mb-3">{item.description}</p>
                    <div className="d-flex justify-content-between">
                      <a
                        className="btn btn-sm btn-primary rounded py-2 px-4"
                        onClick={() => handleRoomItem(item)}
                      >
                        {item.yellowbtn}
                      </a>
                      <a className="btn btn-sm btn-dark rounded py-2 px-4" href="">
                        {item.darkbtn}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <RoomDetailModal show={showModal} onClose={() => setShowModal(false)} room={roomItem} />
      </div>
    </>
  );
}
