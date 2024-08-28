"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Grid, Box, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import Post from "./_components/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { reduxStore } from "@/lib/Redux/ReduxStore";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/lib/Redux/PostsSlice";
import { PostType } from "./_interfaces/home.types";
import Loading from "./loading";
import { useFormik } from "formik";
import { PhotoCamera } from '@mui/icons-material';
import Button from "@mui/material/Button";
import axios from "axios";
import { addPost } from "@/lib/Redux/PostsSlice";
import { useCallback } from "react";
import CreatePost from "./_components/Post/createPost";


export default function Home() {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();

  
  const { allPosts } = useSelector(
    (store: ReturnType<typeof reduxStore.getState>) => store.posts
  );

 

  useEffect(() => {
    dispatch(getAllPosts(30));
  }, [dispatch]);

  return (
    <>
     
     <CreatePost></CreatePost>

      {allPosts ? (
        <Grid container spacing={2}>
          <Grid item xs={3}></Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBlock: "20px",
            }}
          >
            {allPosts?.map((postObj: PostType) => (
              <Post key={postObj._id} postObj={postObj} />
            ))}
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      ) : (
        <Loading />
      )}
    </>
  );
}
