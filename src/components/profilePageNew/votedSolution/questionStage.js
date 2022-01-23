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
import plus from "../../../assets/plus.svg";
import minus from "../../../assets/minus.svg";

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
        const trxObj = contract.methods
          .setApproval(
            Math.floor(props.amountToBeReturned * Math.pow(10, 18).toString())
          )
          .send({ from: walletAddress.toString() });
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
  const handleUnstake = async () => {
    try {
      props.handleLoader(true);
      let valid = true;
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

            .catch((err) => { });
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
        window.alert("Successfully unstaked");
        props.fetchVotedSolutions();
        props.handleLoader(false);
      }
    } catch (error) {
      console.log(error);
      props.handleLoader(false);
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
                {props.amountStaked} MATIC
              </p>
            </>
          ) : props.claimed ? (
            props.incentive ? (
              <>
                <p className="profile-text-style profile-text-center">Earned</p>
                <Tooltip
                  title={props.amountToBeReturned - props.amountStaked}
                  disableHoverListener={
                    !(
                      (props.incentive).toString()
                        .length > 4
                    )
                  }
                >
                  <p className="profile-content-style profile-text-center">
                    {props.incentive.toFixed(4)} {props.questionDetails.bountyCurrency}
                  </p>
                </Tooltip>
              </>
            ) : (
              <>
                <p className="profile-text-style profile-text-center">
                  Slashed
                </p>
                <Tooltip
                  title={props.amountStaked - props.amountToBeReturned}
                  disableHoverListener={
                    !(
                      (props.amountStaked - props.amountToBeReturned).toString()
                        .length > 4
                    )
                  }
                >
                  <p className="profile-content-style profile-text-center">
                    {(props.amountStaked - props.amountToBeReturned).toFixed(4)} MATIC
                  </p>
                </Tooltip>
              </>
            )
          ) : (
            <div style={{ marginTop: "-12px" }}>
              {" "}
              <p className="profile-text-style profile-text-center">
                To be Unstaked
              </p>
              <Tooltip title={props.amountStaked} disableHoverListener={!(props.amountStaked.toString().length > 4)}>
                <p className="profile-content-style profile-text-center">
                  {props.amountStaked} MATIC
                </p>
              </Tooltip>
              {props.incentive ? (
                <>
                  {" "}
                  <div class="unstake__image">
                    <img src={plus} alt="plus" style={{ width: "100%" }} />
                  </div>
                  <Tooltip title={props.incentive} disableHoverListener={!(props.incentive.toString().length > 4)}>
                    <p className="profile-content-style profile-text-center">
                      {" "}
                      {props.incentive} {props.questionDetails.bountyCurrency}
                    </p>
                  </Tooltip>
                </>
              ) : (
                <>
                  {" "}
                  <div class="unstake__image">
                    <img src={minus} alt="minus" style={{ width: "100%", margin: "7px 0px 0px 0px" }} />
                  </div>
                  <Tooltip title={props.amountToBeReturned} disableHoverListener={!(props.amountToBeReturned.toString().length > 4)}>
                    <p className="profile-content-style profile-text-center">
                      {" "}
                      {props.amountToBeReturned.toFixed(4)} MATIC
                    </p>
                  </Tooltip>
                </>
              )}
              {/* </Tooltip> */}
            </div>
          )}
        </Grid>
        <Grid item md={12} style={{ textAlign: "center" }}>
          {props.publicAddress === walletAddress ? (
            !props.claimed &&
              props.amountToBeReturned &&
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
            <Button className="profile-button " disabled>
              Change your wallet address
            </Button>
          )}
        </Grid>
      </Grid>
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </>
  );
}
