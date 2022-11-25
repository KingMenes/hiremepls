import logo from "./logo.svg";
import "./App.css";
import React from "react";
import SignUpForm from "./components/SignupForm/SignupForm";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
      <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/about" element={<About />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
          </Routes>
  </div>
    </Router>
    
)
}

export default App;
