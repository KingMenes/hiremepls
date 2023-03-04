import UserProfile from "../components/UserProfile/UserProfile";
import { getQuestions } from "../store/questions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function UserPage({ sessionUser }) {
  console.log(sessionUser?._id);

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  function sortByTop(questions) {
    return questions.sort((a, b) => {
      return (
        b.reputation.likes.count -
        b.reputation.dislikes.count -
        (a.reputation.likes.count - a.reputation.dislikes.count)
      );
    });
  }

  let userQuestions = [];
  Object.values(questions).map((question) => {
    // console.log(question.author)
    if (question.authorName === sessionUser?.username) {
      userQuestions.push(question);
    }
  });

  let userAnswers = [];
  Object.values(questions).map((question) => {
    Object.values(question.comments).map((comment) => {
      if (comment.author.username === sessionUser?.username) {
        userAnswers.push(comment);
      }
    });
  });

  return (
    <UserProfile
      username={sessionUser?.username}
      id={sessionUser?._id}
      questions={sortByTop(userQuestions).slice(0, 10)}
      answers={sortByTop(userAnswers).slice(0, 5)}
    />
  );
}

export default UserPage;
