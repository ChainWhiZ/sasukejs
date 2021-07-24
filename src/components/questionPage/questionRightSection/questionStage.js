import React, { useState } from "react";
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
import SolutionSubmit from "../dialogs/solutionSubmit";
import { Link } from "react-router-dom";

export default function QuestionStage(props) {
  const [openSolveDialog, setOpenSolveDialog] = useState(false);

  return (
    <>
      <Grid container>
        {props.questionStage !== "complete" ? (
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
                props.questionStage === "solve" ? (
                  <>
                    <p>{solvingPhaseDetails.heading}</p>
                    <p>{solvingPhaseDetails.description}</p>
                  </>
                ) : props.questionStage === "vote" ? (
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
              ) : props.questionStage === "solve" ? (
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
            {props.questionStage !== "complete" && (
              <CardActions>
                {props.isCommunityApprovedSolution ? (
                  props.questionStage === "solve" ? (
                    <>
                      <Button
                        size="small"
                        onClick={() => setOpenSolveDialog(true)}
                      >
                        {solvingPhaseDetails.buttonLabel}
                      </Button>
                      <Link to={{
                        pathname: "/vote",
                        state: {
                          questionDetails: props
                        },
                      }}>
                        <Button size="small">
                          {votingPhaseDetails.buttonLabel}
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link to={{
                      pathname: "/vote",
                      state: {
                        questionDetails: props
                      },
                    }}>
                      <Button size="small">
                        {votingPhaseDetails.buttonLabel}
                      </Button>
                    </Link>
                  )
                ) : (
                  <Button onClick={() => setOpenSolveDialog(true)} size="small">
                    {solvingPhaseDetails.buttonLabel}
                  </Button>
                )}
              </CardActions>
            )}
          </Card>
        </Grid>
      </Grid>
      {openSolveDialog ? (
        <SolutionSubmit
          open={openSolveDialog}
          quesDetails={props}
          handleDialogClose={() => setOpenSolveDialog(false)}
        />
      ) : (
        ""
      )}
    </>
  );
}
