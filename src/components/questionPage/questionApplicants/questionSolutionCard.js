/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState} from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "../../avatar/avatar";
import "../questionPage.css";
import { copyTextToClipboard } from "../../helper";
import CopyIcon from "../../../assets/baseline_content_copy_white_24dp.png";

export default function QuestionSolutionCard(props) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = (walletAddress) => {
    copyTextToClipboard(walletAddress)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Grid container class="solution-section">
        <Grid item md={12}>
          <Avatar
            className="acc"
            seed={props.solution.address}
            scale={5}
            color="#003153"
          />

          <span class="address">
            {props.solution.address.substring(0, 4) +
              "..." +
              props.solution.address.substring(38)}
          </span>
          <span style={{ fontSize: "0.8rem",verticalAlign: "middle", cursor:"pointer"}}>
            {isCopied? (
              "Copied!"
            ) : (
              <img
                onClick={() => handleCopyClick(props.solution.address)}
                src={CopyIcon}
                alt="copy"
              />
            )}
          </span>
        </Grid>

        <Grid item md={12}>
          <a
            href={
              props.solution._id.includes("https://")
                ? props.solution._id
                : `https://${props.solution._id}`
            }
            target="_blank"
            rel="noreferrer"
          >
            <button class="submission">View Submission</button>
          </a>
        </Grid>
      </Grid>
    </>
  );
}
