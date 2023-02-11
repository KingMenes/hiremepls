import "./PopularBar.css";
import { AiOutlineFire, AiOutlineEye } from "react-icons/ai";
import { TiStarburstOutline } from "react-icons/ti";
import { BsBarChart } from "react-icons/bs";
import { useState } from "react";

function PopularBar({ sortedState, setSortedState }) {

  return (
    <div className="popularbar">
      <ul>
        <li
          className={sortedState == 1 ? 'selected' : ''}
          onClick={() => setSortedState(1)}>
          <AiOutlineFire className="icon" />
          hot
        </li>
        <li
          className={sortedState === 2 ? 'selected' : ''}
          onClick={() => setSortedState(2)}>
          <TiStarburstOutline className="icon" />
          new
        </li>
        <li
          className={sortedState === 3 ? 'selected' : ''}
          onClick={() => setSortedState(3)}>
          <BsBarChart className="icon" />
          top
        </li>
        <li
          className={sortedState === 4 ? `selected` : ''}
          onClick={() => setSortedState(4)}>
          <AiOutlineEye className="icon" />
          views
        </li>
      </ul>
    </div>
  );
}

//Test Commit

export default PopularBar;
