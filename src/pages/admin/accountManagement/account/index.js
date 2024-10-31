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
import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Label } from "recharts";

const Account = () => {
    const [details, setDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 10;

    const cashierOptions = [
        { id: '1', name: 'client' },
        { id: '2', name: 'Staff' },
        { id: '3', name: 'Admin' }
    ]
    const handleCashierChange = (event) => {
        const selectedCashierId = event.target.value;
        // Bạn có thể sử dụng selectedCashierId để cập nhật trạng thái của hóa đơn hoặc thực hiện một hành động khác
        console.log('Thu ngân đã chọn:', selectedCashierId);
    };
    const items = [
        { id: 1, name: 'Samppa Nori', avatar: '1.jpg', registered: '2021/03/01', role: 'Member', status: 'Active' },
        { id: 2, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Staff', status: 'Banned' },
        { id: 3, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Staff', status: 'Banned' },
        { id: 4, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Staff', status: 'Banned' },
        { id: 5, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Staff', status: 'Banned' },
        { id: 6, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Staff', status: 'Banned' },
        { id: 7, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Staff', status: 'Banned' },
        { id: 8, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Staff', status: 'Banned' },
        { id: 9, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Staff', status: 'Banned' },
        { id: 10, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Staff', status: 'Banned' },
        { id: 11, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Staff', status: 'Banned' },
        { id: 12, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Staff', status: 'Banned' },
        { id: 13, name: 'Estavan Lykos', avatar: '2.jpg', registered: '2018/02/07', role: 'Staff', status: 'Banned' },
        // Thêm các mục khác ở đây
    ];

    const getBadge = (status) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Inactive': return 'secondary';
            case 'Pending': return 'warning';
            case 'Banned': return 'danger';
            default: return 'primary';
        }
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

    return (
        <div className="account-management">
            <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                className="mb-3 form-control"
                style={{width: "20%"}}
            />
            <CTable responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>Ảnh</CTableHeaderCell>
                        <CTableHeaderCell>Họ tên</CTableHeaderCell>
                        <CTableHeaderCell>Ngày sinh</CTableHeaderCell>
                        <CTableHeaderCell>Vai trò</CTableHeaderCell>
                        <CTableHeaderCell>Trạng thái</CTableHeaderCell>
                        <CTableHeaderCell>Hành động</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {paginatedItems.map((item) => (
                        <React.Fragment key={item.id}>
                            <CTableRow>
                                <CTableDataCell>
                                    <CAvatar src={`./../../images/avatars/${item.avatar}`} />
                                </CTableDataCell>
                                <CTableDataCell>{item.name}</CTableDataCell>
                                <CTableDataCell>{new Date(item.registered).toLocaleDateString('en-US')}</CTableDataCell>
                                <CTableDataCell>{item.role}</CTableDataCell>
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
                                            <Row className="mt-3">
                                                <Col xs={12} md={4}>
                                                    <div className="border-bottom-invoice">
                                                        <p>Mã nhân viên: <strong>{item.id}</strong></p>
                                                    </div>
                                                    <div className="border-bottom-invoice">
                                                        <p>Họ tên: <strong>Lê Minh Khôi</strong></p>
                                                    </div>
                                                    <div className="border-bottom-invoice">
                                                        <p>Tài khoản: <strong>mjkkhoi</strong></p>
                                                    </div>
                                                    <div className="border-bottom-invoice">
                                                        <p>Email: <strong>mjkkhoi1@gmail.com</strong></p>
                                                    </div>
                                                    <div className="border-bottom-invoice">
                                                        <p>Số điện thoại: <strong>0987887575</strong></p>
                                                    </div>
                                                </Col>
                                                <Col xs={12} md={4}>
                                                    <div className="form-check form-switch d-flex border-bottom-invoice ps-0 mb-3 mt-3">
                                                        <label className="form-check-label me-5">Trạng thái:</label>
                                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                                                    </div>
                                                    <div className="border-bottom-invoice d-flex align-items-center" style={{ marginTop: "-19px" }}>
                                                        <p className="mb-0 me-2">Vai trò: </p>
                                                        <Form.Select
                                                            aria-label="Chọn thu ngân"
                                                            style={{ width: 'auto', border: 'none', color: '#6B6B6B', marginTop: "21px" }}
                                                            onChange={handleCashierChange} // Gọi hàm khi có sự thay đổi
                                                        >
                                                            {cashierOptions.map((option) => ( // Sử dụng cashierOptions từ biến đã định nghĩa
                                                                <option key={option.id} value={option.id}>
                                                                    {option.name}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </div>
                                                    <div className="border-bottom-invoice d-flex">
                                                        <p>Giới tính:</p>
                                                        <div class="form-check form-check-inline mt-4 ms-2">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                                                <label class="form-check-label" for="inlineRadio1">Nam</label>
                                                        </div>
                                                        <div class="form-check form-check-inline mt-4">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                                <label class="form-check-label" for="inlineRadio2">Nữ</label>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="d-flex justify-content-end me-5">
                                                <CButton size="sm" color="info" className="mx-2">Cập nhật</CButton>
                                                <CButton size="sm" color="danger" className="ms-1">Delete</CButton>
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
