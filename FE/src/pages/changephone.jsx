import Navbar from "../components/navbar"
import AccountTemplate from "../components/account";
import "../styles/changephone.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function ChangePhone () {
    const [phone, setPhone] = useState("")
    const [error, setError] = useState(false)
    const [err, setErr] = useState("")

    const navigate = useNavigate()

    function isNumeric(str) {
        return /^\d+$/.test(str);
      }

    async function submitChange() {
        if (!phone) {
            setError(true)
        } else {
            if(!isNumeric(phone)) {
                setErr("Vui lòng nhập đúng định dạng số điện thoại")
                return
            }
            setError(false)

            const storedToken = localStorage.getItem("userToken")

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id

                    const response = await axios.post("http://localhost:5000/api/changePhone", {
                        userId,
                        phone,
                    });

                    if (response.data.status) {
                        alert("Thay đổi thành công")
                        navigate("/security-settings")
                    } else {
                        if(response.data.msg == "error") {
                            setErr("Số điện thoại đã tồn tại")
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

            <div className="change-phone">
                <div className="change-phone__container">
                    <AccountTemplate />

                    <div className="change-phone__content">
                        <div className="change-phone__title">Thay đổi số điện thoại</div>

                        <div className="change-error" style={{ opacity: error ? 1 : 0 }}>{err ? err : "Vui lòng điền đầy đủ thông tin"}</div>
                        <div className="change-phone__main">
                            <div className="change-phone__text">Nhập số điện thoại:</div>
                            <input
                                type="text"
                                className="change-phone__input"
                                onChange={(e) => setPhone(e.target.value)}
                                maxLength={10}
                            />
                        </div>

                        <div className="change-phone__submit-container">

                            <div className="change-phone__submit" onClick={() => submitChange()}>
                                Xác nhận thay đổi
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePhone