import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Navbar from "../navbar/navbar";
import CircularIndeterminate from "../loader/loader";
import QuestionCard from "./questionCard";
import Search from "./search";
// import { useStyles } from "./exploreCss";
import { port } from "../../config/config";
import SimpleAlerts from "../alert/alert";
import { Redirect } from "react-router-dom";
import "./explore.css"
export default function Explore(props) {
  // const classes = useStyles();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [username] = useState(localStorage.getItem("username"));
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  useEffect(async () => {
    console.log(props)
    setLoader(true);
    axios
      .get(port + "question/fetchall")
      .then((response) => {
        console.log(response);
        response.data = response.data.filter(
          (question) => question.questionStage === props.location.state.type
        );
        setLoader(false);
        setData(response.data);
      })
      .catch((err) => {
        setLoader(false);
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage: "Couldn't fetch questions! Server-side issue. Sorry for the inconvenience",
        }));
      });
  }, [props.location.state.type]);

  if (!username) {
    return <Redirect to="/" />;
  }

  return (
    <div className="root">
      <Grid container spacing={6}>
        <Grid item md={12} xs={12}>
          <Navbar />
          <br />
        </Grid>
        <Grid item md={3} xs={12} >
        </Grid>
        <Grid item md={9} xs={12}>
          <Grid container md={12} style={{  marginLeft:"auto" }}>
          <Grid item md={6}>
            <h2 style={{ display: "inline-block", }}>{data.length ? "Available Bounties" : "No Available Bounties"}</h2>
            </Grid>
            <Grid item md={4} style={{marginLeft:"auto"}}>
              <Search />
            </Grid>
           
          </Grid>
          <hr />
          {data ? data.map((question) => (
            <>
              <QuestionCard {...question} />

              <br />
              <hr />
            </>
          )) : "No question? Looks like world is going to end"}
        </Grid>
      </Grid>
      {alert.open ? (
        <SimpleAlerts
          severity={alert.severity}
          message={alert.errorMessage}
        />
      ) : null}
      {loader ? <CircularIndeterminate /> : null}
    </div>
  );
}
