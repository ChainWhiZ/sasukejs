import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "./profilePageCss.css"

export default function QuestionStage(props) {
    console.log(props);


    return (

        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="profile-question-stage-grid"
        >
            <Grid item md={12}>
                <p>Bounty Amount</p>
                <p>{props.bountyReward}</p>
            </Grid>
            <Grid item md={12}>
                <p>Winning Solution</p>
                <p>mishramonalisha76</p>
            </Grid>
            <Grid item md={12} >

                <Button className="profile-button">Go to Bounty Page</Button>

            </Grid>
        </Grid>

    );
}