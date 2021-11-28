import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { port } from "../../../config/config";
import GithubIcon from "../../../assets/githubIcon.png";
import SimpleAlerts from "../../alert/alert";
import { useRecoilValue } from "recoil";
import {
  contract as contractAtom,
  walletAddress as walletAddressAtom,
} from "../../../recoil/atoms";
import Tooltip from "@material-ui/core/Tooltip";
import "../profilePageCss.css";

export default function QuestionStage(props) {
  console.log(props);
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
  const unstakeCall = async () => {
    return await new Promise(async (resolve, reject) => {
      try {
        const trxObj = await contract.methods
          .setApproval(props.amountToBeReturned * Math.pow(10, 18).toString())
          .send({ from: walletAddress.toString() });
        trxObj.on("receipt", function (receipt) {
          console.log("Successfully done");
          window.alert("Suuccessfulyy unstaked");
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
          reject(error.message);
        });
      } catch (error) {
        console.log(error);
        window.alert(
          error.transactionHash
            ? `Went wrong in trc hash :${error.transactionHash}`
            : error.message
        );
        reject(error);
      }
    });
  };
  const handleUnstake = async () => {
    props.handleLoader(true);
    let valid = true;
    try {
      try {
        const unstakeResponse = await unstakeCall();
      } catch (error) {
        console.log(error);
        valid = false;
      }

      if (valid) {
        try {
          const axiosResponse = await axios
            .post(port + "vote/updatereward", {
              voterId: props.voterId,
              solutionId: props.solutionId._id,
            })

            .catch((err) => {});
        } catch (error) {
          console.log(error);
          valid = false;
          setAlert((prevState) => ({
            ...prevState,
            open: true,
            errorMessage: "Error while unstaking reward",
          }));
          props.handleLoader(false);
        }
      }

      if (valid) {
        props.fetchVotedSolutions();
        props.handleLoader(false);
      }
    } catch (error) {
      console.log(error);
      setAlert((prevState) => ({
        ...prevState,
        isValid: true,
        errorMessage: "Something went wrong while unstaking reward!",
      }));
    }
  };

  return (
    <>
      <Grid container className="profile-question-stage-grid">
        <Grid item md={12}>
          <p className="profile-text-style profile-text-center">Status</p>
          {props.questionDetails.questionStage === "vote" ? (
            <>
              <p className="profile-content-style profile-text-center">
                Voting Phase In Progress
              </p>
            </>
          ) : props.claimed ? (
            <p className="profile-content-style profile-text-center">
              Bounty Completed
            </p>
          ) : (
            <p className="profile-content-style profile-text-center">
              Voting Phase Completed
            </p>
          )}
        </Grid>
        <Grid item md={6} style={{ textAlign: "center" }}>
          <p className="profile-text-style profile-text-center">Voted On</p>
          <a href={props.solutionId._id} target="_blank" rel="noreferrer">
            <img src={GithubIcon} alt="git" style={{ marginTop: "-2%" }} />
          </a>
        </Grid>
        <Grid item md={6}>
          {props.questionDetails.questionStage === "vote" ? (
            <>
              <p className="profile-text-style profile-text-center">Staked</p>
              <p className="profile-content-style profile-text-center">
                {props.amountStaked}
              </p>
            </>
          ) : props.claimed ? (
            props.amountToBeReturned > props.amountStaked ? (
              <>
                <p className="profile-text-style profile-text-center">Earned</p>
                <p className="profile-content-style profile-text-center">
                  {props.amountToBeReturned - props.amountStaked}
                </p>
              </>
            ) : (
              <>
                <p className="profile-text-style profile-text-center">
                  Slashed
                </p>
                <p className="profile-content-style profile-text-center">
                  {props.amountStaked - props.amountToBeReturned}
                </p>
                :
              </>
            )
          ) : (
            <>
              {" "}
              <p className="profile-text-style profile-text-center">
                To be Unstaked
              </p>
              <p className="profile-content-style profile-text-center">
                {props.amountToBeReturned}
              </p>
            </>
          )}
        </Grid>
        <Grid item md={12} style={{ textAlign: "center" }}>
          {props.publicAddress === walletAddress ? (
            !props.claimed &&
            props.questionDetails.questionStage === "complete" ? (
              <Button className="profile-button" onClick={handleUnstake}>
                Unstake Now
              </Button>
            ) : (
              <Link to={`/bounty/${props._id}`}>
                <Button className="profile-button">Go to Bounty Page</Button>
              </Link>
            )
          ) : (
            <Tooltip title="Change your wallet address">
              <Button className="profile-button " style={{ opacity: "25%" }}>
                Go to Bounty Page
              </Button>
            </Tooltip>
          )}
        </Grid>
      </Grid>
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </>
  );
}
