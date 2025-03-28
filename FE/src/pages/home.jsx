import Navbar from "../components/navbar";
import "../styles/home.css"

function Home() {
    return (
        <>
            <Navbar />

            <div className="danhmuc">
                <h2 className="danhmuc__title">DANH MỤC</h2>
                <div className="danhmuc__content">
                    <div className="danhmuc__container">
                        <div className="danhmuc__items">
                            <div className="danhmuc__items-image"></div>
                            <span className="danhmuc__items-text">THỜI TRANG NAM</span>
                        </div>
                        <div className="danhmuc__items">
                            <div className="danhmuc__items-image"></div>
                            <span className="danhmuc__items-text">THỜI TRANG NAM</span>
                        </div>
                        <div className="danhmuc__items">
                            <div className="danhmuc__items-image"></div>
                            <span className="danhmuc__items-text">THỜI TRANG NAM</span>
                        </div>
                        <div className="danhmuc__items">
                            <div className="danhmuc__items-image"></div>
                            <span className="danhmuc__items-text">THỜI TRANG NAM</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flashsale">

            </div>

            <div className="voucher">

            </div>

            <div className="goiysanpham">

            </div>
        </>
    )
}

export default Home;
