"use client";
import { reduxStore } from "@/lib/Redux/ReduxStore";
import React from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const { userData } = useSelector(
    (store: ReturnType<typeof reduxStore.getState>) => store.auth
  );
  console.log(userData);

  return <div>page</div>;
}
