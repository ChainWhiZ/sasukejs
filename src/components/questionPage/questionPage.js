import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Navbar from "../navbar/navbar";
import QuestionLeftHeading from "./questionHeading/questionLeftHeading";
import QuestionRightHeading from "./questionHeading/questionRightHeading";
import QuestionMiddleHeading from "./questionHeading/questionMiddleHeading";
import QuestionStage from "./questionHeading/questionStage";
import QuestionDescription from "./questionDescription";
import QuestionApplicants from "./questionApplicants/questionApplicants";
import QuestionActivities from "./questionRightSection/questionActivities";
import CircularIndeterminate from "../loader/loader";
import "./questionPage.css";
import { Redirect } from "react-router-dom";
import SimpleAlerts from "../alert/alert";
import { port } from "../../config/config";

export default function QuestionPage(props) {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  const [username] = useState(localStorage.getItem('username'));

  useEffect(() => {
    fetchQuestion();
  }, [data._id]);
  const fetchQuestion = () => {
    axios
      .post(port + "question/fetch", {
        _id: props.match.params.id,
      })
      .then((response) => {
        console.log(response.data);
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
  if (!username) {
    return (
      <Redirect to="/" />
    )
  }
  return (
    <>

      <hr className="horizontal-line" style={{ marginTop: "8%" }} />

      <br />
      <br />
      {loader ? (
        <CircularIndeterminate />
      ) : (
        <Grid container className="grid-body"  >

          <Grid item md={3} xs={12}>
            <QuestionLeftHeading {...data} handleFetch={() => fetchQuestion()} />
          </Grid>
          <Grid item md={6} xs={12}>
            <QuestionMiddleHeading {...data} />
          </Grid>
          <Grid item md={3} xs={12}>
            <QuestionRightHeading {...data} />
          </Grid>

          <Grid item md={12} xs={12}>
            <QuestionDescription {...data} />

          </Grid>
          <Grid item md={12} xs={12}>
            <QuestionApplicants {...data} />
          </Grid>
        </Grid>
      )}
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
      <hr className="horizontal-line" />
    </>
  );
}
