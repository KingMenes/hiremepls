import { useEffect, useState } from "react";
import QuestionBox from "../QuestionBox/QuestionBox";
import "./TestFetch.css";
import { getQuestions } from "../../store/questions";
import { useDispatch, useSelector } from "react-redux";

function TestFetch() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  return (
    <div id="questionsContainer">
      {questions
        ? Object.values(questions).map((question) => {
          return (
            <QuestionBox
              id={question._id}
              question={question.question}
              author={question.author}
              date={timeSince(question.date)}
              rep={question.reputation[0] - question.reputation[1]}
              tags={question.tags}
              views={question.views}
              key={question._id}
              authorName={question.authorName}
            />
          );
        })
        : null}
    </div>
  );
}

export default TestFetch;
