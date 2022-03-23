/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
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
import SimpleAlerts from "../../alert/alert";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { port } from "../../../config/config";
import eventBus from "../../EventBus";
import { useRecoilValue } from "recoil";
import validator from 'validator'
import {
  username as usernameAtom,
  walletAddress as walletAddressAtom,
  contract as contractAtom,
} from "../../../recoil/atoms.js";

export default function SolutionSubmit(props) {
  const [open, setOpen] = useState(props.open);
  const [scroll] = useState("paper");
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [solutions, setSolution] = useState([]);
  const [disable, setDisable] = useState(false);
  const username = useRecoilValue(usernameAtom);
  const [contract, setContract] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  const contractPromise = useRecoilValue(contractAtom);
  var promise = Promise.resolve(contractPromise);
  promise.then(function (v) {
    setContract(v);
  });

  const handleClose = () => {
    setOpen(false);
    props.handleDialogClose(false);
  };

  const handleChange = (value, index) => {
    props.handleDialogClose(false);
    props.handleTweetDialogClose(true);
    const sols = solutions;
    sols[index] = value;
    setSolution(sols);
  };

  const solutionPosting = async (solution) => {
    return await new Promise((resolve, reject) => {
      try {
        const trxObj = contract.methods
          .postSolution(
            username,
            solution,
            props.quesDetails.githubIssueUrl,
            props.quesDetails.publicAddress,
            props.quesDetails.publisherGithubId
          )
          .send({ from: walletAddress });
        trxObj.on("receipt", function (receipt) {
          console.log("Successfully done");
          window.alert("Successfully submitted");
          resolve(receipt);
        });

        trxObj.on("error", function (error, receipt) {
          console.log(error);
          if (error)
            window.alert(
              error.transactionHash
                ? `Went wrong in trc hash :${error.transactionHash}`
                : error.message
            );
          reject(error.message);
          props.handleDialogClose(false);
        });
      } catch (error) {
        console.log(error);
        window.alert(
          error.transactionHash
            ? `Went wrong in trc hash :${error.transactionHash}`
            : error.message
        );
        reject(error);
        setOpen(false);
        setDisable(false);
        props.handleDialogClose(false);
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
            errorMessage: "GitHub link is valid",
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
    const reg = /https?:\/\/github\.com\/(?:[^\/\s]+\/)/; //regex for repo check
    const regPr = /https?:\/\/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/;
    if (!solution) {
      setSolution([]);
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Solution link field is empty",
      }));
    }
    else if (solution.includes('https://github.com/')) {
      console.log("in hereeee github")
      if (!(solution.match(reg) || solution.match(regPr))) {
        setSolution([]);
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage:
            "Please enter valid GitHub repository or pull request link",
        }));
      }
      else if (!(await handleGithubLinkValidation(solution))) {
        setSolution([]);
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage: "GitHub link is invalid or it already exists",
        }));
      } else {
        setAlert((prevState) => ({
          ...prevState,
          open: false,
          errorMessage: "",
        }));
        await handleSubmit(workplan, solution);
      }
    }
    else if (!validator.isURL(solution)) {
      setSolution([]);
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Solution Link is not valid",
      }));
    }
    else {
      setAlert((prevState) => ({
        ...prevState,
        open: false,
        errorMessage: "",
      }));
      await handleSubmit(workplan, solution);
    }
  };
  const handleSubmit = async (workplanId, solution) => {
    try {
   
      //check if solution poster is publisher or not(better to keep check by github id as well as and by  address)
      if (
        walletAddress === props.quesDetails.publicAddress ||
        username === props.quesDetails.publisherGithubId
      ) {
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          severity: "error",
          errorMessage: "Sorry publisher cannot post a solution",
        }));
      } else if (!walletAddress) {
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          severity: "error",
          errorMessage: "Please connect wallet",
        }));
      } else if (!username) {
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage: "Please login to submit solution",
        }));
      } else {
        setDisable(true);
        setAlert((prevState) => ({
          ...prevState,
          open: false,
          errorMessage: "",
        }));
        let valid = true;
        try {
          const solutionResponse = await solutionPosting(solution);
        } catch (error) {
          console.log(error);
          valid = false;
        }

        if (valid) {
          try {
            const axiosResponse = await axios.post(port + "solution/save", {
              githubId: username,
              address: walletAddress,
              githubLink: solution,
              _id: workplanId,
              questionId: props.quesDetails._id,
            });
            Promise.resolve(axiosResponse).then((val) => {
              if (val.status == 201) {
                eventBus.dispatch("solutionSubmitted", {
                  message: "Solution submitted",
                });
                setOpen(false);
                setDisable(false);
                props.handleDialogClose(false);
                props.handleTweetDialogClose(true);
              }
            });
          } catch (error) {
            console.log(error);
            valid = false;
          }
        }
      }
    } catch (error) {
      console.log(error);
      setOpen(false);
      setDisable(false);
      setAlert((prevState) => ({
        ...prevState,
        isValid: true,
        errorMessage: "Something went wrong while submitting!",
      }));
    }
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

        {alert.open ? (
          <SimpleAlerts
            severity={alert.severity}
            message={alert.errorMessage}
          />
        ) : null}
        <p className="dialog-title" style={{ marginTop: "3%",marginBottom:"6%"}}>
          Submit Solution
        </p>
        <p class="solution-submit-title">
          Please paste your solution link directly beneath the work plan on top
          of which it has been built
        </p>
        <DialogContent
          dividers={scroll === "paper"}
          style={{ marginTop: "-8%" }}
        >
          <DialogContentText id="scroll-dialog-description">
            {props.quesDetails.workplanIds &&
              props.quesDetails.workplanIds.length ? (
              props.quesDetails.workplanIds &&
              props.quesDetails.workplanIds.length &&
              props.quesDetails.workplanIds.map((workplanId, index) => (
                <>
                  <Card className="solution-dialog-card">
                    <CardContent>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid item md={2}>
                          <p class="solution-dialog-workplan-title">
                            Workplan:
                          </p>
                        </Grid>
                        <Grid item md={10} style={{ marginLeft: "-7%" }}>
                          <a
                            href={`https://gateway.ipfs.io/ipfs/${workplanId}`}
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
                            placeholder="Enter Github Repo or Pull Request URL "
                            value={solutions[index]}
                            onChange={(e) =>
                              handleChange(e.target.value, index)
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <p class="solution-dialog-wallet-title">
                            Your wallet address:
                          </p>
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
                        style={{
                          marginLeft: "2%",
                          opacity: disable ? "25%" : "100%",
                        }}
                        onClick={async () =>
                          !disable
                            ? await handleValidation(
                              workplanId,
                              solutions[index]
                            )
                            : null
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
    </>
  );
}
