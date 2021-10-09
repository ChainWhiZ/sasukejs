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
            Chainwhiz is an open-source and decentralised marketplace with zero
            platform fees.{" "}
          </p>
        </Grid>
        <Grid item md={12} xs={12}>
          <p className="section1-text">
            Our mission is to build a platform for transparent open source and
            community-centric dapp development{" "}
          </p>
        </Grid>
      </Grid>
    </>
  );
}
