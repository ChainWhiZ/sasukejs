import React from "react";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SimpleAlerts from "../../alert/alert";

export default function InputComponent(props) {


  const handleCurrencyChange = (event) => {
    props.handleCurrency(event.target.value);
  };
  function handlePlaceholder() {
    if (props.pageState === 1) return "Enter Bounty Title";
    if (props.pageState === 3) return "Enter Evaluation Criteria";
    if (props.pageState === 6) return "Enter Bounty Description";
    if (props.pageState === 7) return "Enter Reward Amount";
    if (props.pageState === 10) return "Enter Community Reward";
    if (props.pageState === 11) return "Confirm Wallet Address";
  }

  function handleValue() {
    if (props.pageState === 1) return props.issueTitle;
    if (props.pageState === 3) return props.evaluationCriteria;
    if (props.pageState === 6) return props.issueDescription;
    if (props.pageState === 7) return props.reward;
    if (props.pageState === 10) return props.communityReward;
  }

  function handleOnChange(value) {
    if (props.pageState === 1) return props.handleIssueTitle(value);
    if (props.pageState === 3) return props.handleEvaluationCriteria(value);
    if (props.pageState === 6) return props.handleIssueDescription(value);
    if (props.pageState === 7) return props.handleReward(value);
    if (props.pageState === 10) return props.handleCommunityReward(value);
  }

  function handleUndertakings(e) {
    props.handleTerms({ ...props.terms, [e.target.name]: e.target.checked });
  }

  function handleLabel() {
    if (props.pageState === 1) return "Bounty Title";
    if (props.pageState === 3) return "Evaluation Criteria";
    if (props.pageState === 7) return "Enter Your Reward";
    if (props.pageState === 6) return "Bounty description";
    if (props.pageState === 10) return "Enter Community Reward";
    if (props.pageState === 11) return "Your Wallet Address";
  }
  function handleStyle(el = "parent") {
    if (el === "input") {
      if (props.pageState === 7 || props.pageState === 10)
        return "input-field-style input-field-number";
      return "input-field-style";
    } else {
      // if (props.pageState === 10) return "margin-left-30";
      return "input-parent";
    }
  }

  console.log(props);

  return (
    <>
      {props.alert.isValid ? (
        <SimpleAlerts severity={"warning"} message={props.alert.errorMessage} />
      ) : null}
      <Grid
        container
        direction="column"
        alignItems={props.pageState === 11 ? "flex-start" : "center"}
        justifyContent={props.pageState === 11 ? "flex-start" : "center"}
        className={handleStyle()}
      >
        <Grid item md={12} xs={12} className={props.pageState === 11 ? "margin-left-42" : "margin-left-8"}>
          <p className="left-title">{handleLabel()}</p>
        </Grid>
        {props.pageState === 1 ||
          props.pageState === 3 ||
          props.pageState === 5 ||
          props.pageState === 6 ||
          props.pageState === 7 ||
          props.pageState === 10 ? (
          <>
            <Grid item md={8} xs={8} className="margin-top-2">
              <Input

                type={
                  props.pageState === 7 || props.pageState === 10
                    ? "number"
                    : "text"
                }
                inputProps={{
                  style: { textAlign: "center" },
                  min: (props.pageState === 7) ? 10 : 5,
                }}
                placeholder={handlePlaceholder()}
                value={handleValue()}
                className={handleStyle("input")}
                onChange={(e) => {
                  handleOnChange(e.target.value);
                }}
              />
            </Grid>


            <Grid item md={12} className="cwz">
              {
                props.pageState === 7
                  ?
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={props.currency}
                    className="bounty-post-unit"
                    onChange={handleCurrencyChange}
                    label="Currency"
                  >

                    <MenuItem value={"MATIC"}>MATIC</MenuItem>
                    <MenuItem value={"DEV"}>DEV</MenuItem>
                  </Select>
                  : props.pageState === 10 ?
                    <p className="bounty-post-unit">{(props.currency).toUpperCase()}</p>
                    : null}
            </Grid>

          </>
        ) : (
          <>
            <Grid item md={12} xs={12} style={{ marginLeft: props.walletAddress ? "35%" : "46%" }}>
              <Input
                value={props.walletAddress ? props.walletAddress : "Not Connected"}
                className="input-field-style"
                disabled={true}
              />
              <br />
              <br />
              <br />
            </Grid>
            <Grid item md={12} xs={12} style={{ marginLeft: "23%"}}>
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
            <Grid item md={12} xs={12}  style={{ marginLeft: "23%"}}>
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
