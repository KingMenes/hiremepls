import "./QuestionBox.css";
// import { NavLink } from "react-router-dom";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import Backdrop from "../Backdrop/Backdrop";
import useDeleteQuestionModal from "../../hooks/useDeleteQuestionModal";
import DeleteQuestion from "./deleteQuestion";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuestion } from "../../store/questions"

function QuestionBox({
  id,
  question,
  author,
  date,
  rep,
  tags,
  views,
  numComments,
  authorName
}) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user);
  const [questionId, setQuestionId] = useState();
  const { deleteQuestionModalOpen, deleteQuestionClose, deleteQuestionOpen } =
    useDeleteQuestionModal();
  return (
    <div className="questionBox" onClick={async (e) => { await dispatch(incrementQuestion({ id })) }}>
      <div className="repCount">
        <BsHandThumbsUp className="icn i-u" />
        <span>{rep}</span>
        <BsHandThumbsDown className="icn i-d" />
      </div>
      <div className="box-section1">
        <div className="user-info">
          Asked by <span>{authorName}</span> {date} ago
        </div>
        <div className="question">
          <span>{question}</span>
        </div>
        <div className="tags">
          {tags.map((tag) => (
            <div className="tag" key={tag}>
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="engagement">
        <div>
          <AiOutlineEye className="icn" /> <span>{views}</span> Views
        </div>
        <div>
          <BiComment className="icn" /> <span>{numComments}</span> Answers
        </div>
      </div>
      {user && author === user?._id && (
        <motion.button
          className="btn-signup"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            deleteQuestionOpen();
            setQuestionId(id);
          }}
        >
          <span>Delete</span>
        </motion.button>
      )}
      <ModalContainer>
        {deleteQuestionModalOpen && (
          <DeleteQuestion
            modalOpen={deleteQuestionModalOpen}
            handleClose={deleteQuestionClose}
            id={id}
          />
        )}
      </ModalContainer>
      {/* <NavLink to={`/questions/${id}`} className="question">
          {question}
        </NavLink> */}
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
export default QuestionBox;
