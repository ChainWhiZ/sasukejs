import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { port } from "../../../config/config";
import GithubIcon from "../../../assets/githubIcon.png";
import SimpleAlerts from "../../alert/alert";
import { useRecoilValue } from "recoil";
import { contract as contractAtom,walletAddress as walletAddressAtom} from "../../../recoil/atoms";
import Tooltip from '@material-ui/core/Tooltip';
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

  const handleUnstake = () => {
    // props.handleLoader(true);
    // return Promise.resolve()
      // .then(async function () {
      //   return contract.methods
      //     .setApproval(
       //     props.amountToBeReturned * (Math.pow(10, 18))).toString(),
      //     )
      //     .send({ from: walletAddress.toString() });
      // })
    //   .then(async function () {
    //     await contract.methods.unStake(props.solutionId._id)
      //     .send({ from: walletAddress.toString() });
    //   })
    //   .then(async function () {
    //     axios
    //       .post(port + "vote/updatereward", {
    //         voterId: props.voterId,
    //         solutionId: props.solutionId._id,
    //       })
    //       .then((response) => {
    //         console.log(response.status)
    //         props.fetchVotedSolutions();
    //         props.handleLoader(false);
    //       })
    //       .catch((err) => {
    //         setAlert(prevState => ({
    //           ...prevState,
    //           open: true,
    //           errorMessage: "Error while unstaking reward"
    //         }));
    //         props.handleLoader(false);
    //       });
    //   })
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
