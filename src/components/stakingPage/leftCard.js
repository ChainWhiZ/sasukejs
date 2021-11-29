import React from "react";
import Grid from "@material-ui/core/Grid";
import ideaIcon from "../../assets/idea.png";
import ideaIconBlack from "../../assets/idea_black.png";
import "./stakingPageCss.css";

export default function LeftCard(props) {
  console.log(props);
  const handleSelectedStyle = (value) => {
    if (props.selectedWorkplan === value) {
      return "staking-workplan-card staking-selected-workplan-card";
    } else {
      return "staking-workplan-card";
    }
  };

  return (
    <Grid container className="staking-left-card">
      <Grid item md={12} xs={12}>
        <p className="staking-workplan-heading">All Workplans Posted</p>
      </Grid>

      {props.workplans &&
        props.workplans.length &&
        props.workplans.map((workplan) => (
          <Grid
            item
            md={12}
            xs={12}
            className={handleSelectedStyle(workplan)}
            onClick={() => props.handleSelect(workplan)}
          >
            <p
              className={
                props.selectedWorkplan === workplan
                  ? "staking-workplan active-black"
                  : "staking-workplan"
              }
            >
              <span>
                <img
                  className="staking-icon"
                  src={
                    props.selectedWorkplan === workplan
                      ? ideaIconBlack
                      : ideaIcon
                  }
                  alt="icon"
                />
              </span>
              Workplan Submitted by akp11
            </p>
          </Grid>
        ))}
    </Grid>
  );
}
