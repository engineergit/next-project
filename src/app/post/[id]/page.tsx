"use client";
import Post from "@/app/_components/Post/Post";
import Loading from "@/app/loading";
import { getSpecificPost } from "@/lib/Redux/PostsSlice";
import { reduxStore } from "@/lib/Redux/ReduxStore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page({ params }: { params: any }) {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const { specificPost } = useSelector(
    (store: ReturnType<typeof reduxStore.getState>) => store.posts
  );
  useEffect(() => {
    dispatch(getSpecificPost(params.id));
  }, []);

  return specificPost ? (
    <div style={{ width: "50%", marginInline: "auto" }}>
      <Post postObj={specificPost} isAllComments />
    </div>
  ) : (
    <Loading />
  );
}
