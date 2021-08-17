import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import WorkplanSubmit from "../dialogs/workplanSubmit";
import "../questionPage.css";

export default function QuestionHeading(props) {
  let hoursOrDaysOrMinutes = "DAYS";
  let disabled = true;
  const seconds = Math.floor(new Date().getTime() / 1000);
  let timeLeft = (props.timeEnd - seconds) / (3600 * 24);
  if (timeLeft < 1) {
    hoursOrDaysOrMinutes = "HOUR(S)";
    timeLeft = 24 * timeLeft;
    if (timeLeft < 1) {
      hoursOrDaysOrMinutes = "MINUTE(S)";
      timeLeft = Math.floor(60 * timeLeft);
    } else {
      timeLeft = Math.floor(timeLeft);
    }
  } else {
    timeLeft = Math.floor(timeLeft);
  }

  const [openWorkplanDialog, setOpenWorkplanDialog] = useState(false);

  return (
    <>
      <Grid container>
        <Grid item md={5}>
          <p class="heading">QUESTION TITLE</p>
          <p class="title">{props.questionTitle}</p>
        </Grid>
        {props.isCommunityApprovedSolution ? (
          <>
            <Grid item md={2}>
              <p class="heading">BOUNTY(CW)</p>
              <p class="number bounty-reward">{props.bountyReward}</p>
            </Grid>
            <Grid item md={3}>
              <p class="heading">COMMUNITY REWARD(CW)</p>
              <p class="number community-reward">{props.communityReward}</p>
            </Grid>
            {props.timeEnd > seconds ? (
              <Grid item md={2}>
                <p class="heading">TIME LEFT({hoursOrDaysOrMinutes})</p>
                <p class="number time">{timeLeft}</p>
              </Grid>
            ) : (
              <Grid item md={2}>
                <p class="heading">COMPLETED</p>
              </Grid>
            )}
          </>
        ) : (
          <>
            <Grid item md={4}>
              <p class="heading">BOUNTY(CW)</p>
              <p class="number non-vote-bounty-reward">{props.bountyReward}</p>
            </Grid>
            {props.timeEnd > seconds ? (
              <Grid item md={3}>
                <p class="heading">TIME LEFT({hoursOrDaysOrMinutes})</p>
                <p class="number non-vote-time">{timeLeft}</p>
              </Grid>
            ) : (
              <Grid item md={2}>
                <p class="heading">COMPLETED</p>
              </Grid>
            )}
          </>
        )}

        <Grid item md={3}>
          <Button class="button" onClick={() => setOpenWorkplanDialog(true)}>
            Submit Work Plan
          </Button>
        </Grid>
        <Grid item md={3}>
          <a href={props.githubIssueUrl} target="_blank" rel="noreferrer">
            <Button class="button">View Github Repo</Button>
          </a>
        </Grid>
        <Grid item md={3}>
          <Button class="button" disabled={disabled}>
            Get Shareable Link
          </Button>
        </Grid>
        <Grid item md={3}>
          <Button class="button" disabled={disabled}>
            Report Pricing
          </Button>
        </Grid>
      </Grid>
      <hr />

      {openWorkplanDialog ? (
        <WorkplanSubmit
          open={openWorkplanDialog}
          handleDialogClose={() => setOpenWorkplanDialog(false)}
          questionId={props._id}
          handleFetch={() => props.handleFetch()}
        />
      ) : (
        ""
      )}
    </>
  );
}
