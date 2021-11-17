import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./loader.css";

console.log("in loader")
export default function CircularIndeterminate() {


  return (
    <div style={{textAlign:"center"}}>
      <CircularProgress className="loader"/>
    </div>
  );
}
