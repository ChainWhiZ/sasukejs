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

export default function QuestionHeading() {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item md={8}>
        <p>QUESTION TITLE</p>
        <p>Add Info On Setup And Pypi For Release</p>
      </Grid>
      <Grid item md={2}>
        <p>BOUNTY(MATIC)</p>
        <p>200</p>
      </Grid>
      <Grid item md={2}>
        <p>TIME LEFT(DAYS)</p>
        <p>89</p>
      </Grid>
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
