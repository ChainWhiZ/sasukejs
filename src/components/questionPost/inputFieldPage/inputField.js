import React from "react";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SimpleAlerts from "../../alert/alert";

export default function InputComponent(props) {
    function handlePlaceholder() {
        if (props.pageState == 1)
            return "Enter Issue Title"
        if (props.pageState == 4)
            return "Enter Github Issue URL"
        if (props.pageState == 5)
            return "Enter reward amount"
        if (props.pageState == 7)
            return "Enter Community Reward"
        if (props.pageState == 8)
            return "Confirm Wallet Address"
    }

    function handleValue() {
        if (props.pageState == 1)
            return props.issueTitle;
        if (props.pageState == 4)
            return props.issueURL;
        if (props.pageState == 5)
            return props.reward;
        if (props.pageState == 7)
            return props.communityReward;
    }

    function handleOnChange(value) {
        if (props.pageState == 1)
            return props.handleIssueTitle(value);
        if (props.pageState == 4)
            return props.handleIssueURL(value);
        if (props.pageState == 5)
            return props.handleReward(value)
        if (props.pageState == 7)
            return props.handleCommunityReward(value);
    }

    function handleUndertakings(e) {
        props.handleTerms({ ...props.terms, [e.target.name]: e.target.checked });
    };

    function handleLabel() {
        if (props.pageState == 1)
            return "Issue Title";
        if (props.pageState == 4)
            return "Github Issue Link";
        if (props.pageState == 5)
            return "Enter Your Reward";
        if (props.pageState == 7)
            return "Enter Community Reward";
        if (props.pageState == 8)
            return "Your Wallet Address";
    }

    console.log(props)
    console.log(props.pageState == 7 && props.communityOption == "Self Approved")
    return (
        <>
            <Grid container direction="column" alignItems="center" justifyContent="center" className="input-field-parent">
                <Grid item md={12} xs={12}>
                    <p className="left-title">{handleLabel()}</p>
                </Grid>
                {props.pageState == 1 || props.pageState == 4 || props.pageState == 5 || props.pageState == 7 ? (
                    <Grid item md={8} xs={8} className="margin-top-2">
                        <Input disabled={props.pageState == 7 && props.communityOption == "Self Approved"}
                            type={(props.pageState === 5 || props.pageState === 7) ? "number" : "text"}
                            min="1"
                            placeholder={handlePlaceholder()} value={handleValue()}
                            className="input-field-style"
                            onChange={(e) => { handleOnChange(e.target.value) }} />
                    </Grid >
                ) : (
                    <>
                        <Grid item md={8} xs={8} className="margin-top-2">
                            <Input value={"WALLET_ADDRESS_WILL_BE_SET_HERE"} className="input-field-style" disabled={true} />
                        </Grid >
                        <Grid item md={12} xs={12} className="margin-left-8">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        name="undertaking1"
                                        checked={props.terms.undertaking1}
                                        onChange={handleUndertakings}
                                        style={{ color: "white" }}
                                    />
                                }
                            />
                            <span className="terms-text">I confirm that the address belongs to me and all transactions will be associated with the same.</span>
                        </Grid>
                        <Grid item md={12} xs={12} className="margin-left-23">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        name="undertaking2"
                                        checked={props.terms.undertaking2}
                                        onChange={handleUndertakings}
                                        color="secondary"
                                        style={{ color: "white" }}
                                    />
                                }
                            />
                            <span className="terms-text">I have read and understood all terms and conditions.</span>

                        </Grid>
                    </>

                )}


            </Grid>
            {props.alert.isValid ? (
                <SimpleAlerts severity={"warning"} message={props.alert.errorMessage} />
            ) : null}
        </>
    )

}