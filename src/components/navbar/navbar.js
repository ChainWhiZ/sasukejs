import React, { useState } from 'react';
import { useStyles } from './navbarCss'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Authenticate from './authenticate';
import Grid from "@material-ui/core/Grid";
import { Link } from 'react-router-dom';
import logo from '../../assets/cwz.png';
import AccountCircle from '@material-ui/icons/AccountCircle';
export default function Navbar() {
  const classes = useStyles();
  const [username, setUsername] = useState(localStorage.getItem('username'));
  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: 'white', boxShadow: "none", color: "black" }} >
        <Toolbar>
          <img src={logo} />
          {/* <Typography variant="h6" className={classes.title}>
            Navbar
          </Typography> */}
          {username ? (
            <Grid container spacing={3} className={classes.marginLeft}>
              <Grid item md={3} xs={12}>
                <Link to="/post" className={classes.link} >
                  <Button color="inherit">Post a Bounty</Button>

                </Link>
              </Grid>
              <Grid item md={3} xs={12}>
                <Link to={{
                  pathname: "/explore",
                  state: {
                    type: "solve"
                  },
                }}
                  className={classes.link}>
                  <Button color="inherit">Solve a Bounty</Button>
                </Link>
              </Grid>
              <Grid item md={3} xs={12}>
              <Link to={{
                  pathname: "/explore",
                  state: {
                    type: "vote"
                  },
                }}
                  className={classes.link}>
                  <Button color="inherit">Vote a Bounty</Button>
                </Link>
              </Grid>
              <Grid item md={2} xs={12}>
                <p>{username}</p>
              </Grid>
              <Grid item md={1} xs={12}>
                <Link to="/profile" className={classes.link} >
                  <AccountCircle className={classes.accountIcon} />
                </Link>
              </Grid>
            </Grid>
          ) :
            <Authenticate handleLogin={(data) => setUsername(data)} />}
        </Toolbar>
      </AppBar>
    </div>
  );
}
