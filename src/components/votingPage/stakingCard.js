import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import githubIcon from '../../assets/Vector1.png';
import workplanIcon from '../../assets/Vector.png';
import { useStyles } from './votingPageCss'


export default function StakingCard(props) {
  const classes = useStyles();
  const [stakedAmount, setStakedAmount] = useState('');
  const [balance, setBalance] = useState(270);
  const handleStake = () => {

  }
  return (
    <>

      <div className={classes.solutionDiv}>
        <div className={classes.innerDiv} style={{width: "55%"}}>
          <img src={githubIcon} className={classes.icon} />

          <Button size="small" variant="outlined" >Github Repo</Button>


        </div>
        <div className={classes.innerDiv}>
          <img src={workplanIcon} className={classes.icon} />
          <br />
          <Button size="small" variant="outlined">Workplan</Button>
        </div>
       
        <div className={classes.author}>
          <br/>
          <p>Solution posted by akp111</p>
        </div>

      </div>
      <div className={classes.stakeDiv}>
        <TextField id="outlined-basic" type={"number"} className={classes.stakeInput} variant="outlined" size="small" value={stakedAmount} onChange={e => setStakedAmount(e.target.value)} />
        <br />
        <br />
        <Button variant="contained" onClick={()=>handleStake()}>Stake Now</Button>
        <p>Avbl. Balance- {balance} CW</p>
      </div>

    </>
  );
}
