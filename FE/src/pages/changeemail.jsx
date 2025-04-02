import Navbar from "../components/navbar"
import AccountTemplate from "../components/account";
import "../styles/changeemail.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function ChangeEmail () {
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)
    const [err, setErr] = useState("")

    const navigate = useNavigate()

    async function submitChange() {
        if (!email) {
            setError(true)
        } else {
            if(!email.endsWith("@gmail.com")) {
                setError(true)
                setErr("Vui lòng nhập đúng định dạng email")
                return
            }
            setError(false)

            const storedToken = localStorage.getItem("userToken")

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id

                    const response = await axios.post("http://localhost:5000/api/changeemail", {
                        userId,
                        email,
                    });

                    if (response.data.status) {
                        alert("Thay đổi thành công")
                        navigate("/security-settings")
                    } else {
                        if(response.data.msg == "error") {
                            setErr("Địa chỉ email đã tồn tại")
                            setError(true)
                        } else {
                            alert("Đã xảy ra lỗi, vui lòng thử lại")
                            navigate("/security-settings")
                        }
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

            <div className="change-email">
                <div className="change-email__container">
                    <AccountTemplate />

                    <div className="change-email__content">
                        <div className="change-email__title">Thay đổi địa chỉ email</div>

                        <div className="change-error" style={{ opacity: error ? 1 : 0 }}>{err ? err : "Vui lòng điền đầy đủ thông tin"}</div>
                        <div className="change-email__main">
                            <div className="change-email__text">Nhập địa chỉ email:</div>
                            <input
                                type="text"
                                className="change-email__input"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="change-email__submit-container">

                            <div className="change-email__submit" onClick={() => submitChange()}>
                                Xác nhận thay đổi
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangeEmail