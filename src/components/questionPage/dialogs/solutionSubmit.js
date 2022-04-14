/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import axios from "axios";
import "../questionPage.css";
import SimpleAlerts from "../../alert/alert";
import { port } from "../../../config/config";
// import eventBus from "../../EventBus";
import { useRecoilValue } from "recoil";
import validator from "validator";
import {
  username as usernameAtom,
  walletAddress as walletAddressAtom,
  contract as contractAtom,
} from "../../../recoil/atoms.js";

export default function SolutionSubmit(props) {
  const [open, setOpen] = useState(props.open);
  const [scroll] = useState("paper");
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [solution, setSolution] = useState("");
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
  console.log(props)

  const handleClose = () => {
    setOpen(false);
    props.handleDialogClose(false);
  };

  const handleChange = (value) => {
    setSolution(value);
  };
  const solutionPosting = async (solution) => {
    return await new Promise((resolve, reject) => {
      try {
        const trxObj = contract.methods
          .postSolution(
            username,
            solution,
            props.quesDetails.githubIssueUrl,
            props.quesDetails.address,
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
        setSolution("");
        return false;
      });
  };

  const handleValidation = async (solution) => {
    const reg = /https?:\/\/github\.com\/(?:[^\/\s]+\/)/; //regex for repo check
    const regPr = /https?:\/\/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/;
    if (!walletAddress) {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        severity: "error",
        errorMessage: "Please connect wallet",
      }));
    }
    else if (!solution) {
      setSolution("");
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Solution link field is empty",
      }));
    } else if (solution.includes("https://github.com/")) {
      if (!(solution.match(reg) || solution.match(regPr))) {
        setSolution("");
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage:
            "Please enter valid GitHub repository or pull request link",
        }));
      } else {
        let res = await handleGithubLinkValidation(solution);
        if (!res) {
          setSolution("");
          setAlert((prevState) => ({
            ...prevState,
            open: true,
            errorMessage: "GitHub link is invalid or it already exists",
          }));
        } else {
          await handleSubmit(solution);
        }
      }
    } else if (!validator.isURL(solution)) {
      setSolution("");
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Solution Link is not valid",
      }));
    } else {
      setAlert((prevState) => ({
        ...prevState,
        open: false,
        errorMessage: "",
      }));
      await handleSubmit(solution);
    }
  };
  const handleSubmit = async (solution) => {
    try {
      
     
        setDisable(true);
        setAlert((prevState) => ({
          ...prevState,
          open: false,
          errorMessage: "",
        }));
        let valid = true;
        // try {
        //   const solutionResponse = await solutionPosting(solution);
        // } catch (error) {
        //   console.log(error);
        //   valid = false;
        // }

        if (valid) {
          try {
            const axiosResponse = await axios.post(port + "solution/save", {
              address: walletAddress,
              githubLink: solution,
              questionId: props.quesDetails._id,
            });
            Promise.resolve(axiosResponse).then((val) => {
              if (val.status == 201) {
                // eventBus.dispatch("solutionSubmitted", {
                //   message: "Solution submitted",
                // });
                setOpen(false);
                setDisable(false);
                props.handleDialogClose(false);
                props.handleTweetDialogOpen();
              }
            });
          } catch (error) {
            console.log(error);
            valid = false;
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
        open={open}
        aria-describedby="scroll-dialog-description"
        BackdropProps={{
          classes: {
            root: "dialog-blur",
          },
        }}
        onBackdropClick={handleClose}
      >
        <DialogContent style={{overflow:"hidden"}} >
          <DialogContentText>
            <p class="submitSol-btn">Submit Solution</p>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              type={"text"}
              className="solution-dialog-textfield"
              placeholder="Enter your submission link here "
              value={solution}
              onChange={(e) => handleChange(e.target.value)}
            />
            {alert.open ? (
            <SimpleAlerts
              severity={alert.severity}
              message={alert.errorMessage}
            />
          ) : null}
            <div style={{ textAlign: "center", margin: "4rem 10rem" }}>
              <Button
                class="dialog-button"
                style={{
                  margin: "auto",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  width: "75%",
                }}
                onClick={async () =>
                  !disable ? await handleValidation(solution) : null
                }
              >
                Submit
              </Button>
            </div>
          </DialogContentText>
          
        </DialogContent>
      </Dialog>
    </>
  );
}
