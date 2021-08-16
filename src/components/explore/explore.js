import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Navbar from "../navbar/navbar";

import QuestionCard from "./questionCard";
import Search from "./search";
import { useStyles } from './exploreCss'

export default function Explore(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("hi");
    axios
      .get(`https://chainwhiz.herokuapp.com/question/fetchall`)
      .then((response) => {
        console.log(response)
        //response.data= response.data.filter(question => question.questionStage === props.location.state.type);
        setData(response.data);
      })
      .catch((err) => alert(err));
  }, [props.location.state.type]);

  return (
    <div className={classes.root}>

      <Grid container spacing={6}>
        <Grid item md={12} xs={12}>
          <Navbar />
          <br />
        </Grid>
        <Grid item md={3} xs={12}>
          <Search />
        </Grid>
        <Grid item md={9} xs={12}>
          <h2>Available Bounties</h2>
          <hr />
          {data.map((question) => (
            <>
              <QuestionCard {...question} />
              <br />
              <hr />
            </>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
