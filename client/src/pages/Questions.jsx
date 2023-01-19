import TestFetch from "../components/TestFetch/TestFetch";
import { useSelector } from "react-redux";
import Trending from "../components/Trending/Trending";
import PopularBar from "../components/PopularBar/PopularBar";
import AskQuestion from "../components/AskQuestion/AskQuestion";

function Questions() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <Trending />
      {sessionUser && <AskQuestion />}
      <PopularBar />
      <TestFetch />
    </>
  );
}

export default Questions;
