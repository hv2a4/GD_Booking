import React from 'react';
import { CChartBar } from '@coreui/react-chartjs';
import "../revenue/style.css";

const ReservationChart = ({ booking }) => {
  // Lấy ngày làm nhãn cột
  const labels = booking.map(row => row.bookingDate);

  // Tính tổng số phòng đã đặt trong mỗi ngày
  const roomsBookedData = booking.map(row => parseInt(row.totalRoomsBooked));

  return (
    <div style={{
        maxWidth: "900px",
        margin: '20px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        border: '2px solid #ddd',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
        borderRadius: '4px',
        backgroundColor: '#fff',
    }}>
      <CChartBar
        data={{
          labels: labels, // Ngày làm nhãn
          datasets: [
            {
              label: 'Số phòng đã đặt',
              backgroundColor: '#42A5F5', // Màu nền
              data: roomsBookedData, // Dữ liệu số phòng đã đặt
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value.toLocaleString('vi-VN'); // Định dạng số theo kiểu Việt Nam
                },
              },
            },
          },
        }}
      />
    </div>
  );
};


export default ReservationChart;
