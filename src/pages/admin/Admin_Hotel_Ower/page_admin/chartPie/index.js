import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts'; // Nhập các thành phần cần thiết từ thư viện Recharts
import '../../../../../assets/css/admin/css/dashboard.css'; // Nhập CSS cho thành phần

// Dữ liệu cho biểu đồ đầu tiên
const data1 = [
    { name: 'Tổng phòng', value: 400 },
    { name: 'Có khách', value: 300 },
];

// Dữ liệu cho biểu đồ thứ hai
const data2 = [
    { name: 'Đang dùng', value: 250 },
    { name: 'Phòng trống', value: 450 },
];

// Màu cho biểu đồ đầu tiên
const COLORS1 = ['#D4EADD', '#279656'];

// Màu cho biểu đồ thứ hai
const COLORS2 = ['#FEE7CF', '#EA800E'];

// Thành phần DonutChart nhận dữ liệu và màu sắc từ props
const DonutChart = ({ data, colors }) => {
    const total = data.reduce((sum, entry) => sum + entry.value, 0); // Tính tổng giá trị của tất cả các phần trong dữ liệu

    return (
        <PieChart width={200} height={200}> {/* Khởi tạo biểu đồ với chiều rộng và chiều cao 200 */}
            <Pie
                data={data} // Dữ liệu cho biểu đồ
                cx={100} // Tọa độ x của tâm biểu đồ
                cy={70} // Tọa độ y của tâm biểu đồ
                innerRadius={60} // Bán kính trong của donut
                outerRadius={70} // Bán kính ngoài của donut
                fill="#8884d8" // Màu nền mặc định cho phần biểu đồ
                paddingAngle={0} // Độ lệch giữa các phần của biểu đồ
                dataKey="value" // Khóa dữ liệu
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} /> // Tạo mỗi phần của biểu đồ
                ))}
            </Pie>
            <Tooltip /> {/* Hiển thị tooltip khi hover lên phần của biểu đồ */}
            {/* Hiển thị phần trăm ở tâm của biểu đồ */}
            <text
                x={108} // Tọa độ x cho thẻ text
                y={80} // Tọa độ y cho thẻ text
                textAnchor="middle" // Căn giữa cho thẻ text
                dominantBaseline="middle" // Căn giữa cho thẻ text
                fontSize={16} // Kích thước font cho thẻ text
                fill="#000" // Màu sắc của chữ
            >
                {`${((data[0].value / total) * 100).toFixed(0)}%`} {/* Tính phần trăm cho phần đầu tiên */}
            </text>
        </PieChart>
    );
};

// Thành phần RoomPowerComponent để hiển thị các biểu đồ
const RoomPowerComponent = () => {
    return (
        <div className="container-fluid mt-4"> {/* Container cho toàn bộ thành phần */}
            <div className="card"> {/* Card để chứa nội dung */}
                <div className="card-body">
                    <h5 className="card-title text-start">Công suất phòng hiện tại</h5> {/* Tiêu đề cho card */}
                    <div className="row mt-4 align-items-center"> {/* Dùng để sắp xếp các biểu đồ */}
                        <div className="col-md-6 d-flex flex-column align-items-center mb-3"> {/* Giảm margin-bottom */}
                            <DonutChart data={data1} colors={COLORS1} /> {/* Biểu đồ đầu tiên */}
                            <p style={{ fontSize: '14px', margin: '2px 0' }}>4/12</p> {/* Giảm khoảng cách */}
                            <p style={{ fontSize: '14px', margin: '2px 0' }}>Đang có khách</p>
                        </div>
                        <div className="col-md-5 d-flex flex-column align-items-center mb-3"> {/* Giảm margin-bottom */}
                            <DonutChart data={data2} colors={COLORS2} /> {/* Biểu đồ thứ hai */}
                            <p style={{ fontSize: '14px', margin: '2px 2px' }}>8/12</p> {/* Giảm khoảng cách */}
                            <p style={{ fontSize: '14px', margin: '2px 2px' }}>Đang trống</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomPowerComponent; // Xuất thành phần để sử dụng ở nơi khác
