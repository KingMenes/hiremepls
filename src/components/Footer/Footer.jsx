import "./Footer.css";
import logo from "../../assets/hiremepls_logo.svg";

function Footer() {
  return (
    <div className="footer">
      <footer>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="products footer-header">
          <span>Products</span>
          <ul>
            <li>
              <a href="">Option 1</a>
            </li>
            <li>
              <a href="">Option 2</a>
            </li>
            <li>
              <a href="">Option 3</a>
            </li>
          </ul>
        </div>
        <div className="company footer-header">
          <span>Company</span>
          <ul>
            <li>
              <a href="">Option 1</a>
            </li>
            <li>
              <a href="">Option 2</a>
            </li>
            <li>
              <a href="">Option 3</a>
            </li>
          </ul>
        </div>
        <div className="support footer-header">
          <span>Support</span>
          <ul>
            <li>
              <a href="">Option 1</a>
            </li>
            <li>
              <a href="">Option 2</a>
            </li>
            <li>
              <a href="">Option 3</a>
            </li>
          </ul>
        </div>
        <div className="socials footer-header">
          <span>Socials</span>
          <ul>
            <li>
              <a href="">Facebook</a>
            </li>
            <li>
              <a href="">Twitter</a>
            </li>
            <li>
              <a href="">Instagram</a>
            </li>
          </ul>
        </div>
      </footer>
      <span className="copyright">
        © {new Date().getFullYear()} HireMePls. All rights reserved.
      </span>
    </div>
  );
}

export default Footer;
