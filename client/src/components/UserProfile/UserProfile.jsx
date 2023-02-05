import "./UserProfile.css";

function UserProfile({sessionUser, rep, questions, answers, date}) {
  return (
    <div className="userprofile">
      <div className="userheader">
        <img src="https://thispersondoesnotexist.com/image" alt="" />
        <div className="user-about">
          <span id="username">{sessionUser?.username}</span>
          <div>
            <p>Member for X days</p>
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
          <div className="container"></div>
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
