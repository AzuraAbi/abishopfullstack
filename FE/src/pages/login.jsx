import Navbar from "../components/navbar";
import '../styles/login.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { IonIcon } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { loginUser } from "../helpers/loginHelper.js";

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({ username: false, password: false })
    const [logError, setLogError] = useState(false)
    const [serverError, setServerError] = useState("")
    const navigate = useNavigate()

    const handleLogin = async(e) => {
        e.preventDefault()

        let newErrors = { username: false, password: false };

        if (!username) newErrors.username = true;
        if (!password) newErrors.password = true;

        let newLogErr = false

        setLogError(newLogErr)
        setErrors(newErrors);

        if (newErrors.username || newErrors.password) return;

        const result = await loginUser(username, password);
        if (result.success) {
          navigate("/");
        } else {
            setLogError(true)
            setErrors(result.message);
        }
    }


    return (
        <>
            <Navbar />

            <div className="login-page">
                <div className="login__container">
                    <h2 className="login__title">Đăng nhập</h2>
                        <span 
                            className="__form-login-error"
                            style={{ opacity: logError ? 1 : 0}}
                        >
                            Tài khoản hoặc mật khẩu không chính xác
                        </span>
                    <div className="login__form">
                        <form onSubmit={handleLogin}>
                            <div className="login__form-input">
                                <input 
                                    type="text" 
                                    className="input-main" 
                                    placeholder="Email/Số điện thoại" 
                                    autoComplete="off" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <span 
                                className="login-error" 
                                style={{ opacity: errors.username ? 1 : 0}}
                            >
                                Vui lòng điền phần này
                            </span>
                            <div className="login__form-input login__form-password">
                                <input 
                                    type="password" 
                                    className="input-main" 
                                    placeholder="Mật khẩu" 
                                    autoComplete="off" 
                                    maxLength={20} 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label htmlFor="login-password-eye" className="login-password-toggle"><IonIcon icon={eye}></IonIcon></label>
                                <input type="checkbox" name="login-password-eye" id="login-password-check" />
                            </div>
                            <span 
                                className="login-error"
                                style={{ opacity: errors.password ? 1 : 0 }}
                            >
                                Vui lòng điền phần này
                            </span>

                            {serverError && <p className="server-error">{serverError}</p>}

                            <input type="submit" className="login__form-submit" value="Đăng nhập" />
                        </form>
                    </div>
                    <div className="login__stuff">
                        <div className="login__forgot-password">
                            <Link className="__forgot-password-text" to="/register">Quên mật khẩu</Link>
                        </div>

                        <div className="login__to-register">
                            Bạn chưa có tài khoản? <Link className="login__to-register-button" to="/register">Đăng ký</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login