import React from "react";
import "../questionPage.css";
import Grid from "@material-ui/core/Grid";
import "../questionPage.css";
import QuestionSolutionCard from "./questionSolutionCard";

export default function QuestionApplicants(props) {
  return (
    <>
      <Grid container spacing={3} style={{ marginLeft: "-2.3%" }}>
        {props.workplanIds && props.workplanIds.length !== 0 ? (
          <>
            {props.workplanIds &&
              props.workplanIds.length &&
              props.workplanIds.map((workplanId, index) => (
                <Grid item md={4}>
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
    </>
  );
}
