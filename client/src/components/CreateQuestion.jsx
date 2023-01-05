import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createQuestion } from "../store/questions";

function CreateQuestion() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [question, setQuestion] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createQuestion({ question, user: sessionUser })); //Object to POST
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question
        <input
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          value={question}
        ></input>
      </label>
    </form>
  );
}

export default CreateQuestion;
