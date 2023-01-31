import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Home from "../pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { setUserThunk } from "../store/session";
import { useDispatch } from "react-redux";
import http from "../http-common";
import Questions from "../pages/Questions";
import QuestionPostForm from "../components/QuestionPostForm/QuestionPostForm";
import QuestionUpdateForm from "../components/UpdateQuestion/UpdateQuestion";
import UserPage from "../pages/UserPage"
export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userSession, setUserSession] = useState(true);
  const [sessionUser, setSessionUser] = useState();

  const fetchUserAuth = async () => {
    try {
      setLoading(true);
      const res = await http.get(`/users/isAuth`);
      if (res.data.email) {
        dispatch(setUserThunk({ data: res.data }));
        setSessionUser(res.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("There was an error fetch auth", error);
      return;
    }
  };

  useEffect(() => {
    fetchUserAuth();
  }, [dispatch]);

  return (
    <>
      <Router>
        <Navbar sessionUser={sessionUser} setSessionUser={setSessionUser} />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/askquestion" element={<QuestionPostForm />} />
            <Route
              path="/updatequestion/:id"
              element={<QuestionUpdateForm />}
            />
            <Route path="/user/:username"
              element={UserPage} />
            
            {/* 👇Navigates all other paths back to home👇 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
