import React, { useState, useEffect, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { port } from "../../../../config/config";
import UnpaidLeftSide from "./unpaidLeftSide";
import UnpaidRightSide from "./unpaidRightSide";
import "../../profilePageCss.css";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { useRecoilValue } from "recoil";
import { CircularProgress } from "@material-ui/core";
import { walletAddress as walletAddressAtom } from "../../../../recoil/atoms";
import { generateAndVerifySolutionSelectionSignature } from "../../../../web3js/web3";
import SimpleAlerts from "../../../alert/alert";

export default function UnpaidResultsDialog(props) {
  const [open, setOpen] = useState(props.open);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  const [loader, setLoader] = useState(true);
  const [solutions, setSolutions] = useState([]);
  const [disable, setDisable] = useState(false);
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState(0);

  useEffect(() => {
    axios
      .post(port + "user/view-results", { _id: props._id })
      .then((response) => {
        setSolutions(response.data);
        setLoader(false);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
    props.handleDialogClose(false);
  };
  const handleSelectedSolution = (index) => {
    setSelectedSolutionIndex(index);
  };

  const handleSolutionSelection = async () => {
    setDisable(true);
    try {
      await generateAndVerifySolutionSelectionSignature(
        solutions[selectedSolutionIndex].address,
        props._id,
        walletAddress.toString(),
        solutions[selectedSolutionIndex].githubLink
      ).then(async (res) => {
        console.log(res);
        if (res.status == true) {
          let axiosResponse;
          try {
            axiosResponse = await axios.post(port + "solution/signature", {
              solutionId: solutions[selectedSolutionIndex].githubLink,
              signature: res.signature,
            });
            console.log(axiosResponse)
            Promise.resolve(axiosResponse).then((val) => {
              if (val.status == 201) {
                window.alert("Successfully selected");
                handleClose(false);
              } else {
                setAlert((prevState) => ({
                  ...prevState,
                  open: true,
                  errorMessage: "Something went wrong while selection!",
                }));
                handleClose(false);
              }
            });
          } catch (error) {
            console.log(error);
            handleClose(false);
            setAlert((prevState) => ({
              ...prevState,
              open: true,
              errorMessage: "Something went wrong while selecting solution!",
            }));
          }
        }
      });
    } catch (error) {
      handleClose(false);
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Invalid Signature!",
      }));
    }
  };

  console.log(props)
  console.log(solutions)
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
            marginLeft: "61vw",
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
              <UnpaidLeftSide
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
              <UnpaidRightSide
                selectedSolution={solutions[selectedSolutionIndex]}
                handleSolutionSelection={handleSolutionSelection}
                disable={disable}
                question={props.question}
              />
            ) : null}
          </Grid>
        </Grid>
      </Dialog>
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </>
  );
}
