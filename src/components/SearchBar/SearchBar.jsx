import "./SearchBar.css";
import { MdSearch } from "react-icons/md";
import { useState, useEffect } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);

  // Gets questions to search on render
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/questions');
      const data = await response.json();
      setItems(data);
      // console.log(data)
    }
    fetchData();
  }, []);

  // Runs for every input change
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  // delays a function until after a user stops typing for a certain time
  // this reduces the amount of API requests
  function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // delays the handleChange function until after the user stops typing for 500ms
  const debouncedHandleChange = debounce(handleChange, 500);

 // filters the questions object based on search term and displays the first 10 items
 const filteredItems = items.filter((item) =>
 item.question.toLowerCase().includes(searchTerm.toLowerCase())
).slice(0,10);

  return (
    <form id="search" className="searchbar">
      <div className="input-group">
        <div className="search-icon-container">
          <MdSearch className="search-icon" />
        </div>
        <input
          id="search_input"
          type="text"
          placeholder="Search..."
          onChange={debouncedHandleChange}
        />
      </div>
      <div className={`${searchTerm === '' ? 'hidden' : ''} search_dropdown`}>
        <ul>
          {filteredItems.map((item) => (
            <li key={item._id}>{item.question}</li>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default SearchBar;
