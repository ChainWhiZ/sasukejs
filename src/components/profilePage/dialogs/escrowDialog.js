import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function EscrowDialog(props) {
  const [open, setOpen] = useState(props.open);
  const [escrow, setEscrow] = useState('');
  const [username] = localStorage.getItem("username");
  useEffect(() => {
    if (props.escrowId) {

      axios
        .post(`https://chainwhiz.herokuapp.com/escrow/fetch`, {
          _id: props.escrowId
        })
        .then((response) => {
          console.log(response.data)
          setEscrow(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  const handleClose = () => {
    setOpen(false);
    props.handleDialogClose(false);
  };
  const handleInit = () => {
    axios
      .post(`https://chainwhiz.herokuapp.com/escrow/init`, {
        _id:props.solutionId
      })
      .then((response) => {
        console.log(response.status)
      })
      .catch((err) => console.log(err));
  };
  const handleInProcess = () => {
    axios
      .post(`https://chainwhiz.herokuapp.com/escrow/inprocess`, {
        _id:props.escrowId
      })
      .then((response) => {
        console.log(response.status)
       
      })
      .catch((err) => console.log(err));
  };
  const handleComplete = () => {
    axios
      .post(`https://chainwhiz.herokuapp.com/escrow/complete`, {
        _id:props.escrowId
      })
      .then((response) => {
        console.log(response.status)
      })
      .catch((err) => console.log(err));
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Escrow Stage</DialogTitle>
      <p>{escrow.escrowStatus}</p>
      <Button disabled={props.from === "bountyPosted" && !escrow ? false : true} onClick={()=>handleInit()}>Init</Button>
      <Button disabled={props.from === "bountyPosted" && escrow.escrowStatus==="init" ? false : true} onClick={()=>handleInProcess()}>Onwership Received</Button>
      <Button disabled={props.from === "bountySolved" && escrow.escrowStatus==="inprocess" ? false : true} onClick={()=>handleComplete()}>Bounty Received</Button>
      <Button onClick={handleClose}>Close</Button>
    </Dialog>
  );
}
