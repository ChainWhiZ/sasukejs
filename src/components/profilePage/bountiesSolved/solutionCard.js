import React, { useState, useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import EscrowDialog from "../dialogs/escrowDialog";
import {
  initiliaseWeb3,
  fetchAccount,
  initiliaseContract,
} from "../../../web3js/web3";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  list: {
    "list-style-type": "none",
  },
}));


export default function SolutionCard(props) {
  const classes = useStyles();
  const [isEscrowDialogOpen, setIsEscrowDialogOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  // useEffect(() => {
  //   axios
  //     .post(port +"workplan/fetch", {
  //       _id: props.workplanId,
  //     })
  //     .then((response) => {
  //       setApplicants(response.data);
  //     })
  //     .catch((err) => alert(err));
  // }, [applicants._id, props.workplanId]);
  useEffect(async () => {
    await initiliaseWeb3();
    await fetchAccount(function (result) {
      setWalletAddress(result[0]);
    });
  }, [])
  return (
    <>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item md={12}>
              <a href="#">
                {props.solutionDetails._id}
              </a>
              {props.solutionDetails.escrowId ?
                (<Button onClick={() => setIsEscrowDialogOpen(true)}>View Escrow</Button>)
                :
                null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br></br>
      {isEscrowDialogOpen && walletAddress === props.solutionDetails.publicAddress ? (
        <EscrowDialog
          open={isEscrowDialogOpen}
          handleDialogClose={() => setIsEscrowDialogOpen(false)}
          from="bountySolved"
          escrowId={props.solutionDetails.escrowId}
          publisherAddress={props.solutionDetails.questionId.publicAddress}
          questionUrl={props.solutionDetails.questionId.githubIssueUrl}
        />
      ) : (
        ""
      )}
    </>
  );
}
