import "./QuestionBox.css";
// import { NavLink } from "react-router-dom";
import {
  BsHandThumbsUp,
  BsHandThumbsDown,
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import useDeleteQuestionModal from "../../hooks/useDeleteQuestionModal";
import useQuestionModal from "../../hooks/useQuestionModal";
import DeleteQuestion from "./deleteQuestion";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuestion, repQuestion } from "../../store/questions";
import { NavLink } from "react-router-dom";
import QuestionPostOpen from "../QuestionPostOpen/QuestionPostOpen";

function QuestionBox({
  id,
  question,
  author,
  date,
  rep,
  tags,
  views,
  authorName,
  comments,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [questionId, setQuestionId] = useState();
  const { questionModalOpen, questionClose, questionOpen } = useQuestionModal();
  const { deleteQuestionModalOpen, deleteQuestionClose, deleteQuestionOpen } =
    useDeleteQuestionModal();

  const tagsList = tags.map((tag) => (
    <div className="tag" key={tag}>
      <span>{tag}</span>
    </div>
  ));

  return (
    <div
      className="questionBox"
      onClick={async (e) => {
        await dispatch(incrementQuestion({ id }));
        e.stopPropagation();
        questionOpen();
      }}
    >
      <div className="repCount">
        {rep.likes && rep.likes[user?.username] ? (
          <BsFillHandThumbsUpFill
            className="icn i-u"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (user) {
                await dispatch(
                  repQuestion({
                    id,
                    username: user.username,
                    user,
                    rep: "like",
                  })
                );
              }
            }}
          />
        ) : (
          <BsHandThumbsUp
            className="icn i-u"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (user) {
                await dispatch(
                  repQuestion({
                    id,
                    username: user.username,
                    user,
                    rep: "like",
                  })
                );
              }
            }}
          />
        )}

        <span>{rep?.likes?.count - rep?.dislikes?.count}</span>
        {rep.dislikes && rep.dislikes[user?.username] ? (
          <BsFillHandThumbsDownFill
            className="icn i-u"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (user) {
                await dispatch(
                  repQuestion({
                    id,
                    username: user.username,
                    user,
                    rep: "dislike",
                  })
                );
              }
            }}
          />
        ) : (
          <BsHandThumbsDown
            className="icn i-u"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (user) {
                await dispatch(
                  repQuestion({
                    id,
                    username: user.username,
                    user,
                    rep: "dislike",
                  })
                );
              }
            }}
          />
        )}
      </div>
      <div className="box-section1">
        <div className="user-info">
          Asked by <span>{authorName}</span> {date} ago
        </div>
        <div className="question">
          <span>{question}</span>
        </div>
        <div className="tags">{tagsList}</div>
      </div>
      <div className="engagement">
        <div>
          <AiOutlineEye className="icn" /> <span>{views}</span> Views
        </div>
        <div>
          <BiComment className="icn" /> <span>{comments.length}</span> Answers
        </div>
      </div>
      {user && author === user?._id && (
        <NavLink
          id="update-btn"
          data-tooltip-content="Update Question"
          to={`/updatequestion/${id}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FiEdit className="icn icn-update" />
        </NavLink>
      )}
      {user && author === user?._id && (
        <motion.div
          data-tooltip-content="Delete Question"
          className="btn-delete"
          id="button-delete"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            deleteQuestionOpen();
            setQuestionId(id);
          }}
        >
          <TiDelete className="icn-delete" />
        </motion.div>
      )}
      <ModalContainer>
        {deleteQuestionModalOpen && (
          <DeleteQuestion
            modalOpen={deleteQuestionModalOpen}
            handleClose={deleteQuestionClose}
            id={id}
            user={user}
          />
        )}
      </ModalContainer>
      <ModalContainer>
        {questionModalOpen && (
          <QuestionPostOpen
            modalOpen={questionModalOpen}
            handleClose={questionClose}
            question={question}
            author={authorName}
            user={author}
            date={date}
            id={id}
            comments={comments}
            rep={rep}
            tags={tags}
          />
        )}
      </ModalContainer>
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
