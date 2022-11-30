import logo from "../../assets/hiremepls_logo.svg";
import { MdMenu } from "react-icons/md";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import { AnimatePresence, motion } from "framer-motion";
import useLoginModal from "../../hooks/useLoginModal";
import useSignupModal from "../../hooks/useSignupModal";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import { useDispatch, useSelector } from "react-redux"
import { logout, login } from "../../store/session"
import { useState, useEffect } from 'react'

function Navbar() {

  const dispatch = useDispatch()
  const session = useSelector(state => state.session)
  let log = false
  if (session) {
    log = true
  }
  const { loginModalOpen, loginClose, loginOpen } = useLoginModal();
  const { signupModalOpen, signupClose, signupOpen } = useSignupModal();
  const [loggedIn, setLoggedIn] = useState(log)

  const handleLogout = async (e) => {
    e.preventDefault()
    await dispatch(logout())
    setLoggedIn(!loggedIn)
    return
  }

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
        {loggedIn && <motion.button
          className="btn-login"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={loginOpen}
        >
          <span>Login</span>
        </motion.button>}
        {loggedIn && <motion.button
          className="btn-signup"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={signupOpen}
        >
          <span>Sign Up</span>
        </motion.button>}
        {!loggedIn && <motion.button
          className="btn-login"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
        >
          <span>Log out</span>
        </motion.button>}

        <ModalContainer>
          {loginModalOpen && (
            <LoginForm modalOpen={loginModalOpen} handleClose={loginClose} />
          )}
          {signupModalOpen && (
            <SignupForm modalOpen={signupModalOpen} handleClose={signupClose} />
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
