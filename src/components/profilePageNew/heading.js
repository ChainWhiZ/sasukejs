import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import accountCircle from "../../assets/profile-account.png";
import "./profilePageCss.css";

export default function Heading(props) {
  const [username] = useState(localStorage.getItem("username"));
  return (
    <>
      <Grid item md={12} xs={12} className="profile-heading-grid"></Grid>
      <Grid item md={12}>
        <img
          className="profile-account-icon"
          src={accountCircle}
          alt="account"
        />
      </Grid>

      <Grid
        item
        md={12}
        xs={12}
        className="profile-content-style profile-sub-info profile-bounty-username"
       
      >
        <p>{localStorage.getItem("username")}</p>
      </Grid>
      <Grid item md={12} xs={12} className="profile-content-style profile-sub-info">
        <p>
          An open-source and decentralized project-building marketplace on
          Polygon with zero platform fees. List your polygon projects and
          connect with developers.
        </p>
      </Grid>
    </>
  );
}
