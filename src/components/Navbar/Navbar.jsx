import logo from "../../assets/hiremepls_logo.svg";
import { MdMenu } from "react-icons/md";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";

function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-main">
        <div className="nav-section1">
          <MdMenu className="menu-icon" />
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </div>

        <nav>
          <ul>
            <li>
              <a>Option 1</a>
            </li>
            <li>
              <a>Option 2</a>
            </li>
            <li>
              <a>Option 3</a>
            </li>
          </ul>
        </nav>
        <SearchBar />
        <button className="btn-login">
          <span>Login</span>
        </button>
        <button className="btn-signup">
          <span>Sign Up</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
