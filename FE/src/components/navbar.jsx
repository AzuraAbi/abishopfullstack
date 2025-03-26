import "./navbar.css"
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { search, menu, personCircle } from "ionicons/icons";


function Navbar() {
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
              <span className="account__username">Azura Abi</span>
              <IonIcon className="icon" icon={personCircle}></IonIcon>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
