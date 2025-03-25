import { Search } from "react-ionicons"
import "./Navbar.css"
import logo from "../assets/abu.webp"

function Navbar() {
  return (
    <nav className="navbar">
        <div className="navbar-content">
            <div className="navbar-logo navbar-item">
                <a href="home.html">
                    <img src={logo} alt="" />
                    <span> Abi Shop</span>
                </a>
            </div>

            <div className="navbar-search navbar-item">
                <div className="searchbar">
                    <input type="text" className="search-input" placeholder="Nhập từ khóa..." />
                    <div className="search-btn"><Search className=""/></div>
                </div>
            </div>

            <div className="navbar-category navbar-item">
                <div className="category-button">
                    <ion-icon name="menu"></ion-icon> Danh mục
                </div>
            </div>

            <div className="navbar-account navbar-item">
                <div className="user-btn">
                    <span className="user-name">Guest</span>
                    <ion-icon name="person-circle"></ion-icon>
                </div>

                <div className="user-dropdown">
                    <div className="nologin navbar-account-drop">
                        <ul>
                            <li className="open-login">Đăng nhập</li>
                            <li className="open-reg">Đăng ký</li>
                        </ul>
                    </div>

                    <div className="logged navbar-account-drop">
                        <ul>
                            <li className="taikhoan-btn">Tài khoản</li>
                            <li className="giohang-btn">Giỏ hàng</li>
                            <li className="settings-btn">Cài đặt</li>
                            <li className="logout-btn">Đăng xuất</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;
