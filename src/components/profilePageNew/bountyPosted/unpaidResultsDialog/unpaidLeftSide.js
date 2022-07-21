import React,{useState} from "react";
import Grid from "@material-ui/core/Grid";
import "../../profilePageCss.css";
import { copyTextToClipboard } from "../../../helper";
import CopyIcon from "../../../../assets/baseline_content_copy_white_24dp.png";
import BlackCopyIcon from "../../../../assets/baseline_content_copy_black_18dp.png";


export default function UnpaidLeftSide(props) {
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
      <div className="results-dialog-left-grid">
        <Grid item md={12} xs={12} className="results-dialog-left-grid-heading">
          <p className="results-dialog-heading" style={{ textAlign: "center" }}>
            All Solutions
          </p>
        </Grid>

        {props.solutions &&
          props.solutions.length &&
          props.solutions.map((solution, index) => (
            <Grid
              item
              key={`solverAddress${index}`}
              md={12}
              xs={12}
              onClick={() => props.handleSelectedSolution(index)}
              className={
                props.selectedSolutionIndex === index
                  ? "results-dialog-left-grid-solution results-dialog-left-grid-selected-solution"
                  : "results-dialog-left-grid-solution"
              }
            >
              <p>
                {solution.address.substring(0, 4) +
                  "..." +
                  solution.address.substring(38)} {' '}
                <span style={{ fontSize: "0.8rem" ,verticalAlign: "middle", cursor:"pointer"}}>
                  {isCopied && props.selectedSolutionIndex === index? (
                    "Copied!"
                  ) : (
                    <img
                      onClick={()=>handleCopyClick(solution.address)}
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
      </div>
    </>
  );
}
