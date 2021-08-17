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
import "../questionPage.css";

export default function QuestionStage(props) {
  const [openSolveDialog, setOpenSolveDialog] = useState(false);
  return (
    <>
      <Grid container>
        {props.questionStage !== "complete" ? (
          <Grid item md={12}>
            <p class="stage-title">IN PROGRESS</p>
          </Grid>
        ) : (
          <Grid item md={12}>
            <p class="stage-title"> COMPLETED</p>
          </Grid>
        )}
        <Grid item md={12} class="card-grid">
          <Card>
            <CardContent>
              {props.isCommunityApprovedSolution ? (
                props.questionStage === "solve" ? (
                  <>
                    <p class="stage-heading">{solvingPhaseDetails.heading}</p>
                    <p class="stage-description">
                      {solvingPhaseDetails.description}
                    </p>
                  </>
                ) : props.questionStage === "vote" ? (
                  <>
                    <p class="stage-heading">{votingPhaseDetails.heading}</p>
                    <p class="stage-description">
                      {votingPhaseDetails.description}
                    </p>
                  </>
                ) : (
                  <>
                    <p class="stage-heading">{completed.heading}</p>
                    <p class="stage-description">{completed.description}</p>
                  </>
                )
              ) : props.questionStage === "solve" ? (
                <>
                  <p class="stage-heading">{solvingPhaseDetails.heading}</p>
                  <p class="stage-description">
                    {solvingPhaseDetails.description}
                  </p>
                </>
              ) : (
                <>
                  <p class="stage-heading">{completed.heading}</p>
                  <p class="stage-description">{completed.description}</p>
                </>
              )}
            </CardContent>
            {props.questionStage !== "complete" && (
              <CardActions>
                {props.isCommunityApprovedSolution ? (
                  props.questionStage === "solve" ? (
                    <Button
                      class="stage-button"
                      onClick={() => setOpenSolveDialog(true)}
                    >
                      {solvingPhaseDetails.buttonLabel}
                    </Button>
                  ) : (
                    <Link
                      to={{
                        pathname: "/vote",
                        state: {
                          questionDetails:props,
                        },
                      }}
                    >
                      <Button class="stage-button">
                        {votingPhaseDetails.buttonLabel}
                      </Button>
                    </Link>
                  )
                ) : (
                  <Button
                    onClick={() => setOpenSolveDialog(true)}
                    class="stage-button"
                  >
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
          handleFetch={() => props.handleFetch()}
        />
      ) : (
        ""
      )}
    </>
  );
}
