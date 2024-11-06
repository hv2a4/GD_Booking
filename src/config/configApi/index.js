import axios from "axios";
import Swal from "sweetalert2";
import {initializeApp} from "firebase/app";
import {getStorage} from 'firebase/storage';

export const BASE_URL = "http://localhost:8080/";

const request = async ({ method = "GET", path = "", data = {}, headers = {}, token = "" }) => {
  try {
    const res = await axios({
      method,
      baseURL: BASE_URL,
      url: path,
      data,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.";
    Swal.fire({
      icon: "error",
      text: errorMessage,
      toast: true,
      position: "top-end",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return null;
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyC-yTelb8SWfOKdNBmbbtEqPpEVQjSuJPc",
  authDomain: "myprojectimg-164dd.firebaseapp.com",
  projectId: "myprojectimg-164dd",
  storageBucket: "myprojectimg-164dd.appspot.com",
  messagingSenderId: "369775366834",
  appId: "1:369775366834:web:3062b759c0a71362722fab"
};

const app = initializeApp(firebaseConfig);
const imageDb = getStorage(app);
export {request, imageDb};
