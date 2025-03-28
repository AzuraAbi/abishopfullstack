import "./account.css"
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AccountTemplate() {
    
    const navigate = useNavigate()

    const handleInfo = () => {
        navigate("/accountinfo")
    }

    const handleSecurity = () => {
        navigate("/security-settings")
    }

    const handleBusiness = () => {
        navigate("/business-settings")
    }

    const handleHelp = () => {
        navigate("/help-settings")
    }

    return (
        <>
            <div className="accountinfo__category">
                <div className="accountinfo__items" onClick={() => handleInfo()}>
                    Tài khoản của tôi
                </div>

                <div className="accountinfo__items" onClick={() => handleSecurity()}>
                    Bảo mật
                </div>

                <div className="accountinfo__items" onClick={() => handleBusiness()}>
                    Tài khoản doanh nghiệp
                </div>

                <div className="accountinfo__items" onClick={() => handleHelp()}>
                    Hỗ trợ
                </div>

            </div>
        </>
    )
}

export default AccountTemplate