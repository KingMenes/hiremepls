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

  let userQuestions = [];
  Object.values(questions).map((question) => {
    // console.log(question.author)
    if (question.authorName === sessionUser?.username) {
      userQuestions.push(question);
    }
  });

  const sortedByTop = userQuestions
    .slice()
    .sort(
      (a, b) =>
        b.reputation.likes -
        b.reputation.dislikes -
        (a.reputation.likes - a.reputation.dislikes)
    );

  // console.log({ questions });
  // console.log({ userQuestions });
  // console.log({ sortedByTop });

  return (
    <UserProfile
      username={sessionUser?.username}
      id={sessionUser?._id}
      questions={sortedByTop.slice(0, 10)}
    />
  );
}

export default UserPage;
