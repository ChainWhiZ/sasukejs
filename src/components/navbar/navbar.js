
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../../assets/new-logo.svg";
import walletIcon from "../../assets/wallet.png";
import accountIcon from "../../assets/account-circle.png";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Login from "./login";
import "./navbar.css";
export default function Navbar() {
  let [username, setUsername] = useState(localStorage.getItem("username"));

  // const [hover, setHover] = useState(false);
  // const onHover = () => {
  //   setHover(true);
  // };
  // const onLeave = () => {
  //   setHover(false);
  // };
  return (
    <AppBar>
      <Toolbar
        className="navbar"
        style={{ backgroundColor: "rgba(12, 12, 12, 1)" }}
      >
        <Grid container>
          <Grid item md={12}>
            {" "}
            <img src={logo} alt="logo" className="logo" />
          </Grid>
        </Grid>
        <Grid container spacing={8}>
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
          <Grid item md={4}>
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
          {/* <Grid
            item
            md={2}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
          > */}
          {/* <p className={classes.username}>
                    {hover && username && username.length > 18
                      ? username
                      : username && username.length > 18
                      ? usernameTruncated
                      : username}
                  </p> */}
          {/* </Grid> */}
          <Grid item md={1} xs={12} className="walletIcon">
            <img src={walletIcon} alt="walletIcon" />
          </Grid>
          {username ?
            (<Grid item md={1} xs={12} className="accountIcon">
              <Link to="/profile" className="link" >
                <img src={accountIcon} alt="accountIcon" />
              </Link>
            </Grid>)
            :
            (
              <Grid item md={1} xs={12}>
                <Link to="/profile" className="link" >
                  <Login />
                </Link>
              </Grid>
            )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
