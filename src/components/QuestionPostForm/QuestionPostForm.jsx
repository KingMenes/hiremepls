import './QuestionPostForm.css'
import { useState } from "react";
import { useDispatch } from "react-redux";



function QuestionPostForm() {
  const [formData, setFormData] = useState({
    title: '',
    body:''
  });

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
          <div className='post-title'>
            <textarea
              type="text"
              placeholder="Ask a Question"
              required
              name="question-title"
              onChange={onChange}
              id="question-title"
              value={formData.title}
              maxLength="300"
              rows="1"
            ></textarea>
            <div>0/300</div>
          </div>
          
          <textarea
            name="question-body"
            id="question-body"
            cols="30"
            rows="10"
            type="text"
            placeholder="How would you answer? (optional)"
            onChange={onChange}
            value={formData.body}
          ></textarea>
        </form>
        </div>
      </div>
    )
  }


export default QuestionPostForm