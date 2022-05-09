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
import { useRecoilValue, useRecoilState } from "recoil";
import {
  walletAddress as walletAddressAtom,
  contract as contractAtom,
  balance as balanceAtom
} from "../../recoil/atoms";
import "./stakingPageCss.css";
import { fetchBalance } from "../../web3js/web3";

export default function StakingPage(props) {
  const [data, setData] = useState([]);
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState(0);
  const [balance, setBalance] = useRecoilState(balanceAtom);
  const [selectedSolutions, setSelectedSolutions] = useState([]);
  const [voterdetails, setVoterDetails] = useState({});
  const [loader, setLoader] = useState(false);
  const [stakeDetails, setStakeDetails] = useState({
    solutionId: "",
    stakeAmount: 0,
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
    console.log(contract)
  });
  
  console.log(props.location.state.questionDetails);


  useEffect( () => {
    fetchVoterDetails();
    if (walletAddress) {
      fetchBalance(walletAddress).then(res=> setBalance(Number(res).toFixed(4)));
    }
  }, [walletAddress]);


  const fetchVoterDetails = () => {
    axios
      .post(port + "vote/has-voted", {
        questionId: props.location.state.questionDetails._id,
        address: walletAddress,
      })
      .then((response) => {
        setLoader(false);
        setVoterDetails(response.data);
      })
      .catch((err) => { });
  };

  const handleSelectedSolution = (index) => {
    setSelectedSolutionIndex(index);
  };

  const handleStakeValidation = () => {
    if (stakeDetails.stakeAmount >= 5 || stakeDetails.stakeAmount >= 40) {
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
    
    return await new Promise((resolve, reject) => {
      try {
        console.log( props.location.state.questionDetails.issueUrl,
          props.location.state.questionDetails.address.toString(),
          stakeDetails.solutionId)
        const trxObj = contract.methods
          .stakeVote(
            props.location.state.questionDetails.issueUrl,
            props.location.state.questionDetails.address.toString(),
            stakeDetails.solutionId,
          )
          .send({
            from: walletAddress.toString(),
            value: stakeDetails.stakeAmount * Math.pow(10, 18),
          });
        trxObj.on("receipt", function (receipt) {
          // window.alert("Successfully voted");
          resolve(receipt);
        });

        trxObj.on("error", function (error, receipt) {
          if (error)
            window.alert(
              error.transactionHash
                ? `Went wrong. in trc hash :${error.transactionHash}`
                : error.message
            );
          setLoader(false);
          reject(error.message);
        });
      } catch (error) {
        window.alert(
          error.transactionHash
            ? `Went wrong in trc hash :${error.transactionHash}`
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
      setLoader(true);
      try {
       const stakeResponse = await stakePosting();
      } catch (error) {
        valid = false;
      }

      if (valid) {
        try {
          const axiosResponse = axios.post(port + "vote/save", {
            address: walletAddress,
            amountStaked: stakeDetails.stakeAmount,
            solutionId: stakeDetails.solutionId,
            questionId: props.location.state.questionDetails._id,
          });
          Promise.resolve(axiosResponse).then((val) => {
            if (val.status == 201) {
              setLoader(false);

              window.alert("Successfully voted");
              fetchVoterDetails();
              setStakeDetails((prevState) => ({
                ...prevState,
                stakeAmount: 0,
              }));
            }
          });
        } catch (error) {
          setLoader(false);
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Something went wrong while staking!",
          }));

          valid = false;
        }
      }
    } catch (error) {
      setLoader(false);
      setAlert((prevState) => ({
        ...prevState,
        isValid: true,
        errorMessage: "Something went wrong while staking!",
      }));
    }
  };

  if (!walletAddress) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <hr className="horizontal-line" style={{ marginTop: "8%" }} />
      {loader ? (
        <CircularIndeterminate />
      ) : (
        <>
          {alert.open ? (
            <SimpleAlerts
              severity={alert.severity}
              message={alert.errorMessage}
            />
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
                  solutions={props.location.state.questionDetails.solutions}
                  handleSelectedSolution={(index) =>
                    handleSelectedSolution(index)
                  }
                  selectedSolutionIndex={selectedSolutionIndex}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <RightCard
                  solution={props.location.state.questionDetails.solutions[selectedSolutionIndex]}
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
