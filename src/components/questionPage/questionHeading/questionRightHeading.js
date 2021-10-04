import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "../questionPage.css";

export default function QuestionRightHeading(props) {
  return (
      <Grid container className="heading-box"  direction="column"
      justifyContent="center"
      alignItems="center">
    
            <Grid item md={12}>
              <p class="heading">Bounty Amount</p>
              <p >{props.bountyReward}</p>
            </Grid>
            
      </Grid>

  );
}
