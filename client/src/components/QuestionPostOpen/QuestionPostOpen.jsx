import "./QuestionPostOpen.css";
import Backdrop from "../Backdrop/Backdrop";
import { motion } from "framer-motion";
import { useState } from "react";
import { addComment } from "../../store/questions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.05,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

function QuestionPostOpen({
  handleClose,
  question,
  author,
  date,
  body,
}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  // STATES
  const [commentBody, setCommentBody] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sessionUser) {
      setErrors("Must be logged in!");
      return;
    }
    const comment = {
      body: commentBody,
      user: sessionUser,
      date: new Date(),
      reputation: [0, 0],
    };

    const data = await dispatch(
      addComment({
        comment: comment,
      })
    ); //Object to POST
    
    console.log(data);
  };

  return (
    <Backdrop
      onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}
    >
      <motion.div
        className="questionmodal"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="questionpostopen flex-start col">
          <div className="questionContainer">
            <span>
              asked by {author} {date} ago
            </span>
            <h1>{question}</h1>
            <p>{body}</p>
          </div>
          {sessionUser && (<div className="addComment row flex-center">
            <img src="https://thispersondoesnotexist.com/image" alt="" />
            <form className="row flex-center" onSubmit={handleSubmit}>
              <div className="commentInput">
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder="Add an answer or comment ..."
                  onChange={(e) => setCommentBody(e.target.value)}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Add Answer
              </motion.button>
            </form>
          </div>)}
          
          <div className="comments">
            <p>
              No answers, yet!
              <br /> Be the first to add one!
            </p>
            {/* { comments.length === 0 ?
            <p>No answers, yet!<br /> Be the first to add one!</p>
              :
              comments.map((comment) => {
                return (
                  <div className="commentContainer">
                    {comment}
                  </div>)
              })
          } */}
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default QuestionPostOpen;
