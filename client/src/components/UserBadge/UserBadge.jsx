import "./UserBadge.css";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout, login } from "../../store/session";

function UserBadge({ img, sessionUser, setSessionUser }) {
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    setSessionUser(null);
    return;
  };
  return (
    <div className="userBadge">
      <img src={img} alt="" />
      <span>{sessionUser?.username}</span>
      {/* <AiOutlineCaretDown className="caret"/> */}
      <div>
        <FaSignOutAlt className="caret" id="signout-btn" onClick={handleLogout} />
      </div>
    </div>
  );
}

export default UserBadge;
