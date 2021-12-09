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
import "../profilePageCss.css";

export default function QuestionStage(props) {
  console.log(props);
  let valid = true;
  const [open, setOpen] = useState(false);
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
        console.log(escrow);
      })
      .catch((err) => {
        props.handleLoader(false);
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage: "Error fetching escrow",
        }));
      });
  };
  const completeCall = async () => {
    return await new Promise(async (resolve, reject) => {
      try {
        const trxObj = contract.methods
          .transferRewardAmount(
            props.questionId.publicAddress,
            props.questionId.githubIssueUrl
          )
          .send({ from: walletAddress });
        trxObj.on("receipt", function (receipt) {
          console.log("Successfully done");
          window.alert("Suuccessfuly acknowledged");
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

  const handleComplete = async () => {
    props.handleLoader(true);

    try {
      try {
        const completeResponse = await completeCall();
      } catch (error) {
        console.log(error);
        valid = false;
      }

      if (valid) {
        try {
          const axiosResponse = await axios.post(port + "escrow/complete", {
            _id: props.escrowId,
          });
        } catch (error) {
          console.log(error);
          valid = false;
          setAlert((prevState) => ({
            ...prevState,
            open: true,
            errorMessage: "Error",
          }));
          props.handleLoader(false);
          setOpen(false);
          props.handleDialogClose(false);
        }
      }

      if (valid) {
        props.handleLoader(false);
        setOpen(false);
        props.handleDialogClose(false);
        fetchEscrow();
      }
    } catch (error) {
      console.log(error);
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
          {props.questionId.selectedSolutionId.solutionId ? (
            <a
              href={props.questionId.selectedSolutionId.solutionId}
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
            props.escrowId &&
            escrow.escrowStatus !== "Acknowledged" &&
            props._id === props.questionId.selectedSolutionId.solutionId ? (
              <Button
                className="profile-button"
                onClick={() => handleComplete()}
              >
                Reward Received
              </Button>
            ) : (
              <Link to={`/bounty/${props.questionId._id}`}>
                <Button className="profile-button">Go to Bounty Page</Button>
              </Link>
            )
          ) : (
              <Button className="profile-button" disabled>
              Change wallet address
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
