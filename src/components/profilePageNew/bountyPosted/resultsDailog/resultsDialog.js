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
import {
  contract as contractAtom,
  walletAddress as walletAddressAtom,
} from "../../../../recoil/atoms";
export default function ResultsDialog(props) {
  console.log(props);
  let valid = true;
  const [open, setOpen] = useState(props.open);
  const [alert, setAlert] = useState({
    isValid: false,
    errorMessage: "",
  });
  const [solutions, setSolutions] = useState([]);
  const [disable, setDisable] = useState(false);
  const contractPromise = useRecoilValue(contractAtom);
  let contract;
  var promise = Promise.resolve(contractPromise);
  promise.then(function (v) {
    contract = v;
  });
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [hasEscrowInitiated, setHasEscrowInitiated] = useState(false);

  useEffect(() => {
    axios
      .post(port + "user/view-results", { _id: props._id })
      .then((response) => {
        setSolutions(response.data);
        if (solutions.some((e) => e.escrowId)) {
          setHasEscrowInitiated(true);
        }
      });
  });

  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState(0);
  const handleClose = () => {
    setOpen(false);
    props.handleDialogClose(false);
  };
  const handleSelectedSolution = (index) => {
    setSelectedSolutionIndex(index);
    console.log(selectedSolutionIndex);
  };
  console.log(props.publicAddress);
  //change selected solver github id
  const escrowInitiationCall = async () => {
    return await new Promise(async (resolve, reject) => {
      try {
        const trxObj = contract.methods
          .initiateEscrow(
            props.questionUrl,
            solutions[selectedSolutionIndex].solverGithubId
          )
          .send({ from: walletAddress });
        trxObj.on("receipt", function (receipt) {
          console.log("Successfully done");
          window.alert("Successfuly initiated");
          resolve(receipt);
        });

        trxObj.on("error", function (error, receipt) {
          console.log(error);
          if (error)
            window.alert(
              error.transactionHash
                ? `It’s not you. It’s us.Our contract is not audited.Report bugs at hello.chainwhiz@gmail.com.Went wrong in trc hash :${error.transactionHash}`
                : error.message
            );
          reject(error.message);
        });
      } catch (error) {
        console.log(error);
        window.alert(
          error.transactionHash
            ? `It’s not you. It’s us.Our contract is not audited.Report bugs at hello.chainwhiz@gmail.com.Went wrong in trc hash :${error.transactionHash}`
            : error.message
        );
        reject(error);
      }
    });
  };

  const handleEscrowInitiation = async () => {
    setDisable(true);
    try {
      try {
        const escrowInitiationResponse = await escrowInitiationCall();
      } catch (error) {
        console.log(error);
        valid = false;
      }

      if (valid) {
        try {
          const axiosResponse = await axios.post(port + "escrow/init", {
            _id: solutions[selectedSolutionIndex].githubLink,
            questionId: props._id,
            userId: solutions[selectedSolutionIndex].solverGithubId,
          });
        } catch (error) {
          console.log(error);
          valid = false;
          setAlert((prevState) => ({
            ...prevState,
            open: true,
            errorMessage: "Error",
          }));
          handleClose(false);
          props.handleDialogClose(false);
        }
      }

      if (valid) {
        handleClose(false);
        props.handleDialogClose(false);
      }
    } catch (error) {
      console.log(error);
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
          style={{
            color: "white",
            marginLeft: "64vw",
            marginTop: "3vh",
            cursor: "pointer",
          }}
          onClick={() => {
            handleClose();
          }}
        />

        <Grid container>
          <Grid item md={4} xs={12}>
            {solutions && solutions.length ? (
              <LeftSide
                solutions={solutions}
                handleSelectedSolution={(index) =>
                  handleSelectedSolution(index)
                }
                selectedSolutionIndex={selectedSolutionIndex}
              />
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
          <Grid item md={8} xs={12}>
            {solutions && solutions.length ? (
              <RightSide
                selectedSolution={solutions[selectedSolutionIndex]}
                handleEscrowInitiation={handleEscrowInitiation}
                isCommunityApprovedSolution={props.isCommunityApprovedSolution}
                hasEscrowInitiated={hasEscrowInitiated}
                publicAddress={props.publicAddress}
                disable={disable}
              />
            ) : null}
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
