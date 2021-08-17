import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import StakingCard from './stakingCard'
import { useStyles } from './votingPageCss'
import Navbar from "../navbar/navbar";
import CircularIndeterminate from "../loader/loader"



export default function VotingPage(props) {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    console.log(props)
    axios
      .post(`https://chainwhiz.herokuapp.com/workplan/fetchall`, {
        _id: props.location.state.questionDetails._id
      })
      .then((response) => {
        // setLoader(false)
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className={classes.root}>

          <>
            <Grid container>
              <Grid item md={12} xs={12}>
                <Navbar />
                <br />
                <br />
                <br />
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
          </>

    </div>
  );
}
