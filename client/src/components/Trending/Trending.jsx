import "./Trending.css";
import { BsThreeDots } from "react-icons/bs";

function Trending() {
  const tags = ["general", "engineering", "software", "management", "personal"];

  return (
    <div className="trending">
      <h2>Trending Tags</h2>
      <div className="tags-container">
        {tags.map((tag) => (
          <div className="tag" key={tag}>
            <span>{tag}</span>
          </div>
        ))}
        <div className="tag dots">
          <span>
            <BsThreeDots className="icon" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Trending;
