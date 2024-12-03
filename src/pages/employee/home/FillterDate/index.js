import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"; // Import file CSS tùy chỉnh
const FillterDateHome = ({ onDatesChange }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const handleDateChange = (type, date) => {
        if (type === 'start') {
            setStartDate(date);
            onDatesChange(date, endDate); // Gọi callback với giá trị mới
        } else {
            setEndDate(date);
            onDatesChange(startDate, date); // Gọi callback với giá trị mới
        }
    };

    return (
        <div className="d-flex justify-content-end me-4 mb-4">
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => handleDateChange('start', date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    isClearable
                    placeholderText="Chọn ngày bắt đầu"
                    className="date-filter-input"
                />
            </div>
            {/* <div className="mx-3">
                <DatePicker
                    selected={endDate}
                    onChange={(date) => handleDateChange('end', date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    isClearable
                    placeholderText="Chọn ngày kết thúc"
                    className="date-filter-input"
                />
            </div> */}
        </div>
    );
};


export default FillterDateHome;
