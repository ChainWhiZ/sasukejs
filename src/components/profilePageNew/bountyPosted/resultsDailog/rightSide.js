import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { port } from "../../../../config/config";
import SimpleAlerts from "../../../alert/alert";
import "../../profilePageCss.css";
import BlackInfoIcon from "../../../../assets/black_info.png";
import IdeaIcon from "../../../../assets/white_idea.png";
import { useRecoilValue } from "recoil";
import { Tooltip } from "@material-ui/core";
import { walletAddress as walletAddressAtom } from "../../../../recoil/atoms";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function RightSide(props) {
  const [escrow, setEscrow] = useState({});
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [cloneconfirmation, setCloneconfirmation] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  console.log(props);
  useEffect(async () => {
    if (props.selectedSolution.escrowId) {
      axios
        .post(port + "escrow/fetch", {
          _id: props.selectedSolution.escrowId,
        })
        .then((response) => {
          console.log(response.data);
          setEscrow(response.data);
        })
        .catch((err) => {
          setAlert((prevState) => ({
            ...prevState,
            open: true,
            errorMessage: "Error fetching escrow",
          }));
        });
    }
  }, [props.selectedSolution.escrowId]);
  const handleEscrowDisable = () => {
    if (
      escrow.escrowStatus === "Acknowledged" ||
      props.disable ||
      !cloneconfirmation
    )
      return true;
    return false;
  };
  const handleEscrowLabel = () => {
    if (escrow.escrowStatus === "TransactionCompleted")
      return "Transaction Completed";
    return "Initiate Escrow";
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
          {props.isCommunityApprovedSolution ? (
            <>
              <Grid item md={6}>
                <p className="results-dialog-heading">Voting Score</p>
                <p className="results-dialog-right-grid-content-score">
                  {props.selectedSolution.finalVoteScore}
                </p>
              </Grid>
              <Grid item md={6}>
                <p className="results-dialog-heading">Workplan</p>
              </Grid>
              <Grid
                item
                md={2}
                className="results-dialog-right-grid-github-icon"
              >
                <a
                  href={`https://ipfs.io/ipfs/${props.selectedSolution.workplan}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={IdeaIcon} alt="idea" />
                </a>
              </Grid>
              <Grid item md={4} className="results-dialog-right-grid-workplan">
                <p className="results-dialog-right-grid-content-value">
                  {props.selectedSolution.workplanGithubId}
                </p>
              </Grid>
            </>
          ) : (
            <>
              <Grid item md={12}>
                <p className="results-dialog-heading">Workplan</p>
              </Grid>
              <Grid item md={1}>
                <a
                  href={`https://ipfs.io/ipfs/${props.selectedSolution.workplan}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={IdeaIcon} alt="idea" />
                </a>
              </Grid>
              <Grid
                item
                md={11}
                className="results-dialog-right-grid-content-value-non-community"
              >
                <p className="results-dialog-right-grid-content-value">
                  {props.selectedSolution.workplanGithubId}
                </p>
              </Grid>
            </>
          )}
        </Grid>
        <Grid item md={12} xs={12} style={{ margin: "-4% 0% 2% 12%" }}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="cloneconfirmation"
                checked={cloneconfirmation}
                onChange={(e) => setCloneconfirmation(e.target.checked)}
                style={{ color: "white" }}
              />
            }
          />
          <span className="terms-text">
            I have already taken a clone of the solution github link.
          </span>
        </Grid>
        <Grid item md={12} xs={12}>
          {props.publicAddress === walletAddress ? (
            props.hasEscrowInitiated && !props.selectedSolution.escrowId ? (
              <p>Escrow already initiated for other solution</p>
            ) : (
              <Button
                className="profile-button results-dialog-right-grid-button"
                onClick={(e) =>
                  !handleEscrowDisable() ? props.handleEscrowInitiation() : null
                }
                style={
                  handleEscrowDisable()
                    ? { color: "grey", cursor: "default" }
                    : null
                }
              >
                {handleEscrowLabel()}
              </Button>
            )
          ) : (
            <Tooltip title="Change your wallet address">
              <Button
                className="profile-button results-dialog-right-grid-button"
                style={{ color: "grey" }}
              >
                {handleEscrowLabel()}
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
