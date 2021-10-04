import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import "../questionPage.css";

export default function QuestionMiddleHeading(props) {
  return (
    <>
      <Grid container className="heading-box" >
        <Grid item md={12}>
          <p class="heading">Title</p>
          <p >{props.questionTitle}</p>
        </Grid>
        <Grid container direction="row"
          justifyContent="flex-start"
          alignItems="center" >
          <Grid item md={12}>
            <p class="heading">Categories</p>
          </Grid>
          {props.questionCategories &&
            props.questionCategories.length &&
            props.questionCategories.map((category) => (
              <Grid item md={4}>
                <p>{category}</p>
              </Grid>
            ))}
        </Grid>
        <Grid item md={12}>
          <p class="heading">Resources/Links</p>
          <a href={props.githubIssueUrl} target="_blank" rel="noreferrer">
            Github Repo
          </a>
        </Grid>
      </Grid>

    </>
  );
}
