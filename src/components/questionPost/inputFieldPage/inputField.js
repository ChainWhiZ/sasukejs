import React from "react";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SimpleAlerts from "../../alert/alert";

export default function InputComponent(props) {
  let currency=""
  if(props.pageState === 5 || props.pageState === 7) {
    currency="MATIC";
  }
  function handlePlaceholder() {
    if (props.pageState === 1) return "Enter Issue Title";
    if (props.pageState === 4) return "Enter Github Issue URL";
    if (props.pageState === 5) return "Enter Reward Amount";
    if (props.pageState === 7) return "Enter Community Reward";
    if (props.pageState === 8) return "Confirm Wallet Address";
  }

  function handleValue() {
    if (props.pageState === 1) return props.issueTitle;
    if (props.pageState === 4) return props.issueURL;
    if (props.pageState === 5) return props.reward;
    if (props.pageState === 7) return props.communityReward;
  }

  function handleOnChange(value) {
    if (props.pageState === 1) return props.handleIssueTitle(value);
    if (props.pageState === 4) return props.handleIssueURL(value);
    if (props.pageState === 5) return props.handleReward(value);
    if (props.pageState === 7) return props.handleCommunityReward(value);
  }

  function handleUndertakings(e) {
    props.handleTerms({ ...props.terms, [e.target.name]: e.target.checked });
  }

  function handleLabel() {
    if (props.pageState === 1) return "Issue Title";
    if (props.pageState === 4) return "Github Issue Link";
    if (props.pageState === 5) return "Enter Your Reward";
    if (props.pageState === 7) return "Enter Community Reward";
    if (props.pageState === 8) return "Your Wallet Address";
  }
  function handleStyle(el = "parent") {
    if (el === "input") {
      if (props.pageState === 5 || props.pageState === 7)
        return "input-field-style input-field-number";
      return "input-field-style";
    } else {
      if (props.pageState === 8) return "margin-left-30";
      return null;
    }
  }

  console.log(props);

  return (
    <>
     {props.alert.isValid ? (
        <SimpleAlerts  severity={"warning"} message={props.alert.errorMessage} />
      ) : null}
      <Grid
        container
        direction="column"
        alignItems={props.pageState === 8 ? "flex-start" : "center"}
        justifyContent={props.pageState === 8 ? "flex-start" : "center"}
        className={handleStyle()}
      >
        <Grid item md={12} xs={12} className={props.pageState===8?"margin-left-30":"margin-left-35"}>
          <p className="left-title ">{handleLabel()}</p>
        </Grid>
        {props.pageState === 1 ||
        props.pageState === 4 ||
        props.pageState === 5 ||
        props.pageState === 7 ? (
          <>
          <Grid item md={8} xs={8} className="margin-top-2">
            <Input
             
              type={
                props.pageState === 5 || props.pageState === 7
                  ? "number"
                  : "text"
              }
              inputProps={{
                style: { textAlign: "center" },
                min: (props.pageState===5)?10:5,
              }}
              placeholder={handlePlaceholder()}
              value={handleValue()}
              className={handleStyle("input")}
              onChange={(e) => {
                handleOnChange(e.target.value);
              }}
            />
          </Grid>
          <Grid item md={12} className="bounty-post-unit cwz">
            <p>{currency}</p>
          </Grid>
          </>
        ) : (
          <>
            <Grid item md={12} xs={12} style={{marginLeft:props.walletAddress?"25%":"40%"}}>
              <Input
                value={props.walletAddress?props.walletAddress:"Not Connected"}
                className="input-field-style"
                style={{marginLeft:"-5%"}}
                disabled={true}
              />
              <br/>
              <br/>
              <br/>
            </Grid>
            <Grid item md={12} xs={12}>
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
              <span className="terms-text">
                I confirm that the address belongs to me and all transactions
                will be associated with the same.
              </span>
            </Grid>
            <Grid item md={12} xs={12}>
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
              <span className="terms-text">
                I have read and understood all terms and conditions.
              </span>
            </Grid>
          </>
        )}
      </Grid>
     
    </>
  );
}
