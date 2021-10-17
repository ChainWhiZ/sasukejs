import React from "react";
import Grid from "@material-ui/core/Grid";
import "./explore.css";
import search from "../../assets/Search.png";
import QuestionCard from "./questionCard";

export default function Questions(props) {
  return (
    <>
      <Grid container className="questions-section">
        <Grid item md={6}>
          <p className="bounty-heading">
            {props.data.length ? "Active Bounties" : "No Available Bounties"}
          </p>
        </Grid>
        <Grid item md={4} className="questions-search">
          <input type="search" className="input" />
        </Grid>
        <Grid item md={2} className="questions-search">
          <img src={search} alt="search" />
        </Grid>
        <hr className="question-hr" />
      </Grid>
      <Grid item md={12}>
        {props.data.length ? (
          props.data.map((question) => (
            <>
              <QuestionCard {...question} />
              <hr className="question-hr" />
            </>
          ))
        ) : (
          <p>No questions? Looks like the world is going to end</p>
        )}
      </Grid>
    </>
  );
}
