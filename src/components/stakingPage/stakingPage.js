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
import { useRecoilValue } from "recoil";
import { walletAddress as walletAddressAtom, contract as contractAtom, username as usernameAtom } from "../../recoil/atoms"
import "./stakingPageCss.css";

export default function StakingPage(props) {
  console.log(props)
  const username = useRecoilValue(usernameAtom);
  const [data, setData] = useState([]);
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [selectedWorkplan, setSelectedWorkplan] = useState(
    props.location.state.questionDetails.workplanIds[0]
  );
  const [selectedSolutions, setSelectedSolutions] = useState([]);
  const [voterdetails, setVoterDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const [stakeDetails, setStakeDetails] = useState({
    solutionId: "",
    solverPublicAddress: "",
    stakeAmount: 0,
    solverGithubId: "",
  });
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  const contractPromise = useRecoilValue(contractAtom);
  let contract;
  var promise = Promise.resolve(contractPromise);
  promise.then(function (v) {
    contract = v;
  });
  console.log(walletAddress)
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
    fetchVoterDetails();

  }, []);

  const fetchVoterDetails = () => {
    axios
      .post(port + "user/isvoter", {
        userId: username,
        questionId: props.location.state.questionDetails._id,
      })
      .then((response) => {
        setLoader(false);
        setVoterDetails(response.data);
      })
      .catch((err) => { });
  }

  const handleSelect = (workplan) => {
    let i = props.location.state.questionDetails.workplanIds.indexOf(workplan);
    setSelectedWorkplan(workplan);
    setSelectedSolutions(data[i].solutionIds);
  };

  const handleStakeValidation = () => {
    if (stakeDetails.stakeAmount < 5 || stakeDetails.stakeAmount > 40) {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage:
          "Please enter stake amount between 5 to 40 matic",
      }));
    }
    else {
      setAlert((prevState) => ({
        ...prevState,
        open: false,
        errorMessage:
          "",
      }));
      handleStake();
    }
  }
  const stakePosting = async () => {
    return await new Promise((resolve, reject) => {
      try {
        const trxObj = await contract.methods
          .stakeVote(

            props.location.state.questionDetails.githubIssueUrl,
            props.location.state.questionsDetails.publisherGithubId,
            props.location.state.questionDetails.publicAddress.toString(),
            stakeDetails.solverGithubId,
            stakeDetails.solverPublicAddress.toString(),
            stakeDetails.solutionId
              (stakeDetails.stakedAmount * Math.pow(10, 18)).toString(),
            username
          )
          .send({ from: walletAddress.toString() });
        trxObj.on('receipt', function (receipt) {
          console.log("Successfully done")
          window.alert("Suuccessfulyy voted")
          resolve(receipt)
        })

        trxObj.on('error', function (error, receipt) {
          console.log(error)
          if (error)
            window.alert(error.transactionHash ? `Went wrong in trc hash :${error.transactionHash}` : error.message)
          reject(error.message)
        });

      } catch (error) {
        console.log(error)
        window.alert(error.transactionHash ? `Went wrong in trc hash :${error.transactionHash}` : error.message)
        reject(error)
      }
    });
  };
  const handleStake = () => {
    console.log(stakeDetails);
    console.log("in handle stake");
    if (!walletAddress) {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage:
          "Please connect wallet",
      }));
    }
    else {
      setAlert((prevState) => ({
        ...prevState,
        open: false,
        errorMessage:
          "",
      }));
      setLoader(true);
      try {
        try {
          const stakeResponse = await stakePosting();
        } catch (error) {
          console.log(error)
          valid = false
        }

        if (valid) {
          try {
            const axiosResponse = axios
              .post(port + "vote/save", {
                publicAddress: walletAddress,
                amountStaked: stakeDetails.stakedAmount,
                timestamp: Date.now() / 1000,
                solutionId: stakeDetails.solutionId,
                githubId: username,
              })

          } catch (error) {
            console.log(error)
            valid = false
          }
        }
        if (valid) {
          fetchVoterDetails();
          setStakeDetails((prevState) => ({
            ...prevState,
            stakeAmount: 0,
          }));
          setLoader(false);
        }

      } catch (error) {
        console.log(error)
        setAlert((prevState) => ({
          ...prevState,
          isValid: true,
          errorMessage: "Something went wrong while staking!",
        }));

      }
    }
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
                The minimum amount needed to stake and vote on a solution is 5
                MATIC. Please connect to Matic Mainnet for staking and voting.
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
                  handleStakeValidation={handleStakeValidation}
                  handleSetStakeDetails={setStakeDetails}
                  stakeDetails={stakeDetails}
                  disable={voterdetails.hasVoted}
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
