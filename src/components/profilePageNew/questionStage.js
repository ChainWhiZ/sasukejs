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
                <p className="profile-text-style">Bounty Amount</p>
                <p className="profile-content-style">{props.bountyReward}</p>
            </Grid>
            <Grid item md={12}>
                <p className="profile-text-style">Winning Solution</p>
                <p className="profile-content-style">mishramonalisha76</p>
            </Grid>
            <Grid item md={12} >

                <Button className="profile-button">Go to Bounty Page</Button>

            </Grid>
        </Grid>

    );
}