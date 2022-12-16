import { useDispatch, useSelector } from "react-redux";
import Backdrop from "../Backdrop/Backdrop";
import { deleteQuestion } from "../../store/questions";

function DeleteQuestion({ handleClose, id }) {
    const dispatch = useDispatch();

    return (
        <Backdrop onClick={handleClose}>
            <button onClick={async (e) => {
                handleClose()
                await dispatch(deleteQuestion({ id }))
            }}>Delete</button>
            <button onClick={handleClose}>Cancel</button>
        </Backdrop>
    );
}

export default DeleteQuestion;
