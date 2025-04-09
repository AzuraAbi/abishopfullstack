import Navbar from "../components/navbar"
import AccountTemplate from "../components/account"
import "../styles/bussinesssettings.css"
import { IonIcon } from "@ionic/react"
import { create, search, trash } from "ionicons/icons"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { useNavigate } from "react-router-dom"

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

    const [sort_type, setSortType] = useState("")


    const [danhMucList, setDanhMucList] = useState([]);
    const [choosedDanhmuc, setChoosedDanhmuc] = useState([])
    const [oTl, setOtl] = useState(false)

    function isNumeric(str) {
        return /^\d+$/.test(str);
    }


    const sort = (sortType) => {
        setSortType(sortType)
        setSx(false)
    }

    async function getDanhsach() {
        const storedToken = localStorage.getItem("userToken")

        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken)
                const userId = decoded.id

                fetch(`http://localhost:5000/getsanpham/${userId}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.status) {
                            console.log(data.value)
                            setDssp(data.value)
                        }
                    })
                    .catch(err => console.log(err("Lỗi lấy user: ", err)));
            } catch (error) {
                console.error("Lỗi giải mã token: ", error)
            }
        }
    }

    const [cursp, setCursp] = useState(null)
    const [eName, set_eName] = useState("")
    const [ePrice, set_ePrice] = useState("")
    const [eDesc, set_eDesc] = useState("")
    const [eCate, set_eCate] = useState([])
    const [ePics, set_ePics] = useState("")
    const [ePre, set_ePre] = useState("")
    const [eFile, set_eFile] = useState(null)
    const [EoTl, setEOtl] = useState(false)

    const handleDelete = (idmathang) => {
        const storedToken = localStorage.getItem("userToken")

        if (storedToken) {
            try {
                fetch(`http://localhost:5000/xoa-san-pham/${idmathang}`)
                    .then(res => res.json())
                    .then(data => {
                        if(data.status) {
                            getDanhsach()
                        } else {
                            alert("Đã xảy ra lỗi")   
                            window.location.reload()
                        }
                    })
            } catch (error) {
                console.error("Lỗi khi gửi yêu cầu:", error);

            }
        }
    }

    const openEditSanpham = (idmathang) => {
        setCursp(idmathang)
        set_eName("")
        set_ePrice("")
        set_eDesc("")
        set_eCate([])
        set_ePics("")
        set_ePre("")
        set_eFile(null)
        setE1(false)
        setE2(false)
        setE3(false)
        setE4(false)
        setErr1(false)
        setErr2(false)
        setErr3(false)
        setErr4(false)
        const storedToken = localStorage.getItem("userToken")

        if (storedToken) {
            try {

                fetch(`http://localhost:5000/lay-thong-tin-san-pham/${idmathang}`)
                    .then(res => res.json())
                    .then(data => {
                        set_eName(data.tensp)
                        set_ePrice(data.gia)
                        set_eDesc(data.mota)
                        set_eCate(data.danhmuc)
                        set_ePics(data.anh)
                    })
            } catch (error) {
                console.error("Lỗi khi gửi yêu cầu:", error);
            }
        }
    }

    const completeEdit = async () => {
        if (!eName) {
            setE1(true)
            setErr1("Vui lòng nhập tên sản phẩm")
        } else {
            setE1(false)
        }

        if (!ePrice) {
            setE2(true)
            setErr2("Vui lòng nhập giá bán sản phẩm")
        } else {
            if (isNumeric(ePrice)) {
                setE2(false)
            } else {
                setE2(true)
                setErr2("Vui lòng nhập đúng định dạng số")
            }
        }

        if (!eDesc) {
            setE3(true)
            setErr3("Vui lòng nhập mô tả sản phẩm")
        } else {
            setE3(false)
        }

        if (!ePics) {
            setE4(true)
            setErr4("Vui lòng chọn ảnh cho sản phẩm")
        } else {
            setE4(false)
        }

        if (eName && ePrice && eDesc && ePics) {

            const storedToken = localStorage.getItem("userToken")

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id

                    const formData = new FormData()

                    formData.append("userid", userId)
                    formData.append("idmathang", cursp)
                    formData.append("ten", eName)
                    formData.append("gia", ePrice)
                    formData.append("mota", eDesc)
                    formData.append("anhcu", ePics)
                    formData.append("danhmuc", eCate)

                    if (eFile) formData.append("file", eFile)

                    const res = await axios.post('http://localhost:5000/api/capnhatsanpham', formData)

                    if (res.data.status) {
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


    const handleEditSanphamPics = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            set_ePre(imageUrl)
            set_eFile(file)
        }
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
                    formData.append("danhmuc", choosedDanhmuc)

                    const res = await axios.post('http://localhost:5000/api/themsanpham', formData)

                    if (res.data.status) {
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

    const handleCheck = (id) => {
        if (choosedDanhmuc.includes(id)) {
            setChoosedDanhmuc(prev => prev.filter(item => item !== id))
        } else {
            setChoosedDanhmuc(prev => [...prev, id])
        }
    }

    const handleEditCheck = (id) => {
        if (eCate.includes(id)) {
            set_eCate(prev => prev.filter(item => item !== id))
        } else {
            set_eCate(prev => [...prev, id])
        }
    }

    useEffect(() => {


        axios.get("http://localhost:5000/danhmuc")
            .then((response) => {
                setDanhMucList(response.data);
            })
            .catch((error) => console.error("Lỗi khi lấy danh mục:", error));

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

                            <div className="add-the-loai" onMouseLeave={() => setOtl(false)}>
                                <div className="the-loai-button" onMouseEnter={() => setOtl(true)}>Thể loại</div>
                                <div className="add-the-loai__dropbox" style={{ opacity: oTl ? 1 : 0, display: oTl ? "flex" : "none" }}>
                                    {
                                        danhMucList.map(cate => (
                                            <div key={cate.idDanhmuc} className="add-cate-items" onClick={() => handleCheck(cate.idDanhmuc)}>
                                                <div className="add-cate__text">
                                                    {cate.tenDanhmuc}
                                                </div>

                                                <div
                                                    className="add-cate__check"
                                                    style={{ opacity: choosedDanhmuc.includes(cate.idDanhmuc) ? 1 : 0 }}
                                                >
                                                    ✓
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

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

            <div className="edit-sanpham" style={{ display: cursp ? "flex" : "none" }}>
                <div className="edit-sanpham__container">

                    <div className="edit-sanpham__header">
                        <div className="edit-sanpham__title">Chỉnh sửa sản phẩm</div>
                        <div className="edit-sanpham__close" onClick={() => {
                            setCursp(null)
                            setBlack(false)
                        }}>X</div>
                    </div>

                    <div className="edit-sanpham__body">
                        <div className="edit-sanpham-thongtin">
                            <div
                                className="edit-sanpham-error"
                                style={{ opacity: e1 ? 1 : 0 }}
                            >
                                {err1 ? err1 : "Vui lòng nhập đầy đủ thông tin"}
                            </div>
                            <input
                                type="text"
                                className="edit-sanpham-ten-san-pham"
                                placeholder="Tên sản phẩm"
                                value={eName}
                                onChange={(e) => set_eName(e.target.value)}
                            />

                            <div
                                className="edit-sanpham-error"
                                style={{ opacity: e2 ? 1 : 0 }}
                            >
                                {err2 ? err2 : "Vui lòng nhập đầy đủ thông tin"}
                            </div>
                            <input
                                type="text"
                                placeholder="Giá bán"
                                className="edit-sanpham-gia-ban"
                                maxLength={10}
                                value={ePrice}
                                onChange={(e) => set_ePrice(e.target.value)}
                            />

                            <div className="edit-the-loai" onMouseLeave={() => setEOtl(false)}>
                                <div className="edit-the-loai-button" onMouseEnter={() => setEOtl(true)}>Thể loại</div>
                                <div className="edit-the-loai__dropbox" style={{ opacity: EoTl ? 1 : 0, display: EoTl ? "flex" : "none" }}>
                                    {
                                        danhMucList.map(cate => (
                                            <div key={cate.idDanhmuc} className="edit-cate-items" onClick={() => handleEditCheck(cate.idDanhmuc)}>
                                                <div className="edit-cate__text">
                                                    {cate.tenDanhmuc}
                                                </div>

                                                <div
                                                    className="edit-cate__check"
                                                    style={{ opacity: eCate.includes(cate.idDanhmuc) ? 1 : 0 }}
                                                >
                                                    ✓
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div
                                className="edit-sanpham-error"
                                style={{ opacity: e3 ? 1 : 0 }}
                            >
                                {err3 ? err3 : "Vui lòng nhập đầy đủ thông tin"}
                            </div>
                            <textarea
                                className="edit-sanpham-mo-ta"
                                placeholder="Mô tả sản phẩm.."
                                value={eDesc}
                                onChange={(e) => set_eDesc(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="edit-sanpham-anhbia">
                            <div className="edit-sanpham-preview" style={{ backgroundImage: ePre ? `url(${ePre})` : `url(http://localhost:5000${ePics})` }}>

                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                className="edit-sanpham-anhbia__input"
                                onChange={(e) => { handleEditSanphamPics(e) }}
                            />

                            <div
                                className="edit-sanpham-error"
                                style={{ opacity: e4 ? 1 : 0 }}
                            >
                                {err4 ? err4 : "Vui lòng nhập đầy đủ thông tin"}
                            </div>

                            <div className="edit-sanpham-done-button" onClick={() => completeEdit()}>
                                Hoàn tất chỉnh sửa
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

                                    <div className="business-sort__dropbox" style={{ opacity: sx ? 1 : 0, display: sx ? "block" : "none" }}>

                                        <div className="business-sort__dropbox-items" onClick={() => sort("AZ")}>
                                            A - Z
                                        </div>

                                        <div className="business-sort__dropbox-items" onClick={() => sort("ZA")}>
                                            Z - A
                                        </div>

                                        <div className="business-sort__dropbox-items" onClick={() => sort("MC")}>
                                            Mới - Cũ
                                        </div>

                                        <div className="business-sort__dropbox-items" onClick={() => sort("CM")}>
                                            Cũ - Mới
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="business__body">
                                <div className="business-items">

                                    {dssp
                                        .sort((a, b) => {
                                            if (sort_type === "AZ") {
                                                return a.tenmathang.localeCompare(b.tenmathang)
                                            } else if (sort_type === "ZA") {
                                                return b.tenmathang.localeCompare(a.tenmathang)
                                            } else if (sort_type === "CM") {
                                                return b.idmathang - a.idmathang
                                            } else if (sort_type === "MC") {
                                                return a.idmathang - b.idmathang
                                            }
                                        })
                                        .map((sp) => (
                                            <div className="sanpham" key={sp.idmathang}>
                                                <div className="sp__container">
                                                    <div className="sp__anh">
                                                        <div
                                                            className="sp__anh-display"
                                                            style={{ backgroundImage: `url(http://localhost:5000${sp.anhsanpham})` }}
                                                        >

                                                        </div>
                                                    </div>

                                                    <div className="sp__info">
                                                        <div className="sp__info-name">
                                                            {sp.tenmathang}
                                                        </div>
                                                        <div className="sp__info-gia">
                                                            {sp.giaban.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                                        </div>
                                                        <div className="sp__info-mota">
                                                            <span style={{ color: "gray" }}>Mô tả sản phẩm: </span>{sp.mota}
                                                        </div>
                                                    </div>

                                                    <div className="sp__buttons">
                                                        <div className="sp__buttons-edit" onClick={() => {

                                                            openEditSanpham(sp.idmathang)
                                                            setBlack(true)
                                                        }}>
                                                            <IonIcon icon={create}></IonIcon>
                                                        </div>

                                                        <div className="sp__buttons-delete" onClick={() => handleDelete(sp.idmathang)}>
                                                            <IonIcon icon={trash}></IonIcon>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}


                                </div>

                                <div className="business-pages-number">

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default BusinessSettings