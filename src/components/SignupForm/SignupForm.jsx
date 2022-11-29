import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import Backdrop from '../Backdrop/Backdrop';
import './SignupForm.css'

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

function SignupForm({handleClose}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const onSubmit = (e) => {
    e.preventDefault();
  };
    return (
        <Backdrop onClick={handleClose}>
      
        <motion.div
          onClick={(e) => e.stopPropagation()}  // Prevent click from closing modal
          className="modal"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
           

<div className="login-box">
  <h2>Login</h2>
  <form>
    <div className="user-box">
      <input type="text" name="" required=""/>
      <label>Username</label>
    </div>
    <div className="user-box">
      <input type="password" name="" required=""/>
      <label>Password</label>
    </div>
    <a href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
  </form>
</div>


        </motion.div>
       </Backdrop>
    )
}

export default SignupForm