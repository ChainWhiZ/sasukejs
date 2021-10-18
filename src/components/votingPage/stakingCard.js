import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import githubIcon from "../../assets/Vector1.png";
import workplanIcon from "../../assets/Vector.png";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  initiliaseWeb3,
  fetchAccount,
  initiliaseContract,
} from "../../web3js/web3";
import SimpleAlerts from "../alert/alert";
import CircularIndeterminate from "../loader/loader";
import { port } from "../../config/config";
import "./votingPageCss.css";

export default function StakingCard(props) {
  const [stakedAmount, setStakedAmount] = useState("");
  const [balance, setBalance] = useState(null);
  const [solution, setSolution] = useState({});
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState("");
  const [username] = useState(localStorage.getItem("username"));
  const [isVoter, setIsVoter] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  const [loader, setLoader] = useState(false);
  const [disabled,setDisabled]= useState(false);

  useEffect(async () => {
    setLoader(true);
    await initiliaseWeb3();
    fetchAccount(function (result) {
      setWalletAddress(result[0]);
    });
    const getContract = await initiliaseContract();
    setContract(getContract);

    if (contract && walletAddress) {
      const getBalance = parseInt(
        await contract.methods
          .balanceOf(walletAddress)
          .call({ from: walletAddress })
      );
      setBalance(getBalance);
    }

    axios
      .post(port + "solution/fetch", {
        solutionId: props.solutionId,
      })
      .then((response) => {
        setSolution(response.data);
        setLoader(false);
      })
      .catch((err) => {
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage:
            "Solutions can't be loaded! Server-side issue. Sorry for the inconvenience",
        }));

        setLoader(false);
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
  }, [walletAddress]);

  const handleStake = () => {
    setDisabled(true);
    //setLoader(true);
    return Promise.resolve()
      .then(async function () {
        if (!isVoter) {
          return await contract.methods
            .registerVoter()
            .send({ from: walletAddress });
        } else {
          return;
        }
      })
      .then(async function () {
        if (!isVoter) {
          return await axios
            .post(port + "vote/voterdetails", {
              githubId: username,
            })
            .then((response) => {
              console.log(response);
              setLoader(false);
            })
            .catch((err) => {
              console.error(err);
              setAlert((prevState) => ({
                ...prevState,
                open: true,
                errorMessage: "Error while staking",
              }));
              setLoader(false);
            });
        } else {
          return;
        }
      })
      .then(async function () {
        return contract.methods
          .stakeVote(
            (stakedAmount * Math.pow(10, 18)).toString(),
            props.questionDetails.githubIssueUrl.toString(),
            props.questionDetails.publicAddress.toString(),
            solution.publicAddress.toString()
          )
          .send({ from: walletAddress.toString() });
      })
      .then(async function () {
        return await axios
          .post(port + "vote/save", {
            publicAddress: walletAddress,
            amountStaked: stakedAmount,
            timestamp: Date.now() / 1000,
            solutionId: solution._id,
            githubId: username,
          })
          .then((response) => {
            setStakedAmount(0);
            setLoader(false);
            console.log(response);
          })
          .catch((err) => console.error(err));
      });
  };

  if (contract)
    return (
      <>
        {loader ? (
          <CircularIndeterminate />
        ) : (
          <>
            <div className="staking-solution-div">
              <div className="staking-inner-div" style={{ width: "55%" }}>
                <img src={githubIcon} alt="github" className="staking-icon" />
                <br />
                <Link
                  to={{ pathname: props.solutionId }}
                  target="_blank"
                  className="staking-link"
                >
                  <Button size="small" variant="outlined" className="staking-solution-button">
                    Github Repo
                  </Button>
                </Link>
              </div>
              <div className="staking-inner-div" style={{ marginTop: "1.7%" }}>
                <img
                  src={workplanIcon}
                  alt="wokplan"
                  className="staking-icon"
                />
                <br />
                <Link
                  to={{ pathname: `https://ipfs.io/ipfs/${props.workplan.id}` }}
                  target="_blank"
                  className="staking-link"
                >
                  <Button
                    size="small"
                    variant="outlined"
                    style={{ marginTop: "2.5%" }}
                    className="staking-solution-button"
                  >
                    Work Plan
                  </Button>
                </Link>
              </div>

              <div className="staking-author">
                <br />
                <p style={{ marginTop: "1%" }}>
                  Solution posted by {solution.userId}
                </p>
              </div>
            </div>
            <div className="staking-stake-div">
              <TextField
                id="outlined-basic"
                type={"number"}
                className="staking-stake-input"
                style={{ backgroundColor: "white", borderRadius: "8px" }}
                variant="outlined"
                size="small"
                value={stakedAmount}
                InputProps={{ inputProps: { min: 0, max: 10000 } }}
                onChange={(e) => setStakedAmount(e.target.value.toString())}
              />
              <br />
              <br />
              <Button
              className="staking-stake-button"
                variant="contained"
                onClick={() => handleStake()}
              >
                Stake Now
              </Button>
              <br />
              <p >Avbl. Balance- {balance / 1000000000000000000} CW</p>
            </div>
          </>
        )}
        {alert.open ? (
          <SimpleAlerts
            severity={alert.severity}
            message={alert.errorMessage}
          />
        ) : null}
      </>
    );
  else return <></>;
}
