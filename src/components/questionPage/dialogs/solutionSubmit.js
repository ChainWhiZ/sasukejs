import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import axios from "axios";
import {
  initiliaseWeb3,
  fetchAccount,
  initiliaseContract,
} from "../../../web3js/web3";

export default function SolutionSubmit(props) {
  const [open, setOpen] = useState(props.open);
  const [scroll] = useState("paper");
  const [walletAddress, setWalletAddress] = useState("");
  const [solutions, setSolution] = useState([]);
  const [contract, setContract] = useState("");
 

  useEffect(async () => {
    await initiliaseWeb3();
    await fetchAccount(function (result) {
      setWalletAddress(result[0]);
    });
    setContract(await initiliaseContract());
  }, []);

  const handleClose = () => {
    setOpen(false);
    props.handleDialogClose(false);
  };

  const handleChange = (value, index) => {
    const sols = solutions;
    sols[index] = value;
    setSolution(sols);
  };

  const solutionPosting = async (solution) => {
     return await contract.methods
        .solutionPosting(
          props.quesDetails.publicAddress,
          props.quesDetails.githubIssueUrl,
          solution
        )
        .send({ from: walletAddress }, async function (error, transactionHash) {
          if (transactionHash) {
            return true;
          }
        })
       
   
  };
  
  const handleSubmit = async (workplanId, solution) => {
    return Promise.resolve()
        .then(async function() {
            return await solutionPosting(solution)
        })
        .then(async function() {
            return  await axios
            .post(`http://localhost:4000/solution/save`, {
              githubId: localStorage.getItem("username"),
              address: walletAddress,
              githubLink: solution,
              _id: workplanId,
              questionId:props.quesDetails._id
            })
            .then(async (response) => {
              console.log(response);
              setOpen(false);
              props.handleDialogClose(false);
            });
        })
        .then(function() {
            console.log(" ---- done ----");
        });
  // const isSuccess= await solutionPosting(solution)
  //     console.log(isSuccess);
  //       if (isSuccess) {
  //         await axios
  //           .post(`http://localhost:4000/solution/save`, {
  //             githubId: localStorage.getItem("username"),
  //             address: walletAddress,
  //             githubLink: solution,
  //             _id: workplanId,
  //           })
  //           .then(async (response) => {
  //             console.log(response);
  //             setOpen(false);
  //             props.handleDialogClose(false);
  //           });
  //       }
  //       else{
  //         alert("error in transaction");
  //       }
     
  };

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      scroll={scroll}
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="simple-dialog-title">Submit Solution</DialogTitle>
      <DialogContent dividers={scroll === "paper"}>
        <DialogContentText id="scroll-dialog-description">
          {props.quesDetails.workplanIds.map((workplanId, index) => (
            <>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12}>
                      <a href="#">{workplanId}</a>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        type={"text"}
                        variant="outlined"
                        label="Solution github link"
                        value={solutions[index]}
                        onChange={(e) => handleChange(e.target.value, index)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <p>Wallet Address</p>
                      <TextField
                        size="small"
                        type={"text"}
                        fullWidth
                        variant="outlined"
                        value={walletAddress}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={async() =>  await handleSubmit(workplanId, solutions[index])}
                  >
                    Submit
                  </Button>
                </CardActions>
              </Card>

              <br />
            </>
          ))}

          <Button onClick={handleClose}>Close</Button>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
