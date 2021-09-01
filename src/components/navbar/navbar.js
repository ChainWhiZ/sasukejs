import React, { useState } from "react";

import { useStyles } from "./navbarCss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import logo from "../../assets/cwz.png";
import AccountCircle from "@material-ui/icons/AccountCircle";

export default function Navbar(props) {
  const classes = useStyles();
  let [username, setUsername] = useState(localStorage.getItem("username"));

  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };
  const onLeave = () => {
    setHover(false);
  };
  let usernameTruncated;
  if (username && username.length > 11) {
    usernameTruncated = username.substring(0, 11) + "...";
  }

  return (
    <div className={classes.root}>
      <AppBar
        style={{ backgroundColor: "white", boxShadow: "none", color: "black" }}
      >
        <Toolbar>
          <Grid container>
            <Grid item md={2}>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={3} xs={12}>
              <Link to="/post" className={classes.link}>
                <Button
                  className={classes.button}
                  style={{ textTransform: "none" }}
                  color="inherit"
                >
                  Post a Bounty
                </Button>
              </Link>
            </Grid>
            <Grid item md={3} xs={12}>
              <Link
                to={{
                  pathname: "/explore",
                  state: {
                    type: "solve",
                  },
                }}
                className={classes.link}
              >
                <Button
                  className={classes.button}
                  style={{ textTransform: "none" }}
                  color="inherit"
                >
                  Solve a Bounty
                </Button>
              </Link>
            </Grid>
            <Grid item md={3} xs={12}>
              <Link
                to={{
                  pathname: "/explore",
                  state: {
                    type: "vote",
                  },
                }}
                className={classes.link}
              >
                <Button
                  className={classes.button}
                  style={{ textTransform: "none" }}
                  color="inherit"
                >
                  Vote a Bounty
                </Button>
              </Link>
            </Grid>
              <>
                <Grid
                  item
                  md={2}
                  xs={12}
                  onMouseEnter={onHover}
                  onMouseLeave={onLeave}
                >
                  <p className={classes.username}>
                    {hover && username && username.length > 11
                      ? username
                      : username && username.length > 11
                      ? usernameTruncated
                      : username}
                  </p>
                </Grid>
                <Grid item md={1} xs={12}>
                  <Link to="/profile" className={classes.link}>
                    <AccountCircle className={classes.accountIcon} />
                  </Link>
                </Grid>
              </>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
