"use client";
import { loginMethod, registerMethod } from "@/lib/Redux/AuthSlice";
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "7-10-1994",
      gender: "male",
    },
    onSubmit: function (values) {
      console.log(values);
      dispatch(registerMethod(values)).then((res) => {
        console.log(res);

        if (res.payload.message == "success") {
          toast.success("welcome back", { position: "top-right" });
          router.push("/login");
        } else {
          toast.error(res.payload.response.data.error, {
            position: "top-right",
          });
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
            placeholder="name..."
            id="name"
            label="name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
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
          <TextField
            placeholder="rePassword..."
            type="password"
            id="rePassword"
            label="rePassword"
            variant="outlined"
            value={formik.values.rePassword}
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
