import "./SearchBar.css";
import { MdSearch } from "react-icons/md";

function SearchBar() {
  return (
    <div className="searchbar">
      <div>
        <MdSearch />
      </div>
      <input type="text" placeholder="Search ..." />
    </div>
  );
}

export default SearchBar;
