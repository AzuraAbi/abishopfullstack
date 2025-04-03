import Navbar from "../components/navbar"
import AccountTemplate from "../components/account";
import "../styles/changepassword.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";

function ChangePassword() {

    const [curPass, setCurPass] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState(false)
    const [err, setErr] = useState("")
    const [showCur, setShowCur] = useState(false)
    const [showAft, setShowAft] = useState(false)

    const navigate = useNavigate()

    async function handleChangePasswordparams() {
        if(!curPass || !pass) {
            setError(false)
            setErr("Vui lòng điền đầy đủ thông tin")
        } else {
            const storedToken = localStorage.getItem("userToken")

            if(storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id
                    
                    const response = await axios.post("http://localhost:5000/api/changePassword", {
                        userId,
                        curPass,
                        pass,
                    });

                    if (response.data.status) {
                        alert("Thay đổi thành công")
                        navigate("/security-settings")
                    } else {
                        if(response.data.msg && response.data.msg != "") {
                            setErr(response.data.msg)
                            setError(true)
                        } else {
                            alert("Đã xảy ra lỗi, vui lòng thử lại")
                            navigate("/security-settings")
                        }
                    }

                } catch(error) {
                    console.error("Lỗi khi gửi yêu cầu:", error);
                }
            }
        }
    }

    return (
        <>
            <Navbar />


            <div className="change-password">
                <div className="change-password__container">
                    <AccountTemplate />

                    <div className="change-password__content">
                        <div className="change-password__title">Thay đổi mật khẩu</div>

                        <div className="change-error" style={{opacity: error ? 1 : 0}}>{error ? err : "Vui lòng điền đầy đủ thông tin"}</div>
                        <div className="change-password__main">
                            <div className="change-password__items">
                                <div className="change-password__items-title">Mật khẩu hiện tại:</div>
                                <div className="change-password-input__container">
                                    <input
                                        className="change-password__input"
                                        type={showCur ? "text" : "password"}
                                        maxLength={20}
                                        onChange={(e) => setCurPass(e.target.value)}
                                    />
                                    <input 
                                        type="checkbox" 
                                        className="change-pass-check" 
                                        id="curpasscheck" 
                                        onChange={(e) => {setShowCur(!showCur)}}
                                    />

                                    <label htmlFor="curpasscheck" className="for-change-pass">
                                        {
                                            showCur ?
                                                <IonIcon icon={eyeOff}></IonIcon>
                                                :
                                                <IonIcon icon={eye}></IonIcon>
                                        }
                                    </label>
                                </div>
                            </div>

                            <div className="change-password__items aft-pass">
                                <div className="change-password__items-title">Mật khẩu thay đổi:</div>
                                <div className="change-password-input__container">
                                    <input
                                        className="change-password__input"
                                        type={showAft ? "text" : "password"}
                                        maxLength={20}
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                    <input 
                                        type="checkbox" 
                                        className="change-pass-check" 
                                        id="aftpasscheck" 
                                        onChange={(e) => {setShowAft(!showAft)}}
                                    />
                                    
                                    <label htmlFor="aftpasscheck" className="for-change-pass">
                                        {
                                            showAft ?
                                                <IonIcon icon={eyeOff}></IonIcon>
                                                :
                                                <IonIcon icon={eye}></IonIcon>
                                        }
                                    </label>
                                </div>
                            </div>

                            <div className="change-pass-submit__container">
                                <div className="change-pass-submit__button" onClick={() => handleChangePasswordparams()}>Xác nhận thay đổi</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword