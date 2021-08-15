import React, { useState } from "react";
import { useStyles } from "./navbarCss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Authenticate from "./authenticate";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import logo from "../../assets/cwz.png";
import AccountCircle from "@material-ui/icons/AccountCircle";
export default function Navbar() {
  const classes = useStyles();
  const [username, setUsername] = useState(localStorage.getItem("username"));
  return (
    <div className={classes.root}>
      <AppBar
        style={{ backgroundColor: "white", boxShadow: "none", color: "black" }}
      >
        <Toolbar>
          <Grid container>
            <Grid item md={2}>
              <img src={logo} />
            </Grid>
          </Grid>

          {username ? (
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
                <Link to="/explore" className={classes.link}>
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
                <Link to="/explore" className={classes.link}>
                  <Button
                    className={classes.button}
                    style={{ textTransform: "none" }}
                    color="inherit"
                  >
                    Vote a Bounty
                  </Button>
                </Link>
              </Grid>
              <Grid item md={2} xs={12}>
                <p className={classes.username}>{username}</p>
              </Grid>
              <Grid item md={1} xs={12}>
                <Link to="/profile" className={classes.link}>
                  <AccountCircle className={classes.accountIcon} />
                </Link>
              </Grid>
            </Grid>
          ) : (
            <Authenticate handleLogin={(data) => setUsername(data)} />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
