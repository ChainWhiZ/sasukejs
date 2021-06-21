import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

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
  useEffect(() => {
    axios
      .post(`http://localhost:4000/question/fetch`, {
        _id: props.match.params.id,
      })
      .then((response) => {
        console.log(response);
      });
  });

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={8} xs={12}>
          <QuestionHeading {...props} />
          <QuestionDescription {...props}/>
        </Grid>
        <Grid item md={4} xs={12}>
          <QuestionStage {...props} />
        </Grid>
      </Grid>
    </div>
  );
}
