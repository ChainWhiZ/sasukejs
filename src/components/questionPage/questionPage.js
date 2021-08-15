import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Navbar from "../navbar/navbar";
import QuestionHeading from "./questionLeftSection/questionHeading";
import QuestionStage from "./questionRightSection/questionStage";
import QuestionDescription from "./questionLeftSection/questionDescription";
import QuestionApplicants from "./questionLeftSection/questionApplicants";
import QuestionActivities from "./questionRightSection/questionActivities";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./questionPage.css";
export default function QuestionPage(props) {
  const [data, setData] = useState({});
<<<<<<< HEAD

=======
  const [loader, setLoader] = useState(true);
>>>>>>> 59ba10d4b27037d879947d6a6a2681281290444b
  useEffect(() => {
    fetchQuestion();
  }, [data._id]);
  const fetchQuestion = () => {
<<<<<<< HEAD
    console.log("Fetch")
=======
>>>>>>> 59ba10d4b27037d879947d6a6a2681281290444b
    axios
      .post(`https://chainwhiz.herokuapp.com/question/fetch`, {
        _id: props.match.params.id,
      })
      .then((response) => {
        setData(response.data);
        setLoader(false);
      })
<<<<<<< HEAD
      .catch((err) => alert(err));
  }
  return (
    <div className={classes.root}>

      <Grid container>
        <Grid item md={12} xs={12}>
          <Navbar />
          <br />
          <br />
          <br />
          <br />
        </Grid>
        <Grid item md={8} xs={12}>
          <QuestionHeading {...data} handleFetch={()=>fetchQuestion()} />
          <QuestionDescription {...data} />
          <QuestionApplicants {...data} />
        </Grid>
        <Grid item md={4} xs={12}>
          <QuestionStage {...data} />
          <QuestionActivities />
=======
      .catch((err) => {
        setLoader(false);
        alert("Question or github issue url not found");
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
        <CircularProgress />
      ) : (
        <Grid container>
          <Grid item md={12} xs={12}></Grid>
          <Grid item md={9} xs={12}>
            <QuestionHeading {...data} handleFetch={() => fetchQuestion()} />
            <QuestionDescription {...data} />
            <QuestionApplicants {...data} />
          </Grid>
          <Grid item md={3} xs={12} style={{ backgroundColor: "#F7F8FB" }}>
            <QuestionStage {...data} />
            <QuestionActivities />
          </Grid>
>>>>>>> 59ba10d4b27037d879947d6a6a2681281290444b
        </Grid>
      )}
    </>
  );
}
