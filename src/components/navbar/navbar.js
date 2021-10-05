import React, { useState } from "react";

import { useStyles } from "./navbarCss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import GithubButton from 'react-github-login-button'
import axios from "axios"
import logo from "../../assets/cwz.png";
import { port } from "../../config/config";
import AccountCircle from "@material-ui/icons/AccountCircle";

export default function Navbar(props) {
  const classes = useStyles();
  let [username, setUsername] = useState(localStorage.getItem("username"));

  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
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

  const githubAuth = () => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    if (hasCode) {
      const query = window.location.search.substring(1);
      const token = query.split("code=")[1];

      axios
        .post(port + "authenticate/user", { code: token })
        .then((response) => {
          console.log(response)
          localStorage.setItem("username", response.data.doc.githubId);
          window.history.pushState({}, {}, "/landing");
          window.location.reload();
        });
    }
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
          <Grid container direction="row" style={{marginLeft:"-10%"}}>
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
                  Solve Bounty
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
            {/* <Grid item md={2} xs={12}>
              <Link
                to={{
                  pathname: "/explore",
                  state: {
                    type: "complete",
                  },
                }}
                className={classes.link}
              >
                <Button
                  className={classes.button}
                  style={{ textTransform: "none" }}
                  color="inherit"
                >
                  Completed Questions
                </Button>
              </Link>
            </Grid> */}
            <>
              {/* {
                clicked && username ?
                  (
                    <Grid
                      item
                      md={2}
                      xs={12}
                      onMouseEnter={onHover}
                      onMouseLeave={onLeave}
                    >
                      <p className={classes.username}>
                        {hover && username && username.length > 18
                          ? username
                          : username && username.length > 18
                            ? usernameTruncated
                            : username}
                      </p>
                    </Grid>

                  ) :
                  (
                    <p></p>
                  )
              } */}

              <Grid item md={1} xs={12}>
                {
                  username ? (
                    <Link to="/profile" className={classes.link}>
                      <AccountCircle className={classes.accountIcon} />
                    </Link>
                  ) : (
                    <>
                      <a href="https://github.com/login/oauth/authorize?client_id=2bcca90edadf4d1f3535">
                        <GithubButton style={{width:"7vw"}} label="" onClick={() => {
                          githubAuth()
                        }} />
                      </a>
                    </>

                  )

                }
              </Grid>
            </>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
