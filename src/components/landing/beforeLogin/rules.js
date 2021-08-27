import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

export default function Rules() {
  return (
    <>
      <Grid container>
        <Grid item md={12} xs={12}>
          <p>Participate in our testing phase and earn upto 10 Matic Tokens</p>
        </Grid>
        <Grid item md={12} xs={12}>
          <p>Post a bounty and hire a freelancer to build your dapp </p>
        </Grid>
        <Grid item md={12} xs={12}>
          <a href="#">
            Read our rules, guidelines and other setup details here before
            applying for testing
          </a>
        </Grid>
      </Grid>
    </>
  );
}
