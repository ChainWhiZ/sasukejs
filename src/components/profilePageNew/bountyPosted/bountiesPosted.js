/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import QuestionDetail from "../questionDetail";
import axios from "axios";
import { port } from "../../../config/config";
import QuestionStage from "./questionStage";
import SimpleAlerts from "../../alert/alert";
import CircularIndeterminate from "../../loader/loader";
import { useRecoilValue } from "recoil";
import { walletAddress as walletAddressAtom } from "../../../recoil/atoms";
import "../profilePageCss.css";
import { new_backend_port } from "../../../config/config";
import { Link } from "react-router-dom";
export default function BountyPosted(props) {
  var questions = [];
  var escrowContent = [];
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [data, setData] = useState([]);
  const [disable, setDisable] = useState(false);
  const [loader, setLoader] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  useEffect(() => {
    axios
      .post(port + "user/questions", {
        address: walletAddress,
      })
      .then((response) => {
        questions = response.data;
        axios
          .post(new_backend_port + "api/escrow/get_escrow_status", {
            query: { publisherAddress: walletAddress },
          })
          .then((response) => {
            escrowContent = response.data.result;
          }).then(() => {
            concatObject();
          })
          .catch((err) => {
            setAlert((prevState) => ({
              ...prevState,
              open: true,
              errorMessage:
                "Couldn't fetch questions! Server-side issue. Sorry for the inconvenience",
            }));
            setLoader(false);
          });
      })
      .catch((err) => {
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage:
            "Couldn't fetch questions! Server-side issue. Sorry for the inconvenience",
        }));
        setLoader(false);
      });
  }, []);
  

  const concatObject = () => {
    questions.forEach((question) => {
      escrowContent.forEach((escrow) => {
        if (question.issueUrl === escrow.bountyUrl) {
          question.selectedSolution = escrow.solutionLink;
          question.escrowStatus = escrow.escrowStatus;
        }
      });
    });
    setData(questions.reverse());
    setLoader(false);
  };
  return (
    <>
      {loader ? (
        <CircularIndeterminate />
      ) : (
        <Grid container style={{ marginLeft: "-1%" }}>
          {data.length ? (
            data.map((question) => (
              <>
                <Grid item md={7} xs={12}>
                  <Link to={`/bounty/${question._id}`}>
                    <QuestionDetail {...question} />
                  </Link>
                </Grid>
                <Grid item md={5} xs={12}>
                  <QuestionStage {...question} disable={disable} handleDisable={()=>setDisable(true)} handleLoader={(flag) => setLoader(flag)} />
                </Grid>
              </>
            ))
          ) : (
            <p style={{ marginLeft: "3%" }}>
              Run the day. Don’t let it run you. Start your journey on
              Chainwhiz.
            </p>
          )}
        </Grid>
      )}
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </>
  );
}
