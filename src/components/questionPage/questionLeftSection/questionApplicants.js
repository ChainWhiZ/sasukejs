import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ReactMarkdown from "react-markdown";

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

export default function QuestionApplicants(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <p>WORKPLANS AND SOLUTIONS</p>
      </Grid>
    </Grid>
  );
}
