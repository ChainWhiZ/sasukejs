import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "../questionPage.css";
import SolutionSubmit from "../dialogs/solutionSubmit";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function QuestionRightHeading(props) {
  const [openSolveDialog, setOpenSolveDialog] = useState(false);
  return (
    <>
      <Grid
        container
        className="heading-box center "
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{paddingTop:"7%"}}
      >
        <Grid item md={12}>
          <p class="heading color-neon">Bounty Amount</p>
          <p class="bounty-time ">
            {props.questionStage === "vote"
              ? props.communityReward
              : props.bountyReward + " CWZ"}
          </p>
          <p class="bounty-time margin-top-20">
            {" "}
            {props.questionStage === "vote"
              ? props.communityReward
              : props.bountyReward + " CWZ"}
          </p>
          {props.questionStage === "solve" ? (
            <Button
              class="bounty-button"
              disabled={props.questionStage === "complete"}
              onClick={() => setOpenSolveDialog(true)}
            >
              Submit Github link
            </Button>
          ) : props.questionStage === "vote" ? (
            <Link
              to={{
                pathname: "/stake",
                state: {
                  questionDetails: props,
                },
              }}
            >
              <Button class="bounty-button">Vote Now</Button>
            </Link>
          ) : (
            // <Button class="bounty-button">Completed</Button>
            <Button
            class="bounty-button"
            // disabled={props.questionStage === "complete"}
            onClick={() => setOpenSolveDialog(true)}
          >
            Submit Github link
          </Button>
          )}
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
