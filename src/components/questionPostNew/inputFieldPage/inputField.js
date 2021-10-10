import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";

export default function InputComponent(props) {
    function handlePlaceholder(){
        if(props.pageState==1)
            return "Enter Issue Title"
        if(props.pageState==4)
            return "Enter Github Issue URL"
        if(props.pageState==5)
            return "Enter reward amount"
    }
    console.log(props)
    return (
        <>
            <Grid container direction="column" alignItems="center" justifyContent="center" style={{ marginTop: "30%"}}>
                <Grid item md={5} xs={5}>
                    <p className="left-title">{props.pageState==1?"Issue Title":props.pageState==4?"Github Issue Link":"Reward Amount"}</p>
                </Grid>
                <Grid item md={7} xs={7} style={{ marginTop: "2%" }}>
                    <Input placeholder={handlePlaceholder()} style={{ color: "white", width: "50vw" }} onChange={(e)=>{props.pageState==1?props.handleIssueTitle(e.target.value):props.pageState==4?props.handleIssueURL(e.target.value):props.handleReward(e.target.value)}}/>
                </Grid >

            </Grid>
        </>
    )

}