import React, { useEffect, useState } from "react";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import StakeInputField from "./stakeInputField";


const StakingCard = (props) => {
    console.log(props)
    return (
        <React.Fragment>
            <Grid item xs={4} md={4}>
                <Card
                className="staking-card">
                    <CardContent>
                        {/** Set title of card from the props */}
                        <p className="staking-card-title" id={props.index}>{props.title}</p>
                        {/** Based on the index number either show the token info or show the input field for staking */}
                        {props.index == 0 || props.index == 1 ? (
                            <p className="staking-card-detail">{`${props.value} CWZ`}</p>
                        ) : (
                            <StakeInputField handleStakeAmount={props.handleStakeAmount} stakeAmoount={props.stakeAmoount}/>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment>
    )
}
export default StakingCard