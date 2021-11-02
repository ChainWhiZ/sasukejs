import React from "react";
import Grid from "@material-ui/core/Grid";
import "./landing.css";

export default function Landing() {
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
          <p className="landing-warning">Our Contract is not audited. Use at your own risk</p>
        </Grid>
        <Grid item md={12} xs={12} className="margin-top-4">
          <p className="landing-heading">Welcome to Chainwhiz</p>
        </Grid>
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
            on the Testnet.{" "}
          </p>
        </Grid>
      </Grid>
      <Grid container justify="space-evenly">
        <Grid item md={4} xs={12} class="category-box">
          <p className="category-title">Post a Bounty</p>
          <p className="category-description">
            Fill in the basic details like bounty title, time of delivery,
            bounty amount ,and Github issue URL and your bounty is live.
          </p>
        </Grid>
        <Grid item md={4} xs={12} class="category-box">
          <p className="category-title">Solve a Bounty</p>
          <p className="category-description">
            Start contributing on open-source projects by builidng out bounties
            listed on the platform. In exchange earn high bounty rewards.
          </p>
        </Grid>
        <Grid item md={4} xs={12} class="category-box">
          <p className="category-title">Vote on Solutions</p>
          <p className="category-description">
            Stake and vote on solutions submitted by developers on bounties on
            the platform and earn incentives on the staked amount.
          </p>
        </Grid>
      </Grid>
      <hr className="horizontal-line" style={{ marginTop: "8%" }} />
    </>
  );
}
