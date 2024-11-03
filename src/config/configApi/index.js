import axios from "axios";


export const BASE_URL = "http://localhost:8080/";

const request = async ({ method = "GET", path = "", data = {}, headers = {}, token = "" }) => {
  try {
    const res = await axios({
      method: method,
      baseURL: BASE_URL,
      url: path,
      data: data,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.";
    alert(errorMessage);
    return null;
  }
};

export default request;
