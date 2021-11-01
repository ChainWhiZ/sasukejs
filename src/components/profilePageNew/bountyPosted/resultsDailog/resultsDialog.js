import React, { useState,useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { port } from "../../../../config/config";
import LeftSide from "./leftSide";
import RightSide from "./rightSide";
import "../../profilePageCss.css";

export default function ResultsDialog(props) {
  const [open, setOpen] = useState(props.open);
  const [username] = localStorage.getItem("username");
  const solutions = ["Ashis pradhan","Monalisha Mishra", "Rajashree Parhi"];
  const solutionDetails = [{
    githubUrl:"https://github.com/RajashreeMS/RajashreeRepo",
    votingScore:121,
    workplan:"asp01 Kumar Parhi",
  },
  {
    githubUrl:"https://github.com/RajashreeMS/ashisRepo",
    votingScore:17,
    workplan:"asp01 Kumar Mishra",
    escrowId:"hhewiwwje"
  },
  {
    githubUrl:"https://github.com/RajashreeMS/MonalishaRepo",
    votingScore:1218,
    workplan:"asp01 Kumar Pradhan"
  }]
  const [selectedSoltuionDetails, setSelectedSolutionDetails] = useState(solutionDetails[0]);
  const [selectedSolution, setSelectedSolution] =useState(solutions[0]);
  const handleClose = () => {
    setOpen(false);
    props.handleDialogClose(false);
  };
  const handleSelectedSolution = (solution) =>{
    let i = solutions.indexOf(solution);
    setSelectedSolution(solution);
    setSelectedSolutionDetails(solutionDetails[i]);
  }
  const handleEscrowInitiation = () => {
    // setLoader(true);
    // return Promise.resolve()
    //   .then(async function () {
    //     return await contract.methods
    //       .initEscrow(props.questionUrl, props.solverAddress)
    //       .send({ from: walletAddress }); //questionhash and solver address from props
    //   })

    //   .then(async function () {
    //     return axios
    //       .post(port + "escrow/init", {
    //         _id: props.solutionId,
    //       })
    //       .then((response) => {
    //         console.log(response.status);
    //         props.handleFetch();
    //         setLoader(false);
    //         setOpen(false);
    //         props.handleDialogClose(false);
    //       })
    //       .catch((err) => {
    //         setAlert((prevState) => ({
    //           ...prevState,
    //           open: true,
    //           errorMessage: "Error",
    //         }));
    //         setLoader(false);
    //         setOpen(false);
    //         props.handleDialogClose(false);
    //       });
    //   });
}
const handleEscrowOwnership = () => {
  // setLoader(true);
  // return Promise.resolve()
  //   .then(async function () {
  //     return await contract.methods
  //       .transferOwnership(props.solverAddress, props.questionUrl)
  //       .send({ from: walletAddress }); //solver address and questionhash
  //   })
  //   .then(async function () {
  //     axios
  //       .post(port + "escrow/inprocess", {
  //         _id: props.escrowId,
  //       })
  //       .then((response) => {
  //         console.log(response.status);
  //         setLoader(false);
  //         setOpen(false);
  //         props.handleDialogClose(false);
  //       })
  //       .catch((err) => {
  //         setAlert((prevState) => ({
  //           ...prevState,
  //           open: true,
  //           errorMessage: "Error",
  //         }));
  //         setLoader(false);
  //         setOpen(false);
  //         props.handleDialogClose(false);
  //       });
  //   });

}
  console.log("hiiii")

  return (
    <>
      <Dialog aria-labelledby="simple-dialog-title" maxWidth="lg" className="results-dialog" open={open}>
      <Grid container >
      <Grid item md={4} xs={12}>
       <LeftSide solutions={solutions} handleSelectedSolution={(solution)=>handleSelectedSolution(solution)} selectedSolution={selectedSolution} />
       </Grid>
       <Grid item md={8} xs={12}>
       <RightSide selectedSoltuionDetails={selectedSoltuionDetails} handleEscrowInitiation={handleEscrowInitiation} handleEscrowOwnership={handleEscrowOwnership} isCommunityApprovedSolution={props.isCommunityApprovedSolution}/>
       </Grid>
    </Grid>
      </Dialog>
      {/* {loader ? <LinearIndeterminate /> : null}  */}
    </>
  );
}
