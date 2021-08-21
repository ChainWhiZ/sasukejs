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
import CircularIndeterminate from "../../loader/loader";
import SimpleAlerts from "../../alert/alert";
import { useStyles } from "../profilePageCss";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

export default function EscrowDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(props.open);
  const [escrow, setEscrow] = useState("");
  const [username] = localStorage.getItem("username");
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState("");
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });

  useEffect(async () => {
    props.handleFetch();
    await initiliaseWeb3();
    await fetchAccount(function (result) {
      setWalletAddress(result[0]);
    });
    setContract(await initiliaseContract());

    if (props.escrowId) {
      axios
        .post(`https://chainwhiz.herokuapp.com/escrow/fetch`, {
          _id: props.escrowId,
        })
        .then((response) => {
          setEscrow(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [open]);
  const handleClose = () => {
    setOpen(false);
    props.handleDialogClose(false);
  };
  const handleInit = () => {
    setLoader(true);
    return Promise.resolve()
      .then(async function () {
        return await contract.methods
          .initEscrow(props.questionUrl, props.solverAddress)
          .send({ from: walletAddress }); //questionhash and solver address from props
      })

      .then(async function () {
        return axios
          .post(`https://chainwhiz.herokuapp.com/escrow/init`, {
            _id: props.solutionId,
          })
          .then((response) => {
            console.log(response.status);
            props.handleFetch();
            setLoader(false);
            setOpen(false);
            props.handleDialogClose(false);
          })
          .catch((err) => {
            setAlert((prevState) => ({
              ...prevState,
              open: true,
              errorMessage: "Error",
            }));
            setLoader(false);
            setOpen(false);
            props.handleDialogClose(false);
            console.log(err);
          });
      });
  };
  const handleInProcess = () => {
    setLoader(true);
    return Promise.resolve()
      .then(async function () {
        return await contract.methods
          .transferOwnership(props.solverAddress, props.questionUrl)
          .send({ from: walletAddress }); //solver address and questionhash
      })
      .then(async function () {
        axios
          .post(`https://chainwhiz.herokuapp.com/escrow/inprocess`, {
            _id: props.escrowId,
          })
          .then((response) => {
            console.log(response.status);
            setLoader(false);
            setOpen(false);
            props.handleDialogClose(false);
          })
          .catch((err) => {
            setAlert((prevState) => ({
              ...prevState,
              open: true,
              errorMessage: "Error",
            }));
            setLoader(false);
            setOpen(false);
            props.handleDialogClose(false);
            console.log(err);
          });
      });
  };
  const handleComplete = () => {
    setLoader(true);
    return Promise.resolve()
      .then(async function () {
        await contract.methods
          .transferMoney(props.publisherAddress, props.questionUrl)
          .send({ from: walletAddress })
          .on("error", function () {
            console.log("error");
          });
      })
      .then(async function () {
        axios
          .post(`https://chainwhiz.herokuapp.com/escrow/complete`, {
            _id: props.escrowId,
          })
          .then((response) => {
            console.log(response.status);
            setLoader(false);
            setOpen(false);
            props.handleDialogClose(false);
          })
          .catch((err) => {
            setAlert((prevState) => ({
              ...prevState,
              open: true,
              errorMessage: "Error",
            }));
            setLoader(false);
            setOpen(false);
            props.handleDialogClose(false);
            console.log(err);
          });
      });
  };

  return (
    <>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        className={classes.dialog}
      >
        <DialogTitle id="simple-dialog-title">Escrow Stage</DialogTitle>
        <DialogContent>
          {escrow.escrowStatus ? (
            <h4 className={classes.font}>
              {"Escrow Stage- " + escrow.escrowStatus.toUpperCase()}
            </h4>
          ) : null}
          <Button
            disabled={props.from === "bountyPosted" && !escrow ? false : true}
            onClick={() => handleInit()}
            variant="outlined"
            size="small"
            className={`${classes.button} ${classes.smallButton} ${classes.font}`}
          >
            Initiation
          </Button>
          <br />
          <br />
          <Button
            disabled={
              props.from === "bountyPosted" &&
              escrow.escrowStatus === "Initiation"
                ? false
                : true
            }
            onClick={() => handleInProcess()}
            variant="outlined"
            size="small"
            className={`${classes.button} ${classes.smallButton} ${classes.font}`}
          >
            Onwership Received
          </Button>
          <br />
          <br />
          <Button
            disabled={
              props.from === "bountySolved" &&
              escrow.escrowStatus === "In-Process"
                ? false
                : true
            }
            onClick={() => handleComplete()}
            variant="outlined"
            size="small"
            className={`${classes.button} ${classes.smallButton} ${classes.font}`}
          >
            Bounty Received
          </Button>
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {loader ? <CircularIndeterminate /> : null}
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </>
  );
}
