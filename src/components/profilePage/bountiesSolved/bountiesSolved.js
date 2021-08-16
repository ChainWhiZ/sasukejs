import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {useStyles} from "../profilePageCss";
import SolutionCard from "./solutionCard";


export default function Bounties() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [username] = useState(localStorage.getItem('username'));
  useEffect(() => {
    axios
      .post(`https://chainwhiz.herokuapp.com/user/solutions`, {
        githubId:username
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={classes.flexRoot}>
      <br />
      <br />
      <Grid container spacing={6}>
        <Grid item md={12} xs={12}>
          {data && data.length>0 && data.map(solution=>
          <SolutionCard solutionDetails={solution} />
          )}
        </Grid>

      </Grid>
    </div>
  );
}
