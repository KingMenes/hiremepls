import { useState, useEffect } from "react";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>Username must be at least 5 characters</div>
        <label>
          Username*
          <input onChange={(e) => setUsername(e.target.value)}></input>
        </label>
      </div>
      {username.length > 4 && (
        <div>
          <label>
            Email*
            <input onChange={(e) => setEmail(e.target.value)}></input>
          </label>
        </div>
      )}
      {username.length > 4 && email.match(emailRegex) && (
        <div>
          <label>
            Password*
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
        </div>
      )}
      {username.length > 4 &&
        email.match(emailRegex) &&
        password.length > 4 && (
          <div>
            <label>
              Confirm Password*
              <input
                type="password"
                onChange={(e) => setConfirm(e.target.value)}
              ></input>
            </label>
          </div>
        )}
      {username.length > 4 &&
        email.match(emailRegex) &&
        password.length > 4 &&
        password === confirm && <button>Submit</button>}
    </form>
  );
};

export default SignUpForm;
