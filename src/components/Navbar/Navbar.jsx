import logo from "../../assets/hiremepls_logo.svg";
import { MdMenu } from "react-icons/md";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import { AnimatePresence, motion } from "framer-motion";
import useModal from "../../hooks/useModal";
import SignupForm from "../SignupForm/SignupForm";

function Navbar() {
  const { modalOpen, close, open } = useModal();

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
        <motion.button
          className="btn-login"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={open}
        >
          <span>Login</span>
        </motion.button>
        <motion.button
          className="btn-signup"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={open}
        >
          <span>Sign Up</span>
        </motion.button>
        <ModalContainer>
          {modalOpen && (
            <SignupForm modalOpen={modalOpen} handleClose={close} />
          )}
        </ModalContainer>
      </div>
    </div>
  );
}

const ModalContainer = ({ children, label }) => (
  // Enables the animation of components that have been removed from the tree
  <AnimatePresence
    // Disable any initial animations on children that
    // are present when the component is first rendered
    initial={false}
    // Only render one component at a time.
    // The exiting component will finish its exit
    // animation before entering component is rendered
    exitBeforeEnter={true}
  >
    {children}
  </AnimatePresence>
);

export default Navbar;
