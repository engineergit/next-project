import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  userToken: null | string;
  userData: any;
  isError: boolean;
  isLoading: boolean;
} = {
  userToken: null,
  userData: null,
  isError: false,
  isLoading: false,
};

export const loginMethod = createAsyncThunk(
  "auth/login",
  async function (payload: { email: string; password: string }) {
    return await axios
      .post("https://linked-posts.routemisr.com/users/signin", payload)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
);
export const registerMethod = createAsyncThunk(
  "auth/register",
  async function (payload: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    dateOfBirth: string;
    gender: string;
  }) {
    return await axios
      .post("https://linked-posts.routemisr.com/users/signup", payload)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearUserData: function (state) {
      state.userData = null;
      state.userToken = null;
    },
  },
  extraReducers: function (builder) {
    builder.addCase(loginMethod.fulfilled, function (state, action) {
      state.isLoading = false;
      state.userToken = action.payload.token;
      localStorage.setItem("loggedUser", action.payload.token);
    });
    builder.addCase(registerMethod.fulfilled, function (state, action) {
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
