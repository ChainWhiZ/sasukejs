import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import WorkplanSubmit from "../dialogs/workplanSubmit";
import "../questionPage.css";

export default function QuestionLeftHeading(props) {
    console.log(props)
    let hoursOrDaysOrMinutes = "DAYS";
    let disabled = true;
    const seconds = Math.floor(new Date().getTime() / 1000);
    let timeLeft = (props.timeEnd - seconds) / (3600 * 24);
    if (timeLeft < 1) {
        hoursOrDaysOrMinutes = "HOUR(S)";
        timeLeft = 24 * timeLeft;
        if (timeLeft < 1) {
            hoursOrDaysOrMinutes = "MINUTE(S)";
            timeLeft = Math.floor(60 * timeLeft);
        } else {
            timeLeft = Math.floor(timeLeft);
        }
    } else {
        timeLeft = Math.floor(timeLeft);
    }

    const [openWorkplanDialog, setOpenWorkplanDialog] = useState(false);


    return (
        <>
            <Grid container  className="heading-box" direction="column"
                justifyContent="center"
                alignItems="center">
                {props.timeEnd > seconds ? (
                    <Grid item md={12}>
                        <p class="heading">Time Remaining({hoursOrDaysOrMinutes})</p>
                        <p class="number time">{timeLeft}</p>
                    </Grid>
                ) : (
                    <Grid item md={12}>
                        <p class="heading">COMPLETED</p>
                    </Grid>
                )}
                <Grid item md={12}>
                    <p >Applicants</p>
                    <p>{props.workplanIds.length}</p>
                </Grid>
                <Grid item md={12}>
                    <Button class="button" onClick={() => setOpenWorkplanDialog(true)}>
                        Submit Work Plan
                    </Button>
                </Grid>
            </Grid>


            {openWorkplanDialog ? (
                <WorkplanSubmit
                    open={openWorkplanDialog}
                    handleDialogClose={() => setOpenWorkplanDialog(false)}
                    questionId={props._id}
                    handleFetch={() => props.handleFetch()}
                />
            ) : (
                ""
            )}
        </>
    );
}
