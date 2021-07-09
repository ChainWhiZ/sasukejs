import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import StakingCard from './stakingCard'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
 
}));

export default function VotingPage(props) {
  const classes = useStyles();
  const solutions = [{
   
    workplan:"rfnrek",
    solutionIds:["sdfe","dsff"]
  },
  {
    solutionIds:["sdfe","dsff"],
    workplan:"rfnrek"
  },
  {
    solutionIds:["sdfe","dsff"],
    workplan:"rfnrek"
  },
  {
    solutionIds:["sdfe","dsff"],
    workplan:"rfnrek"
  }];
//   const [data, setData] = useState({});
//   useEffect(() => {
//     axios
//       .post(`http://localhost:4000/question/fetch`, {
//         _id: props.match.params.id,
//       })
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((err) => console.log(err));
//   }, [data._id]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={12} xs={12}>
        Cast your vote by staking on solutions
        </Grid>
      
        {solutions.map(solution =>(
          solution.solutionIds.map(id=>(

        <Grid item md={6} xs={12} >
         <StakingCard solution={solution} workplan={solution.workplan}/>
        </Grid>
         )) ))}
      </Grid>
       
    </div>
  );
}
