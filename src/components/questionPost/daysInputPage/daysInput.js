import React from "react";
import Grid from "@material-ui/core/Grid";
import { Input } from "@material-ui/core";
import SimpleAlerts from "../../alert/alert";
export default function DaysInputComponent(props) {
  return (
    <>
      {props.alert.isValid ? (
        <SimpleAlerts severity={"warning"} message={props.alert.errorMessage} />
      ) : null}
      {props.pageState == 5 ?
        (
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            className="days-input-parent"
          >
            <Grid item md={12} xs={12}>
              <p className="left-title" style={{ color: "white" }}>
                {" "}
                Expected Time for Solving
              </p>
            </Grid>
            <br></br>
            <Grid item md={12}>
              <Input
                placeholder="Days"
                className="input-field-number input-field-style "
                type="number"
                inputProps={{
                  style: { textAlign: "center" },
                  min: 0,
                }}
                value={props.time}
                onChange={(e) => {
                  props.handleTime(e.target.value);
                }}
              />
            </Grid>
            <Grid item md={12} className="bounty-post-unit">
              <p>Days</p>
            </Grid>
          </Grid>
        ) : (props.pageState == 10 ? (<Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          className="days-input-parent"
        >
          <Grid item md={12} xs={12}>
            <p className="left-title" style={{ color: "white" }}>
              {" "}
              Expected Time for Community Voting
            </p>
          </Grid>
          <br></br>
          <Grid item md={12}>
            <Input
              placeholder="Days"
              className="input-field-number input-field-style "
              type="number"
              inputProps={{
                style: { textAlign: "center" },
                min: 0,
              }}
              value={props.time}
              onChange={(e) => {
                props.handleTime(e.target.value);
              }}
            />
          </Grid>
          <Grid item md={12} className="bounty-post-unit">
            <p>Days</p>
          </Grid>
        </Grid>) : null)}


    </>
  );
}
