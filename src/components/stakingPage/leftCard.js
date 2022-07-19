import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ideaIcon from "../../assets/idea.png";
import ideaIconBlack from "../../assets/idea_black.png";
import { copyTextToClipboard } from "../helper";
import CopyIcon from "../../assets/baseline_content_copy_white_24dp.png";
import BlackCopyIcon from "../../assets/baseline_content_copy_black_18dp.png";
import "./stakingPageCss.css";

export default function LeftCard(props) {
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
  const handleSelectedStyle = (value) => {
    if (props.solutions[props.selectedSolutionIndex].address === value) {
      return "staking-address-card staking-selected-address-card";
    } else {
      return "staking-address-card";
    }
  };

  return (
    <Grid container className="staking-left-card">
      <Grid item md={12} xs={12}>
        <p className="staking-address-heading">All Solutions Submitted</p>
      </Grid>

      {props.solutions &&
        props.solutions.length &&
        props.solutions.map((solution, index) => (
          <Grid
            item
            md={12}
            xs={12}
            className={handleSelectedStyle(solution.address)}
            onClick={() => props.handleSelectedSolution(index)}
          >
            <p
              className={
                props.solutions[props.selectedSolutionIndex].address ===
                solution.address
                  ? "staking-address active-black"
                  : "staking-address"
              }
            >
              {solution.address.substring(0, 4) +
                "..." +
                solution.address.substring(38)}{" "}
              <span style={{ fontSize: "0.8rem", verticalAlign: "middle" }}>
                {isCopied &&
                props.solutions[props.selectedSolutionIndex].address ===
                  solution.address ? (
                  "Copied!"
                ) : (
                  <img
                    onClick={() => handleCopyClick(solution.address)}
                    src={
                      props.selectedSolutionIndex === index
                        ? BlackCopyIcon
                        : CopyIcon
                    }
                    alt="copy"
                  />
                )}
              </span>
            </p>
          </Grid>
        ))}
    </Grid>
  );
}
