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
          <a
            href="https://www.notion.so/akpradhan/Disclaimer-d5d1889f056149db9a3359a144dcd0a7"
            target="_blank"
            rel="noreferrer"
          >
            <p>Disclaimer </p>
          </a>
        </Grid>
        <Grid item md={12} xs={12}>
          {/* <a
            href="https://www.notion.so/akpradhan/Disclaimer-d5d1889f056149db9a3359a144dcd0a7"
            target="_blank"
            rel="noreferrer"
          > */}
            <p style={{opacity:"30%"}}>FAQs </p>
          {/* </a> */}
        </Grid>
        <Grid item md={12} xs={12}>
          <p style={{ color: "#d7ff2e" }}>hello.chainwhiz@gmail.com</p>
        </Grid>
      </Grid>
    </>
  );
}
