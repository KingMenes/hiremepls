import "./CommentContainer.css";

function CommentContainer({
  author,
  username,
  comment_id,
  question_id,
  sessionUser,
  comment_body,
}) {
  return (
    <div className="commentline">
      {author === username && (
        <div className="buttondiv">
          {edit !== comment_id ? (
            <TiDelete
              className="icn-delete icn"
              onClick={async (e) => {
                await dispatch(
                  deleteComment({
                    commentId: comment_id,
                    questionId: question_id,
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

          {edit !== comment_id ? (
            <FiEdit
              className="icn icn-update"
              onClick={(e) => {
                e.preventDefault();
                setCurrentValue(comment_body);
                setEdit(comment_id);
              }}
            ></FiEdit>
          ) : (
            <button
              onClick={async (e) => {
                await dispatch(
                  updateComment({
                    comment: currentValue,
                    commentId: comment_id,
                    questionId: question_id,
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
      <div className="commentUser">{`${author}`}</div>
      {edit !== comment._id ? (
        <div className="commentbodyline">{comment_body}</div>
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
          {!comment.reputation.likes[username] ? (
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
          {!comment.reputation.dislikes[sessionUser?.username] ? (
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
              <div>
                <div>{reply.user.username}</div>
                <div>{reply.reply}</div>
              </div>
            );
          })}
          <BiComment />
          <span
            className="reply-btn"
            onClick={() => setToggleReply(!toggleReply)}
          >
            Reply
          </span>
          {toggleReply && (
            <ReplyBox commentId={comment?._id} questionId={id}></ReplyBox>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentContainer;
