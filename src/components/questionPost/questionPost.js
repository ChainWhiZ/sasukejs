import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import { categoriesFields, approvalTypes } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

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
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleUndertakings = (e) => {
    setUndertakings({ ...undertakings, [e.target.name]: e.target.checked });
  };
  const handleCategoryChange = (value) => {
    categories.includes(value)
      ? setCategories(categories.filter((category) => category !== value))
      : setCategories((oldArray) => [...oldArray, `${value}`]);
  };
  const handleGithubIssueValidation = async () => {
    console.log("hi");
    return axios
      .post("http://localhost:4000/question/validate", {
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
      setOpen(true);
      setErrorMessage("Please enter question title");
    } else if (!githubLink.match(reg)) {
      setOpen(true);
      setErrorMessage("Please enter github issue link");
    } else if (!(await handleGithubIssueValidation())) {
      setOpen(true);
      setErrorMessage("Please enter valid github issue link");
    } else if (days <= 0) {
      setOpen(true);
      setErrorMessage("Please valid number of days");
    } else if (walletAddress === "") {
      setOpen(true);
      setErrorMessage("Please enter your wallet address");
    } else if (categories === []) {
      setOpen(true);
      setErrorMessage("Please select categories");
    } else if (approvalType === "") {
      setOpen(true);
      setErrorMessage("Please select approval types");
    } else if (bountyReward <= 0) {
      setOpen(true);
      setErrorMessage("Please valid bounty reward");
    } else if (approvalType === approvalTypes[1] && communityReward <= 0) {
      setOpen(true);
      setErrorMessage("Please valid community reward");
    } else if (
      undertakings.undertaking1 === false ||
      undertakings.undertaking2 === false
    ) {
      setOpen(true);
      setErrorMessage("Please comfirm the undertakings");
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const timeBegin = Math.floor(new Date().getTime() / 1000);
    var timeEnd = timeBegin + days * 24 * 60 * 60;

    axios
      .post(`http://localhost:4000/question/save`, {
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
        console.log(response);
        history.push({
          pathname: `/bounty/${response.data}`,
          state: { id: response.data },
        });
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <p>Post your issue</p>
          <p>Publish your issue and let developers do the rest for you.</p>
        </Grid>
        <Grid item xs={12}>
          <p>QUESTION TITTLE</p>

          <TextField
            fullWidth
            size="small"
            type={"text"}
            variant="outlined"
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <p>CATEGORY</p>
          {categoriesFields.map((category) => (
            <FormControlLabel
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              control={
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  color="primary"
                />
              }
              label={category}
            />
          ))}{" "}
        </Grid>
        <Grid item xs={12}>
          <p>Provide details about your question</p>
          <p>This helps the developer better understand your requirements.</p>
        </Grid>

        <Grid item xs={12} md={6}>
          <p>GITHUB LINK</p>

          <TextField
            size="small"
            variant="outlined"
            type={"text"}
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <p>EXPECTED TIME OF DELIVERY</p>

          <TextField
            size="small"
            variant="outlined"
            type={"number"}
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
          <Box component="span" p={1} border={1}>
            Days
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <p>Decide how the solution will be approved</p>
          <p>
            You can either self approve the solution or let the community vote
            and decide.
          </p>
        </Grid>

        <Grid item xs={12}>
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
                <Box sx={{ p: 2, border: "1px dashed grey" }}>
                  <FormControlLabel
                    value={approvalType}
                    control={<Radio color="primary" />}
                    label={approvalType}
                  />
                </Box>
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <p>BOUNTY REWARD</p>
          <TextField
            size="small"
            variant="outlined"
            type={"number"}
            value={bountyReward}
            onChange={(e) => {
              setBountyReward(e.target.value);
            }}
          />

          <Box component="span" p={1} border={1}>
            MATIC
          </Box>
        </Grid>
        {approvalType === approvalTypes[1] ? (
          <Grid item xs={12}>
            <p>COMMUNITY REWARD</p>
            <TextField
              size="small"
              variant="outlined"
              type={"number"}
              value={communityReward}
              onChange={(e) => {
                setCommunityReward(e.target.value);
              }}
            />

            <span>MATIC</span>
          </Grid>
        ) : (
          ""
        )}
        <Grid item xs={12}>
          <p>WALLET ADDRESS</p>
          <TextField
            size="small"
            type={"text"}
            fullWidth
            variant="outlined"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => handleValidation()}>
            Publish
          </Button>
        </Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
