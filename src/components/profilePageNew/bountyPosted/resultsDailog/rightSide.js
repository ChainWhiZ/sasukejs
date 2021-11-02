import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { port } from "../../../../config/config";
import SimpleAlerts from "../../../alert/alert";
import "../../profilePageCss.css";
import BlackInfoIcon from "../../../../assets/black_info.png";
import IdeaIcon from "../../../../assets/white_idea.png";

export default function RightSide(props) {
  const [escrow, setEscrow] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  console.log(props);
  useEffect(async () => {
    if (props.selectedSoltuionDetails.escrowId) {
      //   axios
      //     .post(port + "escrow/fetch", {
      //       _id: props.escrowId,
      //     })
      //     .then((response) => {
      //       setEscrow(response.data);
      //     })
      //     .catch((err) => {
      //       setAlert((prevState) => ({
      //         ...prevState,
      //         open: true,
      //         errorMessage: "Error fetching escrow",
      //       }))
      //     });
    }
  }, []);
  const handleEscrowDisable = () => {
    if (
      escrow.escrowStatus === "In-Process" ||
      escrow.escrowStatus === "Complete"
    )
      return true;
    return false;
  };
  const handleEscrowLabel = () => {
    if (escrow.escrowStatus === "Initiation") return "Ownership Received";
    if (escrow.escrowStatus === "In-Process") return "Reward Transfer";
    if (escrow.escrowStatus === "Complete") return "Escrow Completed";
    return "Initiate Escrow";
  };
  console.log(handleEscrowLabel());

  const handleEscrowClick = (val) => {
    if (val === "Initiate Escrow") props.handleEscrowInitiation();
    if (val === "Ownership Recieved") props.handleEscrowOwnership();
  };

  return (
    <>
      <Grid container className="results-dialog-right-grid">
        <Grid container className="results-dialog-right-grid-warning">
          <Grid item md={1} xs={12} className="results-dialog-right-grid-info">
            <img src={BlackInfoIcon} alt="info" />
          </Grid>
          <Grid item md={11}>
            <p>Make a copy of the repo before completing the escrow</p>
          </Grid>
        </Grid>
        <Grid container className="results-dialog-right-grid-content">
          <Grid item md={12}>
            <p className="results-dialog-heading">Github Repo</p>
            <p className="results-dialog-right-grid-content-value">
              {props.selectedSoltuionDetails.githubUrl}
            </p>
          </Grid>
          {props.isCommunityApprovedSolution ? (
            <>
            <Grid item md={6}>
              <p className="results-dialog-heading">Voting Score</p>
              <p className="results-dialog-right-grid-content-score">
                {props.selectedSoltuionDetails.votingScore}
              </p>
            </Grid>
             <Grid item md={6}>
             <p className="results-dialog-heading">Workplan</p>
           </Grid>
           <Grid item md={2} className="results-dialog-right-grid-github-icon">
             <img src={IdeaIcon} alt="idea" />
           </Grid>
           <Grid item md={4} className="results-dialog-right-grid-workplan">
             <p className="results-dialog-right-grid-content-value">
               {props.selectedSoltuionDetails.workplan}
             </p>
           </Grid>
           </>
          ) : 
          <>
          <Grid item md={12}>
          <p className="results-dialog-heading">Workplan</p>
          </Grid>
          <Grid item md={1}>
          <img src={IdeaIcon} alt="idea" />
          </Grid>
          <Grid item md={11} className="results-dialog-right-grid-content-value-non-community">
          <p className="results-dialog-right-grid-content-value">
               {props.selectedSoltuionDetails.workplan}
             </p>
          </Grid>
          </>}
         
        </Grid>
        <Grid item md={12} xs={12}>
          <Button
            className="profile-button results-dialog-right-grid-button"
            disabled={handleEscrowDisable()}
            onClick={(e) => handleEscrowClick(e.target.innerText)}
          >
            {handleEscrowLabel()}
          </Button>
        </Grid>
      </Grid>
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </>
  );
}
