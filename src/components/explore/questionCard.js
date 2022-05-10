import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import "./explore.css";
import time from "../../assets/Time.png";
import account from "../../assets/Account.png";
import {
  maticusd as maticusdAtom,
  devusd as devusdAtom,
} from "../../recoil/atoms";
import { getUSDReward, getReward } from "../helper";
import { useRecoilValue } from "recoil";
import { checkLength, shortenLength } from "../helper";
import Tooltip from "@material-ui/core/Tooltip";
export default function QuestionCard(props) {
  console.log(props)
  const maticusd = useRecoilValue(maticusdAtom);
  const devusd = useRecoilValue(devusdAtom);
  console.log(devusd)
  let hoursOrDaysOrMinutes = "day(s)";
  const seconds = Math.floor(new Date().getTime() / 1000);
  let timeLeft = 0;
  if (props.question.questionStage === "solve" && props.question.isCommunityApprovedSolution) {
    timeLeft = (props.question.votingTimeBegin - seconds) / (3600 * 24);
  } else {
    timeLeft = (props.question.timeEnd - seconds) / (3600 * 24);
  }
  if (timeLeft > 0) {
    if (timeLeft < 1) {
      hoursOrDaysOrMinutes = "hour(s)";
      timeLeft = 24 * timeLeft;
      if (timeLeft < 1) {
        hoursOrDaysOrMinutes = "minute(s)";
        timeLeft = Math.floor(60 * timeLeft);
      } else {
        timeLeft = Math.floor(timeLeft);
      }
    } else {
      timeLeft = Math.floor(timeLeft);
    }
  }


  return (
    <>
      <Grid container>
        <Grid item md={8} xs={12}>
          <Link to={`/bounty/${props.question._id}`}>
            <p className="question-title">{props.question.title}</p>
          </Link>
        </Grid>

        {props.question.isCommunityApprovedSolution ? (
          <>
            <Grid item md={2} xs={12} className="reward-grid">

              <Tooltip
                title={
                  getReward(props.question)
                }
                disableHoverListener={
                  !checkLength(
                    getReward(props.question)

                  )
                }
              >
                <p className="reward__value">
                  {" "}
                  {shortenLength(
                    getReward(props.question)

                  )}{" "}
                  {props.question.currency}
                </p>
              </Tooltip>
            </Grid>
            <Grid item md={2} xs={12} className="reward-grid right-reward-box">
              <Tooltip
                title={
                  getUSDReward(props.question, devusd, maticusd)

                }
                disableHoverListener={
                  !checkLength(
                    getUSDReward(props.question, devusd, maticusd)

                  )
                }
              >
                <p className="reward__value">
                  {" "}
                  {shortenLength(
                    getUSDReward(props.question, devusd, maticusd)

                  )}{" "}
                  USD
                </p>
              </Tooltip>
            </Grid>
          </>
        ) : (
          <>
            <Grid item md={2} xs={12} className="reward-grid ">
              <Tooltip
                title={
                  props.question.bountyReward
                }
                disableHoverListener={
                  !checkLength(
                    props.question.bountyReward
                  )
                }
              >
                <p className="reward__value">
                  {" "}
                  {shortenLength(
                    props.question.bountyReward
                  )}{" "}
                  {props.question.currency}
                </p>
              </Tooltip>
            </Grid>
            <Grid item md={2} xs={12} className="reward-grid right-reward-box">
              <Tooltip
                title={
                  getUSDReward(props.question, devusd, maticusd)

                }
                disableHoverListener={
                  !checkLength(
                    getUSDReward(props.question, devusd, maticusd)

                  )
                }
              >
                <p className="reward__value">
                  {" "}
                  {shortenLength(
                    getUSDReward(props.question, devusd, maticusd)

                  )}{" "}
                  USD
                </p>
              </Tooltip>
            </Grid>
          </>
        )}
      </Grid>

      <Grid container>
        {props.question.languagesAndTools.slice(0, 4).map((category) => (
          <Grid item md>
            <Box className="ques-category-box">{category}</Box>
          </Grid>
        ))}

        <Grid item md={3} className="ques-detail">
          <img src={time} alt="time" className="time" />
          <p className="time-left">{timeLeft < 0 ? 0 : timeLeft}</p>
          <p className="time-unit">{hoursOrDaysOrMinutes}</p>
        </Grid>
        <Grid item md={3}>
          <img src={account} alt="account" className="account" />
          <p className="no-of-solvers">{props.solCount}</p>
          <p className="solver">solvers</p>
        </Grid>
      </Grid>
    </>
  );
}
