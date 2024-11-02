import React from 'react';

// Hàm kiểm tra xem đặt phòng có nằm trong khoảng thời gian của 7 ngày tới không
const isWithinNextWeek = (startDate, endDate) => {
    const now = new Date();
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);

    const start = new Date(startDate);
    const end = new Date(endDate);

    return (start >= now && start <= nextWeek) || (end >= now && end <= nextWeek) || (start < now && end > nextWeek);
};

// Hàm tính toán vị trí và chiều rộng
function calculatePosition(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    // Xác định ngày đầu tuần (thứ Hai) để tính toán
    const now = new Date();
    const firstDayOfWeek = new Date(now);
    firstDayOfWeek.setDate(now.getDate() - now.getDay() + 1); // Thứ Hai là ngày đầu tiên của tuần

    // Tính vị trí (trong %)
    const daysFromStart = (startDate - firstDayOfWeek) / (1000 * 60 * 60 * 24); // Số ngày kể từ đầu tuần
    const position = (daysFromStart / 7) * 100 + (startDate.getHours() / 24) * (100 / 7);

    // Tính chiều rộng (trong %)
    const durationInHours = (endDate - startDate) / (1000 * 60 * 60);
    const width = (durationInHours / (24 * 7)) * 100; // Chia cho tổng số giờ trong 7 ngày

    return { position, width };
}



function RoomSchedule({ room }) {
    return (
        <div className="room-schedule">
            <div className="room-name">
                {room.name}
            </div>
            <div className="reservations">
                {room.reservations.map((reservation, index) => {
                    // Kiểm tra nếu đặt phòng nằm trong khoảng thời gian của 7 ngày tới
                    if (!isWithinNextWeek(reservation.start, reservation.end)) {
                        return null; // Không hiển thị nếu không thỏa mãn
                    }

                    const { position, width } = calculatePosition(reservation.start, reservation.end);
                    // Áp dụng lớp CSS theo trạng thái
                    const reservationClass = `reservation ${reservation.status}`;

                    // Lấy giờ nhận phòng và giờ trả phòng
                    const checkInTime = new Date(reservation.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const checkOutTime = new Date(reservation.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                        <div
                            key={index}
                            className={reservationClass}
                            style={{
                                left: `${position}%`,
                                width: `${width}%`,
                                maxWidth: '100%',
                                position: 'absolute', // Để có thể căn chỉnh đúng vị trí
                            }}
                        >
                            Khách lẻ {checkInTime} - {checkOutTime}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RoomSchedule;
