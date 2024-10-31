import React, {useState} from "react";
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
const ModalNhanPhong = ({ onClose }) => {
    return (
        <>
            <Modal className="modal-dialog-centered modal-customer modal-noneBg" show="true" onHide={onClose} centered>
                <div className="modal-content modal-fill" style={{width: "auto"}}>
                    <Modal.Header closeButton>
                        <Modal.Title id="exampleModalLabel">Phòng nhận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="table-responsive">
                            <table
                                className="table table-striped table-borderless table-fill">
                                <thead>
                                    <tr>
                                        <td><input type="checkbox" /></td>
                                        <td>Hạng phòng</td>
                                        <td>Phòng</td>
                                        <td>Trạng thái phòng</td>
                                        <td>Nhận</td>
                                        <td>Trả</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center">
                                        <td>
                                            <input type="checkbox" />
                                        </td>
                                        <td>Phòng đơn 2 giường</td>
                                        <td>P.309</td>
                                        <td>Sạch</td>
                                        <td><input type="datetime-local" value="2024-09-20T01:29" /></td>
                                        <td><input type="datetime-local" value="2024-09-21T02:29" /></td>
                                    </tr>
                                    <tr className="text-center">
                                        <td>
                                            <input type="checkbox" />
                                        </td>
                                        <td>Phòng đơn 2 giường</td>
                                        <td>P.302</td>
                                        <td>Sạch</td>
                                        <td><input type="datetime-local" value="2024-09-20T01:29" /></td>
                                        <td><input type="datetime-local" value="2024-09-21T02:29" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link to="/staff/edit-room">
                        <button className="btn btn-outline-primary">Sửa đặt phòng</button>
                        </Link>
                        <button className="btn btn-primary">Xác nhận</button>
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    )
}

export default ModalNhanPhong;