"use client";
import { loginMethod } from "@/lib/Redux/AuthSlice";
import { reduxStore } from "@/lib/Redux/ReduxStore";
import { Button, Container, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Page() {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: function (values) {
      console.log(values);
      dispatch(loginMethod(values)).then((res) => {
        if (res.payload.message == "success") {
          toast.success("welcome back", { position: "top-right" });
          router.push("/");
        } else {
          toast.error("incorrect Email or Password", { position: "top-right" });
        }
      });
    },
  });
  return (
    <Container maxWidth="sm">
      <Paper elevation={20} sx={{ p: 5, my: 7 }}>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TextField
            placeholder="Email..."
            id="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            placeholder="Password..."
            type="password"
            id="password"
            label="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Button type="submit" variant="contained">
            Contained
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
