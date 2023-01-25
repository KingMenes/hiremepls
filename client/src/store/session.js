import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import User from "../../backend/models/userModel"
import http from "../http-common";

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

export const login = createAsyncThunk(
  SET_USER,
  async ({ username, password }) => {
    const res = await http.post("/users/login", {
      username,
      email: username,
      password,
    });
    return res.data;
  }
);

export const registerUser = createAsyncThunk(
  SET_USER,
  async ({ username, email, password, password2 }) => {
    const res = await http.post("/users", {
      username,
      email,
      password,
      confirmPassword: password2,
    });

    return res.data;
  }
);

export const logout = createAsyncThunk(REMOVE_USER, async () => {
  const res = await http.delete("/users");
  return;
});

export const setUserThunk = createAsyncThunk(SET_USER, async (data) => {
  console.log("data");
  return data.data;
});

const sessionSlice = createSlice({
  name: "session",
  initialState: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      return state;
    },
    [logout.fulfilled]: (state, action) => {
      state.user = null;
      return state;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      return state;
    },
  },
});

const { reducer } = sessionSlice;
export default reducer;
