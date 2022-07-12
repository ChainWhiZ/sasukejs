import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { port } from "../../../config/config";
import LinkIcon from "../../../assets/Link.svg";
import ResultsDialog from "./resultsDailog/resultsDialog";
import UnpaidResultsDialog from "./unpaidResultsDialog/unpaidResultsDialog";
import "../profilePageCss.css";
import { useRecoilValue } from "recoil";
import { walletAddress as walletAddressAtom } from "../../../recoil/atoms";
import { generateAndVerifyBountyEndSignature } from "../../../web3js/web3";
import SimpleAlerts from "../../alert/alert";
import axios from "axios";

export default function QuestionStage(props) {
  const [openResultsDialog, setOpenResultsDialog] = useState(false);
  const [openUnpaidResultsDialog, setOpenUnpaidResultsDialog] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  const walletAddress = useRecoilValue(walletAddressAtom);

 
  const handleBountyEnd = async () => {
    props.handleLoader(true);
    try {
      await generateAndVerifyBountyEndSignature(
        props.bountyUrl,
        walletAddress.toString()
      ).then(async (res) => {
        console.log(res);
        if (res.status == true) {
          let axiosResponse;
          try {
            axiosResponse = await axios.post(port + "question/set-complete", {
              _id: props._id,
              signature: res.signature,
            });
            Promise.resolve(axiosResponse).then((val) => {
              if (val.status == 201) {
                window.alert("Successfully ended bounty");
                props.handleDisable();
                props.handleLoader(false);
              } else {
                props.handleLoader(false);
                setAlert((prevState) => ({
                  ...prevState,
                  open: true,
                  errorMessage: "Something went wrong while ending bounty!",
                }));
              }
            });
          } catch (error) {
            console.log(error);
            props.handleLoader(false);
            setAlert((prevState) => ({
              ...prevState,
              open: true,
              errorMessage: "Something went wrong while ending bounty!",
            }));
          }
        }
      });
    } catch (error) {
      props.handleLoader(false);
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Invalid Signature!",
      }));
    }
  };
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
            props.questionStage !== "complete" ? (
              <>
                <Button
                  className="profile-button"
                  onClick={() => setOpenUnpaidResultsDialog(true)}
                >
                  View All Solutions
                </Button>
                <br />
                <br />
                <Button
                  className="profile-button"
                  onClick={handleBountyEnd}
                  disabled={props.disable}
                >
                  End Bounty
                </Button>
              </>
            ) : (
              <Button
                className="profile-button"
                onClick={() => setOpenUnpaidResultsDialog(true)}
              >
                View All Solutions
              </Button>
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
      {openUnpaidResultsDialog ? (
        <UnpaidResultsDialog
          open={openUnpaidResultsDialog}
          handleDialogClose={() => setOpenUnpaidResultsDialog(false)}
          _id={props._id}
          question={props}
          address={props.address}
        />
      ) : (
        ""
      )}
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
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </>
  );
}
