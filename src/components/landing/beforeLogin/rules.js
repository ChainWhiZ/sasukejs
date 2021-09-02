import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LoginButtons from "./loginButtons";
import "../landing.css";

export default function Rules() {
  return (
    <>
      <Grid container class="margin-left10">
        <Grid item md={12} xs={12}>
          <p class="landing-heading">Participate in our testing phase and earn upto 10 Matic Tokens</p>
        </Grid>
        <Grid item md={12} xs={12} class="test-heading">
          <p>Testing forms a pivotal part in our development journey as it is the
            best way  to identify errors, gaps or missing requirements in contrast
            to actual requirements.  Our platform’s success is heavily dependent
            on the community and who better than the community itself to test
            our prototype.  Hence we have decided to give a chance to interested
            members to test our product and help us in our journey.  </p>
        </Grid>
        <Grid item md={12} xs={12} class="test-subheading">

          <p>
          Stand a chance to win upto 10 Matic Tokens for testing our product.
          </p>
        </Grid>
        <Grid item md={12} xs={12} style={{marginLeft:"-10%"}}> 
         {/* <LoginButtons/> */}
        </Grid>
      </Grid>
    </>
  );
}
