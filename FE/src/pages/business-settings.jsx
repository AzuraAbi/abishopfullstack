import Navbar from "../components/navbar"
import AccountTemplate from "../components/account"
import "../styles/bussinesssettings.css"
import { IonIcon } from "@ionic/react"
import { create, search } from "ionicons/icons"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { decode } from "punycode"

function BusinessSettings() {
    const navigate = useNavigate()

    const [sx, setSx] = useState(false)
    const [oc, setOc] = useState(false)
    const [blackscreen, setBlack] = useState(false)
    const [tsp, setTsp] = useState("")
    const [gb, setGb] = useState(0)
    const [mt, setMt] = useState("")
    const [asp, setAsp] = useState(null)

    const [e1, setE1] = useState(false)
    const [e2, setE2] = useState(false)
    const [e3, setE3] = useState(false)
    const [e4, setE4] = useState(false)

    const [err1, setErr1] = useState("")
    const [err2, setErr2] = useState("")
    const [err3, setErr3] = useState("")
    const [err4, setErr4] = useState("")

    const [imagePreview, setImagePreview] = useState(null)

    const [dssp, setDssp] = useState([])

    function isNumeric(str) {
        return /^\d+$/.test(str);
    }

    const sort = (sortType) => {
        setSx(false)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setAsp(file)
        }
    }

    const createNew = async () => {
        if (!tsp) {
            setE1(true)
            setErr1("Vui lòng nhập tên sản phẩm")
        } else {
            setE1(false)
        }

        if (!gb) {
            setE2(true)
            setErr2("Vui lòng nhập giá bán sản phẩm")
        } else {
            if (isNumeric(gb)) {
                setE2(false)
            } else {
                setE2(true)
                setErr2("Vui lòng nhập đúng định dạng số")
            }
        }

        if (!mt) {
            setE3(true)
            setErr3("Vui lòng nhập mô tả sản phẩm")
        } else {
            setE3(false)
        }

        if (!asp) {
            setE4(true)
            setErr4("Vui lòng chọn ảnh cho sản phẩm")
        } else {
            setE4(false)
        }

        if (tsp && gb && mt && asp) {

            const storedToken = localStorage.getItem("userToken")

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id

                    const formData = new FormData()

                    formData.append("userid", userId)
                    formData.append("ten", tsp)
                    formData.append("gia", gb)
                    formData.append("mota", mt)
                    formData.append("anh", asp)

                    const res = await axios.post('http://localhost:5000/api/themsanpham', formData)

                    if(res.data.status) {
                        window.location.reload()
                    } else {
                        alert("Đã xảy ra lỗi")
                        navigate("/")
                    }

                } catch (error) {
                    console.error("Lỗi khi gửi yêu cầu:", error);
                }
            }
        }
    }

    useEffect(() => {
        async function getDanhsach() {
            const storedToken = localStorage.getItem("userToken")

            if(storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id

                    fetch(`http://localhost:5000/getdanhsach/${userId}`)
                    .then(res => res.json())
                    .then(data => {
                        if(data.status) {
                            setDssp(data.value)
                        }
                    })
                    .catch(err => console.log(error("Lỗi lấy user: ", err)));
                } catch (error) {
                    console.error("Lỗi giải mã token: ", error)
                }
            }
        }

        getDanhsach()
    }, [])

    return (
        <>

            <div className="add-new-items" style={{ display: oc ? "flex" : "none" }}>
                <div className="add-new__container">

                    <div className="add-new__header">
                        <div className="add-new__title">Thêm sản phẩm</div>
                        <div className="add-new__close" onClick={() => {
                            setOc(false)
                            setBlack(false)
                        }}>X</div>
                    </div>

                    <div className="add-new__body">
                        <div className="add-thongtin">
                            <div
                                className="add-error"
                                style={{ opacity: e1 ? 1 : 0 }}
                            >
                                {err1 ? err1 : "Vui lòng nhập đầy đủ thông tin"}
                            </div>
                            <input
                                type="text"
                                className="add-ten-san-pham"
                                placeholder="Tên sản phẩm"
                                onChange={(e) => setTsp(e.target.value)}
                            />

                            <div
                                className="add-error"
                                style={{ opacity: e2 ? 1 : 0 }}
                            >
                                {err2 ? err2 : "Vui lòng nhập đầy đủ thông tin"}
                            </div>
                            <input
                                type="text"
                                placeholder="Giá bán"
                                className="add-gia-ban"
                                maxLength={10}
                                onChange={(e) => setGb(e.target.value)}
                            />

                            <div
                                className="add-error"
                                style={{ opacity: e3 ? 1 : 0 }}
                            >
                                {err3 ? err3 : "Vui lòng nhập đầy đủ thông tin"}
                            </div>
                            <textarea
                                className="add-mo-ta"
                                placeholder="Mô tả sản phẩm.."
                                onChange={(e) => setMt(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="add-anhbia">
                            <div className="add-preview" style={{ backgroundImage: imagePreview ? `url(${imagePreview})` : "none" }}>

                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                className="add-anhbia__input"
                                onChange={(e) => handleFileChange(e)}
                            />

                            <div
                                className="add-error"
                                style={{ opacity: e4 ? 1 : 0 }}
                            >
                                {err4 ? err4 : "Vui lòng nhập đầy đủ thông tin"}
                            </div>

                            <div className="add-done-button" onClick={() => createNew()}>
                                Thêm sản phẩm
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="black-screen"
                style={
                    {
                        backgroundColor: "black",
                        width: "100vw",
                        height: "100vh",
                        position: "fixed",
                        opacity: blackscreen ? ".5" : 0,
                        display: blackscreen ? "block" : "none",
                        zIndex: "3",
                    }
                }
            >

            </div>

            <Navbar />

            <div className="business-page">
                <div className="business-page__container">
                    <AccountTemplate />

                    <div className="business-page__content">
                        <div className="business-page__title">Tài khoản doanh nghiệp</div>

                        <div className="business-page__main">

                            <div className="business__header">
                                <div
                                    className="business__create-new"
                                    onClick={() => {
                                        setOc(true);
                                        setBlack(true);
                                    }}
                                >
                                    Thêm +
                                </div>

                                <div className="business__search-bar">
                                    <input
                                        type="text"
                                        className="business__search-bar__input"
                                        placeholder="Nhập từ khóa..."
                                    />
                                    <div className="business__search-bar__button">
                                        <IonIcon icon={search}></IonIcon>
                                    </div>
                                </div>

                                <div className="business-sort">
                                    <div
                                        className="business-sort__button"
                                        onClick={() => setSx(!sx)}
                                    >
                                        Sắp xếp
                                    </div>

                                    <div className="business-sort__dropbox" style={{ opacity: sx ? 1 : 0 }}>

                                        <div className="business-sort__dropbox-items" onClick={() => sort("AZ")}>
                                            A - Z
                                        </div>

                                        <div className="business-sort__dropbox-items" onClick={() => sort("ZA")}>
                                            Z - A
                                        </div>

                                        <div className="business-sort__dropbox-items" onClick={() => sort("TG")}>
                                            Thời gian
                                        </div>

                                        <div className="business-sort__dropbox-items" onClick={() => sort("SL")}>
                                            Số lượng bán
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="business__body">
                                <div className="business-items">

                                </div>

                                <div className="business-pages-number">

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BusinessSettings