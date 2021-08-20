import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import BountyCard from "./bountyCard";
import { useStyles } from "../profilePageCss";
import CircularIndeterminate from "../../loader/loader";

export default function BountiesPosted() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [username] = useState(localStorage.getItem("username"));
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    axios
      .post(`https://chainwhiz.herokuapp.com/user/questions`, {
        githubId: username
      })
      .then((response) => {
        setLoader(false);
        setData(response.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err)
      });
  }, []);
  return (
    <div className={classes.flexRoot}>
      <br />
      <br />
      <Grid container spacing={6}>
        <Grid item md={12} xs={12}>
          {data && data.length > 0 && data.map(question =>
            <BountyCard questionDetails={question} />
          )}
        </Grid>

      </Grid>
      {
        loader ?
          (<CircularIndeterminate />)
          : (null)
      }
    </div>
  );
}
