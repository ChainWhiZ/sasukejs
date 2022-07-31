/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { logEvent } from "firebase/analytics";
import firebaseAnalytics from "../firebaseConfig";
import MenuBar from "./menuBar";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import CircularIndeterminate from "../loader/loader";
import Questions from "./questions";
import { port } from "../../config/config";
import SimpleAlerts from "../alert/alert";
import "./explore.css";

export default function NewExplore(props) {
  const type = props.location.pathname.substring(1);
  const [data, setData] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [loader, setLoader] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  useEffect(() => {
    logEvent(firebaseAnalytics, "dApp");
    setAlert((prevState) => ({
      ...prevState,
      open: false,
      errorMessage: "",
    }));
    setLoader(true);
    axios
      .post(port + "question/fetch-all", {
        questionStage: type
      })
      .then((response) => {
        console.log(response);
        if (type !== "completed") {
          response.data = response.data.filter(
            (question) => question.question.questionStage === type
          );
        }
        setLoader(false);
        setData(response.data);
        setAllQuestions(response.data);
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
  }, [type]);

  const filterQuestions = (key) => {
    if (key === "") {
      setData(allQuestions);
    } else {
      const filteredQuestions = allQuestions.filter((question) =>
        question.question.title.includes(key)
      );
      console.log(filteredQuestions);
      setData(filteredQuestions);
    }
  };

  return (
    <>
      <hr className="horizontal-line" style={{ marginTop: "8vw" }} />

      {loader ? (
        <CircularIndeterminate />
      ) : (
        <Grid container>
          <Grid item md={4} xs={12}>
            <MenuBar type={type} />
          </Grid>
          <Grid item md={8} xs={12}>
            {alert.open ? (
              <SimpleAlerts
                severity={alert.severity}
                message={alert.errorMessage}
              />
            ) : null}
            <Questions
              data={data}
              type={type}
              filterQuestions={(key) => filterQuestions(key)}
            />
          </Grid>
        </Grid>
      )}

      <hr className="horizontal-line" style={{ marginTop: "8%" }} />
    </>
  );
}
