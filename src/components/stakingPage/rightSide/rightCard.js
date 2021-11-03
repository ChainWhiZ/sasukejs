import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import StakeSolution from "./stakeSolution";
import CircularIndeterminate from "../../loader/loader";
import { useRecoilValue } from "recoil";
import { balance as balanceAtom } from "../../../recoil/atoms";
import "../stakingPageCss.css";

export default function RightCard(props) {
  console.log(props);

  const [loader, setLoader] = useState(false);
  const balance = useRecoilValue(balanceAtom);
  console.log(loader);
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
        <p className="staking-color-neon staking-text-style staking-margin-left-15">
          {balance + " MATIC"}
        </p>
      </Grid>

      {loader ? (
        <CircularIndeterminate />
      ) : (
        <>
          {props.solutions &&
            props.solutions.length &&
            props.solutions.map((solution) => (
              <StakeSolution
                solutionId={solution}
                handleStakeValidation={props.handleStakeValidation}
                handleLoader={setLoader}
                handleSetStakeDetails={props.handleSetStakeDetails}
                stakeDetails={props.stakeDetails}
                disable={props.disable}
              />
            ))}
        </>
      )}
    </Grid>
  );
}
