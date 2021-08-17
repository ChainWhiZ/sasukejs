import React, { useState, useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import axios from "axios";
import "../questionPage.css";
import CircularIndeterminate from "../../loader/loader";
export default function QuestionSolutionCard(props) {
  const [applicants, setApplicants] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    axios
      .post(`https://chainwhiz.herokuapp.com/workplan/fetch`, {
        _id: props.workplanId,
      })
      .then((response) => {
        setLoader(false);
        setApplicants(response.data);
      })
      .catch((err) => {
        setLoader(false);
        alert(err);
      });
  }, [applicants._id, props.workplanId]);

  return (
    <>
      {loader ? (
        <CircularIndeterminate />
      ) : (
        <Card class="sol-card">
          <CardContent>
            <Grid container>
              <Grid item md={12}>
                {applicants.userId + " submitted "}
                <span>
                  {" "}
                  <a
                    href={`https://ipfs.io/ipfs/${applicants._id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    workplan
                  </a>
                </span>
              </Grid>
              <Grid item md={12}>
                {applicants.solutionIds &&
                applicants.solutionIds.length !== 0 ? (
                  <ul>
                    {applicants.solutionIds &&
                      applicants.solutionIds.length &&
                      applicants.solutionIds.map((solution, index) => {
                        return (
                          <>
                            {" "}
                            <li>
                              {solution.userId + " submitted "}
                              <span>
                                <a
                                  href={solution._id}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {" "}
                                  {solution._id}
                                </a>
                              </span>
                            </li>
                            <span>
                              {props.isCommunityApprovedSolution &&
                              props.quesStage === "complete" ? (
                                <>
                                  <p class="voting">
                                    <span class="voting-score-title">
                                      {" "}
                                      Voting Score :
                                    </span>{" "}
                                    {solution.weightage}
                                  </p>
                                </>
                              ) : null}
                            </span>
                          </>
                        );
                      })}
                  </ul>
                ) : (
                  <p>No solution submitted yet!</p>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  );
}
