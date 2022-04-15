import React from "react";
import Grid from "@material-ui/core/Grid";
import ideaIcon from "../../assets/idea.png";
import ideaIconBlack from "../../assets/idea_black.png";
import "./stakingPageCss.css";

export default function LeftCard(props) {
  const handleSelectedStyle = (value) => {
    if (props.solutions[props.selectedSolutionIndex].address === value) {
      return "staking-workplan-card staking-selected-workplan-card";
    } else {
      return "staking-workplan-card";
    }
  };

  return (
    <Grid container className="staking-left-card">
      <Grid item md={12} xs={12}>
        <p className="staking-workplan-heading">All Workplans Posted</p>
      </Grid>

      {props.solutions &&
        props.solutions.length &&
        props.solutions.map((solution, index) => (
          <Grid
            item
            md={12}
            xs={12}
            className={handleSelectedStyle(solution.address)}
            onClick={() => props.handleSelectedSolution(index)}
          >
            <p
              className={
                props.solutions[props.selectedSolutionIndex].address ===
                solution.address
                  ? "staking-workplan active-black"
                  : "staking-workplan"
              }
            >
              {solution.address.substring(0, 4) +
                "..." +
                solution.address.substring(38)}
            </p>
          </Grid>
        ))}
    </Grid>
  );
}
