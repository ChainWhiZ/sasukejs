import React from "react";
import Grid from "@material-ui/core/Grid";
import { Input } from "@material-ui/core";
import SimpleAlerts from "../../alert/alert";
export default function DaysInputComponent(props) {
    return (
        <>
            <Grid container direction="column" alignItems="center" justifyContent="center" className="days-input-parent">
                <Grid item md={12} xs={12}>
                    <p className="left-title" style={{ color: "white" }}> Expected Time</p>
                </Grid>
                <br></br>
                <Grid item>
                    <Input placeholder="Days" 
                        className="input-field-number input-field-style "
                        type="number"
                        inputProps={{
                            style: { textAlign: "center" },
                            min: 0
                          }}
                        value={props.time} onChange={(e) => { props.handleTime(e.target.value) }} />
                </Grid>
            </Grid>
            {props.alert.isValid ? (
                <SimpleAlerts severity={"warning"} message={props.alert.errorMessage} />
            ) : null}
        </>
    )

}