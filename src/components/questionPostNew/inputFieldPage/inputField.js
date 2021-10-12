import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default function InputComponent(props) {
    function handlePlaceholder() {
        if (props.pageState == 1)
            return "Enter Issue Title"
        if (props.pageState == 4)
            return "Enter Github Issue URL"
        if (props.pageState == 5)
            return "Enter reward amount"
        if (props.pageState==7)
            return "Confirm Wallet Address"
    }
    function handleUndertakings (e) {
        props.handleTerms({ ...props.terms, [e.target.name]: e.target.checked });
      };
    console.log(props)
    return (
        <>
            <Grid container direction="column" alignItems="center" justifyContent="center" style={{ marginTop: "30%" }}>
                <Grid item md={12} xs={12}>
                    <p className="left-title">{props.pageState == 1 ? "Issue Title" : props.pageState == 4 ? "Github Issue Link" : props.pageState == 5? "Enter Your Reward":"Your Wallet Address"}</p>
                </Grid>
                {props.pageState == 1 || props.pageState == 4 || props.pageState == 5 ? (
                    <Grid item md={8} xs={8} style={{ marginTop: "2%" }}>
                        <Input placeholder={handlePlaceholder()} style={{ color: "white", width: "50vw" }} onChange={(e) => { props.pageState == 1 ? props.handleIssueTitle(e.target.value) : props.pageState == 4 ? props.handleIssueURL(e.target.value) : props.handleReward(e.target.value) }} />
                    </Grid >
                ) : (
                    <>
                        <Grid item md={8} xs={8} style={{ marginTop: "2%" }}>
                            <Input value={"WALLET_ADDRESS_WILL_BE_SET_HERE"} style={{ color: "white", width: "50vw" }} disabled={true} />
                        </Grid >
                        <Grid item md={12} xs={12} style={{marginLeft:"8%"}}>
                            <FormControlLabel 
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        name="undertaking1"
                                        checked={props.terms.undertaking1}
                                        onChange={handleUndertakings}
                                        style={{color:"white"}}
                                    />
                                }
                            />
                            <span className="terms-text">I confirm that the address belongs to me and all transactions will be associated with the same.</span>
                        </Grid>
                        <Grid item md={12} xs={12} style={{marginLeft:"-23%"}}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        name="undertaking1"
                                        checked={props.terms.undertaking1}
                                        onChange={handleUndertakings}
                                        color="secondary"
                                        style={{color:"white"}}
                                    />
                                }
                            />
                            <span className="terms-text">I have read and understood all terms and conditions.</span>
                       
                        </Grid>
                    </>

                )}


            </Grid>
        </>
    )

}