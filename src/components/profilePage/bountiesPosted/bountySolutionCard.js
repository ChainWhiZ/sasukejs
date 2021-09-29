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
import { useStyles } from "../profilePageCss";
import { port } from "../../../config/config";

export default function BountySolutionCard(props) {
  const classes = useStyles();
  const [applicants, setApplicants] = useState([]);
  const [escrowId, setEscrowId] = useState("");
  const [isEscrowDialogOpen, setIsEscrowDialogOpen] = useState(false);
  const [initiated, setInitiated] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [solutionId, setSolutionId] = useState("");
  const [solverAddress, setSolverAddress] = useState("");

  useEffect(async () => {
    await initiliaseWeb3();
    await fetchAccount(function (result) {
      setWalletAddress(result[0]);
    });
    fetchSolutions();
  }, [applicants._id, props.workplanId]);

  const fetchSolutions = () => {
    axios
      .post(port + "workplan/fetch", {
        _id: props.workplanId,
      })
      .then((response) => {
        response.data.solutionIds &&
          response.data.solutionIds.length !== 0 &&
          response.data.solutionIds.map((solution) => {
            if (solution.escrowId) {
              console.log(solution);
              setEscrowId(solution.escrowId);
            }
          });
        setApplicants(response.data);
      })
      .catch((err) => alert(err));
  };
  console.log(props.questionDetails.questionTitle);
  console.log(escrowId);
  return (
    <>
      <Card className={classes.cardColor}>
        <CardContent>
          <Grid container>
            <Grid item md={12}>
              <span>
                {applicants.userId + " submitted "}
                <a
                  href={`https://ipfs.io/ipfs/${applicants._id}`}
                  target="blank"
                  className={classes.link}
                >
                  workplan
                </a>
              </span>
            </Grid>
            <Grid item md={12}>
              {applicants.solutionIds && applicants.solutionIds.length !== 0 ? (
                <ul className={classes.list}>
                  {applicants.solutionIds &&
                    applicants.solutionIds.length > 0 &&
                    applicants.solutionIds.map((solution) => (
                      <li>
                        <span>
                          {solution.userId + " submitted "}
                          <a
                            href={solution._id}
                            target="blank"
                            className={classes.link}
                          >
                            {solution._id}
                          </a>
                        </span>
                        <br />
                        {props.questionDetails.isCommunityApprovedSolution &&
                        props.questionDetails.questionStage === "complete" ? (
                          <>
                            <p>{"Voting Score " + solution.weightage}</p>
                          </>
                        ) : null}
                        {props.questionDetails.questionStage === "complete" &&
                        !escrowId ? (
                          <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={(event) => {
                              setIsEscrowDialogOpen(true);
                              setSolutionId(solution._id);
                              setSolverAddress(solution.publicAddress);
                              event.preventDefault();
                            }}
                          >
                            View Escrow
                          </Button>
                        ) : escrowId ? (
                          <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={(event) => {
                              setIsEscrowDialogOpen(true);
                              setSolutionId(solution._id);
                              setSolverAddress(solution.publicAddress);
                            }}
                          >
                            View Escrow
                          </Button>
                        ) : null}
                        <br />
                        <br />
                      </li>
                    ))}
                </ul>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br></br>
      {isEscrowDialogOpen &&
      walletAddress === props.questionDetails.publicAddress ? (
        <EscrowDialog
          open={isEscrowDialogOpen}
          handleDialogClose={() => setIsEscrowDialogOpen(false)}
          from="bountyPosted"
          escrowId={escrowId}
          solutionId={solutionId}
          questionUrl={props.questionDetails.githubIssueUrl}
          solverAddress={solverAddress}
          handleFetch={() => fetchSolutions()}
        />
      ) : (
        ""
      )}
    </>
  );
}
