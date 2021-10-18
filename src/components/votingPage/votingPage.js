import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import StakingCard from './stakingCard'
import CircularIndeterminate from "../loader/loader"
import { Redirect } from "react-router-dom";
import { port } from "../../config/config";


export default function VotingPage(props) {
  const [username] = useState(localStorage.getItem('username'));
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });

  useEffect(() => {
    axios
      .post(port + "workplan/fetchall", {
        _id: props.location.state.questionDetails._id
      })
      .then((response) => {
        setLoader(false)
        setData(response.data);
      })
      .catch((err) => {
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage: "Couldn't fetch solutions! Server-side issue. Sorry for the inconvenience",
        }));
      });
  }, []);

  if (!username) {
    return (
      <Redirect to="/" />
    )
  }
  return (


      <>
        <Grid container>
        <Grid item md={12} xs={12}>
          <hr className="horizontal-line" style={{ marginTop: "7.5%" }} />
        </Grid>
          <Grid item md={12} xs={12}>
            <h1>Cast your vote by staking on solutions</h1>
          </Grid>

          {data.map(workplan => (
            workplan.solutionIds.map(id => (

              <Grid item md={6} xs={12} >
                <StakingCard
                  solutionId={id}
                  workplan={workplan}
                  questionDetails={props.location.state.questionDetails} />
              </Grid>
            ))))}
        </Grid>
        {
          loader ?
            (<CircularIndeterminate />)
            : (null)
        }
      </>

    
  );
}
