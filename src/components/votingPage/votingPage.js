import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import StakingCard from './stakingCard'
import { useStyles } from './votingPageCss'
import Navbar from "../navbar/navbar";




export default function VotingPage(props) {
  const classes = useStyles();
  
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post(`https://chainwhiz.herokuapp.com/workplan/fetchall`, {
        _id: props.location.state.questionDetails._id
      })
      .then((response) => {
        console.log(response.data)
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  

  return (
    <div className={classes.root}>

      <Grid container>
        <Grid item md={12} xs={12}>
          <Navbar />
        </Grid>
        <Grid item md={12} xs={12}>
          <h1>Cast your vote by staking on solutions</h1>
        </Grid>

        {data.map(workplan => (
          workplan.solutionIds.map(id => (

            <Grid item md={6} xs={12} >
              <StakingCard solutionId={id} workplan={workplan} questionDetails={props.location.state.questionDetails} />
            </Grid>
          ))))}
      </Grid>

    </div>
  );
}
