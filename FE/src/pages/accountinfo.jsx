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
    const [description, setDescription] = useState("")

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

        async function getMota() {
            const storedToken = localStorage.getItem("userToken")

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id

                    fetch(`http://localhost:5000/getMota/${userId}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.status) {
                                setDescription(data.value);
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
        getMota()

    }, []);

    function openEdit() {
        setEditing(true)
    }

    async function confirmEdit() {
        const storedToken = localStorage.getItem("userToken")

        if(storedToken) {
            try {
                const decoded = jwtDecode(storedToken)
                const userId = decoded.id
                
                const response = await fetch("http://localhost:5000/update-description", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringfy({
                        userId: userId,
                        description: description
                    })
                })

                const data = await response.json()

                if(data.status) {
                    setDescription(data.desc)
                    setEditing(false)
                } else {
                    window.location.reload()
                }

            } catch(error) {
                console.error("Lỗi khi gửi yêu cầu:", error);
            }
        }
    }

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
                                    <div className="info__content">

                                        {isEditing ?
                                            <textarea 
                                                className="info__content-text"
                                                placeholder="Mô tả bản thân của bạn..." 
                                                maxLength={1115}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            >
                                                {description}
                                            </textarea>
                                            :
                                            <p className="info__content-text" maxLength={1115}>
                                                {description}
                                            </p>
                                        }

                                    </div>
                                    <div className="desc-buttons">
                                        <div 
                                            className="edit-button desc__buttons"
                                            onClick={isEditing ? confirmEdit : openEdit}
                                        >
                                            {isEditing ? "Lưu" : "Chỉnh sửa"}
                                        </div>
                                    </div>
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