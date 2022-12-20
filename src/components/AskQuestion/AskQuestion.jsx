import "./AskQuestion.css";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import useQuestionModal from "../../hooks/useQuestionModal";
import { AnimatePresence, motion } from "framer-motion";
import QuestionPostForm from "../QuestionPostForm/QuestionPostForm";

function AskQuestion({ sessionUser, setSessionUser }) {

  const { questionModalOpen, questionClose, questionOpen } = useQuestionModal()

  return (
    <div className="askquestion">
      <ModalContainer>
        {questionModalOpen && (
          <QuestionPostForm handleClose={questionClose} />
        )}
      </ModalContainer>
      <div>
        <img src="https://thispersondoesnotexist.com/image" alt="" />
        <div className="question-input">
          <HiOutlineChatBubbleLeftEllipsis className="icon" />
          {/* <NavLink to="/askquestion"> */}
          <input type="text" placeholder="Ask a Question" onClick={questionOpen} />
          {/* </NavLink> */}
        </div>
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

export default AskQuestion;
