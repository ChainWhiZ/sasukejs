import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./profilePageCss.css"

export default function QuestionStage(props) {
    console.log(props);


    return (

        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className="profile-question-stage-grid"
        >
            <Grid item md={12}>
                <p className="profile-text-style">Bounty Amount</p>
                <p className="profile-content-style profile-text-center" style={{ fontSize: "34px", marginTop: "-8%" }}>{props.bountyReward}</p>
            </Grid>
            <Grid item md={12}>
                {props.questionStage === "solve" ?
                    (
                        <><p className="profile-text-style profile-text-center" style={{ marginTop: "-8%" }}>Satus</p>
                            <p className="profile-content-style profile-text-center">Solving Phase In Progress</p></>)
                    :
                    props.questionStage === "vote" ?
                        (
                            <><p className="profile-text-style profile-text-center" style={{ marginTop: "-8%" }}>Satus</p>
                                <p className="profile-content-style profile-text-center">Voting Phase In Progress</p></>)
                        : props.questionStage === "complete" ?
                            (
                                <><p className="profile-text-style profile-text-center" style={{ marginTop: "-8%" }}>Satus</p>
                                    <p className="profile-content-style profile-text-center">Completed</p></>) :
                            (null)
                }
            </Grid>
            <Grid item md={12} >

                <br />
                {props.questionStage === "complete" ?
                    (

                        <Button className="profile-button">View Results</Button>

                    )
                    :
                    (<Link to={`/bounty/${props._id}`}>
                        <Button className="profile-button">Go to Bounty Page</Button>
                    </Link>
                    )
                }


            </Grid>
        </Grid>

    );
}