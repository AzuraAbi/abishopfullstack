import Navbar from "../components/navbar";
import "../styles/home.css"
import { useEffect, useState } from "react";
import axios from "axios"
import { IonIcon } from "@ionic/react";
import { ticket } from "ionicons/icons";

function Home() {
    const [danhMucList, setDanhMucList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/danhmuc")
            .then((response) => {
                setDanhMucList(response.data);
            })
            .catch((error) => console.error("Lỗi khi lấy danh mục:", error));
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
                                <div className="danhmuc__items-image" style={{ backgroundImage: `url(../../${danhmuc.idDanhmuc}.webp)`}}></div>
                                <span className="danhmuc__items-text">{danhmuc.tenDanhmuc}</span>
                            </div>
                        })}
                    </div>
                </div>
            </div>

            <div className="flashsale">
                <div className="flashsale__container">
                    <h2 className="flashsale__title"> <IonIcon icon={ticket}></IonIcon> FLASH SALE</h2>
                    <div className="flashsale__content"></div>
                </div>
            </div>

            <div className="voucher">

            </div>

            <div className="goiysanpham">
                
            </div>
        </>
    )
}

export default Home;
