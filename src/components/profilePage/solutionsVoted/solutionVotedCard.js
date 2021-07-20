import React, { useState, useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  list: {
    "list-style-type": "none",
  },
}));

export default function SolutionVotedCard(props) {
  const classes = useStyles();
  
  // useEffect(() => {
  //   axios
  //     .post(`http://localhost:4000/workplan/fetch`, {
  //       _id: props.workplanId,
  //     })
  //     .then((response) => {
  //       setApplicants(response.data);
  //     })
  //     .catch((err) => alert(err));
  // }, [applicants._id, props.workplanId]);

  return (
    <>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item md={12}>
              <a href="#">
                {props.solutionVotedOn.solutionId}
              </a>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
