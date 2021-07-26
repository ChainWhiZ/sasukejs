import React, { useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  list: {
    "list-style-type": "none",
  },
}));

export default function SolutionVotedCard(props) {
  const classes = useStyles();
  console.log(props)
  const handleUnstake = () => {
    axios
      .post(`https://chainwhiz.herokuapp.com/vote/updatereward`, {
        voterId: props.solutionVotedOn._id,
        solutionId: props.solutionVotedOn.solutionId
      })
      .then((response) => {
        console.log(response.status)
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item md={8}>
              <a href="#">
                {props.solutionVotedOn.solutionId}
              </a>
            </Grid>
            <Grid item md={4}>
              {props.solutionVotedOn.amountToBeReturned ?
                (<>
                <p>{props.solutionVotedOn.amountToBeReturned}</p>
                <Button onClick={() => handleUnstake}>Unstake</Button>
                </>
                )
                : null
              }
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br></br>
    </>
  );
}
