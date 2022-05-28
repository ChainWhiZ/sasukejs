import React, { useState, useEffect, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { port } from "../../../../config/config";
import LeftSide from "./leftSide";
import RightSide from "./rightSide";
import "../../profilePageCss.css";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { useRecoilValue } from "recoil";
import { CircularProgress } from "@material-ui/core";
import {
  contract as contractAtom,
  walletAddress as walletAddressAtom,
} from "../../../../recoil/atoms";
export default function ResultsDialog(props) {
  const [open, setOpen] = useState(props.open);
  const [alert, setAlert] = useState({
    isValid: false,
    errorMessage: "",
  });
  const [loader, setLoader] = useState(true);
  const [solutions, setSolutions] = useState([]);
  const [disable, setDisable] = useState(false);
  const contractPromise = useRecoilValue(contractAtom);
  let contract;
  var promise = Promise.resolve(contractPromise);
  promise.then(function (v) {
    contract = v;
  });
  const walletAddress = useRecoilValue(walletAddressAtom);

  useEffect(() => {
    axios
      .post(port + "user/view-results", { _id: props._id })
      .then((response) => {
        setSolutions(response.data);
        setLoader(false);
      });
  }, []);

  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState(0);
  const handleClose = () => {
    setOpen(false);
    props.handleDialogClose(false);
  };
  const handleSelectedSolution = (index) => {
    setSelectedSolutionIndex(index);
  }

  const escrowInitiationCall = async () => {
    return await new Promise(async (resolve, reject) => {
      try {
        const trxObj = contract.methods
          .initiateEscrow(props.question.issueUrl, solutions[selectedSolutionIndex].githubLink)
          .send({ from: walletAddress });
        trxObj.on("receipt", function (receipt) {
          console.log("Successfully done");

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
          handleClose(false);
          reject(error.message);
        });
      } catch (error) {
        console.log(error);
        window.alert(
          error.transactionHash
            ? `Went wrong in trc hash :${error.transactionHash}`
            : error.message
        );
        handleClose(false);
        reject(error);
      }
    });
  };

  const handleEscrowInitiation = async () => {
    setDisable(true);
    try {
      await escrowInitiationCall();
    } catch (error) {
      console.log(error);
      handleClose(false);
      setAlert((prevState) => ({
        ...prevState,
        isValid: true,
        errorMessage: "Something went wrong while acknowledging reward!",
      }));
    }
  };

  return (
    <>
      <Dialog
        aria-labelledby="simple-dialog-title"
        maxWidth="lg"
        className="results-dialog"
        open={open}
        BackdropProps={{
          classes: {
            root: "dialog-blur",
          },
        }}
        onBackdropClick={handleClose}
      >
        <ClearRoundedIcon
        className="clear-rounded-icon"
          style={{
            color: "white",
            marginLeft: "80vw",
            marginTop: "3vh",
            cursor: "pointer",
          }}
          onClick={() => {
            handleClose();
          }}
        />

        <Grid container>
          <Grid item md={5} xs={12} style={{ marginLeft: "-17%" }}>
            {solutions && solutions.length ? (
              <LeftSide
                solutions={solutions}
                handleSelectedSolution={(index) =>
                  handleSelectedSolution(index)
                }
                selectedSolutionIndex={selectedSolutionIndex}
              />
            ) : loader ? (
              <CircularProgress className="profile-page-loader" />
            ) : (
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "4vw",
                  marginLeft: "26vw",
                }}
              >
                No solution submitted
              </p>
            )}
          </Grid>
          <Grid item md={7} xs={12}>
            {solutions && solutions.length ? (
              <RightSide
                selectedSolution={solutions[selectedSolutionIndex]}
                handleEscrowInitiation={handleEscrowInitiation}
                disable={disable}
                question={props.question}
              />
            ) : null}
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
