import TestFetch from "../components/TestFetch/TestFetch";
import { useDispatch } from "react-redux";
import Trending from "../components/Trending/Trending";
import PopularBar from "../components/PopularBar/PopularBar";

function Questions() {
  const dispatch = useDispatch();

  return (
    <>
      <Trending />
      <PopularBar/>
      <TestFetch />
    </>
  );
}

export default Questions;
