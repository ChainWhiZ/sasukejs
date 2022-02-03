import React from "react";
import Grid from "@material-ui/core/Grid";
import "./footer.css";
import logo from "../../assets/new-logo.svg";
export default function Section1() {
  return (
    <>
      <Grid container>
        <Grid item md={12} xs={12}>
          <img src={logo} alt="logo" className="footer-logo" />
        </Grid>
        <Grid item md={12} xs={12}>
          <p className="section1-text text1">
          Chainwhiz is an open-source bounty marketplace connecting Web3 projects with builders and communities.{" "}
          </p>
        </Grid>
        <Grid item md={12} xs={12}>
          <p className="section1-text">
          Our mission is to build a transparent and community-centric bounty platform for scaling and forming communities.{" "}
          </p>
        </Grid>
      </Grid>
    </>
  );
}
