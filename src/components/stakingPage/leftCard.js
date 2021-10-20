import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import ideaIcon from "../../assets/idea.png";
import "./stakingPageCss.css";


export default function LeftCard(props) {

    console.log(props)

    const handleSelectedStyle = (value) => {
        if (props.selectedWorkplan === value) {
            return "staking-workplan-card staking-selected-workplan-card";
        }
        else {
            return "staking-workplan-card";
        }
    }

    return (



        <Grid container direction="column"
            justifyContent="center"
            alignItems="flex-start"
            className="staking-left-card">
            <Grid item md={12} xs={12} >
                <p className="staking-color-neon staking-text-style staking-margin-left-60">All Workplans Submitted</p>
            </Grid>

            {props.workplans && props.workplans.length && props.workplans.map(workplan => (
                <Grid item md={12} xs={12} className={handleSelectedStyle(workplan)} onClick={() => props.handleSelect(workplan)} >
                    <p className="staking-workplan">
                        <span >
                            <img className="staking-icon" src={ideaIcon} alt="icon" />
                        </span>
                        Workplan Submitted by akp11</p>
                </Grid>
            ))}
        </Grid>



    );
}
