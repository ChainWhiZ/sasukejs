import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "../questionPage.css";

export default function QuestionRightHeading(props) {
  return (
      <Grid container className="heading-box center"  direction="column"
      justifyContent="center"
      alignItems="center">
    
            <Grid item md={12}>
              <p class="heading color-neon">Bounty Amount</p>
              <p class="time ">{props.questionStage==="vote"?props.communityReward:props.bountyReward + " CWZ"}</p>
              <p class="time margin-top-20">{props.bountyReward + " CWZ"}</p>
              <p class="time margin-top-20">{props.bountyReward + " CWZ"}</p>
            </Grid>
            
      </Grid>

  );
}
