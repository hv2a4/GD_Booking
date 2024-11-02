import React, { useState } from "react";
import TTNhanPhong from "../modalTTNP";
import { Modal } from 'react-bootstrap';
const XacNhan = () => {
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const handleCloseModal1 = () => setShowModal1(false);
    const handleShowModal1 = () => setShowModal1(true);

    const handleCloseModal2 = () => setShowModal2(false);
    const handleShowModal2 = () => {
        setShowModal1(false)
        setShowModal2(true);
    }

    return (
        <>
            <button type="button" className="btn-tt" onClick={handleShowModal1}
                style={{
                    fontSize: '12px',
                    width: '127px',
                    height: '36px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#02963d'
                }}>Xác nhận</button>

            <Modal show={showModal1} className="modal-noneBg" onHide={handleCloseModal1} backdrop="static" keyboard={false}>
                <div className="modal-content modal-fill">
                    <Modal.Header closeButton>
                        <h5 className="modal-title" id="exampleModalLabel">Xác nhận đặt phòng</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-table-data">
                            <div className="d-flex" style={{ marginBottom: "50px" }}>
                                <div className="d-flex align-items-center">
                                    <i className="fa-regular fa-user"></i>
                                    <span className="text-orange font-bold"
                                        style={{ marginLeft: "10px" }}>e</span>
                                    <span className="ng-star-inserted"> - 092094892</span>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-striped table-borderless table-fill">
                                    <thead>
                                        <tr>
                                            <th><input type="checkbox" /></th>
                                            <th>Hạng phòng</th>
                                            <th>Phòng</th>
                                            <th>Nhận</th>
                                            <th>Trả</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">
                                                <input type="checkbox" />
                                            </td>
                                            <td>Phòng đơn 2 giường</td>
                                            <td>
                                                <select className="form-select"
                                                    style={{ lineHeight: "1" }}
                                                    aria-label="Default select example">
                                                    <option></option>
                                                    <option value="1">P.309</option>
                                                    <option value="2">P.302</option>
                                                    <option value="3">P.310</option>
                                                </select>
                                            </td>
                                            <td><input type="datetime-local" value="2024-09-20T01:29" /></td>
                                            <td><input type="datetime-local" value="2024-09-21T02:29" /></td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                <input type="checkbox" />
                                            </td>
                                            <td>Phòng đơn 2 giường</td>
                                            <td>
                                                <select className="form-select"
                                                    style={{ lineHeight: "1" }}
                                                    aria-label="Default select example">
                                                    <option></option>
                                                    <option value="1">P.309</option>
                                                    <option value="2">P.302</option>
                                                    <option value="3">P.310</option>
                                                </select>
                                            </td>
                                            <td><input type="datetime-local" value="2024-09-20T01:29" /></td>
                                            <td><input type="datetime-local" value="2024-09-21T02:29" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-primary" onClick={handleShowModal2}>
                            Xác nhận
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>

            <Modal show={showModal2} onHide={handleCloseModal2} backdrop="static" keyboard={false}>
                <TTNhanPhong />
            </Modal>
        </>
    );
};

export default XacNhan;
