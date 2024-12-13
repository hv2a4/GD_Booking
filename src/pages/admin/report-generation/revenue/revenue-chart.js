import React from 'react';
import { CChartBar } from '@coreui/react-chartjs';
import "./style.css";

const RevenueChart = ({ booking }) => {
/*Doanh thu netRevenue = tổng doanh thu - chiết khấu - giảm giá - hoàn trả*/
  const labels = booking.map(row => row.bookingDate); // Lấy ngày làm nhãn cột
  const revenueData = booking.map(row => parseInt(row.totalRevenue)); // Dữ liệu doanh thu

  return (
    <div style={{
        maxWidth: '900px',
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
          labels: labels,
          datasets: [
            {
              label: 'Doanh thu',
              backgroundColor: '#42A5F5',
              data: revenueData,
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
                  return value.toLocaleString('vi-VN'); // Định dạng số thành kiểu Việt Nam
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default RevenueChart;
