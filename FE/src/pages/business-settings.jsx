import Navbar from "../components/navbar"
import AccountTemplate from "../components/account"
import "../styles/bussinesssettings.css"


function BusinessSettings () {
    return (
        <>
            <Navbar />

            <div className="business-page">
                <div className="business-page__container">
                    <AccountTemplate />
                    
                    <div className="business-page__content">
                        <div className="business-page__title">Tài khoản doanh nghiệp</div>

                        <div className="business-page__main">

                            <div className="business__header">
                                <div className="business__create-new">
                                    Thêm sản phẩm
                                </div>
                            </div>

                            <div className="busness__body">

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BusinessSettings