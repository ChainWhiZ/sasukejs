import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import LinkIcon from "../../../assets/Link.svg";
import ResultsDialog from "./resultsDailog/resultsDialog";
import "../profilePageCss.css";
import { useRecoilValue } from "recoil";
import { walletAddress as walletAddressAtom } from "../../../recoil/atoms";
export default function QuestionStage(props) {
  const [openResultsDialog, setOpenResultsDialog] = useState(false);
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
            {props.bountyReward} {props.currency}
          </p>
        </Grid>
        <Grid item md={12} style={{ textAlign: "center" }}>
          {props.selectedSolution ? (
            <>
              <p
                className="profile-text-style profile-text-center"
                style={{ marginTop: "-8%" }}
              >
                Chosen Solution
              </p>
              <a
                href={
                  props.selectedSolution.includes("https://")
                    ? props.selectedSolution
                    : `https://${props.selectedSolution}`
                }
                target="_blank"
                rel="noreferrer"
                className="profile-content-style"
              >
                <img
                  class="profile-icon"
                  src={LinkIcon}
                  alt="git"
                  style={{ marginTop: "2%" }}
                />
              </a>
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
          {props.bountyType === "unpaid" ? (
            (<Button className="profile-button">View All Solutions</Button>)(
              props.questionStage !== "complete" ? (
                <Button className="profile-button">End Bounty</Button>
              ) : null
            )
          ) : props.isCommunityApprovedSolution ? (
            props.address === walletAddress ? (
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
              <Button className="profile-button" disabled>
                Change Wallet Address
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
          question={props}
          isCommunityApprovedSolution={props.isCommunityApprovedSolution}
          address={props.address}
        />
      ) : (
        ""
      )}
    </>
  );
}
