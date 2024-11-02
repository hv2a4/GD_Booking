import React from 'react';
import { CChartBar } from '@coreui/react-chartjs';
import "./style.css";

const RevenueChart = () => {
  const rows = [
    {
      date: '01/11/2024',
      revenue: '52,920,000',
      refund: '0',
      netRevenue: '52,920,000',
    },
    {
      date: '02/11/2024',
      revenue: '35,000,000',
      refund: '0',
      netRevenue: '35,000,000',
    },
    {
      date: '02/11/2024',
      revenue: '35,000,000',
      refund: '0',
      netRevenue: '35,000,000',
    },
    {
      date: '02/11/2024',
      revenue: '35,000,000',
      refund: '0',
      netRevenue: '35,000,000',
    },
    {
      date: '02/11/2024',
      revenue: '35,000,000',
      refund: '0',
      netRevenue: '35,000,000',
    },
  ];
/*Doanh thu netRevenue = tổng doanh thu - chiết khấu - giảm giá - hoàn trả*/
  const labels = rows.map(row => row.date); // Lấy ngày làm nhãn cột
  const revenueData = rows.map(row => parseInt(row.revenue.replace(/,/g, ''))); // Dữ liệu doanh thu
  const netRevenueData = rows.map(row => parseInt(row.netRevenue.replace(/,/g, ''))); // Dữ liệu doanh thu ròng

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
            {
              label: 'Doanh thu ròng',
              backgroundColor: '#66BB6A',
              data: netRevenueData,
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
