/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import avatarIcon from "../../../assets/avatar.png";
import githubIcon from "../../../assets/githubIcon.png";
import axios from "axios";
import { port } from "../../../config/config";
import SimpleAlerts from "../../alert/alert";
import "../stakingPageCss.css";

export default function StakeSolution(props) {
  const [solution, setSolution] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });

  useEffect( () => {
    console.log(props.solutionId)
    axios
      .post(port + "solution/fetch", {
        solutionId: props.solutionId,
      })
      .then((response) => {
        setSolution(response.data);
        console.log(solution)
      })
      .catch((err) => {
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage:
            "Solution can't be loaded! Server-side issue. Sorry for the inconvenience",
        }));
      });
  }, [props.solutionId]);

  const handleChange = (value) => {
    props.handleSetStakeDetails({
      solutionId: props.solutionId,
      solverPublicAddress: solution.publicAddress,
      stakeAmount: value,
      solverGithubId: solution.userId,
    });
  };
 console.log(solution)
  return (
    <>
      {solution ? (
        <>
          <Grid item md={1} xs={12}>
            <img className="staking-icon" src={avatarIcon} alt="avatar" />
          </Grid>
          <Grid item md={5} xs={12}>
            <p className="staking-solution">
              {solution.userId} submitted a solution
            </p>
          </Grid>
          <Grid item md={1} xs={12}>
            <a href={props.solutionId} target="_blank" rel="noreferrer">
              <img className="staking-git-icon" src={githubIcon} alt="github" />
            </a>
          </Grid>

          <Grid item md={3} xs={12} style={{ marginBottom: "1.5%" }}>
            <TextField
              id="outlined-basic"
              type={"number"}
              variant="outlined"
              disabled={props.disable}
              size="small"
              className="staking-input"
              InputProps={{ inputProps: { min: 5, max: 40 } }}
              value={
                props.solutionId === props.stakeDetails.solutionId
                  ? props.stakeDetails.stakeAmount
                  : 0
              }
              onChange={(e) => handleChange(e.target.value)}
            />
          </Grid>
          <Grid item md={2} className="staking-button-grid">
            <Button
              variant="contained"
              className="staking-button"
              onClick={() => props.handleStakeValidation()}
              disabled={props.disable}
            >
              Stake
            </Button>
          </Grid>
        </>
      ) : null}
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </>
  );
}
