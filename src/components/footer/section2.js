import React from "react";
import Grid from "@material-ui/core/Grid";
import "./footer.css";
export default function Section2() {
  return (
    <>
      <Grid container class="common-text-css">
        <Grid item md={12} xs={12}>
          <a
            href="https://www.app.chainwhiz.app/"
            target="_blank"
            rel="noreferrer"
          >
            <p>Launch App</p>
          </a>
        </Grid>
        <Grid item md={12} xs={12}>
          <p style={{ opacity: "40%" }}>White Paper </p>
        </Grid>
        <Grid item md={12} xs={12}>
          <p style={{ opacity: "40%" }}>Documentation </p>
        </Grid>
        <Grid item md={12} xs={12}>
          <a
            href="https://polygon.technology/"
            target="_blank"
            rel="noreferrer"
          >
            <p>Polygon Network </p>
          </a>
        </Grid>
        <Grid item md={12} xs={12}>
          <a
            href="./Product_Guidelines.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <p>Product Guidelines </p>
          </a>
        </Grid>
        <Grid item md={12} xs={12}>
          <p style={{ opacity: "40%" }}>Brand Kit </p>
        </Grid>
      </Grid>
    </>
  );
}
