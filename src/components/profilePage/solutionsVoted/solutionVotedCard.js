import React, { useEffect, useState } from "react";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import {
  initiliaseWeb3,
  fetchAccount,
  initiliaseContract,
} from "../../../web3js/web3";
import CircularIndeterminate from "../../loader/loader";
import SimpleAlerts from "../../alert/alert";
import {useStyles} from "../profilePageCss";


export default function SolutionVotedCard(props) {
  const classes = useStyles();
  console.log(props)
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState("");
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({ open: false, errorMessage: "", severity: "error" });

  useEffect(async () => {
    await initiliaseWeb3();
    await fetchAccount(function (result) {
      setWalletAddress(result[0]);
    });
    setContract(await initiliaseContract());
  }, [])
  const handleUnstake = () => {
    setLoader(true);
    return Promise.resolve()
      .then(async function () {
        console.log(contract.methods)
        // publisher address,github url, solver address, unstake amount
        await contract.methods.unStake(props.solutionVotedOn.questionDetails.publicAddress, props.solutionVotedOn.questionDetails.githubIssueUrl, props.solutionVotedOn.solutionId.publicAddress,(props.solutionVotedOn.amountToBeReturned * (Math.pow(10, 18))).toString()).send({ from: walletAddress })
      })
      .then(async function () {
        console.log("api")
        axios
          .post(`https://chainwhiz.herokuapp.com/vote/updatereward`, {
            voterId: props.solutionVotedOn._id,
            solutionId: props.solutionVotedOn.solutionId
          })
          .then((response) => {
            console.log(response.status)
            props.handleFetch();
            setLoader(false);
          })
          .catch((err) => {
            console.log(err);
            setAlert(prevState => ({
              ...prevState,
              open: true,
              errorMessage: "Error"
            }));
            setLoader(false);
          });
      })

  }
console.log(props)
  return (
    <>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item md={8}>
              <a href={props.solutionVotedOn.solutionId.id} target="blank" className={classes.link}>
                {props.solutionVotedOn.solutionId.id}
              </a>
            </Grid>
            <Grid item md={4}>
              {props.solutionVotedOn.amountToBeReturned ?
                (<>
                  <p>{"Return-" + props.solutionVotedOn.amountToBeReturned}</p>
                  <p>{"Staked-" + props.solutionVotedOn.amountStaked}</p>
                  <Button onClick={handleUnstake}>Unstake</Button>
                </>
                )
                : null
              }
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br></br>
      {
        loader ?
          (<CircularIndeterminate />)
          : (null)
      }
      {
        alert.open ?
          (<SimpleAlerts severity={alert.severity} message={alert.errorMessage} />)
          : (null)
      }
    </>
  );
}
