import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../http-common";

// constants
const GET_QUESTIONS = "questions/get";
const CREATE_QUESTION = "questions/create";
const REMOVE_QUESTION = "questions/REMOVE_QUESTION";
const VIEW_QUESTION = "questions/incrementView";
const UPDATE_QUESTION = "questions/updatequestion";
const REPUTATION = "questions/reputation";

export const incrementQuestion = createAsyncThunk(
  VIEW_QUESTION,
  async ({ id }) => {
    const res = await http.put(`/api/questions/${id}`, {
      view: id,
    });

    return res.data;
  }
);

export const getQuestions = createAsyncThunk(GET_QUESTIONS, async () => {
  const res = await http.get("/api/questions", {});

  return res.data;
});

export const updateQuestion = createAsyncThunk(
  UPDATE_QUESTION,
  async ({ id, question, tags, body, position, company, user }) => {
    let token;

    if (user.token) {
      token = user.token;
    }
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const res = await http.put(`/api/questions/${id}`, {
      id,
      question,
      tags,
      body,
      position,
      company,
      user,
    });
    return res.data;
  }
);

export const createQuestion = createAsyncThunk(
  CREATE_QUESTION,
  async ({ question, user, tags }) => {
    let token;
    if (user.token) {
      token = user.token;
    }
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const res = await http.post("/api/questions", {
      question,
      user,
      tags,
    });

    return res.data;
  }
);

export const deleteQuestion = createAsyncThunk(
  REMOVE_QUESTION,
  async ({ id, user }) => {
    let token;
    if (user.token) {
      token = user.token;
    }
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    http.defaults.headers.user = user.email;
    const res = await http.delete(`/api/questions/${id}`);

    return res.data;
  }
);

export const repQuestion = createAsyncThunk(
  REPUTATION,
  async ({ id, username, rep, user }) => {
    let token;
    if (user.token) {
      token = user.token;
    }
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await http.put(`/api/questions/rep/${id}`, {
      id,
      username,
      rep,
    });
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
      state[action.payload._id] = action.payload;
      return state;
    },
    [updateQuestion.fulfilled]: (state, action) => {
      state[action.payload._id] = action.payload;
      return state;
    },
    [repQuestion.fulfilled]: (state, action) => {
      state[action.payload._id] = action.payload;
      return state;
    },
  },
});

const { reducer } = sessionSlice;
export default reducer;