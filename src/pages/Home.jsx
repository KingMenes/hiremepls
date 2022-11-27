import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SignUpForm from "../components/SignupForm/SignupForm";
import TestFetch from "../components/TestFetch/TestFetch";
import { login } from "../store/session";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(login({ email: 'blau4000@gmail.com', password: 'password' }))
  }, [])

  return (
    <>
      <SignUpForm />
      <TestFetch />

    </>
  )
}

export default Home;
