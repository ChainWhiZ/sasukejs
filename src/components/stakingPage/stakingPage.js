import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { port } from "../../config/config";
import LeftCard from "./leftCard";
import RightCard from "./rightSide/rightCard";
import infoIcon from "../../assets/info.png";
import "./stakingPageCss.css";


export default function StakingPage(props) {
  const [username] = useState(localStorage.getItem('username'));
  const [data, setData] = useState([]);
  const [selectedWorkplan, setSelectedWorkplan] = useState(props.location.state.questionDetails.workplanIds[0]);
  const [selectedSolutions, setSelectedSolutions] = useState([]);



  useEffect(() => {
    axios
      .post(port + "workplan/fetchall", {
        _id: props.location.state.questionDetails._id
      })
      .then((response) => {

        // setLoader(false)
        setData(response.data);
        setSelectedSolutions(response.data[0].solutionIds);
      })
      .catch((err) => {
        // setAlert((prevState) => ({
        //   ...prevState,
        //   open: true,
        //   errorMessage: "Couldn't fetch solutions! Server-side issue. Sorry for the inconvenience",
        // }));
      });
  }, []);

  const handleSelect = (workplan) => {
    let i = props.location.state.questionDetails.workplanIds.indexOf(workplan);
    setSelectedWorkplan(workplan);
    setSelectedSolutions(data[i].solutionIds);
  }


  if (!username) {
    return (
      <Redirect to="/" />
    )
  }
  return (


    <>
      <hr className="horizontal-line" style={{ marginTop: "7.5%" }} />
      <Grid container direction="row"
        justifyContent="center"
        alignItems="center"
        className="staking-container">

        <Grid item md={12} xs={12} className="staking-heading-box">
          <p>
            <span>
              <img className="staking-info-icon" src={infoIcon} alt="icon" />
            </span>
            The minimum amount needed to stake and vote on a solution is 40 CWZ. Please connect to Matic Testnet for staking and voting.
          </p>
        </Grid>
        <Grid container direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          className="staking-container">
          <Grid item md={4} xs={12}>
            <LeftCard workplans={props.location.state.questionDetails.workplanIds} handleSelect={(workplan) => handleSelect(workplan)} selectedWorkplan={selectedWorkplan} />
          </Grid>
          <Grid item md={8} xs={12}>
            <RightCard solutions={selectedSolutions} />
          </Grid>
        </Grid>

        {/* {data.map(workplan => (
            workplan.solutionIds.map(id => (

              <Grid item md={6} xs={12} >
                <StakingCard
                  solutionId={id}
                  workplan={workplan}
                  questionDetails={props.location.state.questionDetails} />
              </Grid>
            ))))} */}
      </Grid>

    </>


  );
}
