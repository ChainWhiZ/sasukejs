import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    list: {

        "list-style-type": "none"

    },
}));

export default function QuestionSolutionCard(props) {
    const classes = useStyles();
    const [applicants, setApplicants] = useState([]);
    useEffect(() => {
        axios
            .post(`http://localhost:4000/workplan/fetch`, {
                _id: props.workplanId,
            })
            .then((response) => {
                setApplicants(response.data)
            })
            .catch((err) => console.log(err));
    }, []);


    return (
        <>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <a hred="#">{applicants.userId + " submitted " + applicants._id}</a>
                        </Grid>
                        <Grid item xs={12}>
                            <ul className={classes.list}>
                                {
                                    applicants.solutionsIds &&
                                    applicants.solutionsIds.length &&
                                    applicants.solutionsIds.map((solution, index) => (

                                        <li>
                                            {solution.userId + " submitted " + solution._id}
                                        </li>
                                    ))
                                }
                            </ul>
                        </Grid>
                    </Grid>
                </CardContent>

            </Card>

        </>

    );
}

