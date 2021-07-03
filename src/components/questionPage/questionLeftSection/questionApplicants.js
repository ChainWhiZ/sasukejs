import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ReactMarkdown from "react-markdown";
import QuestionSolutionCard from "./questionSolutionCard";

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
  const workplans = [{
    workplan: "ndoeaffedfqergre",
    solutions: [
      "hbfqioewf",
      "weferfqefq"
    ]
  },
  {
    workplan: "ndoeaffedfqergre",
    solutions: [
      "hbfqioewf",
      "weferfqefq"
    ]
  },
  {
    workplan: "ndoeaffedfqergre",
    solutions: [
      "hbfqioewf",
      "weferfqefq"
    ]
  }];


  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <p>WORKPLANS AND SOLUTIONS</p>
      </Grid>
      <Grid item md={12}>
        {workplans.map((workplan) => (
          <Grid item md={12}>
            <QuestionSolutionCard {...workplan} />
            <br/>
          </Grid>
        ))

        }
      </Grid>
    </Grid>
  );
}
