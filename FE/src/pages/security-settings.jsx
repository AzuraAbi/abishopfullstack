import Navbar from "../components/navbar"
import AccountTemplate from "../components/account";
import "../styles/security-settings.css"
import { IonIcon } from "@ionic/react";
import { personCircle, lockClosed, mailOpen, phonePortrait } from "ionicons/icons";
import { useNavigate } from "react-router-dom";

function SecuritySettings() {

    const navigate = useNavigate()

    const toChangeUsername = () => {
        navigate("/security-settings/change-username")
    }
    
    const toChangeEmail = () => {
        navigate("/security-settings/change-email")
        
    }
    
    const toChangePhone = () => {
        navigate("/security-settings/change-phone")
        
    }
    
    const toChangePassword = () => {
        navigate("/security-settings/change-password")
        
    }

    return (
        <>
            <Navbar />

            <div className="security-page">
                <div className="security-page__container">
                    <AccountTemplate />


                    <div className="security-page__content">
                        <div className="security-title">Bảo mật</div>

                        <div className="security-categories">
                            <div className="security-items" onClick={() => toChangeUsername()}>
                                <div className="sec-items__name">
                                    <IonIcon className="icon" icon={personCircle}></IonIcon> Thay đổi tên người dùng
                                </div>

                                <div className="sec-items__desc">
                                    Bạn có thể thay đổi tên hiển thị của người dùng tại đây.
                                </div>
                            </div>

                            <div className="security-items" onClick={() => toChangeEmail()}>
                                <div className="sec-items__name">
                                    <IonIcon className="icon" icon={mailOpen}></IonIcon> Thay đổi địa chỉ email
                                </div>

                                <div className="sec-items__desc">
                                    Bạn có thể thay đổi địa chỉ email của tài khoản của bạn ở đây. Việc này sẽ ảnh hưởng tới việc bạn đăng nhập bằng địa chỉ email
                                </div>
                            </div>

                            <div className="security-items" onClick={() => toChangePhone()}>
                                <div className="sec-items__name">
                                    <IonIcon className="icon" icon={phonePortrait}></IonIcon> Thay đổi số điện thoại
                                </div>

                                <div className="sec-items__desc">
                                    Bạn có thể thay đổi số điện thoại của tài khoản của bạn ở đây. Việc này sẽ ảnh hưởng tới việc bạn đăng nhập bằng số điện thoại
                                </div>
                            </div>

                            <div className="security-items" onClick={() => toChangePassword()}>
                                <div className="sec-items__name">
                                    <IonIcon className="icon" icon={lockClosed}></IonIcon> Thay đổi mật khẩu
                                </div>

                                <div className="sec-items__desc">
                                    Bạn có thể thay đổi mật khẩu của tài khoản của bạn ở đây.
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SecuritySettings