import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../../assets/new-logo.svg";
import accountIcon from "../../assets/account-circle.png";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Login from "./login";
import "./navbar.css";
import { useRecoilValue } from "recoil";
import { username as usernameAtom} from "../../recoil/atoms";
import ConnectWallet from "./connectWallet";
export default function Navbar() {
  const username = useRecoilValue(usernameAtom);
 
  return (
    <AppBar>
      <Toolbar
        className="navbar"
        style={{ backgroundColor: "rgba(12, 12, 12, 1)" }}
      >
        <Grid container>
          <Grid item md={12}>
            {" "}
            <Link to="/" className="link">
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={3} className="right-side">
          <Grid item md={3}>
            {" "}
            <Link to="/post" className="link">
              <p className="item">Post a Bounty</p>
            </Link>
          </Grid>
          <Grid item md={3}>
            {" "}
            <Link
              to={{
                pathname: "/explore",
                state: {
                  type: "solve",
                },
              }}
              className="link"
            >
              <p className="item ">Solve a Bounty</p>
            </Link>
          </Grid>
          <Grid item md={3}>
            {" "}
            <Link
              to={{
                pathname: "/explore",
                state: {
                  type: "vote",
                },
              }}
              className="link"
            >
              <p className="item">Vote on Solutions</p>
            </Link>
          </Grid>
          <Grid item md={1} xs={12} className="walletIcon">
            <ConnectWallet/>
          </Grid>
          {username ? (
            <Grid item md={2} xs={12} className="accountIcon">
              <Link to="/profile" className="link">
                <img src={accountIcon} alt="accountIcon" />
              </Link>
            </Grid>
          ) : (
            <Grid item md={2} xs={12}>
              <Link to="/profile" className="link">
                <Login />
              </Link>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
