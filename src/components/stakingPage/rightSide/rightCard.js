import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRecoilValue } from "recoil";
import LinkIcon from "../../../assets/Link.svg";
import { balance as balanceAtom } from "../../../recoil/atoms";
import "../stakingPageCss.css";
import { Tooltip } from "@material-ui/core";
import { shortenLength, checkLength } from "../../helper";

export default function RightCard(props) {
  console.log(props)
  const balance = useRecoilValue(balanceAtom);
  const handleChange = (value) => {
    props.handleSetStakeDetails({
      solutionId: props.solution._id,
      stakeAmount: value,
    });
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      className="staking-right-card"
    >
      <Grid item md={7} xs={12}>
        <p className="staking-color-neon staking-text-style staking-margin-left-20">
          Solution Submitted
        </p>
      </Grid>
      <Grid item md={5} xs={12}>
        <Tooltip
          title={balance}
          disableHoverListener={
            !(checkLength(balance, 6))
          }
        >
          <p className="staking-color-neon staking-text-style staking-margin-left-15">
            Available Balance - {shortenLength(balance, 6) + " MATIC"}
          </p>
        </Tooltip>
      </Grid>
      <Grid item md={7} xs={12} style={{ textAlign: "center" }}>
        <a href={props.solution._id} target="_blank" rel="noreferrer">
          <img className="staking-link-icon" src={LinkIcon} alt="github" />
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
            props.solution._id === props.stakeDetails.solutionId
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

    </Grid>
  );
}
