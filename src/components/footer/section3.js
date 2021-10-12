import React from "react";
import Grid from "@material-ui/core/Grid";
// import "./footer.css";
export default function Section3() {
  return (
    <>
      <Grid container class="common-text-css">
        <Grid item md={12} xs={12}>
          <p>Collective Intelligence</p>
        </Grid>
        <Grid item md={12} xs={12}>
          <p>Blogs </p>
        </Grid>
        <Grid item md={12} xs={12}>
          <p>Support </p>
        </Grid>
        <Grid item md={12} xs={12}>
          <p>Contact us </p>
        </Grid>
      </Grid>
    </>
  );
}
