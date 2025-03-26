import axios from "axios";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/login", {
      username,
      password,
    });

    if (response.data.success) {

      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return { success: false, message: "Lỗi kết nối đến server" };
  }
};
