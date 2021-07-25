import React, { useState, useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import EscrowDialog from "../dialogs/escrowDialog";

import {
  initiliaseWeb3,
  fetchAccount,
  initiliaseContract,
} from "../../../web3js/web3";
const useStyles = makeStyles((theme) => ({
  list: {
    "list-style-type": "none",
  },
}));

export default function BountySolutionCard(props) {
  const classes = useStyles();
  const [applicants, setApplicants] = useState([]);
  const [escrowId, setEscrowId] = useState('');
  const [isEscrowDialogOpen, setIsEscrowDialogOpen] = useState(false);
  const [initiated, setInitiated] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [solutionId, setSolutionId] = useState('');
  const [solverAddress,setSolverAddress] = useState('');
  useEffect(async () => {

    await initiliaseWeb3();
    await fetchAccount(function (result) {
      setWalletAddress(result[0]);
    });
    axios
      .post(`https://chainwhiz.herokuapp.com/workplan/fetch`, {
        _id: props.workplanId,
      })
      .then((response) => {
        console.log(response.data)
        setApplicants(response.data);
      })
      .catch((err) => alert(err));

    applicants.solutionIds &&
      applicants.solutionIds.length !== 0 &&
      applicants.solutionIds.map((solution) => {
        if (solution.escrowId) {
          console.log(solution.escrowId)
          setEscrowId(solution.escrowId);
        }
      })


  }, [applicants._id, props.workplanId]);


  return (
    <>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item md={12}>
              <a href="#">
                {applicants.userId + " submitted " + applicants._id}
              </a>
            </Grid>
            <Grid item md={12}>
              {applicants.solutionIds && applicants.solutionIds.length !== 0 ? (
                <ul className={classes.list}>
                  {applicants.solutionIds &&
                    applicants.solutionIds.length &&
                    applicants.solutionIds.map((solution) => (
                      <a href="">
                        {" "}
                        <li>
                          {solution.userId + " submitted " + solution._id}
                          {props.questionDetails.isCommunityApprovedSolution &&
                            props.questionDetails.questionStage === "complete" ? (
                            <>
                              <p>{solution.weightage}</p>
                              <p>Voting Score</p>
                            </>
                          ) : null}
                          {props.questionDetails.questionStage === "complete" && !escrowId ?
                            (<Button onClick={(event) => { setIsEscrowDialogOpen(true); setSolutionId(solution._id); setSolverAddress(solution.publicAddress); event.preventDefault() }}>View Escrow</Button>)
                            : escrowId ?
                              (<Button onClick={(event) => { setIsEscrowDialogOpen(true); setSolverAddress(solution.publicAddress); event.preventDefault() }}>View Escrow</Button>)
                              :
                              null}
                        </li>
                      </a>
                    ))}
                </ul>
              ) : null}
            </Grid>
          </Grid>

        </CardContent>
      </Card>
      {isEscrowDialogOpen && walletAddress === props.questionDetails.publicAddress ? (
        <EscrowDialog
          open={isEscrowDialogOpen}
          handleDialogClose={() => setIsEscrowDialogOpen(false)}
          from="bountyPosted"
          escrowId={escrowId}
          solutionId={solutionId}
          questionURL={props.questionDetails.githubIssueUrl}
          solverAddress={solverAddress}
        />
      ) : (
        ""
      )}
    </>
  );
}
