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
        <Grid container>
          <Grid item md={12} style={{ padding: "3rem" }}>
            <b style={{ color: "#d7ff2e" }}>Eyes Here!</b>
            <p>
              Connect your Metamask Wallet by clicking on the wallet icon in the navbar. Change the network to Matic Mainnet.
            </p>

            <p>
              Read the  <a href="./Product_Guidelines.pdf" target="_blank"><span style={{ color: "#d7ff2e" }}> Product Guidelines </span></a> for more details. Reachout to us on our Discord for any queries.
            </p>
          </Grid>
          <Grid item md={12}>
            <Button class="landing-dialog-button" onClick={handleClose}>
              Okay
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
