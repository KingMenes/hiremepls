import "./AskQuestion.css";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

function AskQuestion({ sessionUser, setSessionUser }) {
  return (
    <div className="askquestion">
      <div>
        <img src="https://thispersondoesnotexist.com/image" alt="" />
        <div className="question-input">
          <HiOutlineChatBubbleLeftEllipsis className="icon" />
          <NavLink to="/askquestion">
            <input type="text" placeholder="Ask a Question" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default AskQuestion;