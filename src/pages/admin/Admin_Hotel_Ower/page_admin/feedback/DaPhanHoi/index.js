import React, { useState, useEffect, useCallback } from "react";
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { request } from "../../../../../../config/configApi";
import { create } from "@mui/material/styles/createTransitions";

const FeedbackDangCho = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const location = useLocation();


    useEffect(() => {
        const fetchFeedbacks = async () => {
            const response = await request({
                method: "GET",
                path: "/api/feedback/getAllDPH",
                token: Cookies.get('token'), // Thay thế bằng token nếu cần
            });

            if (response && response.length > 0) {
                // Xử lý dữ liệu trước khi set vào state
                const processedFeedbacks = response.map(item => {
                    // Chuyển đổi item[2] thành đối tượng Date và định dạng lại ngày
                    const date = new Date(item[2]);
                    const formattedDate = date.toLocaleString("vi-VN", {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                    });
                
                    return {
                        id: item[0],
                        stars: item[1],
                        createAt: formattedDate,  // Cập nhật ngày đã xử lý
                        content: item[3],
                        accountName: item[4],
                        // Thêm các trường khác nếu cần
                    };
                });                
                
                // Cập nhật feedbacks vào state
                setFeedbacks(processedFeedbacks);
            }
        };

        fetchFeedbacks();
    }, [location]);

    return (
        <div className="table-responsive mt-3">
            <table className="table table-striped table-hover" style={{ cursor: 'pointer' }}>
                <thead className="table-info">
                    <tr>
                        <th>STT</th>
                        <th>Tên khách hàng </th>
                        <th>Sao đánh giá </th>
                        <th>Ngày tạo </th>
                        <th>Lời đánh giá</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback, index) => (
                        <React.Fragment>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{feedback.accountName}</td>
                                <td>{feedback.stars} sao</td>
                                <td>{feedback.createAt}</td>
                                <td>{feedback.content}</td>
                                <td className="text-end">

                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeedbackDangCho;