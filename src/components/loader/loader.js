import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./loader.css";

export default function CircularIndeterminate() {


  return (
    <div style={{textAlign:"center"}}>
      <CircularProgress className="loader"/>
    </div>
  );
}
