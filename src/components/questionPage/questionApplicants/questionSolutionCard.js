/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import "../questionPage.css";
import CircularIndeterminate from "../../loader/loader";

import account from "../../../assets/account-circle.png";
export default function QuestionSolutionCard(props) {
  return (
    <>
      <Grid container class="solution-section">
        <Grid item md={12}>
          <img src={account} alt="account" class="acc" />

          <span class="address">
            {props.solution.address.substring(0, 4) +
              "..." +
              props.solution.address.substring(38)}
          </span>
        </Grid>

        <Grid item md={12}>
          <a
            href={
              props.solution._id.includes("https://")
                ? props.solution._id
                : `https://${props.solution._id}`
            }
            target="_blank"
            rel="noreferrer"
          >
            <button class="submission">View Submission</button>
          </a>
        </Grid>
      </Grid>
    </>
  );
}
