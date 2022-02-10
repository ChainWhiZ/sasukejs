import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "./landing.css";
// import WaitlistForm from "../form/waitlistForm";
import { Link } from "react-router-dom";
// import { createPopup } from "@typeform/embed";
// import "@typeform/embed/build/css/popup.css";
import LoginPopup from "./loginPopup";

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
        <Grid item md={12} xs={12}>
          <p className="landing-warning">
            {" "}
            It’s not you. It’s us. Our contract is not audited. Report bugs at
            hello.chainwhiz@gmail.com.
          </p>
        </Grid>
        <Grid item md={12} xs={12}>
          <p className="landing-heading">Welcome to Chainwhiz</p>
        </Grid>
        {/* <Grid item md={12} xs={12} className="margin-top-4">
          <Button id="waitlist-button" className="landing-waitlist-button" onClick={() => handleClick()}>Join Waitlist</Button>
        </Grid> */}
        <Grid item md={10} xs={12} class="description-grid">
          <p className="landing-description">
            Zero platform fees. Near to negligible network fees. Open-source and
            decentralised. This is the first public release of Chainwhiz. The
            primary objective behind the release is collecting constructive
            criticism and improve the future versions of the product.
          </p>

          <p class="landing-description margin-top-4">
            {" "}
            Chainwhiz is built on the Polygon Network and is presently deployed
            on the Mainnet.{" "}
          </p>
        </Grid>
      </Grid>
      <Grid container justify="space-evenly">
        <Link to="/post">
          <Grid item md={4} xs={12} class="category-box">
            <p className="category-title">Post a Bounty</p>
            <p className="category-description">
              Fill in the basic details like bounty title, time of delivery,
              bounty amount ,and Github issue URL and your bounty is live.
            </p>
          </Grid>
        </Link>
        <Link to="solve" className="link">
          <Grid item md={4} xs={12} class="category-box">
            <p className="category-title">Solve a Bounty</p>
            <p className="category-description">
              Start contributing on open-source projects by buildng out bounties
              listed on the platform. In exchange earn bounty rewards.
            </p>
          </Grid>
        </Link>
        <Link to="vote" className="link">
          <Grid item md={4} xs={12} class="category-box">
            <p className="category-title">Vote on Solutions</p>
            <p className="category-description">
              Stake and vote on solutions submitted by developers on bounties on
              the platform and earn incentives on the staked amount.
            </p>
          </Grid>
        </Link>
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
