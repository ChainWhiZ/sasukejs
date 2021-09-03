import React,{useState} from "react";
import Navbar from "../navbar/navbar";
import { Redirect } from "react-router-dom";

export default function AfterLogin() {
  const [username] = useState(localStorage.getItem("username"));
  if (!username) {
    return (
      <Redirect to="/" />
    )
  }
  return (
    <>
      <Navbar />
    </>
  );
}
