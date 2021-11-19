import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "../questionPage.css";
import SolutionSubmit from "../dialogs/solutionSubmit";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { maticusd as maticusdAtom, walletAddress as walletAddressAtom ,username as usernameAtom} from "../../../recoil/atoms";
import { useRecoilValue } from "recoil";

export default function QuestionRightHeading(props) {
  const walletAddress = useRecoilValue(walletAddressAtom);
  const username = useRecoilValue(usernameAtom)
  const [openSolveDialog, setOpenSolveDialog] = useState(false);
  const maticusd = useRecoilValue(maticusdAtom);
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
          <p class="bounty-time ">
            {props.questionStage === "vote"
              ? props.communityReward + " MATIC"
              : props.bountyReward + " MATIC"}
          </p>
          <p class="bounty-time margin-top-20">
            {" "}
            {props.questionStage === "vote"
              ? props.communityReward * maticusd + " USD"
              : props.bountyReward * maticusd + " USD"}
          </p>
          {props.questionStage === "solve" ? (
            <Button
              class="bounty-button"
              onClick={() => walletAddress !== props.publicAddress || username === props.publisherGithubId ? setOpenSolveDialog(true) : null}
              style={{ opacity: walletAddress === props.publicAddress || username === props.publisherGithubId ? "25%" : "100%" }}

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
              style={walletAddress === props.publicAddress || username === props.publisherGithubId ? { pointerEvents: "none" } : null}
            >
              <Button class="bounty-button"
                style={walletAddress === props.publicAddress|| username === props.publisherGithubId ? { opacity: "25%" } : null}
              >Vote Now</Button>
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
