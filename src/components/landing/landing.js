import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "./landing.css";
import Button from "@material-ui/core/Button";
// import WaitlistForm from "../form/waitlistForm";
import { Link } from "react-router-dom";
// import { createPopup } from "@typeform/embed";
// import "@typeform/embed/build/css/popup.css";
import LoginPopup from "./loginPopup";
// import info from "../../assets/info.png"

export default function Landing() {
  //const [waitlistDialog,setWaitlistDialog] = useState(false);
  // const handleClick = () => {
  //   const { toggle } = createPopup("UNzTJS5Q");
  //   document.getElementById("waitlist-button").onclick = toggle;
  // };
  const [loginPopup, setLoginPopup] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoginPopup(true);
    }, 3000);
  }, [])
  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className="container"
      >
        <Grid item md={12} xs={12}>
          <hr className="horizontal-line" style={{ marginTop: "2%" }} />
        </Grid>

        <Grid item md={12} xs={12} className="landing-heading-grid">
          <p className="landing-heading">Kickstart Your Journey in Web3</p>
        </Grid>
        {/* <Grid item md={12} xs={12} className="margin-top-4">
          <Button id="waitlist-button" className="landing-waitlist-button" onClick={() => handleClick()}>Join Waitlist</Button>
        </Grid> */}
        <Grid item md={12} xs={12} class="description-grid">
          <p className="landing-description">
            Discover Bounties. Contribute to your favorite DAOs and Protocols. Earn in Crypto.
          </p>
        </Grid>
      </Grid>
      <Grid container
        justifyContent="space-evenly"
        className="landing-category-grid"
        md={12}>

        <Grid item md={4} xs={12} >
          <Link to="/post">
            <Button
              size="large"
              variant="outlined"
              className="landing-button"
            >
              Post a Bounty
            </Button>
          </Link>
        </Grid>


        <Grid item md={4} xs={12} >
          <Link to="/solve" className="link">
            <Button
              size="large"
              variant="contained"
              className="landing-button landing-button-highlighted"
            >
              Start Solving Bounties
            </Button>
          </Link>
        </Grid>


        <Grid item md={4} xs={12} >
          <Link to="/vote" className="link">
            <Button
              size="large"
              variant="outlined"
              className="landing-button"
            >
              Vote on Solutions
            </Button>
          </Link>
        </Grid>


        <Grid item md={12} xs={12} style={{ textAlign: "center", marginTop: "5rem" }}>
          {/* <img src={info} alt="info" /> */}
          <i className="landing-warning">
            {" "}
            It’s not you. It’s us. Our contract is not audited. Report bugs at
            hello.chainwhiz@gmail.com.
          </i>
        </Grid>
      </Grid>
      <hr className="horizontal-line" style={{ marginTop: "8%" }} />
      {/* {waitlistDialog?
      (<WaitlistForm open={waitlistDialog} handleDialogClose={(flag)=>setWaitlistDialog(flag)}/>):null} */}
      {loginPopup ? (
        <LoginPopup
          handlePopupClose={(flag) => setLoginPopup(flag)}
          open={loginPopup}
        />
      ) : null}
    </>
  );
}
