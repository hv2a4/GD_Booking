import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"; // Import file CSS tùy chỉnh

const FillterDateHome = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div className="d-flex justify-content-end me-4 mb-4">
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    isClearable
                    placeholderText="Chọn ngày bắt đầu"
                    className="date-filter-input"
                />
            </div>
            <div className="mx-3">
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    isClearable
                    placeholderText="Chọn ngày kết thúc"
                    className="date-filter-input"
                />
            </div>
        </div>
    );
};

export default FillterDateHome;
