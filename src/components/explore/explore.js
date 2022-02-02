/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import MenuBar from "./menuBar";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import CircularIndeterminate from "../loader/loader";
import Questions from "./questions";
import { port } from "../../config/config";
import SimpleAlerts from "../alert/alert";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { username as usernameAtom } from "../../recoil/atoms";
import "./explore.css";

export default function NewExplore(props) {
  const [data, setData] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [loader, setLoader] = useState(true);
  const username = useRecoilValue(usernameAtom);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });

  useEffect( () => {
    setAlert((prevState) => ({
      ...prevState,
      open: false,
      errorMessage:
        "",
    }));
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
  }, [props.location.state.type]);

  const filterQuestions = (key) => {
    if (key === "") {
      setData(allQuestions);
    }
    else {
      const filteredQuestions = allQuestions.filter(question => question.questionTitle.includes(key));
      console.log(filteredQuestions);
      setData(filteredQuestions);
    }

  }
  // if (!username) {
  //   return <Redirect to="/" />;
  // }

  return (
    <>
      <hr className="horizontal-line" style={{ marginTop: "8vw" }} />

      {loader ? <CircularIndeterminate /> :
        <Grid container>
          <Grid item md={4} xs={12}>
            <MenuBar type={props.location.state.type} />
          </Grid>
          <Grid item md={8} xs={12}>
            {alert.open ? (
              <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
            ) : null}
            <Questions data={data} type={props.location.state.type} filterQuestions={(key) => filterQuestions(key)} />
          </Grid>
        </Grid>
      }

      <hr className="horizontal-line" style={{ marginTop: "8%" }} />


    </>
  );
}
