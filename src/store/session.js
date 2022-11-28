import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import User from "../../backend/models/userModel"
import http from "../http-common";

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const CHECK_USER = "sesesefgsefsegfsda";

export const login = createAsyncThunk(SET_USER, async ({ email, password }) => {
  const res = await http.post("/users/login", { email, password });
  return res.data;
});

const sessionSlice = createSlice({
  name: "session",
  initialState: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log("action");
      state.user = action.payload;
    },
    removeUser(state, action) {
      state = {};
    },
  },
});
// export const login = (email, password) => async (dispatch) => {
//     const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email,
//             password
//         })
//     });

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(setUser(data))
//         return data;
//     } else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data;
//         }
//     } else {
//         return ['An error occurred. Please try again.']
//     }

// }
const { reducer } = sessionSlice;
export default reducer;

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const checkUser = (user) => ({
  type: CHECK_USER,
  user,
});

export const checkUserThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);

  if (res.ok) {
    const data = await res.json();
    await dispatch(checkUser(data));
    return data;
  }
};
const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

// export default function reducer(state = initialState, action) {
//     switch (action.type) {
//         case SET_USER:
//             return { user: action.payload }
//         case REMOVE_USER:
//             return { user: null }

//         default:
//             return state;
//     }
// }
