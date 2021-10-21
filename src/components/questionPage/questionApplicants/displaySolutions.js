/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import axios from "axios";
import "../questionPage.css";
import { port } from "../../../config/config";
import CircularIndeterminate from "../../loader/loader";
import GithubIcon from "../../../assets/githubIcon.png";
import IdeaIcon from "../../../assets/Idea.png";
import eventBus from "../../EventBus";
import Collapse from "@material-ui/core/Collapse";
export default function DisplaySolutions(props) {
  console.log(props.solution);

  return (
    <>
      <Grid item md={9}>
        <p> {"props.solution.userId" + " submitted solution"}</p>
      </Grid>
      <Grid item md={3}>
        <img src={GithubIcon} alt="git" />
      </Grid>
    </>
  );
}
