/* eslint-disable react-hooks/exhaustive-deps */
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
import "../questionPage.css";
import CircularIndeterminate from "../../loader/loader";
import SimpleAlerts from "../../alert/alert";
import LinearIndeterminate from "../../loader/linearLoader";
import { port } from "../../../config/config";
import eventBus from "../../EventBus";
import { useRecoilValue } from "recoil";
import { username as usernameAtom,walletAddress as walletAddressAtom, contract as contractAtom} from "../../../recoil/atoms";

export default function SolutionSubmit(props) {
  const [open, setOpen] = useState(props.open);
  const [scroll] = useState("paper");
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [solutions, setSolution] = useState([]);
  const [loader, setLoader] = useState(false);
  const username = useRecoilValue(usernameAtom);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  const contractPromise = useRecoilValue(contractAtom);
  let contract;
  var promise = Promise.resolve(contract);
  promise.then(function (v) {
    contract = v;
  });
  const reg = /https?:\/\/github\.com\/(?:[^\\/\s]+\/)\/(?:[^\\/\s]+\/)/;

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
  const handleGithubLinkValidation = async (solution) => {
    return axios
      .post(port + "solution/validate", {
        githubLink: solution,
      })
      .then((response) => {
        if (response.status === 200) {
          setAlert((prevState) => ({
            ...prevState,
            open: true,
            severity: "success",
            errorMessage: "GitHub Repository link is valid",
          }));
          return true;
        }
      })
      .catch((err) => {
        setSolution([]);
        return false;
      });
  };

  const handleValidation = async (workplan, solution) => {
    const reg = /https?:\/\/github\.com\/(?:[^\/\s]+\/)/;
    if (!solution) {
      setSolution([]);
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "GitHub Repository link field is empty",
      }));
    }
    else if (!solution.match(reg)) {
      setSolution([]);
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Please enter valid GitHub repository link",
      }));
    }
    else if (!(await handleGithubLinkValidation(solution))) {
      setSolution([]);
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "GitHub repository link is invalid or it already exists",
      }));
    } else {
      await handleSubmit(workplan, solution);
    }
  };
  const handleSubmit = async (workplanId, solution) => {
    setLoader(true);
    //check if solution poster is publisher or not(better to keep check by github id as well as and by  address)

    return Promise.resolve()
      .then(async function () {
        return await solutionPosting(solution);
      })

      .then(async function () {
        return await axios
          .post(port + "solution/save", {
            githubId: username,
            address: walletAddress,
            githubLink: solution,
            _id: workplanId,
            questionId: props.quesDetails._id,
          })
          .then(async (response) => {
            eventBus.dispatch("solutionSubmitted", { message: "Solution submitted" });
            setOpen(false);
            setLoader(false);
            props.handleDialogClose(false);
          });
      });
  };

  return (
    <>
      <Dialog
        aria-labelledby="simple-dialog-title"
        maxWidth="lg"
        open={open}
        scroll={scroll}
        aria-describedby="scroll-dialog-description"
        className="solution-dialog"
        BackdropProps={{
          classes: {
            root: "dialog-blur",
          },
        }}
        onBackdropClick={handleClose}
      >
        <ClearRoundedIcon
          style={{
            marginLeft: "64vw",
            marginTop: "2vh",
            cursor: "pointer",
          }}
          onClick={() => {
            handleClose();
          }}
        />
      
        {alert.open ?
          (
            <SimpleAlerts
              severity={alert.severity}
              message={alert.errorMessage}
            />
          ) : null}
        <p className="dialog-title" style={{ marginTop: "8%" }}>Submit Solution</p>
        <p class="solution-submit-title">
          Please paste your solution link directly beneath the work plan on top
          of which it has been built
        </p>
        <DialogContent dividers={scroll === "paper"} style={{ marginTop: "-8%" }}>
          <DialogContentText id="scroll-dialog-description">
            {props.quesDetails.workplanIds &&
              props.quesDetails.workplanIds.length ? (
              props.quesDetails.workplanIds &&
              props.quesDetails.workplanIds.length &&
              props.quesDetails.workplanIds.map((workplanId, index) => (
                <>
                  <Card className="solution-dialog-card">
                    <CardContent>
                      <Grid container direction="row"
                        justifyContent="flex-start"
                        alignItems="center">
                        <Grid item md={2}>
                          <p class="solution-dialog-workplan-title">Workplan:</p>
                        </Grid>
                        <Grid item md={10} style={{marginLeft:"-7%"}}>
                          <a
                            href={`https://ipfs.io/ipfs/${workplanId}`}
                            target="_blank"
                            rel="noreferrer"
                            class="solution-dialog-workplan"
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
                            //label="Paste you GitHub repository link"
                            className="solution-dialog-textfield"
                            placeholder="https://github.com/<github id>/<repo name>"
                            value={solutions[index]}
                            onChange={(e) =>
                              handleChange(e.target.value, index)
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <p class="solution-dialog-wallet-title">Your wallet address:</p>
                          <TextField
                            size="small"
                            type={"text"}
                            className="solution-dialog-textfield"
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
                        style={{marginLeft:"2%"}}
                        onClick={async () =>
                          await handleValidation(workplanId, solutions[index])
                        }
                      >
                        Submit
                      </Button>
                    </CardActions>
                  </Card>

                  <br />
                </>
              ))
            ) : (
              <p className="dialog-no-sol-sub">
                No workplans have been submitted yet. You must submit a workplan
                before submitting a solution
              </p>
            )}

           
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* {loader ? <LinearIndeterminate /> : null} */}
    </>
  );
}
