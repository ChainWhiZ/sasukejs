import React, { useState, useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  list: {
    "list-style-type": "none",
  },
}));

export default function QuestionSolutionCard(props) {
  const classes = useStyles();
  const [applicants, setApplicants] = useState([]);
  useEffect(() => {
    axios
      .post(`https://chainwhiz.herokuapp.com/workplan/fetch`, {
        _id: props.workplanId,
      })
      .then((response) => {
        setApplicants(response.data);
      })
      .catch((err) => alert(err));
  }, [applicants._id, props.workplanId]);

  return (
    <>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item md={12}>
              <a href="#">
                {applicants.userId + " submitted " + applicants._id}
              </a>
            </Grid>
            <Grid item md={12}>
              {applicants.solutionIds && applicants.solutionIds.length !== 0 ? (
                <ul className={classes.list}>
                  {applicants.solutionIds &&
                    applicants.solutionIds.length &&
                    applicants.solutionIds.map((solution, index) => (
                      <>
                      <a href="">
                        {" "}
                        <li>
                          {solution.userId + " submitted " + solution._id}
                        </li>
                       
                      </a>
                       {props.isCommunityApprovedSolution &&
                        props.quesStage === "complete" ? (
                        <>
                          <p>Voting Score</p>
                          <p>{(solution.weightage)/1000000000000000000}</p>

                        </>
                      ) : null}
                      </>
                    ))}
                </ul>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
