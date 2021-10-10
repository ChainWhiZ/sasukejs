import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Input } from "@material-ui/core";
export default function DaysInputComponent(props) {
    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{ marginTop: "16%", marginLeft: "10%" }}>
            <Grid item md={4} xs={4}>
                <h1> Expected Time</h1>
            </Grid>
            <br></br>
            <Grid item>
                <Input placeholder="Days" size="large" className="input-field-text" style={{ color: "white", width: "50vw", fontWeight: "600", fontSize: "100px", textAlign: "center", paddingLeft: "35%" }} onChange={(e)=>{props.handleTime(e.target.value)}}/>
            </Grid>
        </Grid>
    )

}