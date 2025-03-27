import axios from "axios";

export const registerUser = async (username, email, phone, password) => {
    try {
        const response = await axios.post("http://localhost:5000/api/register", {
            username,
            email,
            phone,
            password,
        });

        return response.data

    } catch(error) {
        console.error("Lỗi đăng ký:", error);
        return { success: false, message: "Lỗi kết nối đến server" };
    }
}