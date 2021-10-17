import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
export default function RightSideText(props) {
  console.log(props);
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
        {props.pageState > 0 && props.pageState < 8 ? (
          <>
            <Grid item md={6} xs={6}>
              <Button
                size="small"
                variant="contained"
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (props.pageState > 1 && props.pageState < 8) {
                    props.handleValidation(props.pageState - 1);
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
                  if (props.pageState > 0 && props.pageState < 8) {
                    props.handleValidation(props.pageState + 1);
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
                  if (props.pageState > 1 && props.pageState < 9) {
                    props.handleValidation(props.pageState - 1);
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

        {/* </Grid>

                    </Grid> */}
      </Grid>
    </>
  );
}
