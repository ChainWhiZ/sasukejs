import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import SimpleAlerts from "../../alert/alert";
import { Grid } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { options } from "../../../constants";
import "../baseComponent/baseComponentCss.css";

export default function RadioInputComponent(props) {
  const [currentOption, setCurrentOptions] = useState(options.issueUrlOptions);

  useEffect(() => {
    handleCurrentOptions();
  });
  function handleRadioOnChange(value) {
    console.log(props);
    console.log(props.issueUrlOptions);
    if (props.pageState === 5) {
      return props.handleIssueUrlOptions((prevState) => ({
        ...prevState,
        choice: value,
      }));
    }
    console.log(props.issueUrlOptions);
  }
  function handleInputOnChange(value, type) {
    console.log(props);
    console.log(props.issueUrlOptions);
    if (props.pageState === 5) {
      return props.handleIssueUrlOptions((prevState) => ({
        ...prevState,
        [type === 1 ? "url1" : "url2"]: value,
        [type === 1 ? "url2" : "url1"]: "",
      }));
    }
    console.log(props.issueUrlOptions);
  }
  function handleCurrentOptions() {
    if (props.pageState === 5) return options.issueUrlOptions;
  }

  function handleSelection() {
    if (props.pageState === 5) return props.issueUrlOptions;
  }

  return (
    <>
      {props.alert.isValid ? (
        <SimpleAlerts severity={"warning"} message={props.alert.errorMessage} />
      ) : null}

      <Grid
        container
        spacing={10}
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="input-field-style margin-left-8 margin-top-8 "
      >
        <Grid item md={12} xs={12}>
          <Radio
            checked={handleSelection().choice === currentOption[0].value}
            onChange={(e) => handleRadioOnChange(e.target.value)}
            value={currentOption[0].value}
            className="radio-button"
            name="radio-buttons"
            inputProps={{ "aria-label": currentOption[0].label }}
          />
          <span>Enter bounty URL</span>

          <Input
            className="input-field-style radio-input"
            id="standard-basic"
            placeholder={currentOption[0].placeholder}
            variant="standard"
            onChange={(e) => handleInputOnChange(e.target.value, 1)}
            value={handleSelection().url1}
            disabled={!(handleSelection().choice === currentOption[0].value)}
          />
        </Grid>
        {/* <Grid item md={12} xs={12}>
                    <Radio
                        checked={handleSelection().choice === currentOption[1].value}
                        onChange={(e) => handleRadioOnChange(e.target.value)}
                        value={currentOption[1].value}
                        name="radio-buttons"
                        className="radio-button"
                        inputProps={{ 'aria-label': currentOption[1].label }}
                    />
                    <span>Enter Any Other Link</span>
                    <Input className="input-field-style radio-input"
                        id="standard-basic"
                        placeholder={currentOption[1].placeholder}
                        variant="standard"
                        onChange={(e) => handleInputOnChange(e.target.value, 2)}
                        value={handleSelection().url2}
                        disabled={!(handleSelection().choice === currentOption[1].value)} />
                </Grid> */}
      </Grid>
    </>
  );
}
