import "./QuestionPostOpen.css";
import Backdrop from "../Backdrop/Backdrop";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  addComment,
  deleteComment,
  updateComment,
  repComment,
} from "../../store/questions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import {
  BsHandThumbsUp,
  BsHandThumbsDown,
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { incrementQuestion, repQuestion } from "../../store/questions";
import avatar from "../../assets/avatar.png";
import ReplyBox from "../ReplyBox/ReplyBox";
import CommentContainer from "../CommentContainer/CommentContainer";

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.05,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

function QuestionPostOpen({
  handleClose,
  question,
  author,
  user,
  date,
  body,
  comments,
  id,
  rep,
  tags,
}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  // STATES
  const [commentBody, setCommentBody] = useState("");
  const [errors, setErrors] = useState("");
  const [edit, setEdit] = useState("");
  const [currentValue, setCurrentValue] = useState();
  const [toggleReply, setToggleReply] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sessionUser) {
      setErrors("Must be logged in!");
      return;
    }
    const comment = {
      body: commentBody,
      user: sessionUser,
      date: new Date(),
      reputation: [0, 0],
    };

    const data = await dispatch(
      addComment({
        id: id,
        user: sessionUser,
        comment: comment,
      })
    ); //Object to POST
    setCommentBody("");
  };

  const tagsList = tags.map((tag) => (
    <div className="tag" key={tag}>
      <span>{tag}</span>
    </div>
  ));

  return (
    <Backdrop
      onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}
    >
      <motion.div
        className="questionmodal"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="questionpostopen flex-start col">
          <div className="questionContainer">
            <div className="repCount">
              {rep.likes && rep.likes[user?.username] ? (
                <BsFillHandThumbsUpFill
                  className="icn i-u"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (user) {
                      await dispatch(
                        repQuestion({
                          id,
                          username: user?.username,
                          user,
                          rep: "like",
                        })
                      );
                    }
                  }}
                />
              ) : (
                <BsHandThumbsUp
                  className="icn i-u"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (user) {
                      await dispatch(
                        repQuestion({
                          id,
                          username: user?.username,
                          user,
                          rep: "like",
                        })
                      );
                    }
                  }}
                />
              )}

              <span>{rep?.likes?.count - rep?.dislikes?.count}</span>
              {rep.dislikes && rep.dislikes[user?.username] ? (
                <BsFillHandThumbsDownFill
                  className="icn i-u"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (user) {
                      await dispatch(
                        repQuestion({
                          id,
                          username: user?.username,
                          user,
                          rep: "dislike",
                        })
                      );
                    }
                  }}
                />
              ) : (
                <BsHandThumbsDown
                  className="icn i-u"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (user) {
                      await dispatch(
                        repQuestion({
                          id,
                          username: user?.username,
                          user,
                          rep: "dislike",
                        })
                      );
                    }
                  }}
                />
              )}
            </div>
            <div className="questioninfo">
              <span>
                asked by {author} {date} ago
              </span>
              <h1>{question}</h1>
              <p>{body}</p>
            </div>
            <div className="tags">{tagsList}</div>
          </div>
          <div className="addComment row flex-center">
            {sessionUser && <img src={avatar} alt="" />}
            {sessionUser ? (
              <form className="row flex-center" onSubmit={handleSubmit}>
                <div className="commentInput">
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="Add an answer or comment ..."
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Add Answer
                </motion.button>
              </form>
            ) : (
              <p>Login to answer this question!</p>
            )}
          </div>
          <div className="comments">
            {comments.length ? (
              <div id="commentscontainer">
                {comments.map((comment) => {
                  return (
                    <div className="commentline">
                      {/* <div className="threadline-div"><i className="threadline"></i></div> */}
                      {comment?.author?.username === sessionUser?.username && (
                        <div className="buttondiv">
                          {edit !== comment._id ? (
                            <TiDelete
                              className="icn-delete icn"
                              onClick={async (e) => {
                                await dispatch(
                                  deleteComment({
                                    commentId: comment._id,
                                    questionId: id,
                                    user: sessionUser,
                                  })
                                );
                              }}
                            ></TiDelete>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setEdit("");
                              }}
                            >
                              Cancel
                            </button>
                          )}

                          {edit !== comment._id ? (
                            <FiEdit
                              className="icn icn-update"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentValue(comment?.body);
                                setEdit(comment._id);
                              }}
                            ></FiEdit>
                          ) : (
                            <button
                              onClick={async (e) => {
                                await dispatch(
                                  updateComment({
                                    comment: currentValue,
                                    commentId: comment._id,
                                    questionId: id,
                                    user: sessionUser,
                                  })
                                );
                                setEdit("");
                              }}
                            >
                              Submit
                            </button>
                          )}
                        </div>
                      )}
                      <div className="commentUser">
                        {`${comment?.author?.username}`}
                      </div>
                      {edit !== comment._id ? (
                        <div className="commentbodyline">{comment?.body}</div>
                      ) : (
                        <input
                          className="commentbodyline"
                          onChange={(e) => {
                            e.preventDefault();
                            setCurrentValue(e.target.value);
                          }}
                          value={currentValue}
                        ></input>
                      )}
                      <div className="comment-bottom-bar">
                        <div className="votes">
                          {!comment.reputation.likes[sessionUser?.username] ? (
                            <BsHandThumbsUp
                              onClick={async (e) => {
                                e.preventDefault();
                                await dispatch(
                                  repComment({
                                    user: sessionUser,
                                    questionId: id,
                                    commentId: comment?._id,
                                    rep: "like",
                                  })
                                );
                              }}
                            />
                          ) : (
                            <BsFillHandThumbsUpFill
                              onClick={async (e) => {
                                e.preventDefault();
                                await dispatch(
                                  repComment({
                                    user: sessionUser,
                                    questionId: id,
                                    commentId: comment?._id,
                                    rep: "dislike",
                                  })
                                );
                              }}
                            />
                          )}
                          <span>
                            {comment?.reputation?.likes?.count -
                              comment?.reputation?.dislikes?.count}
                          </span>
                          {!comment.reputation.dislikes[
                            sessionUser?.username
                          ] ? (
                            <BsHandThumbsDown
                              onClick={async (e) => {
                                e.preventDefault();
                                await dispatch(
                                  repComment({
                                    user: sessionUser,
                                    questionId: id,
                                    commentId: comment?._id,
                                    rep: "dislike",
                                  })
                                );
                              }}
                            />
                          ) : (
                            <BsFillHandThumbsDownFill
                              onClick={async (e) => {
                                e.preventDefault();
                                await dispatch(
                                  repComment({
                                    user: sessionUser,
                                    questionId: id,
                                    commentId: comment?._id,
                                    rep: "dislike",
                                  })
                                );
                              }}
                            />
                          )}
                        </div>
                        <div className="comment-reply">
                          {comment?.replies.map((reply) => {
                            return (
                              <div className="comment-each">
                                <div>{reply.user.username}: </div>
                                <div> {reply.reply}</div>
                              </div>
                            );
                          })}
                          <BiComment />
                          <span>Reply</span>
                          <ReplyBox
                            commentId={comment?._id}
                            questionId={id}
                          ></ReplyBox>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>
                No answers, yet!
                <br /> Be the first to add one!
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default QuestionPostOpen;
