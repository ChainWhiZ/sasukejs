import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import StakingTopCards from "./stakingTopCard/stakingTopCards"
import {stakingCardTitles} from "../../constants"
import "./stakingPage.css"
const StakingPage = () => {
    const [stakeAmount, setStakeAmount]=useState("")
    return (
        <React.Fragment >
            <Grid container direction="column" spacing={2} className="staking-page-root">
                <Grid item md={12} xs={5}>
                    <StakingTopCards titles={stakingCardTitles} handleStakeAmount={setStakeAmount} stakeAmount={stakeAmount}/>
                </Grid>
                <Grid item md={12} xs={7}>

                </Grid>

            </Grid>


        </React.Fragment>
    )
}

export default StakingPage;