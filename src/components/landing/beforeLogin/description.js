import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { port } from "../../../config/config";
import Button from "@material-ui/core/Button";
import logo from "../../../assets/cwz.png";
export default function Description() {
  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    if (hasCode) {
      const query = window.location.search.substring(1);
      const token = query.split("code=")[1];

      axios
        .post(port + "authenticate/user", { code: token })
        .then((response) => {
          console.log("hey");
          localStorage.setItem("username", response.data.doc.githubId);
          window.history.pushState({}, {}, "/");
        });
    }
  });

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </Grid>

        <Grid item md={12} xs={12}>
          <p>A decentralized and an open-source marketplace for dapps</p>
        </Grid>
        <Grid item md={12} xs={12}>
          <p>Post a bounty and hire a freelancer to build your dapp </p>
          <p>Solve open source bounties and earn bounty rewards </p>
          <p>Vote on solutions and earn incentives on staked tokens</p>
        </Grid>
        <Grid item md={6} xs={6}>
          <Button href="https://github.com/login/oauth/authorize?client_id=2bcca90edadf4d1f3535">
            Test our App
          </Button>
        </Grid>
        <Grid item md={6} xs={6}>
          <Button>Watch our Demo Video</Button>
        </Grid>
      </Grid>
    </>
  );
}
