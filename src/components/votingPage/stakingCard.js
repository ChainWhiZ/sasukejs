import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import githubIcon from '../../assets/Vector1.png';
import workplanIcon from '../../assets/Vector.png';
import { useStyles } from './votingPageCss'
import axios from "axios";
import { Link } from 'react-router-dom';
import {
  initiliaseWeb3,
  fetchAccount,
  initiliaseContract,
} from "../../web3js/web3";
export default function StakingCard(props) {
  const classes = useStyles();
  const [stakedAmount, setStakedAmount] = useState('');
  const [balance, setBalance] = useState(null);
  const [solution, setSolution] = useState({});
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState("");
  const [username] = useState(localStorage.getItem("username"));
  const [isVoter, setIsVoter] = useState(false)

  useEffect(async () => {
    console.log(props)
    await initiliaseWeb3();
    await fetchAccount(function (result) {
      setWalletAddress(result[0]);
    });
    setContract(await initiliaseContract());
    console.log(contract)
    console.log(walletAddress)
    if(contract && walletAddress)
    setBalance((parseInt(await contract.methods.balanceOf(walletAddress).call({ from: walletAddress }))) * (10 ^ (-18)))

    axios
      .post(`https://chainwhiz.herokuapp.com/solution/fetch`, {
        solutionId: props.solutionId
      })
      .then((response) => {
        console.log(response.data);
        setSolution(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .post(`https://chainwhiz.herokuapp.com/user/isvoter`, {
        userId: username

      })
      .then((response) => {
        console.log(response)
        setIsVoter(response.data)
      })
      .catch((err) => console.log(err));

  }, []);
  const handleStake = () => {

    return Promise.resolve()
      .then(async function () {
        console.log("1st")
        if (!isVoter) {
          console.log("1st if")
          return await contract.methods.registerVoter().send({from:walletAddress})
        }
        else {
          console.log("1st else")
          return
        }
      })
      .then(async function () {
        console.log("2nd")
        if (!isVoter) {
          console.log("2st if")
          return await axios
            .post(`https://chainwhiz.herokuapp.com/vote/voterdetails`, {
              githubId: username

            })
            .then((response) => {
              console.log(response)
            })
            .catch((err) => console.error(err));
        }
        else {
          console.log("2st else")
          return
        }

      })
      .then(async function () {
        console.log("3rd")
        return contract.methods.stakeVote(stakedAmount.toString(), props.questionDetails.githubIssueUrl.toString(), props.questionDetails.publicAddress.toString(), solution.publicAddress.toString()).send({from:walletAddress.toString()})

      })
      .then(async function () {
        console.log("4th")
        return await axios
          .post(`https://chainwhiz.herokuapp.com/vote/save`, {
            publicAddress: walletAddress,
            amountStaked: stakedAmount,
            timestamp: (Date.now() / 1000),
            solutionId: solution._id,
            githubId: username
          })
          .then((response) => {
            console.log(response)
          })
          .catch((err) => console.error(err));

      })

  }


  if (contract)
    return (
      <>

        <div className={classes.solutionDiv}>
          <div className={classes.innerDiv} style={{ width: "55%" }}>
            <img src={githubIcon} className={classes.icon} />

            <Link to={{ pathname: props.solutionId }} target="_blank" className={classes.link}>
              <Button size="small" variant="outlined" >Github Repo</Button>
            </Link>


          </div>
          <div className={classes.innerDiv}>
            <img src={workplanIcon} className={classes.icon} />
            <br />
            <Link to={{ pathname: `https://ipfs.io/ipfs/${props.workplan.id}` }} target="_blank" className={classes.link} >
              <Button size="small" variant="outlined">Workplan</Button>
            </Link>
          </div>

          <div className={classes.author}>
            <br />
            <p>Solution posted by {solution.userId}</p>
          </div>

        </div>
        <div className={classes.stakeDiv}>
          <TextField id="outlined-basic" type={"number"} className={classes.stakeInput} variant="outlined" size="small" value={stakedAmount} onChange={e => setStakedAmount((e.target.value).toString())} />
          <br />
          <br />
          <Button variant="contained" onClick={() => handleStake()}>Stake Now</Button>
          <p>Avbl. Balance- {balance} CW</p>
        </div>

      </>
    );
  else
    return <></>
}
