import { useEffect, useState } from "react";
import QuestionBox from "../QuestionBox/QuestionBox";
import "./TestFetch.css";
import { getQuestions } from "../../store/questions";
import { useDispatch, useSelector } from "react-redux";

function TestFetch() {
  const dispatch = useDispatch()
  const questions = useSelector(state => state.questions)

  useEffect(() => {
    dispatch(getQuestions())
  }, [dispatch]);

  return (
    <div id="questionsContainer">
      {questions
        ? Object.values(questions).map((question) => {
          return (
            <QuestionBox
              id={question._id}
              question={question.question}
              author={question.author}
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
              key={question._id}
            />
          );
        })
        : null}
    </div>
  );
}

export default TestFetch;
