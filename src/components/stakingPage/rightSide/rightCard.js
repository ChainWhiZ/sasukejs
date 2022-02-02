import React from "react";
import Grid from "@material-ui/core/Grid";
import StakeSolution from "./stakeSolution";
import { useRecoilValue } from "recoil";
import { balance as balanceAtom } from "../../../recoil/atoms";
import "../stakingPageCss.css";
import { Tooltip } from "@material-ui/core";
import { shortenLength,checkLength } from "../../helper";

export default function RightCard(props) {
  console.log(props)
  const balance = useRecoilValue(balanceAtom);
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
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
            {shortenLength(balance, 6) + " MATIC"}
          </p>
        </Tooltip>
      </Grid>

      <>
        {props.solutions && props.solutions.length ?
          props.solutions &&
          props.solutions.length &&
          props.solutions.map((solution) => (
            <StakeSolution
              solutionId={solution}
              handleStakeValidation={props.handleStakeValidation}
              handleSetStakeDetails={props.handleSetStakeDetails}
              stakeDetails={props.stakeDetails}
              disable={props.disable}
            />
          )) : <p>No solutions</p>}
      </>
    </Grid>
  );
}
