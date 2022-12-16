import './QuestionPostForm.css'
import { useState } from "react";
import { useDispatch } from "react-redux";
import {motion} from 'framer-motion'



function QuestionPostForm() {
  const [formData, setFormData] = useState({
    title: '',
    body:''
  });

  const [charCount,setCharCount] = useState('0')

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    // e.preventDefault();
    // const userData = {
    //   username,
    //   email,
    //   password,
    //   confirmPassword: password2,
    // };
    // const res = await dispatch(registerUser(userData));
    // if (res?.payload?.username === userData.username) {
    //   setSessionUser(res.payload);
    //   handleClose();
    // }
  };
    

    return (
      <div className="question-post">
        <div className='post-box'>
          <h2>Ask a Question</h2>
          <form onSubmit={onSubmit}>
            <div className='post-title flex-center'>
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
              <div id='charcount'>0/300</div>
            </div>
            <div className='company-info flex-center'>
              <input type="text" placeholder='For Position (optional)' />
              <input type="text" placeholder='At Company Name (optional)' />
            </div>
            
            <div className='post-body flex-center'>
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
            <div className='add-tag flex-center'>
              <h3>Include tags to help others find your question!</h3>
              <input type="text" placeholder='Add a tag here (max 5)' />
              <p>ex: engineering, human resources, software, technical</p>
            </div>
            <div className='tags'></div>
            <div className='btn-div'>
              <motion.button type='submit'
              whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                Submit
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    )
  }


export default QuestionPostForm