import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import postsSlice from "./PostsSlice";
export const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsSlice,
  },
});
