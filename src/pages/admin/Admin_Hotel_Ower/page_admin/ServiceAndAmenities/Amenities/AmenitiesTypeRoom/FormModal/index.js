import React, { useState, useRef, useEffect } from 'react'
import { Modal, Button, Card, Row, Col, Form } from 'react-bootstrap'
import { FaClipboardCheck, FaSave } from 'react-icons/fa'
import { ImCancelCircle } from 'react-icons/im'
import { GiCancel } from 'react-icons/gi'
import { useForm } from 'react-hook-form'
import { Cookies } from "react-cookie";
import axios from 'axios'

const AmenitiesTypeRoomFormModal = ({
  idAmenitiesTypeRoom,
  amenitiesTypeRoomName,
  refreshTable,
}) => {
  const [show, setShow] = useState(false)
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm() // Khởi tạo useForm
  const [formEdit, setFormEdit] = useState({
    id: '',
    amenitiesTypeRoomName: '',
  })
  const [data, setData] = useState([])

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const cookie = new Cookies();
  const token = cookie.get("token");

  // const axiosConfig = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/amenities-type-room/getById/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` } // Thêm token vào header
        }
      )
      setFormEdit(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Khi idAmenitiesTypeRoom có giá trị, gọi handleEdit để tải dữ liệu
  useEffect(() => {
    if (idAmenitiesTypeRoom) {
      handleEdit(idAmenitiesTypeRoom) // Gọi handleEdit nếu có id
    } else {
      reset({ amenitiesTypeRoomName: ''}) // Reset form nếu không có id
    }
  }, [idAmenitiesTypeRoom, reset])


  const validateForm = async (formData) => {
    const {amenitiesTypeRoomName} = formData

    if (!amenitiesTypeRoomName.trim()) {
      alert('Tên tiện nghi loại phòng không được để trống!')
      return false
    }

    try {
      const res = await axios.get(`http://localhost:8080/api/amenities-type-room/check-exist?name=${amenitiesTypeRoomName}`, {
        headers: { Authorization: `Bearer ${token}` } // Thêm token vào header
      })
      if (res.data.exists) {
        alert('Tên tiện nghi loại phòng đã tồn tại!')
        return false
      }
    } catch (error) {
      console.error('Lỗi kiểm tra tên:', error)
      alert('Đã xảy ra lỗi khi kiểm tra tên!')
      return false
    }

    return true
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const { amenitiesTypeRoomName} = formEdit

    const isValid = await validateForm(formEdit)
    if (!isValid) return

    if (idAmenitiesTypeRoom) {
      try {
        const res = await axios.put(
          `http://localhost:8080/api/amenities-type-room/update/${idAmenitiesTypeRoom}`,
          { amenitiesTypeRoomName },
          { headers: { Authorization: `Bearer ${token}` } } // Thêm token vào header
        )
        console.log('Cập nhật thành công', res)
        handleClose()
        alert('Đã cập nhật thành công!')
        refreshTable(true)
      } catch (error) {
        console.log(error)
        alert('Đã xảy ra lỗi khi cập nhật!')
      }
    } else {
      try {
        const res = await axios.post(
          'http://localhost:8080/api/amenities-type-room/add',
          { amenitiesTypeRoomName },
          { headers: { Authorization: `Bearer ${token}` } } // Thêm token vào header
        )
        console.log('Thêm mới thành công', res)
        handleClose()
        alert('Đã thêm thành công!')
        window.location.reload()
        resetForm()
      } catch (error) {
        console.log(error)
        alert('Đã xảy ra lỗi khi thêm!')
      }
    }
  }

  //Hàm xử lí thay đổi dữ liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormEdit((pre) => ({
      ...pre,
      [name]: value,
    }))
  }

  //Hàm resetForm
  const resetForm = () => {
    setFormEdit({
      id: '',
      amenitiesTypeRoomName: '',
      icon: '',
    })
  }

  return (
    <>
      {(() => {
        if (!idAmenitiesTypeRoom) {
          return (
            <small
              style={{ fontSize: '13px', cursor: 'pointer' }}
              id="amenitie-type-room-form"
              onClick={handleShow}
            >
              Thêm
            </small>
          )
        }
        // else {
        //     return (
        //         <small className="btn btn-success me-2" style={{ fontSize: '13px', cursor: 'pointer' }} onClick={handleShow}>
        //             <FaClipboardCheck />&nbsp;Cập nhật
        //         </small>
        //     );
        // }
      })()}

      <small
        className={idAmenitiesTypeRoom ? 'btn btn-success me-2' : ''}
        style={{ fontSize: '13px', cursor: 'pointer' }}
        onClick={handleShow}
      >
        {idAmenitiesTypeRoom ? (
          <>
            <FaClipboardCheck />
            &nbsp;Cập nhật
          </>
        ) : (
          'Thêm'
        )}
      </small>

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-wides"
        style={{ background: 'rgba(0, 0, 0, 0.7)' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>
              {idAmenitiesTypeRoom ? 'Cập nhật' : 'Thêm'} Tiện Nghi Loại Phòng
            </h5>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Card>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <Form onSubmit={onSubmit}>
                    {' '}
                    {/* Thêm onSubmit vào form */}
                    {/* <Form.Group
                      as={Row}
                      controlId="idAmenitiesTypeRoom"
                      className="mt-3"
                    >
                      <Form.Label column sm={4}>
                        Mã tiện nghi loại phòng
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          placeholder="Mã tiện nghi loại phòng tự động"
                          disabled
                          name="id"
                          value={formEdit.id}
                        />
                      </Col>
                    </Form.Group> */}
                    <Form.Group
                      as={Row}
                      controlId="amenitiesTypeRoomName"
                      className="mt-3"
                    >
                      <Form.Label column sm={4}>
                        Tên tiện nghi loại phòng
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          placeholder="Nhập tên tiện nghi loại phòng..."
                          name="amenitiesTypeRoomName"
                          value={formEdit.amenitiesTypeRoomName}
                          onChange={handleInputChange}
                          // {...register('amenitiesTypeRoomName', { required: true })}
                        />
                        {errors.amenitiesTypeRoomName && (
                          <p style={{ color: 'red' }}>{errors.amenitiesTypeRoomName.message}</p>
                        )}
                      </Col>
                    </Form.Group>
                    {/* <Form.Group as={Row} controlId="icon" className="mt-3">
                      <Form.Label column sm={4}>
                        Icon
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          placeholder="Nhập icon..."
                          name="icon"
                          value={formEdit.icon}
                          onChange={handleInputChange}
                          //  {...register('icon', { required: true })}
                        />
                      </Col>
                    </Form.Group> */}
                    {/* Nút Lưu ẩn, sẽ được kích hoạt khi nhấn vào nút Lưu trong footer */}
                    <Button
                      variant="success"
                      type="submit"
                      className="mt-3 d-none"
                      id="btnsubmit"
                    >
                      <FaSave size={14} />
                      &nbsp;Lưu
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>

        <Modal.Footer>
          <Row className="mt-3 justify-content-end">
            <Col sm="auto">
              <Button
                variant="success"
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  const btnSubmit = document.getElementById('btnsubmit')
                  if (btnSubmit) {
                    btnSubmit.click() // Kích hoạt submit form khi nhấn Lưu
                  }
                }}
              >
                <FaSave size={14} />
                &nbsp;Lưu
              </Button>
            </Col>
            <Col sm="auto">
              <Button variant="dark" onClick={handleClose}>
                <ImCancelCircle size={14} />
                &nbsp;Bỏ qua
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const DeleteAmenitiesTypeRoomModal = ({
  id,
  amenitiesTypeRoomName,
  refreshTable,
}) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const cookie = new Cookies();
  const token = cookie.get("token");

  const handleDelete = async () => {
    if (!id) {
      alert("Không thể thực hiện xóa vì không có ID.");
      return;
    }
    
    try {
      await axios.delete(
        `http://localhost:8080/api/amenities-type-room/delete/${id}`,
        { headers: { Authorization: `Bearer ${cookie.get("token")}` } } // Thêm token vào header
      )
      console.log('Xóa thành công')
      refreshTable(true) // Gọi lại hàm refresh table sau khi xóa thành công
      alert('Đã xóa thành công!') // Hiển thị thông báo xóa thành công
      handleClose() // Đóng modal sau khi xóa thành công
    } catch (error) {
      console.error('Đã xảy ra lỗi khi xóa:', error)
      alert('Đã xảy ra lỗi khi xóa!') // Thông báo lỗi nếu có
    }
  }

  return (
    <>
      <button className="btn btn-danger" onClick={handleShow}>
        <GiCancel />
        &nbsp;Xóa
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ border: 'none' }}>
          <Modal.Title>Xóa tiện nghi loại phòng </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa tiện nghi loại phòng{' '}
          <strong>{amenitiesTypeRoomName}</strong> này?
        </Modal.Body>
        <Modal.Footer style={{ border: 'none' }}>
          <Button variant="danger" onClick={handleDelete}>
            Đồng ý
          </Button>
          <Button
            variant="dark"
            onClick={handleClose}
            style={{
              background: '#898C8D', // Custom background color
              border: 'none',
            }}
          >
            Bỏ qua
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export { AmenitiesTypeRoomFormModal, DeleteAmenitiesTypeRoomModal }
