import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { communityText, bountyTypeChoice } from "../../../constants";
import "./baseComponentCss.css";

export default function PageChangeButtons(props) {
    console.log(props);
    //type 0 is + 1 is -
    function getPageChange(type = 0) {
        if (type && props.pageState === 8) {
            return props.pageState - 1;
        }
        // if (!type && props.pageState === 5 && props.issueUrlOptions.choice === options.issueUrlOptions[0].value) {
        //     return props.pageState + 2;
        // }
        if (!type && props.pageState === 9 && props.communityOption === communityText[1].title) {
            return props.pageState + 3;
        }
        // if (type && props.pageState === 12 && props.paidBounty === bountyTypeChoice[1].title) {
        //     return props.pageState - 5;
        // }
        console.log("line 23",props.communityOption)
        if (type && props.pageState === 12) {
            if(typeof props.paidBounty == undefined)
                return props.pageState - 3;
            else
                return props.pageState - 6;
        }
        if (!type && props.pageState === 6 && props.paidBounty === bountyTypeChoice[1].title) {
            return props.pageState + 6;
        }
        return type ? props.pageState - 1 : props.pageState + 1;
    }
    return (
        <>
        <Grid container >
            {console.log(props.paidBounty)}
            {(props.pageState > 0 && props.pageState < 12) 
            // && ( props.paidBounty == bountyTypeChoice[0].title)  
            ? ( 
                <>
                    <Grid item md={6} xs={6} >
                        <Button
                            size="small"
                            variant="contained"
                            className="button"
                            onClick={(e) => {
                                e.preventDefault();
                                //convert into functions
                                if (props.pageState > 1 && props.pageState < 12) {
                                    console.log("in here")
                                    props.handleValidation(getPageChange(1));
                                }
                            }}
                        >
                            Previous
                        </Button>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <Button
                            size="small"
                            variant="contained"
                            className="button"
                            onClick={(e) => {
                                e.preventDefault();
                                if (props.pageState > 0 && props.pageState < 12) {

                                    props.handleValidation(getPageChange());

                                }

                            }}
                        >
                            Next
                        </Button>
                    </Grid>
                </>
            ) : (
                <>
                    <Grid item md={6} xs={6}>
                        <Button
                            size="small"
                            variant="contained"
                            className="button"
                            onClick={(e) => {
                                e.preventDefault();
                                if (props.pageState > 1 && props.pageState < 13) {
                                    props.handleValidation(getPageChange(1));
                                }
                            }}
                        >
                            Previous
                        </Button>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <Button
                            size="small"
                            variant="contained"
                            className="button"
                            onClick={(e) => {
                                e.preventDefault();
                                props.handleSubmit();
                            }}
                        >
                            Publish
                        </Button>
                    </Grid>
                </>
            )}
            </Grid>
        </>
    );
}
