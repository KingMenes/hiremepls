import { useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop";
import { FiLogIn } from "react-icons/fi";
import "./LoginForm.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

function LoginForm({ handleClose, user, setSessionUser }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      login({
        username: username.toLowerCase(),
        password,
        email: username.toLowerCase(),
      })
    );
    if (
      res.payload?.username?.toLowerCase() === username.toLowerCase() ||
      res?.payload?.email?.toLowerCase() === username.toLowerCase()
    ) {
      setSessionUser(res.payload);
      handleClose();
    }
    if (res.payload?.error) {
      setError(res.payload.error);
    }
  };
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="login-box">
          <h2>
            Login
            <FiLogIn />
          </h2>

          <div className="error-display-login">{error}</div>

          <form onSubmit={onSubmit}>
            <div className="user-box">
              <input
                type="text"
                name=""
                required=""
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <label>Username/Email</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name=""
                required=""
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label>Password</label>
            </div>
            <button>
              Submit
            </button>
          </form>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default LoginForm;
