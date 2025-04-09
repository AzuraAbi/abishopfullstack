import Navbar from "../components/navbar";
import "../styles/home.css"
import { useEffect, useState } from "react";
import axios from "axios"
import { IonIcon } from "@ionic/react";
import { navigate, ticket } from "ionicons/icons";
import { useNavigate } from "react-router-dom";

function Home() {
    const [danhMucList, setDanhMucList] = useState([]);
    const [gysp, setGysp] = useState([])

    const navigate = useNavigate()

    function toSlug(str) {
        return str.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
    }

    useEffect(() => {
        axios.get("http://localhost:5000/danhmuc")
            .then((response) => {
                setDanhMucList(response.data);
            })
            .catch((error) => console.error("Lỗi khi lấy danh mục:", error));

        fetch('http://localhost:5000/goi-y-san-pham')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setGysp(data.data);
                }
            })
            .catch(err => console.error('Lỗi khi fetch:', err));
    }, []);


    return (
        <>
            <Navbar />

            <div className="danhmuc">
                <h2 className="danhmuc__title">DANH MỤC</h2>
                <div className="danhmuc__content">
                    <div className="danhmuc__container">

                        {danhMucList.map((danhmuc) => {
                            return <div className="danhmuc__items" key={danhmuc.idDanhmuc}>
                                <div className="danhmuc__items-image" style={{ backgroundImage: `url(../../${danhmuc.idDanhmuc}.webp)` }}></div>
                                <span className="danhmuc__items-text">{danhmuc.tenDanhmuc}</span>
                            </div>
                        })}
                    </div>
                </div>
            </div>

            <div className="flashsale">
                <div className="flashsale__container">
                    <h2 className="flashsale__title"> <IonIcon icon={ticket}></IonIcon> FLASH SALE</h2>
                    <div className="flashsale__content">

                    </div>
                </div>
            </div>

            <div className="voucher">

            </div>

            <div className="goiysanpham">
                <div className="goi-y__container">
                    <div className="goi-y__title">GỢI Ý SẢN PHẨM</div>
                    <div className="goi-y__content">
                        {
                            gysp.map((sp) => {
                                const slug = `${sp.idmathang}-${toSlug(sp.tenmathang)}`;
                                return (
                                    <div key={sp.idmathang} className="mathang__items" onClick={() => navigate(`/san-pham/${slug}`)}>
                                        <div
                                            className="mathang__pic"
                                            style={{ backgroundImage: `url(http://localhost:5000${sp.anhsanpham})` }}
                                        >

                                        </div>

                                        <div className="mathang__info">
                                            <div className="mathang__name">
                                                {sp.tenmathang}
                                            </div>

                                            <div className="mathang__seller">
                                                {sp.username}
                                            </div>

                                            <div className="mathang__price">
                                                {sp.giaban.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
