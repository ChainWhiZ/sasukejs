import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useStyles } from "../profilePageCss";
import SolutionCard from "./solutionCard";
import CircularIndeterminate from "../../loader/loader";
import { port } from "../../../config/config";

export default function Bounties() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [username] = useState(localStorage.getItem('username'));
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    axios
      .post(port + "user/solutions", {
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
          {data && data.length > 0 && data.map(solution =>
            <SolutionCard solutionDetails={solution} />
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
