import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";


import BountyCard from "./bountyCard";

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

export default function BountiesPosted() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [username] = useState(localStorage.getItem("username"));
  useEffect(() => {
    axios
      .post(`http://localhost:4000/user/questions`, {
        githubId:username
      })
      .then((response) => {
        console.log(response.data)
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={classes.root}>
      <br />
      <br />
      <Grid container spacing={6}>
        <Grid item md={12} xs={12}>
          {data && data.length && data.map(question=>
          <BountyCard questionDetails={question} />
          )}
        </Grid>

      </Grid>
    </div>
  );
}
