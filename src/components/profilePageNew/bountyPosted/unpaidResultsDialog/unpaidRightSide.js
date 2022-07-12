import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "../../profilePageCss.css";
import SimpleAlerts from "../../../alert/alert";

export default function UnpaidRightSide(props) {
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  console.log(props);
  const handleSolutionSelection = () => {
    props.handleSolutionSelection();
  };
  return (
    <>
      <Grid container className="results-dialog-right-grid">
        {alert.open ? (
          <SimpleAlerts
            severity={alert.severity}
            message={alert.errorMessage}
          />
        ) : null}

        <Grid container className="results-dialog-right-grid-content">
          <Grid item md={12}>
            <p className="results-dialog-heading">Submission Link</p>
            <a
              href={props.selectedSolution.githubLink}
              target="_blank"
              rel="noreferrer"
            >
              <p className="results-dialog-right-grid-content-value">
                {props.selectedSolution.githubLink}
              </p>
            </a>
          </Grid>
        </Grid>
        {props.selectedSolution.signature ? (
          <Button
            className="profile-button results-dialog-right-grid-button"
            disabled
          >
            Selected
          </Button>
        ) : (
          <Button
            onClick={() => handleSolutionSelection()}
            className="profile-button results-dialog-right-grid-button"
            disabled={props.disable}
          >
            Select Solution
          </Button>
        )}
      </Grid>
    </>
  );
}
