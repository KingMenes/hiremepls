import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./TestFetch.css";

function TestFetch() {
  const [questions, setQuestions] = useState();
  const fetchQuestions = async () => {
    const res = await fetch("/api/questions", {
      method: "GET",
    });
    if (res.ok) {
      const questions = await res.json();
      setQuestions(questions);
      return;
    }
  };
  // console.log(questions);
  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div id="questionsContainer">
      {questions
        ? questions.map((question) => {
            return (
              <div className="questionBox">
                <NavLink to={`/questions/${question._id}`} className="question">
                  {question.question}
                </NavLink>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default TestFetch;
