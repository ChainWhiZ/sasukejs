import React from "react";
import Grid from "@material-ui/core/Grid";
// import "./footer.css";
export default function Section2() {
  return (
    <>
      <Grid container class="common-text-css">
        <Grid item md={12} xs={12}>
          <p>Marketplace</p>
        </Grid>
        <Grid item md={12} xs={12}>
          <p>White Paper </p>
        </Grid>
        <Grid item md={12} xs={12}>
          <p>Technology </p>
        </Grid>
        <Grid item md={12} xs={12}>
          <p>Polygon Network </p>
        </Grid>
        <Grid item md={12} xs={12}>
          <p>Brand Kit </p>
        </Grid>
      </Grid>
    </>
  );
}
