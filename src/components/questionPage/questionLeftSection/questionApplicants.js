import React from "react";
import "../questionPage.css";
import Grid from "@material-ui/core/Grid";

import QuestionSolutionCard from "./questionSolutionCard";

export default function QuestionApplicants(props) {
  return (
    <>
      <hr />
      <Grid container spacing={1}>
        <Grid item md={12}>
          <p class="heading">WORKPLANS AND SOLUTIONS</p>
        </Grid>
        <Grid item md={12}>
          {props.workplanIds && props.workplanIds.length !== 0 ? (
            <>
              {props.workplanIds &&
                props.workplanIds.length &&
                props.workplanIds.map((workplanId, index) => (
                  <Grid item md={12}>
                    <QuestionSolutionCard
                      workplanId={workplanId}
                      isCommunityApprovedSolution={
                        props.isCommunityApprovedSolution
                      }
                      quesStage={props.questionStage}
                    />
                    <br />
                  </Grid>
                ))}
            </>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}
