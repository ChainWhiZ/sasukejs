import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { port } from "../../../config/config";
import Button from "@material-ui/core/Button";
import logo from "../../../assets/cwz.png";
import "../landing.css";
import LoginButtons from "./loginButtons";

export default function Description() {
  return (
    <>
      <Grid container >
        <Grid item xs={12} md={12}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </Grid>

        <Grid item md={12} xs={12} class="margin-left10">
          <p class="landing-heading">A decentralized and an open-source marketplace for dapps</p>
        </Grid>
        <Grid item md={12} xs={12} class="margin-left10">
          <p style={{marginRight: "-7%"}}>
            <span class="pointer">.</span>
            Post a bounty and hire a freelancer to build your dapp </p>
          <p style={{marginRight: "-7%"}}>
            <span class="pointer">.</span>
            Solve open source bounties and earn bounty rewards </p>
          <p style={{marginRight: "-10%"}}>
            <span class="pointer" >.</span>
            Vote on solutions and earn incentives on staked tokens</p>
            <br/>
        </Grid>
        <Grid item md={12} xs={12}>
          <LoginButtons />
        </Grid>
      </Grid>
    </>
  );
}
