import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const timelines = ["weeks", "days", "months"];
const categoriesFields = ["frontend", "backend", "smart contract"];
const approvalTypes = ["I will approve the solution", "The community will approve the solution"]
export default function QuestionPost() {
    const classes = useStyles();
    const [questionTitle, setQuestionTitle] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [days, setDays] = useState(0);
    const [walletAddress, setWalletAddress] = useState('');
    const [categories, setCategories] = useState([]);
    const [approvalType, setApprovalType] = useState('');
    const [undertakings, setUndertakings] = useState({
        undertaking1: false,
        undertaking2: false
    });
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleUndertakings = (e) => {
        setUndertakings({ ...undertakings, [e.target.name]: e.target.checked });
    };
    const handleCategoryChange = (value) => {
        categories.includes(value) ?
            setCategories(categories.filter(category => category !== value)) :
            setCategories((oldArray) => [...oldArray, `${value}`]);

    }

    const handleValidation = () => {
        if (questionTitle === '') {
            setOpen(true);
            setErrorMessage("Please enter question title");
        }
        if (githubLink === '') {
            setOpen(true);
            setErrorMessage("Please enter github issue link");
        }
        if (days === 0) {
            setOpen(true);
            setErrorMessage("Please enter number of days");
        }
        if (walletAddress === '') {
            setOpen(true);
            setErrorMessage("Please enter your wallet address");
        }
        if (categories === []) {
            setOpen(true);
            setErrorMessage("Please select categories");
        }
        if (approvalType === '') {
            setOpen(true);
            setErrorMessage("Please select approval types");
        }
        if (undertakings.undertaking1 === false || undertakings.undertaking2 === false) {
            setOpen(true);
            setErrorMessage("Please comfirm the undertakings");
        }
    }

    const handleClose = () => {
        setOpen(false);
    }


    return (

        <>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <p>Post your issue</p>
                    <p>Publish your issue and let developers do the rest for you.</p>
                </Grid>
                <Grid item xs={12}>
                    <label>QUESTION TITTLE</label>
                    <br />
                    <TextField fullWidth size="small" type={"text"} variant="outlined" value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)} />
                </Grid>
                <Grid item xs={12} >

                    <label>CATEGORY</label>
                    {categoriesFields.map((category) =>
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


                    )}     </Grid>
                <Grid item xs={12} >
                    <p>Provide details about your question</p>
                    <p>This helps the developer better understand your requirements.</p>
                </Grid>

                <Grid item xs={12} md={6}>

                    <TextField size="small" variant="outlined" type={"text"} value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />


                </Grid>
                <Grid item xs={12} md={12}>

                    <label>EXPECTED ITEM OF DELIVERY</label>
                </Grid>
                <Grid item xs={12} >

                    <TextField size="small" variant="outlined" type={"number"} value={days} onChange={(e) => setDays(e.target.value)} />
                    <span>DAYS</span>
                </Grid>
                <Grid item xs={12} md={12}>

                    <p>
                        Decide how the solution will be approved
                    </p>
                    <p>
                        You can either self approve the solution or let the community vote and decide.
                    </p>
                </Grid>

                <Grid item xs={12} >
                    <FormControl component="fieldset">
                        <label>APPROVAL TYPE</label>

                        <RadioGroup row aria-label="position" name="position" defaultValue="top" value={approvalType} onChange={(e) => setApprovalType(e.target.value)}>
                            {approvalTypes.map(approvalType =>
                                <Box sx={{ p: 2, border: '1px dashed grey' }}>


                                    <FormControlLabel
                                        value={approvalType}
                                        control={<Radio color="primary" />}
                                        label={approvalType} />
                                </Box>
                            )}
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12}>
                    <p>COMMUNITY REWARD</p>
                </Grid>
                <Grid item xs={12}>
                    <TextField size="small" variant="outlined" type={"number"} />

                    <span>MATIC</span>

                </Grid>

                <Grid item xs={12}>
                    <p>WALLET ADDRESS</p>
                </Grid>
                <Grid item xs={12}>
                    <TextField size="small" type={"text"} fullWidth variant="outlined" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
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
                    <Button variant="contained" href="#contained-buttons" onClick={() => handleValidation}>
                        Publish
                    </Button>
                </Grid>
            </Grid>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    {errorMessage}
                </Alert>
            </Snackbar>


        </>
    )
}