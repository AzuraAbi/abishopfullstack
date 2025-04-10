import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import "../styles/sanpham.css"
import { jwtDecode } from 'jwt-decode';
import { IonIcon } from '@ionic/react';
import { cart, card } from 'ionicons/icons';
import axios from 'axios';

function ThongTinSanPham() {
    const { slug } = useParams();
    const id = slug.split('-')[0];
    const [sp, setSp] = useState(null);
    const [author, setAuthor] = useState(false)
    const [atb, setAtb] = useState([])
    const [pre, setPre] = useState("")
    const [opa, setOpa] = useState(false)
    const [filetoadd, setFiletoadd] = useState(null)
    const [curId, setCurId] = useState(0)
    const [hoverid, setHoverid] = useState(null)

    async function addNew() {
        if (!filetoadd) alert("Chưa chọn ảnh")
        else {
            const storedToken = localStorage.getItem("userToken")

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id

                    const formData = new FormData()
                    formData.append("image", filetoadd)
                    formData.append("idmathang", id)

                    const res = await axios.post("http://localhost:5000/upload-preview-image", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });

                    if (res.data.status) {
                        setOpa(false)
                        setAtb(prev => [...prev, res.data.data])
                    } else {
                        alert("Đã xảy ra lỗi")
                        window.location.reload()
                    }

                } catch (error) {
                    console.error("Lỗi giải mã token:", error);
                    window.location.reload()

                }
            } else {
                window.location.reload()
            }
        }
    }

    async function handleDeletePreview(idmathang, previewid) {



        const storedToken = localStorage.getItem("userToken")

        if (storedToken) {
            try {

                const formData = new FormData()
                formData.append("idmathang", idmathang)
                formData.append("previewid", previewid)

                fetch("http://localhost:5000/xoa-anh-preview", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ idmathang, previewid })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.status) {
                            setAtb(prev => prev.filter(anh => anh.previewid !== previewid))
                            if (previewid === curId) {
                                setCurId(0)
                                setPre(null)
                            }
                        }

                    })


            } catch (error) {
                console.error("Lỗi giải mã token:", error);
            }

        } else {
            window.location.reload()
        }
    }

    useEffect(() => {
        async function ttsp() {
            const storedToken = localStorage.getItem("userToken")

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id

                    fetch(`http://localhost:5000/lay-thong-tin-chi-tiet-san-pham/${id}`)
                        .then(res => res.json())
                        .then(data => {
                            setSp(data.data)
                            setPre(data.data.anhsanpham)
                            if (userId === data.data.userid) {
                                setAuthor(true)
                            }
                        });

                } catch (error) {
                    console.error("Lỗi giải mã token:", error);
                }
            }
        }

        async function getPre() {
            const storedToken = localStorage.getItem("userToken")

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken)
                    const userId = decoded.id

                    fetch(`http://localhost:5000/lay-hinh-anh-hien-thi/${id}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.status) {
                                setAtb(data.data)
                            }
                        });

                } catch (error) {
                    console.error("Lỗi giải mã token:", error);
                }
            }

        }

        ttsp()
        getPre()
    }, [])

    if (!sp) return <div>Đang tải...</div>

    return (
        <>

            <div
                className="them-anh-sp"
                style={{
                    display: opa ? "flex" : "none"
                }}
            >
                <div className="them-anh__container">
                    <div className="them-anh__header">
                        <div className="them-anh__title">
                            Thêm ảnh sản phẩm
                        </div>

                        <div className="them-anh__close" onClick={() => setOpa(false)}>
                            X
                        </div>
                    </div>

                    <div className="them-anh__body">
                        <input type="file" className="them-anh__file" onChange={(e) => setFiletoadd(e.target.files[0])} />

                        <div className="them-anh__submit" onClick={() => addNew()}>Thêm ảnh mới</div>
                    </div>
                </div>
            </div>

            <div
                className="black-screen"
                style={{
                    backgroundColor: "black",
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    opacity: ".5",
                    zIndex: "3",
                    display: opa ? "block" : "none"
                }}
            ></div>
            <Navbar />

            <div className="san-pham-page">
                <div className="san-pham__container">
                    <div className="san-pham__title">
                        THÔNG TIN SẢN PHẨM
                    </div>

                    <div className="san-pham__content">
                        <div className="san-pham__thong-tin">

                            <div className="san-pham__anh">

                                <div
                                    className="san-pham__pics"
                                    style={{ backgroundImage: pre ? `url(http://localhost:5000${pre})` : `url(http://localhost:5000${sp.anhsanpham})` }}
                                ></div>

                                <div className="san-pham__gal">

                                    <div className="san-pham__gal-container">


                                        <div
                                            className="san-pham__gal-items"
                                        >
                                            <div
                                                className="san-pham__gal-items-image"
                                                style={{
                                                    backgroundImage: `url(http://localhost:5000${sp.anhsanpham})`,
                                                    opacity: (pre == sp.anhsanpham) ? 1 : ((hoverid === 0) ? 1 : .5),
                                                    transition: ".3s ease"
                                                }}
                                                onClick={() => {
                                                    setPre(sp.anhsanpham)
                                                    setCurId(0)
                                                }}

                                                onMouseEnter={() => {
                                                    setHoverid(0)
                                                }}

                                                onMouseLeave={() => {
                                                    setHoverid(null)
                                                }}
                                            >
                                            </div>
                                        </div>
                                        {atb.map((a) => (
                                            <div
                                                key={a.previewid}
                                                className="san-pham__gal-items"
                                            >
                                                <div
                                                    className="san-pham__gal-items-image"
                                                    style={{ 
                                                        backgroundImage: `url(http://localhost:5000${a.preurl})`,
                                                        opacity: (pre == a.preurl) ? 1 : ((hoverid === a.previewid) ? 1 : .5),
                                                    transition: ".3s ease"
                                                    }}

                                                    onMouseEnter={() => {
                                                        setHoverid(a.previewid)
                                                    }}

                                                    onMouseLeave={() => {
                                                        setHoverid(null)
                                                    }}
                                                    onClick={() => {
                                                        setPre(a.preurl)
                                                        setCurId(a.previewid)
                                                    }}
                                                ></div>
                                                <div className="san-pham__gal-items-delete" style={{ display: author ? "flex" : "none" }} onClick={() => handleDeletePreview(a.idmathang, a.previewid)}>
                                                    X
                                                </div>
                                            </div>
                                        ))}
                                        <div className="san-pham__gal-items-add" style={{ display: author ? "flex" : "none" }} onClick={() => {
                                            setOpa(true)
                                        }}>
                                            +
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="san-pham__info">
                                <div className="san-pham__ten-san-pham">
                                    {sp.tenmathang}
                                </div>

                                <div className="san-pham__gia-ban">
                                    <span>Giá: </span>{sp.giaban.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                </div>

                                <div className="san-pham__nguoi-ban">
                                    <span>Người bán: </span> {sp.username}
                                </div>

                                <div className="san-pham__mo-ta">
                                    <span>Mô tả sản phẩm: </span> {sp.mota}
                                </div>

                                <div className="san-pham__buttons">
                                    <div className="san-pham__gio-hang">
                                        <IonIcon className='icon' icon={cart}></IonIcon> Thêm vào giỏ hàng
                                    </div>

                                    <div className="san-pham__mua-ngay">
                                        <IonIcon className='icon' icon={card}></IonIcon> Mua ngay
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

export default ThongTinSanPham