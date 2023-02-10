import "./PopularBar.css";
import { AiOutlineFire, AiOutlineEye } from "react-icons/ai";
import { TiStarburstOutline } from "react-icons/ti";
import { BsBarChart } from "react-icons/bs";

function PopularBar({ state, setSortedState }) {
  // const questions = useSelector((state) => state.questions);

  return (
    <div className="popularbar">
      <ul>
        <li onClick={() => setSortedState(1)}>
          <AiOutlineFire className="icon" />
          hot
        </li>
        <li onClick={() => setSortedState(2)}>
          <TiStarburstOutline className="icon" />
          new
        </li>
        <li onClick={() => setSortedState(3)}>
          <BsBarChart className="icon" />
          top
        </li>
        <li onClick={() => setSortedState(4)}>
          <AiOutlineEye className="icon" />
          views
        </li>
      </ul>
    </div>
  );
}

//Test Commit

export default PopularBar;
