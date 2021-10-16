import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import StakingCard from "./stakingCard";
const StakingTopCards = (props) => {
    const [minStakingAmount, setminStakingAmount] = useState("14");
    const [tokenBalance, setTokenBalnce]=useState("240")

    const handleValue=(index)=>{
        if(index==0)
            return minStakingAmount
        if(index==1)
            return tokenBalance
    }
    return (
        <React.Fragment>
            <Grid container direction="row"  justifyContent="space-around" alignItems="center" spacing={2}>
                {props.titles ? (props.titles.map((item,index) => {
                    console.log(index, item)
                    return (
                        <StakingCard title={item} index={index} value ={handleValue(index)} handleStakeAmount={props.handleStakeAmount} stakeAmount = {props.stakeAmount}/>
                    )
                })) : (null)}
            </Grid>

        </React.Fragment>
    )
}
export default StakingTopCards