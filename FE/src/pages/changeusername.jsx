import Navbar from "../components/navbar"
import AccountTemplate from "../components/account";
import "../styles/changeusername.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function ChangeUsername() {
    const [username, setUsername] = useState("")
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    async function submitChange() {
        if (!username) {
            setError(true)
        } else {
            setError(false)

            const storedToken = localStorage.getItem("userToken")

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id

                    const response = await axios.post("http://localhost:5000/api/changeUsername", {
                        userId,
                        username,
                    });

                    if (response.data.status) {
                        alert("Thay đổi thành công")
                        navigate("/security-settings")
                    } else {
                        alert("Đã xảy ra lỗi, vui lòng thử lại")
                        navigate("/security-settings")
                    }


                } catch (error) {
                    console.error("Lỗi khi gửi yêu cầu:", error);
                }
            }
        }
    }

    return (
        <>
            <Navbar />

            <div className="change-username">
                <div className="change-username__container">
                    <AccountTemplate />

                    <div className="change-username__content">
                        <div className="change-username__title">Thay đổi tên người dùng</div>

                        <div className="change-error" style={{ opacity: error ? 1 : 0 }}>Vui lòng điền đầy đủ thông tin</div>
                        <div className="change-username__main">
                            <div className="change-username__text">Nhập tên muốn đổi:</div>
                            <input
                                type="text"
                                className="change-username__input"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="change-username__submit-container">

                            <div className="change-username__submit" onClick={() => submitChange()}>
                                Xác nhận thay đổi
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangeUsername