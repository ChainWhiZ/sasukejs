import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
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
const categories = ["front end", "backend", "smart contract"];
export default function QuestionPost() {
    const classes = useStyles();
    return (

        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <p>Post your issue</p>
                    <p>Publish your issue and let developers do the rest for you.</p>
                </Grid>
                <Grid item xs={12}>
                    <label>QUESTION TITTLE</label>
                    <br />
                    <input type="text" />
                </Grid>
                <Grid item xs={12} md={12}>

                    <FormControl component="fieldset">
                        <label>CATEGORY</label>

                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            {categories.map(category =>
                                <Box sx={{ p: 2, border: '1px dashed grey' }}>


                                    <FormControlLabel
                                        value={category}
                                        control={<Radio color="primary" />}
                                        label={category} />
                                </Box>
                            )}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    <p>Provide details about your question</p>
                    <p>This helps the developer better understand your requirements.</p>
                </Grid>
                <Grid container item xs={12} md={12} >
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            <Grid item xs={12} md={6}>
                                <label>GITHUB URL</label>
                                <br />
                                <FormControlLabel
                                    value="githubLink"
                                    control={<Radio color="primary" />}
                                    label={
                                        <input type="text" />
                                    }
                                />

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <label>DOCUMENTATION</label>
                                <br />
                                <FormControlLabel
                                    value="documentation"
                                    control={<Radio color="primary" />}
                                    label={
                                        <input type="text" />
                                    }
                                />

                            </Grid>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid container item xs={12} md={12}>
                 
                
                <Grid item xs={12} md={4}>
                    

                </Grid>
                <Grid item xs={12} md={4}>
                    

                </Grid>
                <Grid item xs={12} md={4}>
                    

                </Grid>
                <Grid item xs={12} md={4}>
                    

                </Grid>
                </Grid>
            </Grid>
        </div>
    );




}