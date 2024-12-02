import React, { useState } from 'react';
import RoomSchedule from '../RoomSchedule';
import { Card } from 'react-bootstrap';

const data = [
  {
    floor: 2,
    rooms: [
      {
        id: 201,
        name: 'P.201',
        reservations: [
          { start: '2024-10-29T08:00', end: '2024-10-29T12:00', status: 'past' }
        ]
      },
      {
        id: 202,
        name: 'P.202',
        reservations: [
          { start: '2024-11-21T13:00', end: '2024-12-28T18:00', status: 'upcoming' }
        ]
      },
      // Các phòng khác của tầng 2
    ]
  },
  {
    floor: 3,
    rooms: [
      {
        id: 301,
        name: 'P.301',
        reservations: [
          { start: '2024-10-29T10:00', end: '2024-10-30T15:00', status: 'ongoing' }
        ]
      },
      {
        id: 302,
        name: 'P.302',
        reservations: [
          { start: '2024-11-01T09:00', end: '2024-11-02T12:00', status: 'past' }
        ]
      },
      // Các phòng khác của tầng 3
    ]
  },
  // Thêm dữ liệu các tầng khác nếu cần
];

const getDatesForNextWeek = (startDate) => {
  const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i); // Tính toán ngày
    const dayName = daysOfWeek[date.getDay()]; // Lấy tên ngày trong tuần
    const formattedDate = `${date.getDate()} ${dayName}`; // Định dạng ngày
    dates.push(formattedDate);
  }

  return dates;
};

const dates = getDatesForNextWeek(new Date()); // Lấy ngày bắt đầu từ ngày hôm nay

function ScheduleBoard() {
  const [expandedFloors, setExpandedFloors] = useState({});

  const toggleFloor = (floor) => {
    setExpandedFloors((prevState) => ({
      ...prevState,
      [floor]: !prevState[floor]
    }));
  };

  return (
    <Card className='p-2'>
      <div className="schedule-board">
        <div className="header">
          <div className="floor">Tầng</div>
          <div className="dates">
            {dates.map((date, index) => (
              <div className="date" key={index}>{date}</div>
            ))}
          </div>
        </div>

        {data.map((floorData) => (
          <div key={floorData.floor} className="floor-section">
            <div className="floor-header" onClick={() => toggleFloor(floorData.floor)}>
              <span className="toggle-icon">{expandedFloors[floorData.floor] ? '-' : '+'}</span>
              Tầng {floorData.floor}
            </div>

            {expandedFloors[floorData.floor] && (
              <div className="rooms">
                {floorData.rooms.map((room) => (
                  <RoomSchedule key={room.id} room={room} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ScheduleBoard;
