import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { register, reset } from "../../features/auth/authSlice";
import Backdrop from "../Backdrop/Backdrop";
import { BsFillPersonLinesFill } from "react-icons/bs";
import "./SignupForm.css";
import Spinner from "../Spinner/Spinner";
import { registerUser } from "../../store/session";

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

function SignupForm({ handleClose, setSessionUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData;

  // const navigate = useNavigate()
  const dispatch = useDispatch()

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // )

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message)
  //   }

  //   if (isSuccess || user) {
  //     navigate('/')
  //   }

  //   dispatch(reset())
  // }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.password2) {
       // toast.error('Passwords do not match')
    } else {
      const userData = {
        username,
        email,
        password,
        confirmPassword: password2
      }

      const res = await dispatch(registerUser(userData))
      if (res.payload.username === userData.username) {
        handleClose()
        setSessionUser(res.payload)
      }
    }
  }

  // if (isLoading) {
  //   return <Spinner />
  // }

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
        <div className="signup-box">
          <h2>
            Sign Up
            <BsFillPersonLinesFill />
          </h2>
          <form
            onSubmit={onSubmit}
          >
            <div className="user-box">
              <input
                type="text"
                name="username"
                onChange={onChange}
                id="username"
                value={username}
              />
              <label>Set Username</label>
            </div>
            <div className="user-box">
              <input
                type="email"
                name="email"
                onChange={onChange}
                id="email"
                value={email}
              />
              <label>Email Address</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                onChange={onChange}
                id="password"
                value={password}
              />
              <label>Set Password</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password2"
                onChange={onChange}
                id="password2"
                value={password2}
              />
              <label>Confirm Password</label>
            </div>
            <button type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
          </form>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default SignupForm;
