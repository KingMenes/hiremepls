import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Home from "../pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />

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
