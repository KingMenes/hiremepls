import { useEffect, useState } from "react";
import QuestionBox from "../QuestionBox/QuestionBox";
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
              <QuestionBox
                id={question._id}
                question={question.question}
                author={"menai"}
                date={"3h ago"}
                rep={Math.floor(Math.random() * (200 - -100 + 1) + -100)}
                tags={[
                  "general",
                  "engineering",
                  "software",
                  "management",
                  "personal",
                ]}
                views={Math.floor(Math.random() * (10000 - 0 + 1) + 0)}
                numComments={Math.floor(Math.random() * (100 - 0 + 1) + 0)}
              />
            );
          })
        : null}
    </div>
  );
}

export default TestFetch;
