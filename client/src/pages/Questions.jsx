import TestFetch from "../components/TestFetch/TestFetch";
import { useSelector } from "react-redux";
import Trending from "../components/Trending/Trending";
import PopularBar from "../components/PopularBar/PopularBar";
import AskQuestion from "../components/AskQuestion/AskQuestion";
import { SortContext } from "../context";
import { useState } from "react";

function Questions() {
  const sessionUser = useSelector((state) => state.session.user);
  const [sortedState, setSortedState] = useState();

  return (
    <>
      <SortContext.Provider value={{ sortedState, setSortedState }}>
        <Trending />
        {sessionUser && <AskQuestion />}
        <PopularBar />
        <TestFetch />
      </SortContext.Provider>
    </>
  );
}

export default Questions;
