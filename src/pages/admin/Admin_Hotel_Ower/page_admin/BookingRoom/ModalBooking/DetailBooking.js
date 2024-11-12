import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getByIdBooking } from '../../../../../../services/admin/crudServiceReservations';
import { format, isValid } from 'date-fns';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';

function DetailRow({ label, value }) {
    return (
        <div className="detail-row">
            <strong>{label}:</strong>
            <span>{value}</span>
        </div>
    );
}

function DetailBooking({ object }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [dataDetailBooking, setDataDetailBooking] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const closeModal = () => {
        setModalVisible(false);
    };

    const openModal = () => {
        setModalVisible(true);
        handleDetailBooking();
    };

    useEffect(() => {
        handleDetailBooking();
    }, [object.bookingId]);

    const handleDetailBooking = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getByIdBooking(object.bookingId);
            setDataDetailBooking(res);
        } catch (err) {
            setError('Lỗi khi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrencyVND = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const getFormattedDate = (date) => {
        const parsedDate = new Date(date);
        return isValid(parsedDate) ? format(parsedDate, 'yyyy-MM-dd HH:mm:ss') : 'Chưa có thông tin';
    };

    const bookingDetails = {
        customerName: dataDetailBooking.fullname || 'Chưa có thông tin',
        phone: dataDetailBooking.phone || 'Chưa có thông tin',
        email: dataDetailBooking.email || 'Chưa có thông tin',
        bookingId: dataDetailBooking.bookingId || 'Chưa có thông tin',
        checkIn: getFormattedDate(dataDetailBooking.startAt),
        checkOut: getFormattedDate(dataDetailBooking.endAt),
        guestCount: dataDetailBooking.maxGuests || 'Chưa có thông tin',
        roomType: dataDetailBooking.typeRoomName || 'Chưa có thông tin',
        roomNumber: dataDetailBooking.roomName || 'Chưa có thông tin',
        roomRate: formatCurrencyVND(dataDetailBooking.price || 0),
        totalAmount: formatCurrencyVND(dataDetailBooking.totalAmount || 0),
        status: dataDetailBooking.statusBookingName || 'Chưa có thông tin',
        paymentMethod: dataDetailBooking.methodPaymentName || 'Chưa có thông tin',
        paymentStatus: dataDetailBooking.statusPayment ? "Đã thanh toán" : "Chưa thanh toán",
    };

    const labelMap = {
        customerName: 'Tên khách hàng',
        phone: 'Số điện thoại',
        email: 'Email',
        bookingId: 'Mã đặt phòng',
        checkIn: 'Ngày nhận phòng',
        checkOut: 'Ngày trả phòng',
        guestCount: 'Số khách',
        roomType: 'Loại phòng',
        roomNumber: 'Số phòng',
        roomRate: 'Giá phòng',
        totalAmount: 'Tổng tiền',
        status: 'Trạng thái',
        paymentMethod: 'Phương thức thanh toán',
        paymentStatus: 'Trạng thái thanh toán',
    };
    return (
        <>
            <Button variant="primary" size="sm" onClick={openModal}>
                Chi tiết
            </Button>
            <Modal show={isModalVisible} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="w-100 text-center">
                        <h2>Chi Tiết Đặt Phòng</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading && <p>Đang tải dữ liệu...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {!loading && !error && (
                        Object.keys(bookingDetails).length === 0 || Object.values(bookingDetails).every(value => !value) ? (
                            <p>Chưa có đơn đã đặt</p>
                        ) : (
                            <div className="modal-detail">
                                {Object.entries(bookingDetails).map(([key, value]) => (
                                    <DetailRow key={key} label={labelMap[key]} value={value} />
                                ))}
                            </div>
                        )
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Đóng
                    </Button> 
                </Modal.Footer>
            </Modal>

            <style>{`
                .modal-detail {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;
                    border-bottom: 1px solid #f0f0f0;
                }
                .detail-row:last-child {
                    border-bottom: none;
                }
                .detail-row strong {
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}

export default DetailBooking;
