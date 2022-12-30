import "./PopularBar.css";
import { AiOutlineFire } from "react-icons/ai";
import { TiStarburstOutline } from "react-icons/ti";
import { BsBarChart } from "react-icons/bs";
import { useSelector } from "react-redux";

function PopularBar() {

  const questions = useSelector((state) => state.questions);
  function calculateHotness(question) {
    const votes = question.reputation[0] - question.reputation[1];
    const date = question.date;
  
    // calculate the difference in seconds between now and the post date
    const secondsSincePost = (new Date() - date) / 1000;
  
    // use the Reddit hotness formula to calculate the hotness score
    const hotness = votes / Math.pow(secondsSincePost + 2, 1.5);
  
    return hotness;
  }

  const sortedByHot = questions.sort((a, b) => calculateHotness(b) - calculateHotness(a));
  const sortedByNew = questions.sort((a, b) => {

    // Convert the date strings to Date objects
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // Sort in ascending order
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;

    // If dates are equal
    return 0;
  });
  const sortedByTop = questions.slice().sort((a, b) => (b.reputation[0]- b.reputation[1]) - (a.reputation[0]- a.reputation[1]));

  return (
    <div className="popularbar">
      <ul>
        <li>
          <AiOutlineFire className="icon" />
          hot
        </li>
        <li>
          <TiStarburstOutline className="icon" />
          new
        </li>
        <li>
          <BsBarChart className="icon" />
          top
        </li>
      </ul>
    </div>
  );
}

//Test Commit

export default PopularBar;
