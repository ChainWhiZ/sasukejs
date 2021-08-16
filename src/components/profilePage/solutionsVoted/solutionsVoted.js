import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";


import SolutionVotedCard from "./solutionVotedCard";

import {useStyles} from "../profilePageCss";

export default function SolutionsVoted() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [username] = useState(localStorage.getItem("username"));
  useEffect(() => {
    fetchVoteDetails();
  }, []);

  const fetchVoteDetails = () => {
    axios
      .post(`https://chainwhiz.herokuapp.com/user/votedetails`, {
        githubId: username
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className={classes.flexRoot}>
      <br />
      <br />
      <Grid container spacing={6}>
        <Grid item md={12} xs={12}>
          {data && data.length > 0 && data.map(votedOn =>
            <SolutionVotedCard solutionVotedOn={votedOn} handleFetch={() => fetchVoteDetails()} />
          )}
        </Grid>

      </Grid>
    </div>
  );
}
