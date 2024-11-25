import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import { addCustomer } from '../../../../services/employee/customer';
import uploadImageToFirebase from '../../../../config/fireBase';
import ImageUploader from './fileImage';
import Alert from '../../../../config/alert';

const InsertCustomer = ({ onClose, item, rooms, bookingRoom }) => {
    const { register, handleSubmit, control, setValue } = useForm();
    const [images1, setImages1] = useState(null);
    const [images2, setImages2] = useState(null);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (item && item.customerInformationDto?.birthday) {
            setValue("ngaysinh", new Date(item.customerInformationDto.birthday));
            setValue("phong", item.bookingRoomDto.room.id);
            setValue("hovaten", item.customerInformationDto.fullname);
            setValue("gioitinh", item.customerInformationDto.gender);
            setValue("sodienthoai", item.customerInformationDto.phone);
            setValue("lydoluutru", item.customerInformationDto.cccd);
            setImages1(item.customerInformationDto.imgFirstCard);
            setImages2(item.customerInformationDto.imgLastCard)
        }
        setTimeout(() => setAlert(null), 500);
    }, [item, setValue, alert]);

    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const handleDelete = (setImage) => {
        setImage(null);
    };
    const validateForm = (data, images1, images2) => {
        const errors = {};
        if (!data.hovaten) errors.hovaten = "Họ và tên không được để trống.";
        if (!data.sodienthoai) errors.sodienthoai = "Số điện thoại không được để trống.";
        if (!data.gioitinh) errors.gioitinh = "Vui lòng chọn giới tính.";
        if (!data.ngaysinh) errors.ngaysinh = "Ngày sinh không được để trống.";
        if (!images1) errors.images1 = "Vui lòng tải lên ảnh mặt trước CCCD.";
        if (!images2) errors.images2 = "Vui lòng tải lên ảnh mặt sau CCCD.";

        return errors;
    };


    const onSubmit = async (data) => {
        // Validate dữ liệu đầu vào
        
        if (!data.sodienthoai === 10) {
            setAlert({ type: "error", title: "Số điện thoại không đúng đinh dạng"});
            return;
        }

        const errors = validateForm(data, images1, images2);
        if (Object.keys(errors).length > 0) {
            setAlert({ type: "error", title: "Vui lòng kiểm tra lại thông tin.", details: errors });
            return;
        }
        // Xử lý nếu dữ liệu hợp lệ
        let id = [];
        if (!item) {
            id = bookingRoom.filter(d => data.phong.includes(d.room.id)).map(d => ({ id: d.id }));
        }
        const imgFirstCard = await uploadImageToFirebase(images1);
        const imgLastCard = await uploadImageToFirebase(images2);

        const newCustomer = {
            cccd: data.lydoluutru,
            fullname: data.hovaten,
            phone: data.sodienthoai,
            gender: data.gioitinh,
            birthday: data.ngaysinh.toISOString(),
            imgFirstCard,
            imgLastCard
        };
        console.log(newCustomer);
        

        try {
            const customerData = item ? "" : await addCustomer(newCustomer, id[0]?.id);
            if (customerData?.errors) {
                setAlert({ type: "error", title: "Đã xảy ra lỗi khi thêm khách hàng.", details: customerData.errors });
            } else {
                setAlert({ type: "success", title: "Thêm khách thành công!" });
            }
        } catch (error) {
            setAlert({ type: "error", title: "Lỗi khi thêm khách hàng.", details: error.message });
        }

        onClose();
    };



    return (
        <Modal
            show={true}
            className="modal-dialog-centered modal-customer modal-noneBg"
            onHide={onClose}
            keyboard={false}
            centered
        >
            <div className="modal-content modal-lg">
                <Modal.Header closeButton>
                    {alert && <Alert type={alert.type} title={alert.title} />}
                    <Modal.Title className="modal-title">Thông tin khách ở cùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Label htmlFor="phong">Phòng</Form.Label>
                                <Form.Select id="phong" {...register('phong')}>
                                    {rooms && rooms.length > 0 ? (
                                        rooms.map((room, index) => (
                                            <option key={index} value={room.id}>
                                                {room.roomName}
                                            </option>
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </Form.Select>
                            </Col>
                            <Col md={6}>
                                <Form.Label htmlFor="ngaysinh" className='d-block'>Ngày sinh</Form.Label>
                                <Controller
                                    name="ngaysinh"
                                    control={control}
                                    defaultValue={null} // Giá trị mặc định ban đầu
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            selected={field.value} // Đồng bộ giá trị
                                            onChange={(date) => field.onChange(date)} // Cập nhật giá trị
                                            className="custom-date-picker"
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Chọn ngày sinh"
                                            style={{ width: "371px" }}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Label htmlFor="hovaten">Họ và tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="hovaten"
                                    placeholder="Nhập họ và tên"
                                    {...register('hovaten')}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Giới tính</Form.Label>
                                <div className="d-flex flex-column flex-md-row">
                                    <Form.Check
                                        type="radio"
                                        label="Nam"
                                        id="gioitinh"
                                        value="true"
                                        onChange={() => setValue("gioitinh", true)} // Cập nhật giá trị boolean
                                        {...register("gioitinh")}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Nữ"
                                        id="gioitinh"
                                        value="false"
                                        onChange={() => setValue("gioitinh", false)}
                                        {...register("gioitinh")}
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Label htmlFor="sodienthoai">Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="sodienthoai"
                                    placeholder="Nhập số điện thoại"
                                    {...register('sodienthoai')}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label htmlFor="lydoluutru">Số CCCD</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="lydoluutru"
                                    placeholder="Nhập số căn cước"
                                    {...register('lydoluutru')}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <ImageUploader
                                    label="Mặt trước CCCD"
                                    image={images1}
                                    setImage={setImages1}
                                    onImageChange={(e) => handleImageChange(e, setImages1)}
                                />
                            </Col>
                            <Col md={6}>
                                <ImageUploader
                                    label="Mặt sau CCCD"
                                    image={images2}
                                    setImage={setImages2}
                                    onImageChange={(e) => handleImageChange(e, setImages2)}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        className="btn btn-success"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Lưu
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default InsertCustomer;
