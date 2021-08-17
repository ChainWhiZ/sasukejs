import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import axios from "axios";
import {
  initiliaseWeb3,
  fetchAccount,
  initiliaseContract,
} from "../../../web3js/web3";
import "../questionPage.css";
import CircularIndeterminate from "../../loader/loader";
import SimpleAlerts from "../../alert/alert";

export default function SolutionSubmit(props) {
  const [open, setOpen] = useState(props.open);
  const [scroll] = useState("paper");
  const [walletAddress, setWalletAddress] = useState("");
  const [solutions, setSolution] = useState([]);
  const [contract, setContract] = useState("");
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  const reg = /https?:\/\/github\.com\/(?:[^\\/\s]+\/)\/(?:[^\\/\s]+\/)/;
  useEffect(async () => {
    await initiliaseWeb3();
    await fetchAccount(function (result) {
      setWalletAddress(result[0]);
    });
    setContract(await initiliaseContract());
    props.handleFetch();
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
      });
  };

  const handleSubmit = async (workplanId, solution) => {
    setLoader(true);
    //TO DO
     //check github url is valid or not
    // if (solution.match(reg)) {
    //   setAlert((prevState) => ({
    //     ...prevState,
    //     open: true,
    //     errorMessage: "Incorrect GitHub link",
    //   }));
    // }

    if (!solution) {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Solution link field is empty",
      }));
      setLoader(false);
    } else {
     
      //check if solution poster is publisher or not(better to keep check by github id as well as and by  address)
      //check if solution link exists or not
      return Promise.resolve()
        .then(async function () {
          return await solutionPosting(solution);
        })

        .then(async function () {
          return await axios
            .post(`https://chainwhiz.herokuapp.com/solution/save`, {
              githubId: "rajashree23",
              address: walletAddress,
              githubLink: solution,
              _id: workplanId,
              questionId: props.quesDetails._id,
            })
            .then(async (response) => {
              props.handleFetch();
              setOpen(false);
              setLoader(false);
              props.handleDialogClose(false);
            });
        });
    }
  };

  return (
    <>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        scroll={scroll}
        aria-describedby="scroll-dialog-description"
      >
        <p class="dialog-title">Submit Solution</p>
        <p class="solution-submit-title">
          Please paste your solution link directly beneath the work plan on top
          of which it has been built
        </p>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description">
            {props.quesDetails.workplanIds &&
            props.quesDetails.workplanIds.length ? (
              props.quesDetails.workplanIds &&
              props.quesDetails.workplanIds.length &&
              props.quesDetails.workplanIds.map((workplanId, index) => (
                <>
                  <Card >
                    <CardContent>
                      <Grid container>
                        <Grid item md={2}>
                          <p class="workplan-title">Workplan:</p>
                        </Grid>
                        <Grid item md={10}>
                          <a
                            href={`https://ipfs.io/ipfs/${workplanId}`}
                            target="_blank"
                            rel="noreferrer"
                            class="dialog-workplan"
                          >
                            {workplanId}
                          </a>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type={"text"}
                            label="Paste you GitHub repository link"
                            value={solutions[index]}
                            onChange={(e) =>
                              handleChange(e.target.value, index)
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <p class="wallet-title">Your wallet address:</p>
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
                        class="dialog-button"
                        onClick={async () =>
                          await handleSubmit(workplanId, solutions[index])
                        }
                      >
                        Submit
                      </Button>
                    </CardActions>
                    {alert.open ? (
                      <SimpleAlerts
                        severity={alert.severity}
                        message={alert.errorMessage}
                      />
                    ) : null}
                  </Card>

                  <br />
                </>
              ))
            ) : (
              <p>
                No workplans have been submitted yet. You must submit a workplan
                before submitting a solution
              </p>
            )}

            <Button class="dialog-button" onClick={handleClose}>
              Close
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {loader ? <CircularIndeterminate /> : null}
    </>
  );
}
