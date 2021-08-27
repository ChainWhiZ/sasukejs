import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import leftImage from "../../../assets/leftImage.png";
import rightImage from "../../../assets/rightImage.png";
import Grid from "@material-ui/core/Grid";
import eventBus from "../../EventBus";
import Description from "./description";
import Rules from "./rules";
export default function BeforeLogin() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  useEffect(() => {
    eventBus.on("loginSuccessful", (data) =>
      setUsername(localStorage.getItem("username"))
    );
    eventBus.remove("loginSuccessful");
  });

  return (
    <>
      <Grid container>
        <Grid item md={6} xs={12}>
          <Description />
        </Grid>
        <Grid item md={6} xs={12}>
          {" "}
          <img alt="img1" src={rightImage} />
        </Grid>

        <Grid item md={6} xs={12}>
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
