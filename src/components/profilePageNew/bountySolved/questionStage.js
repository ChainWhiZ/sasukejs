import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { port } from "../../../config/config";
import LinkIcon from "../../../assets/Link.svg";
import SimpleAlerts from "../../alert/alert";
import { useRecoilValue } from "recoil";
import {
  contract as contractAtom,
  walletAddress as walletAddressAtom,
} from "../../../recoil/atoms";
import "../profilePageCss.css";
import { shortenLength, checkLength } from "../../helper";
import { Tooltip } from "@material-ui/core";

export default function QuestionStage(props) {
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  const contractPromise = useRecoilValue(contractAtom);
  let contract;
  var promise = Promise.resolve(contractPromise);
  promise.then(function (v) {
    contract = v;
  });
  const walletAddress = useRecoilValue(walletAddressAtom);

  const completeCall = async () => {
    return await new Promise(async (resolve, reject) => {
      try {
        console.log(props.questionId);
        const trxObj = contract.methods
          .claimRewardAmount(
            props.questionId.address,
            props.questionId.issueUrl
          )
          .send({ from: walletAddress });
        trxObj.on("receipt", function (receipt) {
          console.log("Successfully done");

          resolve(receipt);
        });

        trxObj.on("error", function (error, receipt) {
          console.log(error);
          if (error)
            window.alert(
              error.transactionHash
                ? `Went wrong in trc hash :${error.transactionHash}`
                : error.message
            );
          props.handleLoader(false);
          reject(error.message);
        });
      } catch (error) {
        console.log(error);
        window.alert(
          error.transactionHash
            ? `Went wrong in trc hash :${error.transactionHash}`
            : error.message
        );
        props.handleLoader(false);
        reject(error);
      }
    });
  };

  const handleComplete = async () => {
    props.handleLoader(true);
    try {
      await completeCall();
    } catch (error) {
      console.log(error);
      props.handleLoader(false);
      setAlert((prevState) => ({
        ...prevState,
        isValid: true,
        errorMessage: "Something went wrong while acknowledging reward!",
      }));
    }
  };

  return (
    <>
      <Grid container className="profile-question-stage-grid">
        <Grid item md={12}>
          <p className="profile-text-style profile-text-center">Status</p>
          {props.questionId.questionStage === "solve" ? (
            <>
              <p className="profile-content-style profile-text-center">
                Solving Phase In Progress
              </p>
            </>
          ) : props.questionId.questionStage === "vote" ? (
            <>
              <p className="profile-content-style profile-text-center">
                Voting Phase In Progress
              </p>
            </>
          ) : props.questionId.questionStage === "complete" ? (
            <>
              <p className="profile-content-style profile-text-center">
                Completed
              </p>
            </>
          ) : null}
        </Grid>
        <Grid item md={12}>
          <p className="profile-text-style" style={{ textAlign: "center" }}>
            Bounty Amount
          </p>
          <Tooltip
            title={props.questionId.bountyReward}
            disableHoverListener={!checkLength(props.questionId.bountyReward)}
          >
            <p
              className="profile-content-style profile-text-center profile-bounty-reward"
              style={{ marginTop: "1%" }}
            >
              {shortenLength(props.questionId.bountyReward)}{" "}
              {props.questionId.currency}
            </p>
          </Tooltip>
        </Grid>
        <Grid item md={6} style={{ textAlign: "center" }}>
          <p className="profile-text-style profile-text-center">
            Your Solution
          </p>
          <a
            href={
              props._id.includes("https://")
                ? props._id
                : `https://${props._id}`
            }
            target="_blank"
            rel="noreferrer"
            className="profile-content-style"
          >
            <img
              class="profile-icon"
              src={LinkIcon}
              alt="git"
              style={{ marginTop: "-2%" }}
            />
          </a>
        </Grid>

          <Grid item md={6} className="profile-text-center">
          <p className="profile-text-style profile-text-center">
            Chosen Solution
          </p>
          {props.questionId.selectedSolution ? (
            <a
              href={props.questionId.selectedSolution}
              target="_blank"
              rel="noreferrer"
              className="profile-content-style"
            >
              <img
                class="profile-icon"
                src={LinkIcon}
                alt="git"
                style={{ marginTop: "-2%" }}
              />
            </a>
          ) : (
            <p className="profile-content-style" style={{ marginTop: "-3%" }}>
              NA
            </p>
          )}
        </Grid>


        <Grid item md={12} style={{ textAlign: "center" }}>
          {props.escrowStatus === "initiated" ? (
            <Button className="profile-button" onClick={() => handleComplete()}>
              Claim Reward
            </Button>
          ) : props.escrowStatus === "completed" ||
            (props.questionId.escrowStatus === "completed" &&
              props.questionId.selectedSolution === props._id) ? (
            <Button className="profile-button">Claimed</Button>
          ) : (
            <Link to={`/bounty/${props.questionId._id}`}>
              <Button className="profile-button">Go to Bounty Page</Button>
            </Link>
          )}
        </Grid>
      </Grid>
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </>
  );
}
