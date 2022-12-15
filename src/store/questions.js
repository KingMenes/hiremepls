import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../http-common";

// constants
const CREATE_QUESTION = "questions/create";
// const REMOVE_USER = "session/REMOVE_USER";
// const CHECK_USER = "sesesefgsefsegfsda";

export const createQuestion = createAsyncThunk(
    CREATE_QUESTION,
    async ({ question, user }) => {
        const res = await http.post("/questions", {
            question,
            user
        });

        return res.data;
    }
);

const sessionSlice = createSlice({
    name: "questions",
    initialState: {},
    extraReducers: {
        [createQuestion.fulfilled]: (state, action) => {
            console.log(action.payload)
            state = action.payload;
            return state
        },
        // [logout.fulfilled]: (state, action) => {
        //     state.user = undefined;
        // },
        // [registerUser.fulfilled]: (state, action) => {
        //     state.user = action.payload;
        // },
    },
});

const { reducer } = sessionSlice;
export default reducer;


// export const checkUserThunk = (userId) => async (dispatch) => {
//     const res = await fetch(`/api/users/${userId}`);

//     if (res.ok) {
//         const data = await res.json();
//         await dispatch(checkUser(data));
//         return data;
//     }
// };
// const initialState = { user: null };

// export const authenticate = () => async (dispatch) => {
//     const response = await fetch("/api/auth/", {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     if (response.ok) {
//         const data = await response.json();
//         if (data.errors) {
//             return;
//         }

//         dispatch(setUser(data));
//     }
// };

// export const signUp = (username, email, password) => async (dispatch) => {
//     const response = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             username,
//             email,
//             password,
//         }),
//     });

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(setUser(data));
//         return data;
//     } else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data;
//         }
//     } else {
//         return ["An error occurred. Please try again."];
//     }
// };
