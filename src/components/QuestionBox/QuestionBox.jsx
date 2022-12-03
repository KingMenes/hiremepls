import "./QuestionBox.css";
import { NavLink } from "react-router-dom";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { BiComment } from "react-icons/bi";

function QuestionBox({
  id,
  question,
  author,
  date,
  rep,
  tags,
  views,
  numComments,
}) {
  return (
    <div className="questionBox">
      <div className="repCount">
        <BsHandThumbsUp className="icn i-u" />
        <span>{rep}</span>
        <BsHandThumbsDown className="icn i-d" />
      </div>
      <div className="box-section1">
        <div className="user-info">
          Asked by <span>{author}</span> {date}
        </div>
        <div className="question">
          <span>{question}</span>
        </div>
        <div className="tags">
          {tags.map((tag) => (
            <div className="tag">
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
      {/* <NavLink to={`/questions/${id}`} className="question">
          {question}
        </NavLink> */}
    </div>
  );
}

export default QuestionBox;
