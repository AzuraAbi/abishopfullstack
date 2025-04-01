import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios"
import "../styles/accountinfo.css"
import AccountTemplate from "../components/account";
import { jwtDecode } from "jwt-decode";
import { IonIcon } from "@ionic/react";
import { createOutline } from "ionicons/icons";

function AccountInfo() {
    const [username, setUsername] = useState("")
    const [sodu, setSodu] = useState(0)
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [isEditing, setEditing] = useState(false)
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [avt, setAvt] = useState("")
    const [openChooseFile, setOpenChooseFile] = useState(false)


    const handleUpload = async () => {
        if (!image) return alert("Chưa chọn ảnh!");


        const storedToken = localStorage.getItem("userToken")

        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken)
                const userId = decoded.id

                const formData = new FormData();
                formData.append("image", image);
                formData.append("userId", userId)

                const res = await axios.post("http://localhost:5000/uploadAvt", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (res.data.status) {
                    setAvt(res.data.imageUrl)
                    setOpenChooseFile(false)
                } else {
                    window.location.reload()
                }


            } catch (error) {
                console.error("Lỗi khi gửi yêu cầu:", error);
            }
        }
    }


    async function confirmEdit() {
        const storedToken = localStorage.getItem("userToken")

        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken)
                const userId = decoded.id

                const response = await axios.post("http://localhost:5000/api/updateDesc", {
                    userId,
                    description,
                });

                if (response.data.status) {
                    setDescription(response.data.desc)
                    setEditing(false)
                } else {
                    window.location.reload()
                }

            } catch (error) {
                console.error("Lỗi khi gửi yêu cầu:", error);
            }
        }
    }

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

        async function getAvt() {
            const storedToken = localStorage.getItem("userToken")

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id

                    fetch(`http://localhost:5000/getAvt/${userId}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.status) {
                                setAvt(data.value);
                                console.log(data.value)
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
        getAvt()

    }, []);

    function openEdit() {
        setEditing(true)
    }

    function openFileChoosing(sts) {
        setOpenChooseFile(sts)
    }

    return (
        <>
            <Navbar />

            <div className="upload-avt" style={{ display: openChooseFile ? "block" : "none" }}>
                <div className="upload-avt__head">
                    <span className="upload-avt__title">Chọn ảnh đại diện</span>
                    <div
                        className="upload-avt__close"
                        onClick={() => openFileChoosing(false)}
                    >
                        X
                    </div>
                </div>

                <div className="upload-avt__body">
                    <input
                        type="file"
                        className="upload-avt__file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <button
                        className="upload-avt__submit"
                        onClick={handleUpload}
                    >
                        Tải lên
                    </button>
                </div>
            </div>

            <div className="accountinfo">
                <div className="accountinfo__container">
                    <AccountTemplate />

                    <div className="accountinfo__content">
                        <h2 className="accountinfo__title">Tài khoản của tôi</h2>
                        <div className="accountinfo__info">

                            <div className="accountinfo__info-container">
                                <div className="info__info">
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

                                </div>

                                <div
                                    className="info__img"
                                    style={{ backgroundImage: avt ? `url(http://localhost:5000${avt})` : `url(../../abu.png)` }}
                                >
                                    <div className="info__img-toggle" onClick={() => openFileChoosing(true)}>
                                        <IonIcon icon={createOutline}></IonIcon>
                                    </div>
                                </div>

                            </div>

                            <div className="info__items">
                                <div className="info-describe__container">
                                    <span className="info__text">Mô tả:</span>
                                    <div className="info__content">

                                        {isEditing ?
                                            <textarea
                                                className="info__content-text"
                                                placeholder="Mô tả bản thân của bạn..."
                                                maxLength={1000}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            >
                                            </textarea>
                                            :
                                            <p className="info__content-text" maxLength={1000}>
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