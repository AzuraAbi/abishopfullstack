import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios"
import "../styles/accountinfo.css"
import AccountTemplate from "../components/account";
import { jwtDecode } from "jwt-decode";

function AccountInfo() {
    const [username, setUsername] = useState("")

    useEffect(() => {

        async function getUsernameHandle() {

            const storedToken = localStorage.getItem("userToken")

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken);
                    const userId = decoded.id

                    fetch(`http://localhost:5000/getUsername/${userId}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log("User từ API:", data);
                            setUsername(data.username);
                        })
                        .catch(err => console.error("Lỗi lấy user:", err));

                } catch (error) {
                    console.error("Lỗi giải mã token:", error);
                }
            }
        }

        getUsernameHandle()
    }, []);

    return (
        <>
            <Navbar />

            <div className="accountinfo">
                <div className="accountinfo__container">
                    <AccountTemplate />

                    <div className="accountinfo__content">
                        <h2 className="accountinfo__title">Tài khoản của tôi</h2>
                        <div className="accountinfo__info">
                            <div className="info__username">
                                Tên người dùng: {username}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountInfo