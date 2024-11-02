import React, { useRef, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { ClipLoader } from "react-spinners"; // Import spinner từ react-spinners
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { imageDb } from './Config';  // Đồng bộ với file Config.js
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from "uuid";
import { useForm } from 'react-hook-form';

const MyProfile = () => {
    const [userData, setUserData] = useState(null);
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [gender, setGender] = useState(true);
    const token = Cookies.get("token") ? Cookies.get("token") : null;
    const fileInputRef = useRef(null);
    const [user, setUser] = useState({
        avatar: "", // Avatar URL or file name
    });
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [preview, setPreview] = useState("");
    const [img, setImg] = useState('');
    const [imgUrl, setImgUrl] = useState([]);
    const [updateImage, setUpdateImage] = useState(false);
    const navigate = useNavigate();
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Cập nhật img
        if (file) {
            setImg(file)
            const imageUrl = URL.createObjectURL(file); // Get a temporary URL for the selected image
            setPreview(imageUrl); // Set preview image
            setUser((prevUser) => ({
                ...prevUser,
            }));
        }
    };
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        clearErrors,
      } = useForm({
        mode: "onBlur", // Xác thực khi mất tiêu điểm
      });

    const handleLogin = async (event) => {
        event.preventDefault();
        const isValid = Object.keys(errors).length === 0; // Nếu không có lỗi, isValid sẽ là true

        if (!isValid) {
            return; // Nếu có lỗi, không làm gì cả và thoát khỏi hàm
        }

        setLoading(true); // Bắt đầu loading
        let imagePath = avatar;
        if (updateImage && !img) {
            alert("Please select a file first.");
            return;
        }
        if (img) {
            try {
                const imgRef = ref(imageDb, `files/${v4()}`);
                console.log("Image Reference:", imgRef);

                // Upload image and get the download URL
                const snapshot = await uploadBytes(imgRef, img);
                console.log("Upload successful:", snapshot);

                imagePath = await getDownloadURL(imgRef);
                console.log("Image download URL:", imagePath);
            } catch (error) {
                console.error("Error uploading file:", error);
                return; // Stop further execution if image upload fails
            }
        } else {
            console.log("ảnh cũ: " + avatar)
        }



        // setLoading(true); // Bắt đầu loading
        // setTimeout(() => {
        //     setLoading(false); // Kết thúc loading sau 2 giây giả lập
        //     console.log(user); // In ra thông tin người dùng (có thể thay đổi)
        // }, 2000)

        try {
            const response = await fetch('http://localhost:8080/api/account/updateAccount', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: id,
                    username: username, // Gửi email hoặc thông tin khác
                    avatar: imagePath,
                    email: email,
                    phone: phone,
                    gender: gender,
                    fullname: fullname
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            if (result.code == 200) {
                setLoading(false); // Bắt đầu loading
                console.log('User updated successfully:', result);
                console.log(result.token);
                Cookies.set("token", result.token, { expires: 6 / 24 })
                toast.success("Cập Nhật thành công!");

            }

            // Handle successful response
        } catch (error) {
            console.error('Error updating user:', error);
            // Handle error
        }
    };


    useEffect(() => {

        if (token) {
            try {
                const decodedTokens = jwt_decode(token);
                console.log("id người dùng: " + decodedTokens.id);
                setUserData(decodedTokens);
                setId(decodedTokens.id || '');
                setUsername(decodedTokens.username || '');
                setFullname(decodedTokens.fullname || '');
                setEmail(decodedTokens.email || '');
                setPhone(decodedTokens.phone || '');
                setAvatar(decodedTokens.avatar || '');
                setGender(decodedTokens.gender === true ? true : false);
                console.log("avartar: " + decodedTokens.avatar);
                console.log("giới tính: " + decodedTokens.gender);
            } catch (error) {
                console.error("Lỗi giải mã token:", error);
            }
        }
    }, []);
    useEffect(() => {
        if (avatar) {
            console.log("Avatar updated to:", avatar); // Giá trị mới của avatar
            // Bạn có thể thực hiện hành động khác tại đây nếu cần
        }
    }, [avatar]);
    return (
        <div style={{ position: 'relative' }}>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
                closeButton={false} // Bỏ nút đóng
            />
            <h3 className="text-center">Thông tin cá nhân</h3>
            <Form className="row g-3" >
                <div className="col-md-12">
                    <div className="text-center mb-3">
                        <img
                            src={preview ? preview : avatar}
                            alt="Avatar"
                            className="rounded-circle"
                            style={{ width: "150px", height: "150px" }}
                        />
                    </div>
                    <Form.Group className="position-relative mb-3 text-center avata" controlId="formAvatar">
                        <div
                            color="white"
                            bgColor="info"
                            variant="gradient"
                            borderRadius="lg"
                            style={{ cursor: "pointer", display: "inline-block" }}
                            onClick={() => fileInputRef.current.click()}
                        >
                            Chọn hình ảnh
                        </div>
                        <input
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </Form.Group>
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputUsername" className="form-label">Tên tài khoản: </label>
                    <input type="text" className="form-control" 
                     {...register("username", { required: "Tài khoản là bắt buộc" })}
                     id="inputUsername" value={username}
                        onChange={(e) =>{setUsername(e.target.value)
                            if (errors.username) {
                                clearErrors("username");
                              }
                        }}  disabled />
                         {errors.username && <small className="text-orange">{errors.username.message}</small>}
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputFullname" className="form-label">Họ và tên: </label>
                    <input type="text"  {...register("fullname", { required: "Họ Tên là bắt buộc" })} className="form-control" id="inputFullname" value={fullname}
                        onChange={(e) =>{setFullname(e.target.value)
                            if (errors.fullname) {
                                clearErrors("fullname");
                              }
                        }}  />
                        {errors.fullname && <small className="text-orange">{errors.fullname.message}</small>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" {...register("email", { required: "Email là bắt buộc" })} className="form-control" id="inputEmail" value={email}
                        onChange={(e) =>{ setEmail(e.target.value)
                            if (errors.email) {
                                clearErrors("email");
                              }
                        }} />
                          {errors.email && <small className="text-orange">{errors.email.message}</small>}
                </div>
                <div className="col-md-6">
                    <label for="inputPhone" className="form-label">Phone</label>
                    <input type="text" {...register("phone", { required: "Số điện thoại là bắt buộc" })} className="form-control" id="inputPhone" value={phone}
                        onChange={(e) =>{
                            setPhone(e.target.value)
                            if (errors.phone) {
                                clearErrors("phone");
                              }
                        } } />
                        {errors.phone && <small className="text-orange">{errors.phone.message}</small>}
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputGender" className="form-label">Giới tính</label><br />
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions"
                            id="inlineRadio1" value="true"
                            checked={gender === true}
                            onChange={() => setGender(true)} />
                        <label className="form-check-label" htmlFor="inlineRadio1">Nam</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio2"
                            value="false"
                            checked={gender === false}
                            onChange={() => setGender(false)}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio2">Nữ</label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" onClick={handleLogin}>
                        Cập nhật
                    </button>
                </div>
            </Form>

            {loading && (
                <div style={overlayStyle}>
                    <ClipLoader color="#3498db" loading={loading} size={50} />
                </div>
            )}
        </div>
    );
};

// Style cho overlay
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Nền trắng với độ mờ
    zIndex: 1000, // Để overlay nằm trên các thành phần khác
};

export default MyProfile;