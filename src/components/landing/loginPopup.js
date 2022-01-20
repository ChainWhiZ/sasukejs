import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import "./landing.css";


export default function LoginPopup(props) {

    const handleClose = () => {
        props.handlePopupClose(false);
    };

    return (
        <>
            <Dialog
                aria-labelledby="simple-dialog-title"
                maxWidth="md"
                className="login-popup"
                open={props.open}
                BackdropProps={{
                    classes: {
                        root: "dialog-blur",
                    },
                }}
                onBackdropClick={handleClose}
            >
                
                <Grid container >
                    <Grid item md={12} style={{padding:"3rem"}}>
                        <p>
                            Please Login with your GithubId to access the Marketplace
                            
                        </p>
                        <i>Switch to Matic network and checkout our Product Guideline documentation for detailed walkthrough </i>
                    </Grid>
                    <Grid item md={12}>
                        <Button
                           class="dialog-button"
                           onClick={handleClose}
                        >
                            Okay
                        </Button>
                    </Grid>

                </Grid>


            </Dialog>
        </>
    );
}
