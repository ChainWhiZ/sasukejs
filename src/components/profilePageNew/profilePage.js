import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";
import MenuBar from "../explore/menuBar";
import Heading from "./heading";
import ProfileTabs from "./tabs";
import "./profilePageCss.css";
import { useRecoilValue } from "recoil";
import { username as usernameAtom } from "../../recoil/atoms";

export default function ProfilePage(props) {
  const username = useRecoilValue(usernameAtom);
  if (!username) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <hr className="horizontal-line" style={{ marginTop: "8vw" }} />
      <Grid container>
        <Grid item md={4} xs={12}>
          <MenuBar type={"profile"} />
        </Grid>

        <Grid
          container
          item
          md={8}
          xs={12}
          style={{ marginLeft: "-6%", marginTop: "2%" }}
        >
            <Heading />

          <Grid item md={12} xs={12}>
            <ProfileTabs />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
