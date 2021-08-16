import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Navbar from "../navbar/navbar";
import QuestionHeading from "./questionLeftSection/questionHeading";
import QuestionStage from "./questionRightSection/questionStage";
import QuestionDescription from "./questionLeftSection/questionDescription";
import QuestionApplicants from "./questionLeftSection/questionApplicants";
import QuestionActivities from "./questionRightSection/questionActivities";
import CircularIndeterminate from "../loader/loader";
import "./questionPage.css";
import SimpleAlerts from "../alert/alert";

export default function QuestionPage(props) {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });

  useEffect(() => {
    fetchQuestion();
  }, [data._id]);
  const fetchQuestion = () => {
    axios
      .post(`https://chainwhiz.herokuapp.com/question/fetch`, {
        _id: props.match.params.id,
      })
      .then((response) => {
        setData(response.data);
        setLoader(false);
      })
      .catch((err) => {
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage: "Question or GitHub issue URL not found",
        }));
        setLoader(false);
      });
  };
  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      {loader ? (
        <CircularIndeterminate />
      ) : (
        <Grid container>
          <Grid item md={12} xs={12}></Grid>
          <Grid item md={9} xs={12}>
            <QuestionHeading {...data} handleFetch={() => fetchQuestion()} />
            <QuestionDescription {...data} />
            <QuestionApplicants {...data} />
          </Grid>
          <Grid item md={3} xs={12} style={{ backgroundColor: "#F7F8FB" }}>
            <QuestionStage {...data} handleFetch={() => fetchQuestion()} />
            <QuestionActivities />
          </Grid>
        </Grid>
      )}
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </>
  );
}
