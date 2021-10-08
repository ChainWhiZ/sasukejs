import React, { useEffect, useState } from "react";
import MenuBar from "./menuBar";
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
import "./explore.css";
export default function NewExplore(props) {
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
    console.log(props);
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
          errorMessage:
            "Couldn't fetch questions! Server-side issue. Sorry for the inconvenience",
        }));
      });
  }, [props.location.state.type]);

  if (!username) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Grid container>
        <Grid item md={6} style={{backgroundColor:"white"}}>
          {/* <MenuBar /> */}
        </Grid>
        <Grid item md={6} style={{backgroundColor:"white"}}></Grid>
      </Grid>
    </>
  );
}
