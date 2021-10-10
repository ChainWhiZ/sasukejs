import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Navbar from "../../navbar/navbar";
import "./baseComponentCss.css"
import RightSideText from "./rightSideText";
import DaysInputComponent from "../daysInputPage/daysInput";
import OptionComponent from "../optionPage/optionPage";
import InputComponent from "../inputFieldPage/inputField";
export default function BaseComponent(props) {
    console.log(props)
    return (
        <>
            <div>
                <Navbar />
            </div>

            <div style={{ marginTop: "4.4%" }}>
                <Grid container >
                    <RightSideText {...props} />
                    <Grid item md={6} xs={6} >
                        {props.pageState==1?(<InputComponent handleIssueTitle={props.handleIssueTitle} pageState={props.pageState}/>):(
                            props.pageState==2?(<OptionComponent handleCategory={props.handleCategory}/>):(
                                props.pageState==3?(<DaysInputComponent handleTime={props.handleTime}/>):(
                                    props.pageState==4?(<InputComponent handleIssueURL={props.handleIssueURL} pageState={props.pageState}/>):(
                                        null
                                    )
                                )
                            )
                        )}
                    </Grid>

                </Grid>
            </div>
        </>


    )
}