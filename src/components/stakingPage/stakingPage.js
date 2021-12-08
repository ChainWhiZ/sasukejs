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
import {
  walletAddress as walletAddressAtom,
  contract as contractAtom,
  username as usernameAtom,
} from "../../recoil/atoms";
import "./stakingPageCss.css";

export default function StakingPage(props) {
  console.log(props);
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
  useEffect(() => {
    axios
      .post(port + "workplan/fetchall", {
        _id: props.location.state.questionDetails._id,
      })
      .then((response) => {
        setLoader(false);
        console.log(response.data)
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
console.log(data);
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
  };
  console.log(voterdetails)
  const handleSelect = (workplan) => {
    let i = data.findIndex(item => item._id == workplan);
    setSelectedWorkplan(workplan);
    setSelectedSolutions(data[i].solutionIds);
  };

  const handleStakeValidation = () => {
    console.log("in validation")
    if (stakeDetails.stakeAmount < 0.0001 || stakeDetails.stakeAmount > 40) {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Please enter stake amount between 5 to 40 matic",
      }));
    } else if (!walletAddress) {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Please connect wallet",
      }));
    } else {
      setAlert((prevState) => ({
        ...prevState,
        open: false,
        errorMessage: "",
      }));
      handleStake();
    }
  };

  const stakePosting = async () => {
    console.log("in contract cal");
    return await new Promise((resolve, reject) => {
      try {
        const trxObj = contract.methods
          .stakeVote(
            props.location.state.questionDetails.githubIssueUrl,
            props.location.state.questionDetails.publicAddress.toString(),
            props.location.state.questionDetails.publisherGithubId,
            stakeDetails.solverGithubId,
            stakeDetails.solverPublicAddress.toString(),
            stakeDetails
              .solutionId,
            username
          )
          .send({
            from: walletAddress.toString(), value: (stakeDetails.stakeAmount * Math.pow(10, 18))
          });
        trxObj.on("receipt", function (receipt) {
          console.log("Successfully done");
          // window.alert("Successfulyy voted");
          resolve(receipt);
        });

        trxObj.on("error", function (error, receipt) {
          console.log(error);
          if (error)
            window.alert(
              error.transactionHash
                ? `It’s not you. It’s us.Our contract is not audited.Report bugs at hello.chainwhiz@gmail.com.Went wrong in trc hash :${error.transactionHash}`
                : error.message
            );
          setLoader(false);
          reject(error.message);

        });
      } catch (error) {
        console.log(error);
        window.alert(
          error.transactionHash
            ? `It’s not you. It’s us.Our contract is not audited.Report bugs at hello.chainwhiz@gmail.com.Went wrong in trc hash :${error.transactionHash}`
            : error.message
        );
        setLoader(false);
        reject(error);
      }
    });
  };
  const handleStake = async () => {
    let valid = true;
    try {
      console.log(stakeDetails);
      console.log("in handle stake");
      setLoader(true);
      try {
        const stakeResponse = await stakePosting();
      } catch (error) {
        console.log(error);
        valid = false;
      }

      if (valid) {
        try {
          console.log("in axios call")
          const axiosResponse = axios.post(port + "vote/save", {
            publicAddress: walletAddress,
            amountStaked: stakeDetails.stakeAmount,
            timestamp: Date.now() / 1000,
            solutionId: stakeDetails.solutionId,
            githubId: username,
          });
          Promise.resolve(axiosResponse).then((val)=>{
            if (val.status == 201) {
              setLoader(false);
              console.log("in axios response")
              window.alert("Successfuly voted");
              fetchVoterDetails();
              setStakeDetails((prevState) => ({
                ...prevState,
                stakeAmount: 0,
              }));
              
            }
          })
         
          console.log(Promise.resolve(axiosResponse))
        } catch (error) {
          setLoader(false);
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Something went wrong while staking!",
          }));
          console.log(error);
          valid = false;
        }
      }


    } catch (error) {
      console.log(error);
      setLoader(false);
      setAlert((prevState) => ({
        ...prevState,
        isValid: true,
        errorMessage: "Something went wrong while staking!",
      }));
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
          {alert.open ? (
            <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
          ) : null}
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
                  workplans={data}
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
      <hr className="horizontal-line" style={{ marginTop: "8%" }} />

    </>
  );
}
