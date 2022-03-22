import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {communityText,options} from "../../../constants";

export default function RightSideText(props) {
  console.log(props);
  //type 0 is + 1 is -
  function getPageChange(type=0) {
   if (type && props.pageState === 7 && props.issueUrlOptions.choice === options.issueUrlOptions[0].value)
   {
    return props.pageState - 2;
   }
   if (!type && props.pageState === 5 && props.issueUrlOptions.choice === options.issueUrlOptions[0].value)
   {
    return props.pageState + 2;
   }
   if (!type && props.pageState === 8 && props.communityOption === communityText[1].title)
   {
    return props.pageState + 3;
   }
   if (type && props.pageState === 11 && props.communityOption === communityText[1].title)
   {
    return props.pageState - 3;
   }
   return type?props.pageState - 1:props.pageState + 1;
  }
  return (
    <>
      <Grid container className="right-side-card">
        <Grid item md={12} xs={12} className="message">
          <h1 className="message-title">
            {props && props.title
              ? props.title.split(" ").slice(0, -1).join(" ")
              : null}{" "}
            <span style={{ color: "#D4FF1E" }}>
              {props && props.title ? props.title.split(" ").splice(-1) : null}
            </span>
          </h1>
        </Grid>

        <Grid item md={12} xs={12}>
          <p className="message-text">
            {props && props.content ? props.content : null}
          </p>
        </Grid>

       

      
      </Grid>
    </>
  );
}
