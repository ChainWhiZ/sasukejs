import React,{useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import "./mobileView.css";

export default function MobileView() {
  return (
    <>
      <Grid container >
        <Grid item xs={12} >
          <p className="mobile-view-p">
            Oops, looks like our devs are too caught up in building out an
            amazing product. Use your PC to unveil the experience.
          </p>
        </Grid>
      </Grid>
    </>
  );
}
