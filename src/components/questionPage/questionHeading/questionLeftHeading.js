import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SolutionSubmit from "../dialogs/solutionSubmit";
import { Link } from "react-router-dom";
import { walletAddress as walletAddressAtom } from "../../../recoil/atoms";
import "../questionPage.css";
import { useRecoilValue } from "recoil";
import TweetShare from "../dialogs/tweetShare";

export default function QuestionLeftHeading(props) {
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [openSolveDialog, setOpenSolveDialog] = useState(false);
  const [openTweetDialog, setOpenTweetDialog] = useState(false);
  let hoursOrDaysOrMinutes = "days";
  const seconds = Math.floor(new Date().getTime() / 1000);
  let timeLeft = 0;
  if (
    props.questionDetails.questionStage === "solve" &&
    props.questionDetails.isCommunityApprovedSolution
  ) {
    timeLeft = (props.questionDetails.votingTimeBegin - seconds) / (3600 * 24);
  } else {
    timeLeft = (props.questionDetails.timeEnd - seconds) / (3600 * 24);
  }

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
      <Grid
        container
        className="heading-box center margin-bottom2"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {props.questionDetails.timeEnd > seconds ? (
          <Grid item md={12}>
            <p class="heading color-neon">Time Remaining</p>
            <p class="bounty-time">{timeLeft + " " + hoursOrDaysOrMinutes}</p>
          </Grid>
        ) : (
          <Grid item md={12}>
            <p class="heading color-neon">Time Remaining</p>
            <p class="bounty-time">0</p>
          </Grid>
        )}
        <Grid item md={12}>
          <p class="heading color-neon margin-top-10">Applicants</p>
          <p class="bounty-time">{props.questionDetails.solutions.length||0}</p>
        </Grid>
        <Grid item md={12} className="margin-top-10">
          {props.questionDetails.questionStage === "vote" ? (
            <Link
              to={{
                pathname: "/stake",
                state: {
                  questionDetails: props.questionDetails,
                },
              }}
              style={
                walletAddress === props.questionDetails.address
                  ? { pointerEvents: "none" }
                  : null
              }
            >
              <Button
                class="bounty-button"
                disabled={walletAddress === props.questionDetails.address}
              >
                Vote Now
              </Button>
            </Link>
          ) : props.questionDetails.questionStage === "complete" ? (
            <Button class="bounty-button">Completed</Button>
          ) : (
            <Button
              class="bounty-button"
              onClick={() => setOpenSolveDialog(true)}
              disabled={walletAddress === props.questionDetails.address}
            >
              Submit Solution
            </Button>
          )}
        </Grid>
      </Grid>
      {openSolveDialog ? (
         <SolutionSubmit
         open={openSolveDialog}
         quesDetails={props.questionDetails}
         handleDialogClose={() => setOpenSolveDialog(false)}
         handleTweetDialogOpen={() => setOpenTweetDialog(true)}
       />
      ) : (
        ""
      )}
      {openTweetDialog ? (
        <TweetShare
          open={openTweetDialog}
          handleDialogClose={() => setOpenTweetDialog(false)}
        />
      ) : (
        ""
      )}
    </>
  );
}
