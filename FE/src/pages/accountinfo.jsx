import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios"
import "../styles/accountinfo.css"
import AccountTemplate from "../components/account";
import { jwtDecode } from "jwt-decode";

function AccountInfo() {
    const [username, setUsername] = useState("")
    const [sodu, setSodu] = useState(0)
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [isEditing, setEditing] = useState(false)

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
                            if (data.status) {
                                setUsername(data.value);
                            }
                        })
                        .catch(err => console.error("Lỗi lấy user:", err));

                } catch (error) {
                    console.error("Lỗi giải mã token:", error);
                }
            }
        }

        async function getSoduHandle() {

            const storedToken = localStorage.getItem("userToken")

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id

                    fetch(`http://localhost:5000/getSodu/${userId}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.status) {
                                setSodu(data.value)
                            }
                        })

                } catch (error) {
                    console.error("Lỗi giải mã token:", error);
                }
            }
        }

        async function getEmail() {
            const storedToken = localStorage.getItem("userToken")

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id

                    fetch(`http://localhost:5000/getEmail/${userId}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.status) {
                                setEmail(data.value);
                            }
                        })
                        .catch(err => console.error("Lỗi lấy user:", err));


                } catch (error) {
                    console.error("Lỗi giải mã token:", error);
                }
            }
        }

        async function getPhone() {
            const storedToken = localStorage.getItem("userToken")

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id

                    fetch(`http://localhost:5000/getPhone/${userId}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.status) {
                                setPhone(data.value);
                            }
                        })
                        .catch(err => console.error("Lỗi lấy user:", err));


                } catch (error) {
                    console.error("Lỗi giải mã token:", error);
                }
            }

        }

        getUsernameHandle()
        getSoduHandle()
        getEmail()
        getPhone()
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

                            <div className="info__items">
                                <span className="info__text">Tên người dùng: </span> {username}
                            </div>

                            <div className="info__items">
                                <span className="info__text">Số dư:</span> {sodu.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                            </div>

                            <div className="info__items">
                                <span className="info__text">Email: </span> {email}
                            </div>

                            <div className="info__items">
                                <span className="info__text">Phone: </span> {phone}
                            </div>

                            <div className="info__items">
                                <div className="info-describe__container">
                                    <span className="info__text">Mô tả:</span>
                                    {isEditing ?
                                        <textarea className="info__content">dsads</textarea>
                                        :
                                        <p className="info__content">
                                            Xin chào tôi là Lê Anh Tuấn
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountInfo