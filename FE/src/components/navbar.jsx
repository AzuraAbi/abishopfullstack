import "./navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { search, menu, personCircle } from "ionicons/icons";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("userData");

    if(storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const current_time = Date.now() / 1000

        if(decoded.exp < current_time) {
          localStorage.removeItem("userToken")
          localStorage.removeItem("userData")
          setUser(null)
        } else {
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }

        fetch(`http://localhost:5000/api/user/${decoded.id}`)
                .then(res => res.json())
                .then(data => {
                    console.log("User từ API:", data);
                    setUser(data);
                    localStorage.setItem("userData", JSON.stringify(data));
                })
                .catch(err => console.error("Lỗi lấy user:", err));
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
        setUser(null)
      }
    }

  }, []);

  const handleInfo = () => {
    if(localStorage.getItem("userToken")) {
      navigate("/accountinfo")
    } else {
      navigate("/login")
    }
  }

  const handleCart = () => {

  }

  const handleSettings = () => {

  }

  const handleLogout = () => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userData")
    setUser(null)
    navigate("/")
  }

  const handleToLogin = () => {
    navigate("/login")
  }
  
  const handleToRegister = () => {
    navigate("/register")
  }

  return (
    <nav className="navbar">
      <div className="navbar__content">
        <Link to="/" className="nav__logo">
          <div className="nav__logo-img"></div>
          <div className="nav__logo-text">Abi Shop</div>
        </Link>

        <div className="nav__searchbar">
          <div className="searchbar__container">
            <input type="text" placeholder="Nhập từ khóa..." className="__search-input" />
            <div className="__search-icon"><IonIcon icon={search}></IonIcon></div>
          </div>
        </div>

        <div className="nav__danhmuc">
          <div className="danhmuc__container">
            <div className="danhmuc__button"><IonIcon className="icon" icon={menu}></IonIcon>Danh mục</div>
          </div>
          <div className="danhmuc__dropbox">

          </div>
        </div>

        <div className="nav__account" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <div className="account__container">
            <div className="account__button">
              <span className="account__username">{user?.username || "Guest"}</span>
              <IonIcon className="icon" icon={personCircle}></IonIcon>
            </div>
          </div>

          <div 
            className="account__dropbox"
            style={{ visibility: hover ? "visible" : "hidden", opacity: hover ? 1 : 0}}
          >
            {user ? 
              <>
                <button className="account__dropbox-item" onClick={handleInfo}>Tài khoản</button>
                <button className="account__dropbox-item" onClick={handleCart}>Giỏ hàng</button>
                <button className="account__dropbox-item" onClick={handleSettings}>Cài đặt</button>
                <button className="account__dropbox-item" onClick={handleLogout}>Đăng xuất</button>
              </>
              :
              <>
                <button className="account__dropbox-item" onClick={handleToLogin}>Đăng nhập</button>
                <button className="account__dropbox-item" onClick={handleToRegister}>Đăng ký</button>
              </>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
