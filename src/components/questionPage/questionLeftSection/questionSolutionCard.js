import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
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
  //console.log(props)
  useEffect(() => {
    axios
      .post(`http://localhost:4000/workplan/fetch`, {
        _id: props.workplanId,
      })
      .then((response) => {
        console.log(response);
        setApplicants(response.data);
      })
      .catch((err) => console.log(err));
  }, [applicants._id]);

  console.log(applicants);
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
                      <a href="">
                        {" "}
                        <li>
                          {solution.userId + " submitted " + solution._id}
                        </li>
                      </a>
                    ))}
                </ul>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
