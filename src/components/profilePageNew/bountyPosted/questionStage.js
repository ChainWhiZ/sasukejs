import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../profilePageCss.css"

export default function QuestionStage(props) {
  console.log(props);

  return (
    <Grid container  className="profile-question-stage-grid">
      <Grid item md={12} style={{ textAlign: "center" }}>
        <p className="profile-text-style">Bounty Amount</p>
        <p
          className="profile-content-style profile-text-center profile-bounty-reward"
          style={{ marginTop: "1%" }}
        >
          {props.bountyReward} MATIC
        </p>
      </Grid>
      <Grid item md={12}>
      <p
              className="profile-text-style profile-text-center"
              style={{ marginTop: "-8%" }}
            >
              Status
            </p>
        {props.questionStage === "solve" ? (
          <>
           
            <p className="profile-content-style profile-text-center">
              Solving Phase In Progress
            </p>
          </>
        ) : props.questionStage === "vote" ? (
          <>
          
            <p className="profile-content-style profile-text-center">
              Voting Phase In Progress
            </p>
          </>
        ) : props.questionStage === "complete" ? (
          <>
           
            <p className="profile-content-style profile-text-center">
              Completed
            </p>
          </>
        ) : null}
      </Grid>
      <Grid item md={12} style={{ textAlign:"center"}}>
        {props.isCommunityApprovedSolution ? (
          props.questionStage === "complete" ? (
            <Button className="profile-button">View Results</Button>
          ) : (
            <Link to={`/bounty/${props._id}`}>
              <Button className="profile-button">Go to Bounty Page</Button>
            </Link>
          )
        ) : props.questionStage === "solve" ? (
          <Link to={`/bounty/${props._id}`}>
            <Button className="profile-button">Go to Bounty Page</Button>
          </Link>
        ) : (
          <Button className="profile-button">View All Solutions</Button>
        )}
      </Grid>
    </Grid>
  );
}
