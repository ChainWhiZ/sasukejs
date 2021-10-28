import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { port } from "../../../config/config";
import GithubIcon from "../../../assets/githubIcon.png";
import "../profilePageCss.css"

export default function QuestionStage(props) {
  const [escrow, setEscrow] = useState("");
  useEffect(async () => {
    if (props.escrowId) {
      axios
        .post(port + "escrow/fetch", {
          _id: props.escrowId,
        })
        .then((response) => {
          setEscrow(response.data);
        })
        .catch((err) => {
          // setAlert((prevState) => ({
          //   ...prevState,
          //   open: true,
          //   errorMessage: "Error fetching escrow",
          // }))
        });
    }
  }, []);


  return (
    <Grid container className="profile-question-stage-grid">
      <Grid item md={12}>
        <p
          className="profile-text-style profile-text-center"
        >
          Status
        </p>
        {props.questionId.questionStage === "solve" ? (
          <>

            <p className="profile-content-style profile-text-center">
              Solving Phase In Progress
            </p>
          </>
        ) : props.questionId.questionStage === "vote" ? (
          <>

            <p className="profile-content-style profile-text-center">
              Voting Phase In Progress
            </p>
          </>
        ) : props.questionId.questionStage === "complete" ? (
          <>

            <p className="profile-content-style profile-text-center">
              Completed
            </p>
          </>
        ) : null}
      </Grid>
      <Grid item md={6} className="profile-text-style profile-text-center">
        <p>Your Solution</p>
        <a
          href={props._id}
          target="_blank"
          rel="noreferrer"
          className="profile-content-style"
        >

          <img class="icon" src={GithubIcon} alt="git" style={{ marginTop: "-2%" }} />
        </a>
      </Grid>
      <Grid item md={6} className="profile-text-style profile-text-center">

        <p>Winning Solution</p>
        {props.questionId.selectedSolutionId ?
          (<a
            href={props.questionId.selectedSolutionId}
            target="_blank"
            rel="noreferrer"
            className="profile-content-style"
          >

            <img class="icon" src={GithubIcon} alt="git" style={{ marginTop: "-2%" }} />
          </a>)
          :
          (<p className="profile-content-style" style={{marginTop:"-3%"}}>NA</p>)
        }
      </Grid>
      <Grid item md={12} style={{ textAlign: "center" }}>
        {
          props.escrowId && escrow.escrowStatus !== "Complete" ? (
            <Button className="profile-button" disabled={props.escrowStatus === "Initiation" ? true : false}>
              {props.escrowStatus === "Initiation" ? "Escrow Initiated" : "Recieved Reward"}
            </Button>
          ) : (
            <Link to={`/bounty/${props._id}`}>
              <Button className="profile-button">Go to Bounty Page</Button>
            </Link>
          )}
      </Grid>
    </Grid>
  );
}
