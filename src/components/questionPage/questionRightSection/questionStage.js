import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {
  votingPhaseDetails,
  solvingPhaseDetails,
  completed,
} from "../../../constants";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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

export default function QuestionStage(props) {
  const classes = useStyles();
  const seconds = Math.floor(new Date().getTime() / 1000);
  return (
    <Grid container>
      {props.timeEnd > seconds ? (
        <Grid item md={12}>
          IN PROGRESS
        </Grid>
      ) : (
        <Grid item md={12}>
          COMPLETED
        </Grid>
      )}
      <Grid item md={12}>
        <Card>
          <CardContent>
            {props.isCommunityApprovedSolution ? (
              props.votingTimeBegin > seconds ? (
                <>
                  <p>{solvingPhaseDetails.heading}</p>
                  <p>{solvingPhaseDetails.description}</p>
                </>
              ) : props.timeEnd > seconds ? (
                <>
                  <p>{votingPhaseDetails.heading}</p>
                  <p>{votingPhaseDetails.description}</p>
                </>
              ) : (
                <>
                  <p>{completed.heading}</p>
                  <p>{completed.description}</p>
                </>
              )
            ) : props.timeEnd > seconds ? (
              <>
                <p>{solvingPhaseDetails.heading}</p>
                <p>{solvingPhaseDetails.description}</p>
              </>
            ) : (
              <>
                <p>{completed.heading}</p>
                <p>{completed.description}</p>
              </>
            )}
          </CardContent>
          {seconds <= props.timeEnd && (
            <CardActions>
              {props.isCommunityApprovedSolution ? (
                props.votingTimeBegin > seconds ? (
                  <Button size="small">
                    {solvingPhaseDetails.buttonLabel}
                  </Button>
                ) : (
                  <Button size="small">{votingPhaseDetails.buttonLabel}</Button>
                )
              ) : (
                <Button size="small">{solvingPhaseDetails.buttonLabel}</Button>
              )}
            </CardActions>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
