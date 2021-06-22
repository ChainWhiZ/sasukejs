import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function QuestionHeading(props) {
  const classes = useStyles();
  const seconds = Math.floor(new Date().getTime() / 1000);
  const timeLeft = Math.floor((props.timeEnd - seconds) / (3600 * 24));
  return (
    <>
      <Grid container spacing={1}>
        <Grid item md={6}>
          <p>QUESTION TITLE</p>
          <p>{props.questionTitle}</p>
        </Grid>
        {props.isCommunityApprovedSolution ? (
          <>
            <Grid item md={2}>
              <p>BOUNTY(MATIC)</p>
              <p>{props.bountyReward}</p>
            </Grid>
            <Grid item md={2}>
              <p>COMMUNITY REWARD(MATIC)</p>
              <p>{props.communityReward}</p>
            </Grid>
            {props.timeEnd > seconds ? (
              <Grid item md={2}>
                <p>TIME LEFT(DAYS)</p>
                <p>{timeLeft}</p>
              </Grid>
            ) : (
              <Grid item md={2}>
                <p>COMPLETED</p>
              </Grid>
            )}
          </>
        ) : (
          <>
            <Grid item md={3}>
              <p>BOUNTY(MATIC)</p>
              <p>{props.bountyReward}</p>
            </Grid>
            {props.timeEnd > seconds ? (
              <Grid item md={3}>
                <p>TIME LEFT(DAYS)</p>
                <p>{timeLeft}</p>
              </Grid>
            ) : (
              <Grid item md={2}>
                <p>COMPLETED</p>
              </Grid>
            )}
          </>
        )}

        <Grid item md={3}>
          <Button>Submit Work Plan</Button>
        </Grid>
        <Grid item md={3}>
          <Button>View Github Repo</Button>
        </Grid>
        <Grid item md={3}>
          <Button>Get Shareable Link</Button>
        </Grid>
        <Grid item md={3}>
          <Button>Report Pricing</Button>
        </Grid>
      </Grid>
      <hr />
    </>
  );
}
