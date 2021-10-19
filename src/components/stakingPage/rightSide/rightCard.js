import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import StakeSolution from "./stakeSolution";
import "../stakingPageCss.css";


export default function RightCard(props) {

    console.log(props)

  

    return (

        <Grid container direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            className="staking-right-card"
        >
            <Grid item md={7} xs={12} >
                <p className="color-neon text-style staking-margin-left-20">Solution Submitted</p>
            </Grid>
            <Grid item md={5} xs={12} >
                <p className="color-neon text-style staking-margin-left-15">Balance - 300 CWZ</p>
            </Grid>


            {props.solutions && props.solutions.length && props.solutions.map(solution => (
              <StakeSolution solutionId={solution}/>
            ))}
        </Grid>



    );
}
