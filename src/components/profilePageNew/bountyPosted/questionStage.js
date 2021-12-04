import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import GithubIcon from "../../../assets/githubIcon.png";
import ResultsDialog from "./resultsDailog/resultsDialog";
import "../profilePageCss.css";
import { useRecoilValue } from "recoil";
import { walletAddress as walletAddressAtom } from "../../../recoil/atoms";
export default function QuestionStage(props) {
  const [openResultsDialog, setOpenResultsDialog] = useState(false);
  console.log(props);
  console.log(props.selectedSolutionId);
  const walletAddress = useRecoilValue(walletAddressAtom);
  return (
    <>
      <Grid container className="profile-question-stage-grid">
        <Grid item md={12} style={{ textAlign: "center" }}>
          <p className="profile-text-style">Bounty Amount</p>
          <p
            className="profile-content-style profile-text-center profile-bounty-reward"
            style={{ marginTop: "1%" }}
          >
            {props.bountyReward} MATIC
          </p>
        </Grid>
        <Grid item md={12} style={{ textAlign: "center" }}>
          {props.selectedSolutionId ? (
            <>
              <p
                className="profile-text-style profile-text-center"
                style={{ marginTop: "-8%" }}
              >
                Winning Solution
              </p>
              <a
                href={props.selectedSolutionId.solutionId}
                target="_blank"
                rel="noreferrer"
                className="profile-content-style"
              >
                <img
                  class="icon"
                  src={GithubIcon}
                  alt="git"
                  style={{ marginTop: "2%" }}
                />
              </a>
              <p>{props.selectedSolutionId.userId}</p>
            </>
          ) : (
            <>
              <p
                className="profile-text-style profile-text-center"
                style={{ marginTop: "-8%" }}
              >
                Status
              </p>
              {props.questionStage === "solve" ? (
                <>
                  <p className="profile-content-style profile-text-center">
                    Solving Phase In Progress
                  </p>
                </>
              ) : props.questionStage === "vote" ? (
                <>
                  <p className="profile-content-style profile-text-center">
                    Voting Phase In Progress
                  </p>
                </>
              ) : props.questionStage === "complete" ? (
                <>
                  <p className="profile-content-style profile-text-center">
                    Completed
                  </p>
                </>
              ) : null}
            </>
          )}
        </Grid>
        <Grid item md={12} style={{ textAlign: "center" }}>
          {props.isCommunityApprovedSolution ? (
            props.publicAddress === walletAddress ? (
              props.questionStage === "complete" ? (
                <Button
                  className="profile-button"
                  onClick={() => setOpenResultsDialog(true)}
                >
                  View Results
                </Button>
              ) : (
                <Link to={`/bounty/${props._id}`}>
                  <Button className="profile-button">Go to Bounty Page</Button>
                </Link>
              )
            ) : (
              <Button className="profile-button" style={{ opacity: "25%" }}>
                Check Wallet Address
              </Button>
            )
          ) : props.questionStage === "solve" ? (
            <Link to={`/bounty/${props._id}`}>
              <Button className="profile-button">Go to Bounty Page</Button>
            </Link>
          ) : (
            <Button
              className="profile-button"
              onClick={() => setOpenResultsDialog(true)}
            >
              View All Solutions
            </Button>
          )}
        </Grid>
      </Grid>
      {openResultsDialog ? (
        <ResultsDialog
          open={openResultsDialog}
          handleDialogClose={() => setOpenResultsDialog(false)}
          _id={props._id}
          questionUrl={props.githubIssueUrl}
          isCommunityApprovedSolution={props.isCommunityApprovedSolution}
          publicAddress={props.publicAddress}
        />
      ) : (
        ""
      )}
    </>
  );
}
