import React from "react";
import Grid from "@material-ui/core/Grid";
// import "./footer.css";
export default function Section3() {
  return (
    <>
      <Grid container class="common-text-css">
        <Grid item md={12} xs={12}>
          <a
            href="https://youtu.be/Qfh-k9P8ZPI"
            target="_blank"
            rel="noreferrer"
          >
            <p>Collective Intelligence</p>
          </a>
        </Grid>
        <Grid item md={12} xs={12}>
          <a
            href="https://medium.com/articles-more-every-week"
            target="_blank"
            rel="noreferrer"
          >
            <p>Articles </p>
          </a>
        </Grid>
        <Grid item md={12} xs={12}>
          <a
            href="https://chainwhiz.substack.com/"
            target="_blank"
            rel="noreferrer"
          >
            <p>Newsletter </p>
          </a>
        </Grid>
        <Grid item md={12} xs={12}>
          <p style={{ opacity: "40%" }}>Contact us </p>
        </Grid>
      </Grid>
    </>
  );
}
