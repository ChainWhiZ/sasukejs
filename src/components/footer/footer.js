import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Section4 from "./section4";
export default function Footer() {
  return (
    <>
      <Grid container className="global-white-text">
        <Grid item md={3} xs={12}>
          <Section1 />
        </Grid>
        <Grid item md={3} xs={12}>
          <Section2 />
        </Grid>
        <Grid item md={3} xs={12}>
          <Section3 />
        </Grid>
        <Grid item md={3} xs={12}>
          <Section4 />
        </Grid>
      </Grid>
    </>
  );
}
