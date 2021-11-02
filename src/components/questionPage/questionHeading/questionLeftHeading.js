import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import WorkplanSubmit from "../dialogs/workplanSubmit";
import { Link } from "react-router-dom";
import "../questionPage.css";

export default function QuestionLeftHeading(props) {
  console.log(props);
  const [openWorkplanDialog, setOpenWorkplanDialog] = useState(false);
  let hoursOrDaysOrMinutes = "Days";
  const seconds = Math.floor(new Date().getTime() / 1000);
  let timeLeft = 0;
  if (props.questionDetails.questionStage === "solve" && props.questionDetails.isCommunityApprovedSolution) {
    timeLeft = Math.floor((props.questionDetails.votingTimeBegin - seconds) / (3600 * 24));
  } else {
    timeLeft = Math.floor((props.questionDetails.timeEnd - seconds) / (3600 * 24));
  }

  if (timeLeft < 1) {
    hoursOrDaysOrMinutes = "Hour(s)";
    timeLeft = Math.floor(24 * timeLeft);

    if (timeLeft < 1) {
      hoursOrDaysOrMinutes = "Hour(s)";
      timeLeft = Math.floor(24 * timeLeft);

      if (timeLeft < 1) {
        hoursOrDaysOrMinutes = "Minute(s)";
        timeLeft = Math.floor(60 * timeLeft);
      } else {
        timeLeft = Math.floor(timeLeft);
      }
    } else {
      timeLeft = Math.floor(timeLeft);
    }
  }

  return (
    <>
      <Grid
        container
        className="heading-box center margin-bottom2"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {props.questionDetails.timeEnd > seconds ? (
          <Grid item md={12}>
            <p class="heading color-neon">Time Remaining</p>
            <p class="bounty-time">{timeLeft + " " + hoursOrDaysOrMinutes}</p>
          </Grid>
        ) : (
          <Grid item md={12}>
            <p class="heading color-neon">Time Remaining</p>
            <p class="bounty-time">0</p>
          </Grid>
        )}
        <Grid item md={12}>
          <p class="heading color-neon margin-top-10">Applicants</p>
          <p class="bounty-time">{props.questionDetails.workplanIds.length}</p>
        </Grid>
        <Grid item md={12} className="margin-top-10">
          {props.questionDetails.questionStage === "vote" ? (
            <Link
              to={{
                pathname: "/stake",
                state: {
                  questionDetails: props.questionDetails,
                },
              }}
            >
              <Button class="bounty-button">Vote Now</Button>
            </Link>
          ) : props.questionDetails.questionStage === "complete" ? (
            <Button class="bounty-button">Completed</Button>
          ) : (
            <Button
              class="bounty-button"
              onClick={() => setOpenWorkplanDialog(true)}
            >
              Submit Workplan
            </Button>
          )}
        </Grid>
      </Grid>

      {openWorkplanDialog ? (
        <WorkplanSubmit
          open={openWorkplanDialog}
          handleDialogClose={() => setOpenWorkplanDialog(false)}
          questionId={props.questionDetails._id}
          handleFetch={() => props.handleFetch()}
        />
      ) : (
        ""
      )}
    </>
  );
}
