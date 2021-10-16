import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import "./explore.css";
import time from "../../assets/Time.png";
import account from "../../assets/Account.png";

export default function QuestionCard(props) {
  let hoursOrDaysOrMinutes = "days";
  const seconds = Math.floor(new Date().getTime() / 1000);
  let timeLeft = (props.timeEnd - seconds) / (3600 * 24);
  if (timeLeft < 1) {
    hoursOrDaysOrMinutes = "hour(s)";
    timeLeft = 24 * timeLeft;
    if (timeLeft < 1) {
      hoursOrDaysOrMinutes = "minute(s)";
      timeLeft = Math.floor(60 * timeLeft);
    } else {
      timeLeft = Math.floor(timeLeft);
    }
  } else {
    timeLeft = Math.floor(timeLeft);
  }

  return (
    <>
      <Grid container>
        <Grid item md={8} xs={12}>
          <Link to={`/bounty/${props._id}`}>
            <p className="question-title">{props.questionTitle}</p>
          </Link>
        </Grid>

        {props.isCommunityApprovedSolution ? (
          <>
            <Grid item md={2} xs={12} className="reward-grid">
              <Box className="reward-box">{props.bountyReward} CWZ</Box>
            </Grid>
            <Grid item md={2} xs={12} className="reward-grid right-reward-box">
              <Box className="reward-box">{props.communityReward} CWZ</Box>
            </Grid>
          </>
        ) : (
          <Grid item md={4} xs={12} className="reward-grid">
            {" "}
            <Box className="reward-box">{props.bountyReward} CWZ</Box>
          </Grid>
        )}
      </Grid>

      <Grid container>
        {props.questionCategories.map((category) => (
          <Grid item md>
            <Box className="category-box">{category}</Box>
          </Grid>
        ))}

        <Grid item md={3} className="ques-detail">
          <img src={time} alt="time" className="time" />
          <p className="time-left">{timeLeft}</p>
          <p className="time-unit">{hoursOrDaysOrMinutes}</p>
        </Grid>
        <Grid item md={3}>
          <img src={account} alt="account" className="account" />
          <p className="no-of-solvers">{props.workplanIds.length}</p>
          <p className="solver">solvers</p>
        </Grid>
      </Grid>
    </>
  );
}
