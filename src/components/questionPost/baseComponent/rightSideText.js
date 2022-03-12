import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {communityText,options} from "../../../constants";

export default function RightSideText(props) {
  console.log(props);
  //type 0 is + 1 is -
  function getPageChange(type=0) {
   if (type && props.pageState === 8 && props.issueUrlOptions.choice === options.issueUrlOptions[0].value)
   {
    return props.pageState - 2;
   }
   if (!type && props.pageState === 6 && props.issueUrlOptions.choice === options.issueUrlOptions[0].value)
   {
    return props.pageState + 2;
   }
   if (!type && props.pageState === 9 && props.communityOption === communityText[1].title)
   {
    return props.pageState + 2;
   }
   if (type && props.pageState === 12 && props.communityOption === communityText[1].title)
   {
    return props.pageState - 2;
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

        {/* <Grid item md={12} xs={12} className="button-parent">
                        <Grid container direction="row" container
                            justifyContent="space-between"
                            alignItems="center"> */}
        {props.pageState > 0 && props.pageState < 12 ? (
          <>
            <Grid item md={6} xs={6}>
              <Button
                size="small"
                variant="contained"
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  //convert into functions
                  if (props.pageState > 1 && props.pageState < 12) {
                    console.log("in here")
                    props.handleValidation(getPageChange(1));
                  }
                }}
              >
                Previous
              </Button>
            </Grid>
            <Grid item md={6} xs={6}>
              <Button
                size="small"
                variant="contained"
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (props.pageState > 0 && props.pageState < 12) {
                   
                    props.handleValidation(getPageChange());
                   
                  

                  }
                  
                }}
              >
                Next
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item md={6} xs={6}>
              <Button
                size="small"
                variant="contained"
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (props.pageState > 1 && props.pageState < 13) {
                    props.handleValidation(getPageChange(1));
                  }
                }}
              >
                Previous
              </Button>
            </Grid>
            <Grid item md={6} xs={6}>
              <Button
                size="small"
                variant="contained"
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  props.handleSubmit();
                }}
              >
                Publish
              </Button>
            </Grid>
          </>
        )}

      
      </Grid>
    </>
  );
}
