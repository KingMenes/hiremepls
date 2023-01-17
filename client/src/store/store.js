import { configureStore } from "@reduxjs/toolkit";
import session from "./session";
import questions from "./questions";

const store = configureStore({
  reducer: {
    session,
    questions,
  },
});

export default store;
