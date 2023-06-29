import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComment, getQuestions } from "../../store/questions";
import { motion } from "framer-motion";
import avatar from "../../assets/avatar.png";
import "./ReplyBox.css";

const ReplyBox = ({ commentId, questionId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [comment, setComment] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim().length > 0) {
      await dispatch(
        updateComment({ commentId, reply: comment, user, questionId })
      ).then(async ({ payload }) => {
        setComment("");
        // console.log(payload);
        // await dispatch(getQuestions())
      });
    }
    return;
  };
  return (
    <div className="addComment replybox row flex-center">
      {user && <img src={avatar} alt="" />}
      {user ? (
        <form className="row flex-center" onSubmit={onSubmit}>
          <div className="commentInput">
            <input
              type="text"
              id="comment"
              placeholder="Add reply"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                return;
              }}
            ></input>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Post Reply
          </motion.button>
        </form>
      ) : null}
    </div>
  );
};

export default ReplyBox;
