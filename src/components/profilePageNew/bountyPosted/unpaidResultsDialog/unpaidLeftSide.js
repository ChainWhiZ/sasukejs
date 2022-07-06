import React from "react";
import Grid from "@material-ui/core/Grid";
import "../../profilePageCss.css";

export default function LeftSide(props) {
  return (
    <>
      <div className="results-dialog-left-grid">
        <Grid item md={12} xs={12} className="results-dialog-left-grid-heading">
          <p className="results-dialog-heading" style={{ textAlign: "center" }}>
            All Solutions
          </p>
        </Grid>

        {props.solutions &&
          props.solutions.length &&
          props.solutions.map((solution, index) => (
            <Grid
              item
              md={12}
              xs={12}
              onClick={() => props.handleSelectedSolution(index)}
              className={
                props.selectedSolutionIndex === index
                  ? "results-dialog-left-grid-solution results-dialog-left-grid-selected-solution"
                  : "results-dialog-left-grid-solution"
              }
            >
              <p>
                {solution.address.substring(0, 4) +
                  "..." +
                  solution.address.substring(38)}
              </p>
            </Grid>
          ))}
      </div>
    </>
  );
}
