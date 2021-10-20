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

  console.log(props)
  const [username] = useState(localStorage.getItem("username"));
  const [solution, setSolution] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });

 
  useEffect(async () => {
    axios
      .post(port + "solution/fetch", {
        solutionId: props.solutionId,
      })
      .then((response) => {
        props.handleLoader(false);
        setSolution(response.data);
        
      })
      .catch((err) => {
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage:
            "Solution can't be loaded! Server-side issue. Sorry for the inconvenience",
        }));

      });
  },[]);

  const handleChange = (value) => {
    props.handleSetStakeDetails({
      solutionId: props.solutionId,
      solverPublicAddress: solution.publicAddress,
      stakeAmount: value
    })
  }

  return (
    <>

      <>
        <Grid item md={7} xs={12}>
          <p className="staking-solution">
            <span >
              <img className="staking-icon" src={avatarIcon} alt="avatar" />
            </span>
            {solution.userId} submitted a solution
            <span>
              <img className="staking-git-icon" src={githubIcon} alt="github" />
            </span>
          </p>
        </Grid>
        <Grid item md={5} xs={12} style={{ marginBottom: "1.5%" }}>
          <TextField
            id="outlined-basic"
            type={"number"}
            variant="outlined"
            size="small"
            className="staking-input"
            InputProps={{ inputProps: { min: 0, max: 10000 } }}
            value={props.solutionId === props.stakeDetails.solutionId ? props.stakeDetails.stakeAmount : 0}
            onChange={(e) => handleChange(e.target.value)}
          />

          <Button
            variant="contained"
            className="staking-button"
            onClick={() => props.handleStake()}
            disabled={props.disable}

          >
            Stake
          </Button>
        </Grid>
      </>
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </>



  );
}
