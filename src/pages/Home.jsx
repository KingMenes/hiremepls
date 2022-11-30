import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TestFetch from "../components/TestFetch/TestFetch";
import { login, logout } from "../store/session";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();

  return (
    <>
      {/* <SignUpForm /> */}
      <TestFetch />
    </>
  );
}

export default Home;
