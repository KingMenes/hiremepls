import "./QuestionPostOpen.css";
import Backdrop from "../Backdrop/Backdrop";
import { motion } from "framer-motion";

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
  return (
    <Backdrop onClick={handleClose}>
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
            <form>
              <input type="text" name="comment" id="comment" />
              <button>Add Comment</button>
            </form>
          </div>
          <div className="comments">
            {/* {comments.map((comment) => {
              return (
                <div className="commentContainer">
                  {comment}
                </div>
              )
            })} */}
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default QuestionPostOpen;
