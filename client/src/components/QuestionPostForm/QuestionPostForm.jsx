import "./QuestionPostForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createQuestion } from "../../store/questions";
import { motion } from "framer-motion";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function QuestionPostForm({ handleClose }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  // STATES
  const [errors, setErrors] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [charCount, setCharCount] = useState("0");
  const [formData, setFormData] = useState({
    question: "",
    date: "",
    user: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sessionUser) {
      setErrors("Must be logged in!");
      return;
    }
    const data = await dispatch(
      createQuestion({
        question: formData.question,
        user: sessionUser,
        body: formData.body,
        position: formData.position,
        company: formData.company,
        tags: tags, // pass tags state as an argument
        date: new Date(),
        reputation: [0, 0],
      })
    ); //Object to POST

    // console.log({
    //   question: formData.question,
    //   user: sessionUser,
    //   body: formData.body,
    //   position: formData.position,
    //   company: formData.company,
    //   tags: formData.tags,
    //   date: formData.date,
    //   reputation: formData.reputation,
    // });

    navigate("/questions");
  };

  const onChange = (e) => {
    setCharCount(e.target.value.length);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      tags: tags, // update the tags field in formData
    }));
  };

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      // 13 is the keyCode for the "Enter" key
      event.preventDefault();
      tags.push(tag.trim());
      setTags(tags);
      setTag("");
    }
  }

  return (
    <div className="question-post">
      <div onClick={(e) => e.stopPropagation()} className="post-box">
        <h2>Ask a Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="post-title flex-center">
            {errors ? <div>{errors}</div> : null}
            <input
              type="text"
              placeholder="Question"
              required
              name="question"
              onChange={onChange}
              id="question-title"
              // value={formData.title}
              maxLength="300"
            />
            <div id="charcount">{charCount}/300</div>
          </div>
          <div className="company-info flex-center">
            <input
              type="text"
              placeholder="For Position (optional)"
              name="position"
            />
            <input
              type="text"
              placeholder="At Company Name (optional)"
              name="company"
            />
          </div>
          <div className="post-body flex-center">
            <textarea
              name="body"
              id="question-body"
              cols="30"
              rows="3"
              type="text"
              placeholder="How would you answer? (optional)"
              onChange={onChange}
              // value={formData.body}
            ></textarea>
          </div>
          <div className="add-tag flex-center">
            <h3>Include tags to help others find your question!</h3>
            <div className="tag-input">
              <AiOutlinePlus
                className="icn"
                onClick={(e) => {
                  tags.push(tag.trim());
                  setTags(tags);
                  setTag("");
                }}
              />
              <input
                type="text"
                placeholder="Add a tag here (max 5)"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength="35"
              />
            </div>
            <p>ex: general, human resources, software, technical</p>
          </div>
          <div className="tags">
            {tags.map((tag) => (
              <div className="tag" key={tag}>
                <span>{tag}</span>
                <AiOutlineClose
                  className="icn close-icn"
                  onClick={() => {
                    const index = tags.indexOf(tag);

                    //make a deep copy rather -- because I'm assuming making a shallow copy of
                    //the array or using the same array would not change the state because they
                    //are the same place in memory
                    const newTags = tags.map((currentTag) => currentTag);

                    if (index > -1) {
                      newTags.splice(index, 1);
                    }
                    setTags(newTags);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="btn-div">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Submit
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuestionPostForm;
