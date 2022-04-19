import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import SimpleAlerts from "../../alert/alert";
import Grid from "@material-ui/core/Grid";
import {TwitterShareButton,TwitterIcon} from "react-share"
import "../questionPage.css";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import {twitterMessage} from "../../../constants"

export default function TweetShare(props) {
  const [open, setOpen] = useState(props.open);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  const handleClose = () => {
    setOpen(false);
    props.handleDialogClose(false);
  };

  return (
    <>
      <Dialog
        aria-labelledby="simple-dialog-title"
        maxWidth="md"
        className="workplan-dialog"
        open={open}
        BackdropProps={{
          classes: {
            root: "dialog-blur",
          },
        }}
        onBackdropClick={handleClose}
      >
        <ClearRoundedIcon
          style={{
            marginLeft: "50rem",
            marginTop: "2vh",
            cursor: "pointer",
          }}
          onClick={() => {
            handleClose();
          }}
        />
 

        <p class="dialog-title">Let's tweet!</p>
        <Grid container className="workplan-dialog-button-grid ">
          <Grid item md={12}>
          <TwitterShareButton
            title={twitterMessage}
            //url is blank as we have already included the url in message
            url=" "
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          </Grid>
          {alert.open ? (
          <SimpleAlerts
            severity={alert.severity}
            message={alert.errorMessage}
          />
        ) : null}
        </Grid>

       
      </Dialog>
    </>
  );
}
