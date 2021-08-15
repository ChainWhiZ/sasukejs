import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import fleekStorage from "@fleekhq/fleek-storage-js";
import axios from "axios";

export default function WorkplanSubmit(props) {
  const [open, setOpen] = useState(props.open);
  const [buffer, setBuffer] = useState("");
  const [username] = localStorage.getItem("username");
  const handleClose = () => {
    setOpen(false);
    props.handleDialogClose(false);
  };
  const captureFile = (e) => {
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
    };
  };
  const handleSubmit = async () => {
    const timestamp = new Date().getTime();
    if(!buffer){
      //error snackbar and remove console.log
      console.log("display err here as well")
    }
    const uploadedFile = await fleekStorage.upload({
      apiKey: "U3QGDwCkWltjBLGG1hATUg==",
      apiSecret: "GMFzg7TFJC2fjhwoz9slkfnncmV/TAHK/4WVeI0qpYY=",
      key: username + timestamp,
      data: buffer,
    });
    axios
      .post(`https://chainwhiz.herokuapp.com/workplan/save`, {
        githubId: localStorage.getItem("username"),
        workplan: uploadedFile.hash,
        questionId: props.questionId,
      })
      .then((response) => {
        if (response.status === 201) {
          setOpen(false);
          props.handleDialogClose(false);
        }
      })
      .catch((err) => {
         //error snackbar and remove console.log
        console.log(err);
      });
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <p class="dialog-title">Submit Workplan</p>
      <input type="file" onChange={(e) => captureFile(e)} />
      <Button class="dialog-button" onClick={handleSubmit}>
        Submit
      </Button>
      <span>
        <Button class="dialog-button" onClick={handleClose}>
          Close
        </Button>
      </span>
    </Dialog>
  );
}
