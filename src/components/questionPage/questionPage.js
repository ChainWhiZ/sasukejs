import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import QuestionLeftHeading from "./questionHeading/questionLeftHeading";
import QuestionRightHeading from "./questionHeading/questionRightHeading";
import QuestionMiddleHeading from "./questionHeading/questionMiddleHeading";
import QuestionDescription from "./questionDescription";
import QuestionEvaluationCriteria from "./questionEvaluationCriteria";
import QuestionApplicants from "./questionApplicants/questionApplicants";
import CircularIndeterminate from "../loader/loader";
import "./questionPage.css";
import { Redirect } from "react-router-dom";
import SimpleAlerts from "../alert/alert";
import { port } from "../../config/config";
import { useRecoilValue } from "recoil";
import { username as usernameAtom } from "../../recoil/atoms";
import { Helmet } from "react-helmet";
export default function QuestionPage(props) {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  const username = useRecoilValue(usernameAtom);
  useEffect(() => {
    console.log("in fetch")
    fetchQuestion();
  }, [data.questionTitle]);
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

  return (
    <>
      <hr className="horizontal-line" style={{ marginTop: "8%" }} />

      <br />
      <br />
      {loader ? (
        <CircularIndeterminate />
      ) :
        alert.open ? (
          <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
        ) :

          (
            <Grid container className="grid-body">
              <Helmet>
                <meta charSet="utf-8" />
                <title>{data.questionTitle}</title>
                <meta name="keywords" content="bounty,community" />
                <meta property="og:image" content="./favicon_io/favicon.ico" />
                <meta name="og:description" content={`Reward ${data.bountyReward + data.communityReward} ${data.bountyCurrency}`} />
                <meta property="image" content="./favicon_io/favicon.ico" />
                <meta name="theme-color" content="#d4ff1f" />
                <meta name="description" content={`Reward ${data.bountyReward + data.communityReward} ${data.bountyCurrency}`} />
                <meta name="image" content="https://app.chainwhiz.app/bounty/6213d0d284ff2300187cbb03" />
                <meta name="og:image" content="https://app.chainwhiz.app/bounty/6213d0d284ff2300187cbb03" />
              </Helmet>
              <Grid item md={3} xs={12}>
                <QuestionLeftHeading
                  questionDetails={data}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <QuestionMiddleHeading {...data} />
              </Grid>
              <Grid item md={3} xs={12}>
                <QuestionRightHeading {...data} />
              </Grid>

              <Grid item md={12} xs={12}>
                <QuestionEvaluationCriteria evaluationCriteria={data.evaluationCriteria} />
              </Grid>

              <Grid item md={12} xs={12}>
                <QuestionDescription {...data} />
              </Grid>

              <Grid item md={12} xs={12}>
                <QuestionApplicants {...data} />
              </Grid>
            </Grid>
          )}

      <hr className="horizontal-line" />
    </>
  );
}
