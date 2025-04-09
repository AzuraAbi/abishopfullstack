import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import "../styles/sanpham.css"
import { jwtDecode } from 'jwt-decode';
import { IonIcon } from '@ionic/react';
import { cart, card } from 'ionicons/icons';

function ThongTinSanPham() {
    const { slug } = useParams();
    const id = slug.split('-')[0];
    const [sp, setSp] = useState(null);
    const [author, setAuthor] = useState(false)
    const [atb, setAtb] = useState([])
    const [pre, setPre] = useState("")
    const [opa, setOpa] = useState(false)

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

        ttsp()
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

                        <div className="them-anh__close">
                            X
                        </div>
                    </div>

                    <div className="them-anh__body">
                        <input type="file" className="them-anh__file" />

                        <div className="them-anh__submit">Thêm ảnh mới</div>
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
                                    <div className="san-pham__gal-items" style={{ backgroundImage: `url(http://localhost:5000${sp.anhsanpham})` }}></div>
                                    {atb.map((a) => (
                                        <div className="san-pham__gal-items">
                                            <div className="san-pham__gal-items-delete" style={{ display: author ? "flex" : "none" }}>
                                                X
                                            </div>
                                        </div>
                                    ))}
                                    <div className="san-pham__gal-items-add" onClick={() => {
                                        setOpa(true)
                                    }}>
                                        +
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