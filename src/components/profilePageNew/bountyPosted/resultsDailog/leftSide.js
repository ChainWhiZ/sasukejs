import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import GithubIcon from "../../../../assets/githubIcon.png";

import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { port } from "../../../../config/config";
import "../../profilePageCss.css";

export default function LeftSide(props) {
  const [username] = localStorage.getItem("username");

  console.log(props);

  return (
    <>
      <div className="results-dialog-left-grid">
        <Grid item md={12} xs={12} className="results-dialog-left-grid-heading">
          <p className="results-dialog-heading" style={{ textAlign: "center" }}>
            All Solution Posted
          </p>
        </Grid>

        {props.solutions &&
          props.solutions.length &&
          props.solutions.map((solution,index) => (
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
                <span>
                  <img src={GithubIcon} alt="github" />
                </span>
                {solution.solverGithubId}
              </p>
            </Grid>
          ))}
      </div>
    </>
  );
}
