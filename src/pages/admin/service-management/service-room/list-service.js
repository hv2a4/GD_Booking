import React from "react";
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CAvatar } from '@coreui/react';
import { Button, ButtonGroup } from "react-bootstrap";
import img from "../../../../assets/images/about-1.jpg";

const ListService = () => {
    return (
        <CTable responsive>
            <CTableHead>
                <CTableRow style={{borderBottom: "1px solid #ddd"}}>
                    <CTableHeaderCell style={{width: "5%",borderStyle: "none"}}>Ảnh</CTableHeaderCell>
                    <CTableHeaderCell style={{width: "10%",borderStyle: "none"}}>Mã dịch vụ</CTableHeaderCell>
                    <CTableHeaderCell style={{width: "25%",borderStyle: "none"}}>Tên dịch vụ</CTableHeaderCell>
                    <CTableHeaderCell style={{width: "15%",borderStyle: "none"}}>Giá</CTableHeaderCell>
                    <CTableHeaderCell style={{width: "25%",borderStyle: "none"}}>Loại dịch vụ</CTableHeaderCell>
                    <CTableHeaderCell style={{width: "15%",borderStyle: "none"}} className="text-center">Hành động</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow>
                    <CTableDataCell>
                        <CAvatar src={img} />
                    </CTableDataCell>
                    <CTableDataCell>0001</CTableDataCell>
                    <CTableDataCell>Trà đào</CTableDataCell>
                    <CTableDataCell>50.000 VNĐ</CTableDataCell>
                    <CTableDataCell>Đồ uống</CTableDataCell>
                    <CTableDataCell className="text-center">
                            <Button variant="primary" className="me-2">Sửa</Button>
                            <Button variant="danger">Xóa</Button>
                    </CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>
    )
}

export default ListService;
