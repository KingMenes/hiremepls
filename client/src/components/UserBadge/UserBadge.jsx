import "./UserBadge.css";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";

function UserBadge({ img, user }) {
  console.log({ user });

  return (
    <div className="userBadge">
      <img src={img} alt="" />
      <span>{user}</span>
      {/* <AiOutlineCaretDown className="caret"/> */}
      <div>
        <FaSignOutAlt className="caret" id="signout-btn" />
      </div>
    </div>
  );
}

export default UserBadge;
