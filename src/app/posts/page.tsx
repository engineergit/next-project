"use client";
import { reduxStore } from "@/lib/Redux/ReduxStore";
import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
export default function Page() {
    async function addPost(body: any, image: any) {
        await axios
          .post(
            "https://linked-posts.routemisr.com/posts",
            {
              body: body,
              image: image,
            },
            {
              headers: {
                token: localStorage.getItem("loggedUser"),
              },
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((error) => console.log(error));
      }

  return <div>New Post</div>;
}
