import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <footer>
        <div className="products">
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
        <div className="company">
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
        <div className="support">
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
        <div className="socials">
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
      <span>© {new Date().getFullYear()} HireMePls. All rights reserved</span>
    </div>
  );
}

export default Footer;
