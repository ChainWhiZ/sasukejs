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
            className={handleSelectedStyle(workplan._id)}
            onClick={() => props.handleSelect(workplan._id)}
          >
            <a
              href={`https://ipfs.io/ipfs/${workplan._id}`}
              target="_blank"
              rel="noreferrer"
            >
              <p
                className={
                  props.selectedWorkplan === workplan._id
                    ? "staking-workplan active-black"
                    : "staking-workplan"
                }
              >
                <span>
                  <img
                    className="staking-icon"
                    src={
                      props.selectedWorkplan === workplan._id
                        ? ideaIconBlack
                        : ideaIcon
                    }
                    alt="icon"
                  />
                </span>
                Workplan Submitted by {workplan.userId}
              </p>
            </a>
          </Grid>
        ))}
    </Grid>
  );
}
