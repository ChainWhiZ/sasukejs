/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import GithubIcon from "../../../assets/githubIcon.png";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import "../questionPage.css";
import { port } from "../../../config/config";
import CircularIndeterminate from "../../loader/loader";
import IdeaIcon from "../../../assets/idea.png";
import eventBus from "../../EventBus";
import { Tooltip } from "@material-ui/core";

import account from "../../../assets/account-circle.png"
export default function QuestionSolutionCard(props) {
  const [applicants, setApplicants] = useState([]);
  const [loader, setLoader] = useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };
  const onLeave = () => {
    setHover(false);
  };
  useEffect(() => {
    eventBus.on("solutionSubmitted", (data) => fetchWorkplan());
    eventBus.remove("solutionSubmitted");
    fetchWorkplan();
  }, [applicants._id, props.workplanId]);

  const fetchWorkplan = () => {
    axios
      .post(port + "workplan/fetch", {
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
  };
  console.log(applicants);
  return (
    <>
      {loader ? (
        <CircularIndeterminate />
      ) : (
        <Grid
          container
          className="card-header"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          {hover && !expanded ? (
            <Grid item md={12} className="card-hover-content">
              <button
                className="card-hover-content-text"
                onClick={() => setExpanded(true)}
              >
                View all Solutions
              </button>
            </Grid>
          ) : (
            <>
              <Grid item md={2} className="workplan-icon">
                <img src={IdeaIcon} className="icon" alt="idea" />
              </Grid>
              <Grid item md={10} className="workplan-grid">
                <a
                  href={`https://ipfs.io/ipfs/${applicants._id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="bounty-workplan-detail">
                    {" "}
                    Work plan by {applicants.userId}
                  </p>
                </a>
              </Grid>
              {expanded ? (
                applicants.solutionIds.length ? (
                  <Grid container className="solution-lists ">
                    {applicants.solutionIds &&
                      applicants.solutionIds.length &&
                      applicants.solutionIds.map((solution, index) => {
                        return (
                          <>
                            <Grid item md={2} className="bounty-solution-list-icons">
                              <img src={account} alt="acc" />
                            </Grid>
                            <Grid item md={7}>

                              <p className="bounty-solution-list-p">
                                {" "}
                                {solution.userId + " submitted solution"}
                              </p>

                            </Grid>
                            <Grid item md={3} className="bounty-solution-list-icons">
                              {props.isCommunityApprovedSolution &&
                                props.quesStage === "complete" ? (
                                <Tooltip title={solution.weightage}>
                                  <a
                                    href={solution._id}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img src={GithubIcon} alt="git" />
                                  </a>
                                </Tooltip>
                              ) :

                                <a
                                  href={solution._id}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <img src={GithubIcon} alt="git" />
                                </a>}
                            </Grid>
                          </>
                        );
                      })}
                  </Grid>
                ) : (
                  <Grid item md={12} className="card-content">
                    <p className="number-solution">No solutions</p>
                  </Grid>
                )
              ) : (
                <Grid item md={12} className="card-content">
                  <p className="number-solution">
                    {(applicants.solutionIds
                      ? applicants.solutionIds.length
                      : 0) + " Solution(s)"}
                  </p>
                </Grid>
              )}
            </>
          )}
        </Grid>
      )}
    </>
  );
}
