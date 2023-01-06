import { useDispatch, useSelector } from "react-redux";
import Backdrop from "../Backdrop/Backdrop";
import { deleteQuestion } from "../../store/questions";

function DeleteQuestion({ handleClose, id, user }) {
  const dispatch = useDispatch();

  return (
    <Backdrop onClick={handleClose}>
      <button
        onClick={async (e) => {
          handleClose();
          await dispatch(deleteQuestion({ id, user }));
        }}
      >
        Delete
      </button>
      <button onClick={handleClose}>Cancel</button>
    </Backdrop>
  );
}

export default DeleteQuestion;
