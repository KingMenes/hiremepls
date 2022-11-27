import "./SearchBar.css";
import { MdSearch } from "react-icons/md";

function SearchBar() {
  return (
    <form id="search" className="searchbar">
      <div className="input-group">
        <div className="search-icon-container">
          <MdSearch className="search-icon" />
        </div>
        <input type="text" placeholder="Search ..." />
      </div>
    </form>
  );
}

export default SearchBar;
