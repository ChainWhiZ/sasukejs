import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { port } from "../../config/config";
import LeftCard from "./leftCard";
import RightCard from "./rightSide/rightCard";
import infoIcon from "../../assets/info.png";
import CircularIndeterminate from "../loader/loader";
import SimpleAlerts from "../alert/alert";
import "./stakingPageCss.css";

export default function StakingPage(props) {
  console.log(props)
  const [username] = useState(localStorage.getItem("username"));
  const [data, setData] = useState([]);
  const [selectedWorkplan, setSelectedWorkplan] = useState(
    props.location.state.questionDetails.workplanIds[0]
  );
  const [selectedSolutions, setSelectedSolutions] = useState([]);
  const [isVoter, setIsVoter] = useState(false);
  const [loader, setLoader] = useState(true);
  const [stakeDetails, setStakeDetails] = useState({
    solutionId: "",
    solverPublicAddress: "",
    stakeAmount: 0,
  });
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    axios
      .post(port + "workplan/fetchall", {
        _id: props.location.state.questionDetails._id,
      })
      .then((response) => {
        setLoader(false);
        setData(response.data);
        setSelectedSolutions(response.data[0].solutionIds);
      })
      .catch((err) => {
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage:
            "Couldn't fetch solutions! Server-side issue. Sorry for the inconvenience",
        }));
      });

    axios
      .post(port + "user/isvoter", {
        userId: username,
      })
      .then((response) => {
        setLoader(false);
        setIsVoter(response.data);
      })
      .catch((err) => {});
  }, []);

  const handleSelect = (workplan) => {
    let i = props.location.state.questionDetails.workplanIds.indexOf(workplan);
    setSelectedWorkplan(workplan);
    setSelectedSolutions(data[i].solutionIds);
  };

  const handleStake = () => {
    console.log(stakeDetails);
    console.log("in handle stake");
    setDisable(true);
    setLoader(true);
    // return Promise.resolve()
    // .then(async function () {
    //   if (!isVoter) {
    //     return await contract.methods
    //       .registerVoter()
    //       .send({ from: walletAddress });
    //   } else {
    //     return;
    //   }
    // })
    // .then(async function () {
    //   if (!isVoter) {
    //     return await axios
    //       .post(port + "vote/voterdetails", {
    //         githubId: username,
    //       })
    //       .then((response) => {
    //         console.log(response);
    //         setLoader(false);
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //         setAlert((prevState) => ({
    //           ...prevState,
    //           open: true,
    //           errorMessage: "Error while staking",
    //         }));
    //         setLoader(false);
    //       });
    //   } else {
    //     return;
    //   }
    // })
    // .then(async function () {
    //   return contract.methods
    //     .stakeVote(
    //       (stakedAmount * Math.pow(10, 18)).toString(),
    //       props.questionDetails.githubIssueUrl.toString(),
    //       props.questionDetails.publicAddress.toString(),
    //       solution.publicAddress.toString()
    //     )
    //     .send({ from: walletAddress.toString() });
    // })
    // .then(async function () {
    //   return await axios
    //     .post(port + "vote/save", {
    //       publicAddress: walletAddress,
    //       amountStaked: stakedAmount,
    //       timestamp: Date.now() / 1000,
    //       solutionId: solution._id,
    //       githubId: username,
    //     })
    //     .then((response) => {
    //       setStakedAmount(0);
    //       setLoader(false);
    //       console.log(response);
    //     })
    //     .catch((err) => console.error(err));
    // });
  };

  if (!username) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <hr className="horizontal-line" style={{ marginTop: "7.5%" }} />
      {loader ? (
        <CircularIndeterminate />
      ) : (
        <>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="staking-container"
          >
            <Grid item md={12} xs={12} className="staking-heading-box">
              <p>
                <span>
                  <img
                    className="staking-info-icon"
                    src={infoIcon}
                    alt="icon"
                  />
                </span>
                The minimum amount needed to stake and vote on a solution is 40
                CWZ. Please connect to Matic Testnet for staking and voting.
              </p>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="flex-start"
              className="staking-container"
            >
              <Grid item md={4} xs={12}>
                <LeftCard
                  workplans={props.location.state.questionDetails.workplanIds}
                  handleSelect={(workplan) => handleSelect(workplan)}
                  selectedWorkplan={selectedWorkplan}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <RightCard
                  solutions={selectedSolutions}
                  handleStake={handleStake}
                  handleSetStakeDetails={setStakeDetails}
                  stakeDetails={stakeDetails}
                  disable={disable}
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </>
  );
}
