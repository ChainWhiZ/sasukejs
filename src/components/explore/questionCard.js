import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import { Link } from 'react-router-dom';
import { useStyles } from './exploreCss'
import AccountImage from "../../assets/Account.png"

export default function QuestionCard(props) {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Link to={`/bounty/${props._id}`} className={classes.link}>
            <p className={classes.questionTitle}>{props.questionTitle}</p>
          </Link>
        </Grid>
        <Grid item md={3} xs={12} className={classes.bountyGrid}>
          {props.isCommunityApprovedSolution ? (
            <>
              <Box
                component="span"
                p={1}
                m={1}
                bgcolor="black"
                color="white"
                borderRadius={3}
                width="18%"
                className={classes.bounty}
              >
                {props.bountyReward + " CW"}
              </Box>
              <Box
                component="span"
                p={1}
                m={1}
                bgcolor="black"
                color="white"
                borderRadius={3}
                width="18%"
                className={classes.bounty}
              >
                {props.communityReward + " CW"}
              </Box>
            </>
          ) : (
            <Box p={1}
              bgcolor="black"
              color="white"
              borderRadius={3}
              width="13%"
              className={classes.bounty}>
              {props.bountyReward + " CW"}
            </Box>
          )}
        </Grid>
        <Grid item md={12} xs={12}>
          {props.questionCategories.map((category) => (
            <Box component="span"
              p={1}
              m={1}
              bgcolor="grey.300"
              borderRadius={4}
              className={classes.category}>
              {category}
            </Box>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
