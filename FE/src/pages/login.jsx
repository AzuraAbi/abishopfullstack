import Navbar from "../components/navbar";
import '../styles/login.css'

function Login() {
    return (
        <>
            <Navbar />

            <div className="login-page">
                <div className="login__container">
                    <h2 className="login__title">Đăng nhập</h2>
                    <div className="login__form">
                        <form>
                            <div className="login__form-input">
                                <input type="text" id="login-username" placeholder="Email/Số điện thoại" autoComplete="false" />
                            </div>
                            <div className="login__form-input">
                                <input type="password" id="login-password" placeholder="Mật khẩu" autoComplete="false" maxLength={20} />
                            </div>
                        </form>
                    </div>

                    <div className="login__stuff">

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login