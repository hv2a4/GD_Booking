import {
    CAvatar,
    CBadge,
    CButton,
    CCardBody,
    CCollapse,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import CustomerInformation from "./customer-information";
import BookingHistory from "./booking-history";
import { getDataFromAPI } from "../../../../../services/ServiceAPI/Authorization";

const Account = () => {
    const [details, setDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activePage, setActivePage] = useState(1);
    const [currentTab, setCurrentTab] = useState('info');
    const itemsPerPage = 10;
    const [dataUser, setDataUser] = useState([]);
    const items = [
        { id: 1, name: 'Samppa Noriabc', avatar: '1.jpg', registered: '2021/03/01', role: 'Khách hàng', status: 'Hoạt động' },
        { id: 2, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Khách hàng', status: 'Khóa' },
        { id: 3, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Khách hàng', status: 'Khóa' },
        { id: 4, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Khách hàng', status: 'Khóa' },
        { id: 5, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Khách hàng', status: 'Khóa' },
        { id: 6, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Khách hàng', status: 'Khóa' },
        { id: 7, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Khách hàng', status: 'Khóa' },
        { id: 8, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Khách hàng', status: 'Khóa' },
        { id: 9, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Khách hàng', status: 'Khóa' },
        { id: 10, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Khách hàng', status: 'Khóa' },
        { id: 11, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Khách hàng', status: 'Khóa' },
        { id: 12, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Khách hàng', status: 'Khóa' },
        { id: 13, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Khách hàng', status: 'Khóa' },

    ];

    const getBadge = (status) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Inactive': return 'secondary';
            case 'Pending': return 'warning';
            case 'Khóa': return 'danger';
            default: return 'primary';
        }
    };
    // Lấy dữ liệu khách hàng từ API
    const getData = async () => {
        const response = await getDataFromAPI('/api/account/getAll');
        const filteredData = response.filter(user => user.roleDto.roleName === "Customer");
        setDataUser(filteredData);
    };
    const toggleDetails = (index) => {
        const position = details.indexOf(index);
        let newDetails = details.slice();
        if (position !== -1) {
            newDetails.splice(position, 1);
        } else {
            newDetails = [...details, index];
        }
        setDetails(newDetails);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedItems = filteredItems.slice(
        (activePage - 1) * itemsPerPage,
        activePage * itemsPerPage
    );

    // Reset page number when search term changes
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setActivePage(1);
    };
    
    useEffect(()=> {
        getData()
    },[])

    return (
        <div className="account-client">
            <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                className="mb-3 form-control"
                style={{ width: "20%" }}
            />
            <CTable responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>Ảnh</CTableHeaderCell>
                        <CTableHeaderCell>Họ tên</CTableHeaderCell>
                        <CTableHeaderCell>Email</CTableHeaderCell>
                        <CTableHeaderCell>Vai trò</CTableHeaderCell>
                        <CTableHeaderCell>Trạng thái</CTableHeaderCell>
                        <CTableHeaderCell>Hành động</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {dataUser.map((item) => (
                        <React.Fragment key={item.id}>
                            <CTableRow>
                                <CTableDataCell>
                                    <CAvatar src={`./../../images/avatars/${item.avatar}`} />
                                </CTableDataCell>
                                <CTableDataCell>{item.fullname}</CTableDataCell>
                                <CTableDataCell>{item.email}</CTableDataCell>
                                <CTableDataCell>{item.roleDto ? item.roleDto.roleName : 'N/A'}</CTableDataCell>
                                <CTableDataCell>
                                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CButton
                                        color="primary"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toggleDetails(item.id)}
                                    >
                                        {details.includes(item.id) ? 'Hide' : 'Show'}
                                    </CButton>
                                </CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell colSpan="6">
                                    <CCollapse visible={details.includes(item.id)}>
                                        <CCardBody style={{ width: "auto" }}>
                                            <ul className="nav nav-tabs" role="tablist">
                                                <li className="nav-item">
                                                    <button className={`nav-link ${currentTab === 'info' ? 'active' : ''}`} onClick={() => setCurrentTab('info')}>
                                                        Thông tin
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button className={`nav-link ${currentTab === 'bookingHistory' ? 'active' : ''}`} onClick={() => setCurrentTab('bookingHistory')}>
                                                        Lịch sử đặt phòng
                                                    </button>
                                                </li>
                                            </ul>
                                            <div className="tab-content">
                                                {currentTab === "info" && (
                                                    <div className="tab-pane fade show active">
                                                        <CustomerInformation item={item} />
                                                    </div>
                                                )}
                                                {currentTab === "bookingHistory" && (
                                                    <div className="tab-pane fade show active">
                                                        <BookingHistory />
                                                    </div>
                                                )}
                                            </div>
                                        </CCardBody>
                                    </CCollapse>
                                </CTableDataCell>
                            </CTableRow>
                        </React.Fragment>
                    ))}
                </CTableBody>
            </CTable>
            <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
                <p>Page {activePage} of {Math.ceil(filteredItems.length / itemsPerPage)}</p>
                <div>
                    <CButton
                        disabled={activePage === 1}
                        onClick={() => setActivePage((prev) => prev - 1)}
                        className="btn-outline-primary"
                    >
                        Previous
                    </CButton>
                    <CButton
                        className="ms-2 btn-outline-secondary"
                        disabled={activePage === Math.ceil(filteredItems.length / itemsPerPage)}
                        onClick={() => setActivePage((prev) => prev + 1)}
                    >
                        Next
                    </CButton>
                </div>
            </div>
        </div>
    );
};

export default Account;
