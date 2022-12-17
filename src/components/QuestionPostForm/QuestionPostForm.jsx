import "./QuestionPostForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createQuestion } from "../../store/questions";
import { motion } from "framer-motion";
import { AiOutlinePlus , AiOutlineClose} from 'react-icons/ai'

function QuestionPostForm() {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [question, setQuestion] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createQuestion({ question, user: sessionUser })); //Object to POST
  };

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5']

  const [charCount, setCharCount] = useState("0");
  // const [tags, setTags] = useState([])

  // function updateTags(e) {
  //   setTags(tags => [...tags, e.target.value])
  //   e.target.value = ''
  //   console.log(tags)
  // }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  return (
    <div className="question-post">
      <div className="post-box">
        <h2>Ask a Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="post-title flex-center">
            <input
              type="text"
              placeholder="Question"
              required
              name="question-title"
              onChange={onChange}
              id="question-title"
              // value={formData.title}
              maxLength="300"
            />
            <div id="charcount">0/300</div>
          </div>
          <div className="company-info flex-center">
            <input type="text" placeholder="For Position (optional)" />
            <input type="text" placeholder="At Company Name (optional)" />
          </div>
          <div className="post-body flex-center">
            <textarea
              name="question-body"
              id="question-body"
              cols="30"
              rows="10"
              type="text"
              placeholder="How would you answer? (optional)"
              onChange={onChange}
              // value={formData.body}
            ></textarea>
          </div>
          <div className="add-tag flex-center">
            <h3>Include tags to help others find your question!</h3>
            <div>
              <AiOutlinePlus className="icn" />
              <input type="text" placeholder="Add a tag here (max 5)"
                // onSubmit={updateTags}
              />
            </div>
            <p>ex: general, human resources, software, technical</p>
          </div>
          <div className="tags">
            {tags.map((tag) => (
              <div className="tag" key={tag}>
                <span>{tag}</span>
                <AiOutlineClose className="icn"/>
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