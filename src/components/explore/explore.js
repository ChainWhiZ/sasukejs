import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Navbar from "../navbar/navbar";

import QuestionCard from "./questionCard";
import Search from "./search";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Explore(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://chainwhiz.herokuapp.com/question/fetchall`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => alert(err));
  }, [data._id]);

  return (
    <div className={classes.root}>

      <Grid container spacing={6}>
        <Grid item md={12} xs={12}>
          <Navbar />
        </Grid>
        <Grid item md={3} xs={12}>
          <Search />
        </Grid>
        <Grid item md={9} xs={12}>
          <p>Available Bounties</p>
          <hr />
          {data.map((question) => (
            <>
              <QuestionCard {...question} />
              <hr />
            </>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
