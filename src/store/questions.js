import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../http-common";

// constants
const GET_QUESTIONS = "questions/get";
const CREATE_QUESTION = "questions/create";
const REMOVE_QUESTION = "questions/REMOVE_QUESTION";
const VIEW_QUESTION = "questions/incrementView"
const UPDATE_QUESTION = "questions/updatequestion"

export const incrementQuestion = createAsyncThunk(VIEW_QUESTION, async ({ id }) => {
  const res = await http.put(`/questions/${id}`, {
    view: id
  })

  return res.data
})

export const getQuestions = createAsyncThunk(GET_QUESTIONS, async () => {
  const res = await http.get("/questions", {});

  return res.data;
});

export const updateQuestion = createAsyncThunk(UPDATE_QUESTION, async ({ id, question, tags, body, position, company, user }) => {
  const res = await http.put(`/questions/${id}`, {
    id, question, tags, body, position, company, user
  })
  return res.data
})

export const createQuestion = createAsyncThunk(
  CREATE_QUESTION,
  async ({ question, user, tags }) => {
    const res = await http.post("/questions", {
      question,
      user,
      tags
    });

    return res.data;
  }
);

export const deleteQuestion = createAsyncThunk(
  REMOVE_QUESTION,
  async ({ id }) => {
    const res = await http.delete(`/questions/${id}`);

    return res.data;
  }
);

const sessionSlice = createSlice({
  name: "questions",
  initialState: {},
  extraReducers: {
    [createQuestion.fulfilled]: (state, action) => {
      state[action.payload._id] = action.payload;

      return state;
    },
    [deleteQuestion.fulfilled]: (state, action) => {
      delete state[action.payload.question._id];
      return state;
    },
    [getQuestions.fulfilled]: (state, action) => {
      action.payload.forEach((question) => {
        state[question._id] = question;
      });
      return state;
    },
    [incrementQuestion.fulfilled]: (state, action) => {
      state[action.payload._id] = action.payload
      return state
    },
    [updateQuestion.fulfilled]: (state, action) => {
      state[action.payload._id] = action.payload
      return state
    }

  },
});

const { reducer } = sessionSlice;
export default reducer;
