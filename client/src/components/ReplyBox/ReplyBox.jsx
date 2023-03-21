import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateComment, getQuestions } from "../../store/questions"

const ReplyBox = ({ commentId, questionId }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [comment, setComment] = useState('')
    const onSubmit = async (e) => {
        e.preventDefault()
        if (comment.trim().length > 0) {
            await dispatch(updateComment({ commentId, reply: comment, user, questionId })).then(async ({ payload }) => {
                setComment('')
                console.log(payload)
                // await dispatch(getQuestions())
            })
        }
        return
    }
    return (
        user ? <form onSubmit={onSubmit}>
            <input value={comment} onChange={(e) => {
                setComment(e.target.value)
                return
            }}></input>
        </form> : null
    )
}

export default ReplyBox
