import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import githubIcon from "../../assets/Vector1.png";
import workplanIcon from "../../assets/Vector.png";
import { useStyles } from "./votingPageCss";
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

export default function StakingCard(props) {
  const classes = useStyles();
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
    setLoader(true);
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
            <div className={classes.solutionDiv}>
              <div className={classes.innerDiv} style={{ width: "55%" }}>
                <img src={githubIcon} alt="github" className={classes.icon} />
                <br />
                <Link
                  to={{ pathname: props.solutionId }}
                  target="_blank"
                  className={classes.link}
                >
                  <Button size="small" variant="outlined">
                    Github Repo
                  </Button>
                </Link>
              </div>
              <div className={classes.innerDiv} style={{ marginTop: "1%" }}>
                <img
                  src={workplanIcon}
                  alt="wokplan"
                  className={classes.icon}
                />
                <br />
                <Link
                  to={{ pathname: `https://ipfs.io/ipfs/${props.workplan.id}` }}
                  target="_blank"
                  className={classes.link}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    style={{ marginTop: "2.5%" }}
                  >
                    Work Plan
                  </Button>
                </Link>
              </div>

              <div className={classes.author}>
                <br />
                <p style={{ marginTop: "6%" }}>
                  Solution posted by {solution.userId}
                </p>
              </div>
            </div>
            <div className={classes.stakeDiv}>
              <TextField
                id="outlined-basic"
                type={"number"}
                className={classes.stakeInput}
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
                variant="contained"
                onClick={() => handleStake()}
                style={{ color: "white", backgroundColor: "black" }}
              >
                Stake Now
              </Button>
              <p>Avbl. Balance- {balance / 1000000000000000000} CW</p>
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
