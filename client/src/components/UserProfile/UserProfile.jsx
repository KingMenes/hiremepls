import "./UserProfile.css";
import { getUser } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function UserProfile({ username, rep, questions, answers, id }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(getUser({ id }));
  }, [dispatch]);

  function timeSince(date) {
    var date1 = new Date();
    var seconds = Math.floor((date1.getTime() - date.getTime()) / 1000);

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

  console.log(questions);

  return (
    <div className="userprofile">
      <div className="userheader">
        <img src="https://thispersondoesnotexist.com/image" alt="" />
        <div className="user-about">
          <span id="username">{username}</span>
          <div>
            <p>Member for </p>
          </div>
          <div className="stats">
            <div>
              <span>0</span>
              <p>reputation</p>
            </div>
            <div>
              <span>0</span>
              <p>answers</p>
            </div>
            <div>
              <span>0</span>
              <p>questions</p>
            </div>
          </div>
        </div>
      </div>
      <div className="participation-section">
        <div className="top-container">
          <span>Top Questions</span>
          <div className="container">
            {questions.map((question) => {
              return (
                <div>
                  <span className="questionRep">
                    {question?.reputation?.likes?.count -
                      question?.reputation?.dislikes?.count}
                  </span>
                  <span className="questionTitle">{question?.question}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="top-container">
          <span>Top Answers</span>
          <div className="container"></div>
        </div>
        <div className="top-container">
          <span>Top Tags</span>
          <div className="container"></div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
