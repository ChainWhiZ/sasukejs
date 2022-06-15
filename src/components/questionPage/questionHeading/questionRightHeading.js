import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "../questionPage.css";
import SolutionSubmit from "../dialogs/solutionSubmit";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import TweetShare from "../dialogs/tweetShare";
import {
  maticusd as maticusdAtom,
  walletAddress as walletAddressAtom,
  devusd as devusdAtom,
} from "../../../recoil/atoms";
import { getReward, getUSDReward } from "../../helper";
import { useRecoilValue } from "recoil";
import { Tooltip } from "@material-ui/core";
import { checkLength, shortenLength } from "../../helper";
export default function QuestionRightHeading(props) {
  console.log(props.currency);
  const walletAddress = useRecoilValue(walletAddressAtom);
  const devusd = useRecoilValue(devusdAtom);
  const maticusd = useRecoilValue(maticusdAtom);
  const [openSolveDialog, setOpenSolveDialog] = useState(false);
  const [openTweetDialog, setOpenTweetDialog] = useState(false);
  const up = (v) => {
    return Math.ceil(v * Math.pow(10, 3)) / Math.pow(10, 3);
  };
  console.log(devusd);
  console.log(props.bountyReward * devusd);
  return (
    <>
      <Grid
        container
        className="heading-box center "
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ paddingTop: "7%" }}
      >
        <Grid item md={12}>
          <p class="heading color-neon">Bounty Amount</p>

          <Tooltip
            title={getReward(props)}
            disableHoverListener={!checkLength(getReward(props))}
            className="bounty-time"
          >
            <p class="bounty-time">
              {shortenLength(getReward(props))} {props.currency}
            </p>
          </Tooltip>

          <Tooltip
            title={getUSDReward(props, devusd, maticusd)}
            disableHoverListener={
              !checkLength(getUSDReward(props, devusd, maticusd))
            }
            className="bounty-time"
          >
            <p class="bounty-time margin-top-20">
              {" "}
              {shortenLength(getUSDReward(props, devusd, maticusd))} USD
            </p>
          </Tooltip>

          {props.questionStage === "solve" ? (
            <Button
              class="bounty-button"
              onClick={() => setOpenSolveDialog(true)}
              disabled={
                walletAddress === props.address ||
                !props.whitelistedSolvers.includes(walletAddress)
              }
            >
              Submit Solution
            </Button>
          ) : props.questionStage === "vote" ? (
            <Link
              to={{
                pathname: "/stake",
                state: {
                  questionDetails: props,
                },
              }}
              style={
                walletAddress === props.address
                  ? { pointerEvents: "none" }
                  : null
              }
            >
              <Button
                class="bounty-button"
                disabled={walletAddress === props.address}
              >
                Vote Now
              </Button>
            </Link>
          ) : (
            <Button class="bounty-button">Completed</Button>
          )}
        </Grid>
      </Grid>
      {openSolveDialog ? (
        <SolutionSubmit
          open={openSolveDialog}
          quesDetails={props}
          handleDialogClose={() => setOpenSolveDialog(false)}
          handleTweetDialogOpen={() => setOpenTweetDialog(true)}
        />
      ) : (
        ""
      )}
      {openTweetDialog ? (
        <TweetShare
          open={openTweetDialog}
          handleDialogClose={() => setOpenTweetDialog(false)}
        />
      ) : (
        ""
      )}
    </>
  );
}
