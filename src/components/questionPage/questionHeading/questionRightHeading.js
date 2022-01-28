import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "../questionPage.css";
import SolutionSubmit from "../dialogs/solutionSubmit";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {
  maticusd as maticusdAtom,
  walletAddress as walletAddressAtom,
  username as usernameAtom,
  devusd as devusdAtom,
} from "../../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { Tooltip } from "@material-ui/core";
import { checkLength, shortenLength } from "../../helper";
export default function QuestionRightHeading(props) {
  console.log(props.bountyCurrency);
  const walletAddress = useRecoilValue(walletAddressAtom);
  const username = useRecoilValue(usernameAtom);
  const [openSolveDialog, setOpenSolveDialog] = useState(false);
  const maticusd = useRecoilValue(maticusdAtom);
  const devusd = useRecoilValue(devusdAtom);
  const up = (v) => {
    return Math.ceil(v * Math.pow(10, 3)) / Math.pow(10, 3);
  };
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
            title={
              props.questionStage === "vote"
                ? props.communityReward
                : props.bountyReward
            }
            disableHoverListener={
              !checkLength(
                props.questionStage === "vote"
                  ? props.communityReward
                  : props.bountyReward
              )
            }
            className="bounty-time"
          >
            <p class="bounty-time">
              {shortenLength(
                props.questionStage === "vote"
                  ? props.communityReward
                  : props.bountyReward
              )}{" "}
              {props.bountyCurrency}
            </p>
          </Tooltip>
  

          <Tooltip
            title={
              props.questionStage === "solve"
                ? props.bountyCurrency === "DEV"
                  ? devusd * props.bountyReward
                  : maticusd * props.bountyReward
                : props.bountyCurrency === "DEV"
                ? devusd * props.communityReward
                : maticusd * props.communityReward
            }
            disableHoverListener={
              !checkLength(
                props.questionStage === "solve"
                  ? props.bountyCurrency === "DEV"
                    ? devusd * props.bountyReward
                    : maticusd * props.bountyReward
                  : props.bountyCurrency === "DEV"
                  ? devusd * props.communityReward
                  : maticusd * props.communityReward
              )
            }
            className="bounty-time"
          >
            <p class="bounty-time margin-top-20">
              {" "}
              {shortenLength(
                props.questionStage === "solve"
                  ? props.bountyCurrency === "DEV"
                    ? devusd * props.bountyReward
                    : maticusd * props.bountyReward
                  : props.bountyCurrency === "DEV"
                  ? devusd * props.communityReward
                  : maticusd * props.communityReward
              )}{" "}
              USD
            </p>
          </Tooltip>

          {props.questionStage === "solve" ? (
            <Button
              class="bounty-button"
              onClick={() => setOpenSolveDialog(true)}
              disabled={
                walletAddress === props.publicAddress ||
                username === props.publisherGithubId
              }
            >
              Submit Github link
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
                walletAddress === props.publicAddress ||
                username === props.publisherGithubId
                  ? { pointerEvents: "none" }
                  : null
              }
            >
              <Button
                class="bounty-button"
                disabled={
                  walletAddress === props.publicAddress ||
                  username === props.publisherGithubId
                }
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
        />
      ) : (
        ""
      )}
    </>
  );
}
