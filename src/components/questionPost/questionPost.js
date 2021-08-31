import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SimpleAlerts from "../alert/alert";
import axios from "axios";
import Navbar from "../navbar/navbar";
import { Redirect } from "react-router-dom";
import { categoriesFields, approvalTypes } from "../../constants";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import Paper from "@material-ui/core/Paper";
import {
  initiliaseWeb3,
  fetchAccount,
  initiliaseContract,
} from "../../web3js/web3";
import { useStyles } from "./questionPostCss";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import "../questionPage/questionPage.css";
import { port } from "../../config/config";

export default function QuestionPost() {
  const classes = useStyles();
  let history = useHistory();
  const [username] = useState(localStorage.getItem("username"));
  const [questionTitle, setQuestionTitle] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [days, setDays] = useState(0);
  const [bountyReward, setBountyReward] = useState(0);
  const [communityReward, setCommunityReward] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [categories, setCategories] = useState([]);
  const [approvalType, setApprovalType] = useState("");
  const [undertakings, setUndertakings] = useState({
    undertaking1: false,
    undertaking2: false,
  });
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "warning",
  });
  const [contract, setContract] = useState("");
  const [successStatus, setSuccessStatus] = useState(false);
  useEffect(async () => {
    await initiliaseWeb3();
    await fetchAccount(function (result) {
      setWalletAddress(result[0]);
    });
    setContract(await initiliaseContract());
  }, []);

  const questionPosting = async () => {
    return await contract.methods
      .questionPosting(
        githubLink,
        days.toString(),
        (communityReward * Math.pow(10, 18)).toString(),
        (bountyReward * Math.pow(10, 18)).toString()
      )
      .send({ from: walletAddress }, function (error, transactionHash) {
        if (transactionHash) {
          return true;
        }
      });
  };
  const handleUndertakings = (e) => {
    setUndertakings({ ...undertakings, [e.target.name]: e.target.checked });
  };
  const handleCategoryChange = (value) => {
    categories.includes(value)
      ? setCategories(categories.filter((category) => category !== value))
      : setCategories((oldArray) => [...oldArray, `${value}`]);
  };
  const handleGithubIssueValidation = async () => {
    return axios
      .post(port + "question/validate", {
        githubIssueUrl: githubLink,
      })
      .then((response) => {
        if (response.status === 200) {
          return true;
        }
      })
      .catch((err) => {
        return false;
      });
  };

  const handleValidation = async () => {
    const reg = /https?:\/\/github\.com\/(?:[^\/\s]+\/)+(?:issues\/\d+)/;
    if (questionTitle === "") {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Please enter question title",
      }));
    } else if (!githubLink.match(reg)) {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Please enter github issue link",
      }));
    } else if (!(await handleGithubIssueValidation())) {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Please enter valid github issue link",
      }));
    } else if (days <= 0) {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Please valid number of days",
      }));
    } else if (walletAddress === "") {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Please enter your wallet address",
      }));
    } else if (categories === []) {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Please select categories",
      }));
    } else if (approvalType === "") {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Please select approval types",
      }));
    } else if (bountyReward <= 0) {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Please valid bounty reward",
      }));
    } else if (approvalType === approvalTypes[1] && communityReward <= 0) {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Please valid community reward",
      }));
    } else if (
      undertakings.undertaking1 === false ||
      undertakings.undertaking2 === false
    ) {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        errorMessage: "Please confirm the undertakings",
      }));
    } else {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const timeBegin = Math.floor(new Date().getTime() / 1000);
    let timeEnd = timeBegin + days * 24 * 60 * 60;
    return Promise.resolve()
      .then(async function () {
        return await questionPosting();
      })
      .then(async function () {
        return setSuccessStatus(true);
      })
      .then(async function () {
        return axios
          .post(port + "question/save", {
            githubId: username,
            publicAddress: walletAddress,
            questionTitle: questionTitle,
            githubIssueUrl: githubLink,
            timeEnd: timeEnd,
            solvingTimeBegin: timeBegin,
            votingTimeBegin:
              approvalType === approvalTypes[1]
                ? timeBegin + Math.floor(0.7 * (timeEnd - timeBegin)) + 1
                : 0,
            bountyReward: bountyReward,
            communityReward: communityReward,
            isCommunityApprovedSolution:
              approvalType === approvalTypes[1] ? true : false,
            questionCategories: categories,
          })
          .then((response) => {
            history.push({
              pathname: `/bounty/${response.data}`,
              state: { id: response.data },
            });
          });
      })
      .then(function () {});
  };

  if (!username) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="column" justifyContent="center">
        <Grid item md={12} xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12} className={classes.heading}>
          <h1>Post your bounty</h1>
          <p>Publish your bounty and let developers do the rest for you.</p>
        </Grid>
        <Grid
          container
          xs={12}
          className={classes.marginLeftRight10}
          direction="column"
        >
          <p>QUESTION TITTLE</p>

          <TextField
            style={{ width: "70%" }}
            size="small"
            type={"text"}
            variant="outlined"
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
          />
        </Grid>

        <Grid container xs={12} className={classes.marginLeftRight10}>
          <p>CATEGORY</p>
        </Grid>
        <Grid container className={classes.marginLeftRight10}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={12}
          >
            {categoriesFields.map((category) => (
              <Grid item md>
                <Paper
                  className={classes.paper}
                  style={{
                    marginRight: "270px",
                    padding: "5px",
                    paddingRight: "5px",
                    border: "1px solid #707070",
                  }}
                >
                  <FormControlLabel
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    control={
                      <Checkbox
                        icon={<RadioButtonUncheckedIcon fontSize="small" />}
                        checkedIcon={
                          <RadioButtonCheckedIcon fontSize="small" />
                        }
                        color="primary"
                      />
                    }
                    label={category}
                  />
                </Paper>
              </Grid>
            ))}{" "}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          className={classes.heading}
          style={{ marginTop: "70px" }}
        >
          <h3>Provide details about your bounty</h3>
          <p>This helps the developer better understand your requirements.</p>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={12}
          className={classes.marginLeftRight10}
        >
          <Grid item xs={12} md={6} lg={6}>
            <p>GITHUB LINK</p>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              type={"text"}
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid
          container
          className={classes.marginLeftRight10}
          direction="row"
          style={{ marginTop: "50px" }}
        >
          <Grid item md={12}>
            <p>EXPECTED TIME OF DELIVERY</p>
          </Grid>
          <Grid md={1}>
            <TextField
              size="small"
              variant="outlined"
              type={"number"}
              value={days}
              InputProps={{ inputProps: { min: 0, max: 360 } }}
              onChange={(e) => setDays(e.target.value)}
            />
          </Grid>
          <Grid md={11} style={{ marginTop: "7.5px" }}>
            <Box
              component="span"
              p={1}
              border={1}
              style={{ borderRadius: "5px", marginLeft: "-3px" }}
            >
              Days
            </Box>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          className={classes.heading}
          style={{ marginTop: "70px" }}
        >
          <h3>Decide how the solution will be approved</h3>
          <p>
            You can either self approve the solution or let the community vote
            and decide.
          </p>
        </Grid>

        <Grid
          container
          xs={12}
          className={classes.marginLeftRight10}
          justifyContent="space-between"
        >
          <FormControl component="fieldset">
            <p>APPROVAL TYPE</p>

            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
              value={approvalType}
              onChange={(e) => setApprovalType(e.target.value)}
            >
              {approvalTypes.map((approvalType) => (
                <Paper
                  style={{
                    marginRight: "120px",
                    padding: "5px",
                    borderStyle: "solid",
                    borderWidth: "1px",
                  }}
                >
                  <Box sx={{ border: "1px dashed grey" }}>
                    <FormControlLabel
                      value={approvalType}
                      control={<Radio color="primary" />}
                      label={approvalType}
                    />
                  </Box>
                </Paper>
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid
            item
            md={12}
            className={classes.marginLeftRight10}
            style={{ marginTop: "50px" }}
          >
            <p>BOUNTY REWARD</p>
            <Grid container>
              <Grid item md={1}>
                <TextField
                  size="small"
                  variant="outlined"
                  type={"number"}
                  value={bountyReward}
                  InputProps={{ inputProps: { min: 0, max: 10000 } }}
                  onChange={(e) => {
                    setBountyReward(e.target.value);
                  }}
                />
              </Grid>
              <Grid item md={11} style={{ marginTop: "7.5px" }}>
                <Box
                  component="span"
                  p={1}
                  border={1}
                  style={{ borderRadius: "5px", marginLeft: "10px" }}
                >
                  CW
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {approvalType === approvalTypes[1] ? (
            <Grid
              container
              className={classes.marginLeftRight10}
              direction="row"
            >
              <Grid item md={12}>
                <p>COMMUNITY REWARD</p>
              </Grid>
              <Grid item md={1}>
                <TextField
                  size="small"
                  variant="outlined"
                  type={"number"}
                  InputProps={{ inputProps: { min: 0, max: 10000 } }}
                  value={communityReward}
                  onChange={(e) => {
                    setCommunityReward(e.target.value);
                  }}
                />
              </Grid>
              <Grid item md={11} style={{ marginTop: "7.5px" }}>
                <Box
                  component="span"
                  p={1}
                  border={1}
                  style={{ borderRadius: "5px", marginLeft: "10px" }}
                >
                  CW
                </Box>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </Grid>

        <Grid
          container
          xs={12}
          className={classes.marginLeftRight10}
          style={{ marginTop: "50px" }}
          direction="column"
        >
          <p>WALLET ADDRESS</p>
          <TextField
            style={{ width: "70%" }}
            size="small"
            type={"text"}
            fullWidth
            variant="outlined"
            value={walletAddress}
            disabled
          />
        </Grid>
        <Grid
          container
          xs={12}
          className={classes.marginLeftRight10}
          style={{ marginTop: "70px" }}
        >
          <FormControlLabel
            control={
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="undertaking1"
                checked={undertakings.undertaking1}
                onChange={handleUndertakings}
                color="primary"
              />
            }
            label="I have read, understand, and agree to, the Terms of Service."
          />
        </Grid>
        <Grid container xs={12} className={classes.marginLeftRight10}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="undertaking2"
                checked={undertakings.undertaking2}
                onChange={handleUndertakings}
                color="primary"
              />
            }
            label="I agree to pay the proposed amount to the fulfiller(s) if the submitted fulfillment meets the standards I have set forth."
          />
        </Grid>
        <Grid item xs={12} className={classes.marginLeftRight10}>
          <Button variant="contained" onClick={() => handleValidation()}>
            Publish
          </Button>
        </Grid>
      </Grid>
      {successStatus ? (
        <SimpleAlerts severity={"success"} message={"Question Posted"} />
      ) : null}

      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </div>
  );
}
