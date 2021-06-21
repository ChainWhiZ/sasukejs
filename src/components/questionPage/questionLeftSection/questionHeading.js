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
  console.log(props);
  var today = new Date();
  var timeBegin = today.getTime() / 1000;

  return (
    <Grid container spacing={1}>
      <Grid item md={8}>
        <p>QUESTION TITLE</p>
        <p>{props.questionTitle}</p>
      </Grid>
      {props.isCommunityApprovedSolution ? (
        <>
          <Grid item md={1}>
            <p>BOUNTY(MATIC)</p>
            <p>{props.bountryReward}</p>
          </Grid>
          <Grid item md={1}>
            <p>COMMUNITY REWARD(MATIC)</p>
            <p>{props.communityReward}</p>
          </Grid>
          {props.timeEnd > timeBegin ? (
            <Grid item md={2}>
              <p>TIME LEFT(DAYS)</p>
              <p>{(Math.floor(props.timeEnd - timeBegin) / 3600) * 24}</p>
            </Grid>
          ) : (
            <Grid item md={2}>
              <p>COMPLETED</p>
            </Grid>
          )}
        </>
      ) : (
        <>
          <Grid item md={2}>
            <p>BOUNTY(MATIC)</p>
            <p>{props.bountryReward}</p>
          </Grid>
          {props.timeEnd > timeBegin ? (
            <Grid item md={2}>
              <p>TIME LEFT(DAYS)</p>
              <p>{(Math.floor(props.timeEnd - timeBegin) / 3600) * 24}</p>
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
  );
}
