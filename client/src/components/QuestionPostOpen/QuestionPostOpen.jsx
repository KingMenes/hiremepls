import "./QuestionPostOpen.css";
import Backdrop from "../Backdrop/Backdrop";
import { motion } from "framer-motion";
import { useState } from "react";
import { updateQuestion } from "../../store/questions";
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
  comments,
}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  // STATES
  const [commentBody, setCommentBody] = useState({
    body: "",
  });
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sessionUser) {
      setErrors("Must be logged in!");
      return;
    }
    const comment = {
      body: commentBody.body,
      user: sessionUser,
      date: new Date(),
      reputation: [0, 0],
      
    }
    const data = await dispatch(
      updateQuestion({
        comments: comments.push(comment),
      })
    ); //Object to POST

    console.log('Success!')
  };

    
  return (
    <Backdrop onClick={(e) => {
      e.stopPropagation()
      handleClose()
    }
    }>
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
          <div className="addComment row flex-center">
            <img src="https://thispersondoesnotexist.com/image" alt="" />
            <form className="row flex-center" onSubmit={handleSubmit}>
              <div className="commentInput">
                <input type="text" name="comment" id="comment" placeholder="Add an answer or comment ..." onChange={(e)=>setCommentBody(e.target.value)} />
              </div>
              <button type="submit">Add Answer</button>
            </form>
          </div>
          <div className="comments">
          <p>No answers, yet!<br /> Be the first to add one!</p>
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
