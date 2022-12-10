import TestFetch from "../components/TestFetch/TestFetch";
import { useDispatch } from "react-redux";

function Questions() {
    const dispatch = useDispatch();

    return (
      <>
        <TestFetch />
      </>
    );
}

export default Questions