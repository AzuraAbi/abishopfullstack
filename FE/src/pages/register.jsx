import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import "../styles/register.css"
import { IonIcon } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { registerUser } from "../helpers/registerHelper";

function Register() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [cfpassword, setCfpassword] = useState("")

  const [serverError, setServerError] = useState("")

  const [passcheck, setPasscheck] = useState(false)
  const [cfpasscheck, setcfPasscheck] = useState(false)

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    phone: false,
    password: false,
    cfpassword: false
  })

  const [regError, setRegError] = useState({ status: false, err: ""})

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    let newErrors = {
      username: false,
      email: false,
      phone: false,
      password: false,
      cfpassword: false
    }
    
    if (!username) newErrors.username = true
    if (!email) newErrors.email = true
    if (!phone) newErrors.phone = true
    if (!password) newErrors.password = true
    if ((!cfpassword) ||(cfpassword !== password)) newErrors.cfpassword = true

    let newRegErr = { status: false, err: "" }
    setErrors(newErrors)
    setRegError(newRegErr)

    if (newErrors.username || newErrors.email || newErrors.phone || newErrors.password || newErrors.cfpassword) return

    const result = await registerUser(username, email, phone, password);

    if(result.success) {
      navigate("/login")
    } else {
      const msg = result.msg
      setRegError({ status: true, err: msg})
    }
  }

  return (
    <>
      <Navbar />

      <div className="register-page">
        <div className="register__container">
          <h2 className="register__title">Đăng ký</h2>

          <span
            className="__form-register-error"
            style={{ opacity: regError.status ? 1 : 0}}
          >
            {regError.status ? regError.err : ""}
          </span>

          <div className="register__form">
            <form onSubmit={handleRegister}>
              <div className="register__form-input">
                <input
                  type="text"
                  className="reg-input"
                  placeholder="Tên người dùng"
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <span
                className="register-error"
                style={{ opacity: errors.username ? 1 : 0 }}
              >
                Vui lòng điền phần này
              </span>
              <div className="register__form-input">
                <input
                  type="text"
                  className="reg-input"
                  placeholder="Địa chỉ email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>
              <span
                className="register-error"
                style={{ opacity: errors.email ? 1 : 0 }}
              >
                Vui lòng điền phần này
              </span>
              <div className="register__form-input">
                <input
                  type="text"
                  className="reg-input"
                  placeholder="Số điện thoại"
                  maxLength={10}
                  autoComplete="off"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

              </div>
              <span
                className="register-error"
                style={{ opacity: errors.phone ? 1 : 0 }}
              >
                Vui lòng điền phần này
              </span>
              <div className="register__form-input reg-form__password">
                <input
                  type={passcheck ? "text" : "password"}
                  className="reg-input"
                  placeholder="Mật khẩu"
                  autoComplete="off"
                  maxLength={20}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="reg-pass-eye" className="reg-pass-toggle">
                  {passcheck ? <IonIcon icon={eyeOff}></IonIcon> : <IonIcon icon={eye}></IonIcon>}
                  
                </label>
                <input 
                  type="checkbox" 
                  className="reg-pass-check" 
                  name="reg-pass-eye" 
                  id="reg-pass-eye"
                  checked={passcheck}
                  onChange={() => {
                    setPasscheck(!passcheck)
                  }}
                />
              </div>
              <span
                className="register-error"
                style={{ opacity: errors.password ? 1 : 0 }}
              >
                Vui lòng điền phần này
              </span>
              <div className="register__form-input reg-form__password">
                <input
                  type={cfpasscheck ? "text" : "password"}
                  className="reg-input"
                  placeholder="Xác nhận mật khẩu"
                  autoComplete="off"
                  maxLength={20}
                  value={cfpassword}
                  onChange={(e) => setCfpassword(e.target.value)}
                />
                <label htmlFor="reg-cf-pass-eye" className="reg-pass-toggle">
                  {cfpasscheck ? <IonIcon icon={eyeOff}></IonIcon> : <IonIcon icon={eye}></IonIcon>}
                  
                </label>
                <input 
                  type="checkbox"
                  className="reg-pass-check" 
                  name="reg--cf-pass-eye" 
                  id="reg-cf-pass-eye" 
                  checked={cfpasscheck}
                  onChange={() => setcfPasscheck(!cfpasscheck)}
                />

              </div>
              <span
                className="register-error"
                style={{ opacity: errors.cfpassword ? 1 : 0 }}
              >
                Mật khẩu không khớp
              </span>

              {serverError && <p className="server-error">{serverError}</p>}

              <input type="submit" className="register__form-submit" value="Đăng ký" />
            </form>

            <div className="reg__stuff">
              <div className="reg__to-login">
                Bạn đã có tài khoản? <Link className="register__to-login-button" to="/login">Đăng nhập</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;
