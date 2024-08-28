import { PostType } from "@/app/_interfaces/home.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  allPosts: PostType[] | null;
  specificPost: PostType | null;
} = {
  allPosts: null,
  specificPost: null,
};


// Define an interface for the thunk payload
interface AddPostPayload {
  body: string;
  image: File | null;
}

export const getSpecificPost = createAsyncThunk(
  "posts/getPost",
  function (id: string) {
    return axios.get<{ post: PostType }>(
      `https://linked-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          token: localStorage.getItem("loggedUser"),
        },
      }
    );
  }
);
export const addComment = createAsyncThunk(
  "posts/addComment",
  function (payload: { content: string; post: string } | unknown) {
    return axios.post(`https://linked-posts.routemisr.com/comments`, payload, {
      headers: {
        token: localStorage.getItem("loggedUser"),
      },
    });
  }
);

// Adding new Post
export const addPost = createAsyncThunk(
  "posts/addPost",
  async function ({ body, image }: AddPostPayload) {
    try {
      const formData = new FormData();
      formData.append("body", body);
      if (image) {
        formData.append("image", image);
      }

      // Debugging FormData content
      // formData.forEach((value, key) => {
      //   console.log(`${key}:`, value);
      // });

      const res = await axios.post(
        "https://linked-posts.routemisr.com/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("loggedUser") || "",
          },
        }
      );
      console.log("actual response ====> ",res);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const getAllPosts = createAsyncThunk(
  "posts/getPosts",
  function (limit: number = 30) {
    return axios.get<{ posts: PostType[] }>(
      `https://linked-posts.routemisr.com/posts?limit=${limit}`,
      {
        headers: {
          token: localStorage.getItem("loggedUser"),
        },
      }
    );
  }
);
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(getAllPosts.fulfilled, function (state, action) {
      console.log("action", action.payload.data.posts);
      state.allPosts = action.payload.data.posts;
    });

    builder.addCase(getSpecificPost.fulfilled, function (state, action) {
      state.specificPost = action.payload.data.post;
    });
    builder.addCase(addComment.fulfilled, function (state, action) {
      console.log(action);
    });
    builder.addCase(addPost.fulfilled, function (state, action) {
      console.log("Post Added => ",action.payload);
});
  },
});

export default postsSlice.reducer;
