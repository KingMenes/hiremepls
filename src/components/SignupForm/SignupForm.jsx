import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
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

const usernameRegex = /^[a-zA-Z0-9]+$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

function SignupForm({ handleClose, setSessionUser }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [throwError, setThrowError] = useState(null);
  const { username, email, password, password2 } = formData;

  // const navigate = useNavigate()
  const dispatch = useDispatch();

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
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
      confirmPassword: password2,
    };

    const res = await dispatch(registerUser(userData));

    if (res?.payload?.username == userData.username) {
      setSessionUser(res.payload);
      handleClose();
    }

  };

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
          <form onSubmit={onSubmit}>
            <div className="user-box">
              <input
                type="text"
                name="username"
                onChange={onChange}
                id="username"
                value={username}
                minlength="6"
                maxLength="36"
                required
              />
              <label>Set Username</label>
              {!formData.username.match(usernameRegex) &&
                formData.username.length > 5 && (
                  <span className="error">
                    Username must not contain special characters
                  </span>
                )}
              {throwError == "Username already used" &&
                console.log(throwError) && (
                  <span className="error">Username already exists</span>
                )}
            </div>
            <div className="user-box">
              <input
                type="email"
                name="email"
                onChange={onChange}
                id="email"
                value={email}
                minLength="3"
                required
              />
              <label>Email Address</label>
              {!formData.email.match(emailRegex) &&
                formData.email.length > 2 && (
                  <span className="error">Must be a valid Email</span>
                )}
              {throwError == "Email already used" &&
                console.log(throwError) && (
                  <span className="error">Email currently in use</span>
                )}
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                onChange={onChange}
                id="password"
                value={password}
                minLength="8"
                required
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
                required
              />
              <label>Confirm Password</label>
              {formData.password !== formData.password2 &&
                formData.password.length > 7 && (
                  <span className="error">Passwords don't match</span>
                )}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default SignupForm;
