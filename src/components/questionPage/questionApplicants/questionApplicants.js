import React from "react";
import "../questionPage.css";
import Grid from "@material-ui/core/Grid";
import "../questionPage.css";
import QuestionSolutionCard from "./questionSolutionCard";
export default function QuestionApplicants(props) {
  return (
    <>
      <Grid container spacing={3} style={{ marginLeft: "-2.3%" }}>
        <Grid item md={12}>
          <p style={{ fontWeight: 700, fontSize: "2rem" }}>
            {props.solutions && props.solutions.length
              ? "Submitted solutions"
              : "Be the first one to submit a solution"}
          </p>
        </Grid>
        {props.solutions && props.solutions.length !== 0 ? (
          <>
            {props.solutions &&
              props.solutions.length &&
              props.solutions.map((solution, index) => (
                <Grid item md={4}>
                  <QuestionSolutionCard
                    solution={solution}
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
