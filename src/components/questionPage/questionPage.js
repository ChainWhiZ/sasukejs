import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import QuestionHeading from "./questionLeftSection/questionHeading";
import QuestionStage from "./questionRightSection/questionStage";
import QuestionDescription from "./questionLeftSection/questionDescription";
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

export default function QuestionPage(props) {
  const classes = useStyles();
  console.log(props.match.params.id);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={8} xs={12}>
          <QuestionHeading />
          <QuestionDescription />
        </Grid>
        <Grid item md={4} xs={12}>
          <QuestionStage />
        </Grid>
      </Grid>
    </div>
  );
}
