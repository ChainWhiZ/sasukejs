import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useStyles } from "../profilePageCss";
import SolutionCard from "./solutionCard";
import CircularIndeterminate from "../../loader/loader";
import { port } from "../../../config/config";
import SimpleAlerts from "../../alert/alert";

export default function Bounties() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [username] = useState(localStorage.getItem('username'));
  const [loader, setLoader] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });

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
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage: "Couldn't fetch solutions! Server-side issue. Sorry for the inconvenience",
        }));
        setLoader(false);
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
      {alert.open ? (
        <SimpleAlerts
          severity={alert.severity}
          message={alert.errorMessage}
        />
      ) : null}
      {
        loader ?
          (<CircularIndeterminate />)
          : (null)
      }
    </div>
  );
}
