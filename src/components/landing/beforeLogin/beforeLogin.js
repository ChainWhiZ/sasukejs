import React, { useState, useEffect } from "react";
import leftImage from "../../../assets/leftImage.png";
import rightImage from "../../../assets/rightImage.png";
import Grid from "@material-ui/core/Grid";
import Description from "./description";
import Rules from "./rules";
import "../landing.css";

export default function BeforeLogin() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  return (
    <>
      <Grid container>
        <Grid item md={6} xs={12}>
          <Description />
        </Grid>
        <Grid item md={6} xs={12}>
          {" "}
          <img alt="img1" src={rightImage} class="right-img" />
        </Grid>

        <Grid item md={6} xs={12} class="margin-left5">
          {" "}
          <img alt="img2" src={leftImage} />
        </Grid>

        <Grid item md={6} xs={12}>
          <Rules />
        </Grid>
      </Grid>
    </>
  );
}
