import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import WorkplanSubmit from "../dialogs/workplanSubmit";
import { Link } from "react-router-dom";
import "../questionPage.css";

export default function QuestionLeftHeading(props) {
    console.log(props)
    let hoursOrDaysOrMinutes = "Days";
    let disabled = true;
    const seconds = Math.floor(new Date().getTime() / 1000);
    let timeLeft = 0;
    if (props.questionStage === "solve" && props.isCommunityApprovedSolution) {
        timeLeft = (props.votingTimeBegin - seconds) / (3600 * 24);
    }
    else {
        timeLeft = (props.timeEnd - seconds) / (3600 * 24);
    }

    if (timeLeft < 1) {
        hoursOrDaysOrMinutes = "Hour(s)";
        timeLeft = 24 * timeLeft;
        if (timeLeft < 1) {
            hoursOrDaysOrMinutes = "Minute(s)";
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
            <Grid container className="heading-box center margin-bottom2" direction="row"
                justifyContent="center"
                alignItems="center">
                {props.timeEnd > seconds ? (
                    <Grid item md={12}>
                        <p class="heading color-neon" >Time Remaining</p>
                        <p class="time" >{timeLeft + " " + hoursOrDaysOrMinutes}</p>
                    </Grid>
                ) : (
                    <Grid item md={12}>
                        <p class="heading color-neon">Time Remaining</p>
                        <p class="time">0</p>
                    </Grid>
                )}
                <Grid item md={12}>
                    <p class="heading color-neon margin-top-3" >Applicants</p>
                    <p class="time">{props.workplanIds.length}</p>
                </Grid>
                <Grid item md={12} className="margin-top-10">
                    {props.questionStage === "vote" ?
                        (<Link
                            to={{
                                pathname: "/vote",
                                state: {
                                    questionDetails: props.question,
                                },
                            }}
                        >
                            <Button class="button" >
                                Vote Now
                            </Button>
                        </Link>
                        )
                        :
                        (
                            <Button class="button" disabled={props.questionStage === "complete"} onClick={() => setOpenWorkplanDialog(true)}>
                                Submit Work Plan
                            </Button>
                        )


                    }

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
