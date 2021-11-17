import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { port } from "../../../config/config";
import GithubIcon from "../../../assets/githubIcon.png";
import SimpleAlerts from "../../alert/alert";
import { useRecoilValue } from "recoil";
import { Tooltip } from "@material-ui/core";
import { contract as contractAtom, walletAddress as walletAddressAtom } from "../../../recoil/atoms";
import "../profilePageCss.css";

export default function QuestionStage(props) {
  const [escrow, setEscrow] = useState({});
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
  useEffect(async () => {
    if (props.escrowId) {
      props.handleLoader(true);
      fetchEscrow();
    }
  }, []);

  const fetchEscrow = () => {
    axios
      .post(port + "escrow/fetch", {
        _id: props.escrowId,
      })
      .then((response) => {
        props.handleLoader(false);
        setEscrow(response.data);
      })
      .catch((err) => {
        props.handleLoader(false);
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage: "Error fetching escrow",
        }));
      });
  }

  const handleComplete = () => {
    // props.handleLoader(true);
    // return Promise.resolve()
    //   .then(async function () {
    //     await contract.methods
    //       .transferRewardAmount(props.questionId.publisherAddress, props.questionId.questionUrl)
    //       .send({ from: walletAddress })
    //       .on("error", function () {
    //         setAlert((prevState) => ({
    //           ...prevState,
    //           open: true,
    //           errorMessage: "Error",
    //         }));
    //       });
    //   })
    //   .then(async function () {
    //     axios
    //       .post(port + "escrow/complete", {
    //         _id: props.escrowId,
    //       })
    //       .then((response) => {
    //         console.log(response.status);
    //         props.handleLoader(false);
    //         setOpen(false);
    //         props.handleDialogClose(false);
    //         fetchEscrow();
    //       })
    //       .catch((err) => {
    //         setAlert((prevState) => ({
    //           ...prevState,
    //           open: true,
    //           errorMessage: "Error",
    //         }));
    //         props.handleLoader(false);
    //         setOpen(false);
    //         props.handleDialogClose(false);
    //       });
    //   });
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
        <Grid item md={6} className="profile-text-center">
          <p className="profile-text-style profile-text-center">
            Your Solution
          </p>
          <a
            href={props._id}
            target="_blank"
            rel="noreferrer"
            className="profile-content-style"
          >
            <img
              class="icon"
              src={GithubIcon}
              alt="git"
              style={{ marginTop: "-2%" }}
            />
          </a>
        </Grid>
        <Grid item md={6} className="profile-text-center">
          <p className="profile-text-style profile-text-center">
            Winning Solution
          </p>
          {props.questionId.selectedSolutionId ? (
            <a
              href={props.questionId.selectedSolutionId}
              target="_blank"
              rel="noreferrer"
              className="profile-content-style"
            >
              <img
                class="icon"
                src={GithubIcon}
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
          {props.publicAddress === walletAddress ? (
            props.escrowId && escrow.escrowStatus !== "Acknowledged" ? (
              <Button className="profile-button" onClick={()=>handleComplete()}>
                Reward Recieved
              </Button>
            ) : (
              <Link to={`/bounty/${props._id}`}>
                <Button className="profile-button">Go to Bounty Page</Button>
              </Link>
            )
          ) : (
            <Tooltip title="Change your wallet address">
              <Button className="profile-button" style={{ opacity: "25%" }}>
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
