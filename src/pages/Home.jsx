import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SignUpForm from "../components/SignupForm/SignupForm";
import TestFetch from "../components/TestFetch/TestFetch";

function Home() {

  return (
    <>
      <SignUpForm />
      <TestFetch />
    </>
  )
}

export default Home;
