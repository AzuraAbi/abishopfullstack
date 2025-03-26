import "./navbar.css"
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { search, menu, personCircle } from "ionicons/icons";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("usertoken");
    if(storedToken) {
      try {
        const decoded = jwtDecode(token);

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
      }
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__content">
        <Link to="/home" className="nav__logo">
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

        <div className="nav__account">
          <div className="account__container">
            <div className="account__button">
              <span className="account__username">{user?.username || "Guest"}</span>
              <IonIcon className="icon" icon={personCircle}></IonIcon>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
