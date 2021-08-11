import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {
  initiliaseWeb3,
  fetchAccount,
  initiliaseContract,
} from "../../../web3js/web3";

export default function EscrowDialog(props) {
  const [open, setOpen] = useState(props.open);
  const [escrow, setEscrow] = useState('');
  const [username] = localStorage.getItem("username");
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState("");

  useEffect(async() => {
    await initiliaseWeb3();
    await fetchAccount(function (result) {
      setWalletAddress(result[0]);
    });
    setContract(await initiliaseContract());

    if (props.escrowId) {

      axios
        .post(`https://chainwhiz.herokuapp.com/escrow/fetch`, {
          _id: props.escrowId
        })
        .then((response) => {
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
    return Promise.resolve()
    .then(async function () {
      return await contract.methods.initEscrow(props.questionUrl,props.solverAddress).send({from:walletAddress})//questionhash and solver address from props
    })
    
    .then(async function () {
      return axios
      .post(`https://chainwhiz.herokuapp.com/escrow/init`, {
        _id:props.solutionId
      })
      .then((response) => {
        console.log(response.status)
      })
      .catch((err) => console.log(err));
    })
    

  };
  const handleInProcess = () => {
    return Promise.resolve()
    .then(async function(){
      return await contract.methods.transferOwnership(props.solverAddress,props.questionUrl).send({from:walletAddress})//solver address and questionhash
    })
    .then(async function(){
      axios
      .post(`https://chainwhiz.herokuapp.com/escrow/inprocess`, {
        _id:props.escrowId
      })
      .then((response) => {
        console.log(response.status)
       
      })
      .catch((err) => console.log(err));
    })

  };
  const handleComplete = () => {

    return Promise.resolve()
    .then(async function(){
      return await contract.methods.transferMoney(props.publisherAddress,props.questionUrl).send({from:walletAddress})//publisher address and question hash
    })
    .then(async function(){
      axios
      .post(`https://chainwhiz.herokuapp.com/escrow/complete`, {
        _id:props.escrowId
      })
      .then((response) => {
        console.log(response.status)
      })
      .catch((err) => console.log(err));

    })

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
