import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import githubIcon from '../../assets/Vector1.png';
import workplanIcon from '../../assets/Vector.png';

const useStyles = makeStyles({
  solutionDiv: {
    marginLeft: "2%",
    marginTop: "2%",
    marginBottom: "2%",
    float: "left",
    backgroundColor: "ghostwhite",
    padding: "3%",
    borderRadius: "4% 0 0 4%",
    height: "69%"
  },
  stakeDiv: {
    marginRight: "2%",
    marginTop: "2%",
    marginBottom: "2%",
    float: "left",
    backgroundColor: "gainsboro",
    padding: "3%",
    textAlign: "center",
    borderRadius: "0 4% 4% 0"
  },
  innerDiv:{
    float: "left",
  }

});

export default function StakingCard(props) {
  const classes = useStyles();
  const [stakedAmount,setStakedAmount]= useState('');
  const [balance,setBalance]= useState(270);
  const handleStake =()=>{

  }
  return (
    <>

      <div className={classes.solutionDiv}>
        <div className={classes.innerDiv}>
          <img src={githubIcon}/>
         
          <Button variant="outlined" >Github Repo</Button>
         
          
        </div>
        <div className={classes.innerDiv}>
          <img src={workplanIcon}></img>
          <br/>
          <Button variant="outlined">Workplan</Button>
        </div>

       
      </div>
      <div className={classes.stakeDiv}>
        <TextField id="outlined-basic" variant="outlined" size="small" value={stakedAmount} onChange={e=>setStakedAmount(e.target.value)}/>
        <br />
        <br />
        <Button variant="contained" onClick={()=>handleStake()}>Stake Now</Button>
        <p>Avbl. Balance- {balance} MATIC</p>
      </div>

    </>
  );
}
