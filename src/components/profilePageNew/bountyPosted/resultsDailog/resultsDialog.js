import React, { useState, useEffect, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { port } from "../../../../config/config";
import LeftSide from "./leftSide";
import RightSide from "./rightSide";
import "../../profilePageCss.css";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
export default function ResultsDialog(props) {
  const [open, setOpen] = useState(props.open);
  // const [solutions, setSolutions] = useState([]);
  const [username] = localStorage.getItem("username");
  const [hasEscrowInitiated, setHasEscrowInitiated] = useState(false);
  const solutions = [
    {
      githubLink: "https://github.com/avolabs-io/nft-auction",
      finalVoteScore: 0,
      solverGithubId: "rajashree23",
      workplan: "bafybeicw3tw2kfe4ojz3yfs5o543gpd2y42p2gbe2frzeice57c6rjk63u",
      workplanGithubId: "mishramonalisha76",
    },

    {
      githubLink: "https://github.com/reactjs/react-basic",
      finalVoteScore: 0,
      solverGithubId: "rajashree23",
      workplan: "bafybeicw3tw2kfe4ojz3yfs5o543gpd2y42p2gbe2frzeice57c6rjk63u",
      workplanGithubId: "mishramonalisha76",
    },
    {
      githubLink: "https://github.com/recrsn/http-basket",
      finalVoteScore: 0,
      solverGithubId: "rajashree23",
      workplan: "bafybeieymslgq4t7ub7owklx4xyuootoodp7oykyj5lvzpiqd5w2lpvzea",
      workplanGithubId: "mishramonalisha76",
    },
    {
      githubLink: "https://github.com/recrsn/http-basket",
      finalVoteScore: 0,
      solverGithubId: "rajashree23",
      workplan: "bafybeieymslgq4t7ub7owklx4xyuootoodp7oykyj5lvzpiqd5w2lpvzea",
      workplanGithubId: "mishramonalisha76",
    },
    {
      githubLink: "https://github.com/recrsn/http-basket",
      finalVoteScore: 0,
      solverGithubId: "rajashree23",
      workplan: "bafybeieymslgq4t7ub7owklx4xyuootoodp7oykyj5lvzpiqd5w2lpvzea",
      workplanGithubId: "mishramonalisha76",
    },
    {
      githubLink: "https://github.com/recrsn/http-basket",
      finalVoteScore: 0,
      solverGithubId: "rajashree23",
      workplan: "bafybeieymslgq4t7ub7owklx4xyuootoodp7oykyj5lvzpiqd5w2lpvzea",
      workplanGithubId: "mishramonalisha76",
    },

    {
      githubLink: "https://github.com/recrsn/http-basket",
      finalVoteScore: 0,
      solverGithubId: "rajashree23",
      workplan: "bafybeieymslgq4t7ub7owklx4xyuootoodp7oykyj5lvzpiqd5w2lpvzea",
      workplanGithubId: "mishramonalisha76",
    },

    {
      githubLink: "https://github.com/Tejaaswini/Pragma",
      finalVoteScore: 0,
      solverGithubId: "rajashree23",
      workplan: "bafybeicw3tw2kfe4ojz3yfs5o543gpd2y42p2gbe2frzeice57c6rjk63u",
      workplanGithubId: "mishramonalisha76",
    },

    {
      githubLink: "https://github.com/Tejaaswini/covid_tracker",
      finalVoteScore: 0,
      solverGithubId: "rajashree23",
      workplan: "bafybeicw3tw2kfe4ojz3yfs5o543gpd2y42p2gbe2frzeice57c6rjk63u",
      workplanGithubId: "mishramonalisha76",
      escrowId: "882jsj",
    },

    {
      githubLink: "https://github.com/Tejaaswini/artfolio",
      finalVoteScore: 0,
      solverGithubId: "rajashree23",
      workplan: "bafybeicw3tw2kfe4ojz3yfs5o543gpd2y42p2gbe2frzeice57c6rjk63u",
      workplanGithubId: "mishramonalisha76",
    },
  ];
  useEffect(() => {
    //   axios.post(port + "user/view-results", { _id: props._id}).then((response) => {
    //     setSolutions(response.data);
    // if (solutions.some(e => e.escrowId)) {
    //   setHasEscrowInitiated(true);
    // }
    //   });
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
  };
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
            <LeftSide
              solutions={solutions}
              handleSelectedSolution={(index) => handleSelectedSolution(index)}
              selectedSolutionIndex={selectedSolutionIndex}
            />
          </Grid>
          <Grid item md={8} xs={12}>
            <RightSide
              selectedSolution={solutions[selectedSolutionIndex]}
              handleEscrowInitiation={handleEscrowInitiation}
              handleEscrowOwnership={handleEscrowOwnership}
              isCommunityApprovedSolution={props.isCommunityApprovedSolution}
              hasEscrowInitiated={hasEscrowInitiated}
            />
          </Grid>
        </Grid>
      </Dialog>
      {/* {loader ? <LinearIndeterminate /> : null}  */}
    </>
  );
}
