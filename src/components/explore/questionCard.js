import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import { Link } from 'react-router-dom';
// import { useStyles } from './exploreCss'
import AccountImage from "../../assets/Account.png"
import  "./explore.css"
import time from "../../assets/Time.png"
import account from "../../assets/Account.png"
export default function QuestionCard(props) {
  // const classes = useStyles();

  return (
    <>
      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Link to={`/bounty/${props._id}`} style={{textDecoration:"none"}}>
            <p style={{fontSize:"19px",color:"white",marginLeft:"20px"}}>{props.questionTitle}</p>
          </Link>
        </Grid>

        {!props.isCommunityApprovedSolution ? (
          <Grid container md={4} xs={12} direction="row"  style={{ justifyContent: "space-around", alignItems:"flex-end", marginLeft:"-118px"}}>
            <Box
              component="span"
              p={0.5}
              m={1}
              bgcolor="white"
              color="black"
              borderRadius={3}
              width="88px"
              display="flex"
              justifyContent="center"
            >
              {1 + " CW"}
            </Box>
            <Box
              component="span"
              p={0.5}
              m={1}
              bgcolor="white"
              color="black"
              borderRadius={3}
              width="88px"
              display="flex"
              justifyContent="center"
            >
              {1 + " CW"}
            </Box>
          </Grid>
        ) : (
          <Grid container alignItems="flex-end" md={1} >
            <Box
              p={0.5}
              bgcolor="white"
              color="black"
              borderRadius={3}
              width="88px"
              display="flex"
              justifyContent="center"
            >
              {props.bountyReward + "  CW"}
            </Box>
          </Grid>
        )}

        <Grid item md={12} xs={12} >
          {props.questionCategories.map((category) => (
            <Box
              component="span"
              p={1}
              m={2}
              bgcolor="#D7FF2E"
              color="black"
              borderRadius={4}
<<<<<<< HEAD
              fontSize="10px"
              width="93px"
              style={{display:"flex", justifyContent:"center",}}
=======
              className={classes.category}
>>>>>>> 414b603edd9309e00ef52d28ea1f400ecba36b15
            >
              {category}
            </Box>
          ))}
        </Grid>
        <Grid container display="flex" direction="row" className="timeAndAccount" style={{ justifyContent: "flex-end" }}>
          <Grid item md={2}>
            <Box p={1} m={1}>
              <img src={time} alt="time" />
              <p>3 Days</p>
            </Box>
          </Grid>
          <Grid item md={2}>
            <Box p={1} m={1}>
              <img src={account} alt="account" />
              <p>4 Solvers</p>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
