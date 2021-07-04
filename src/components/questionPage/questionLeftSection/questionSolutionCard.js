import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    list: {

        "list-style-type": "none"

    },
}));

export default function QuestionSolutionCard(props) {
    const classes = useStyles();
    const [workplanAuthor, setWorkplanAuthor] = useState("akp");
    const [solutionAuthors, setSolutionAuthors] = useState(["akp", "akp", "akp"]);
    const [votes, setVotes] = useState([23, 45, 12]);

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <a >{workplanAuthor + " submitted " + props.workplan}</a>
                        </Grid>
                        <Grid item xs={12}>
                            <ul className={classes.list}>
                                {
                                    props.solutions.map((solution, index) => (

                                        <li>
                                            {solutionAuthors[index] + " submitted " + solution + " - " + votes[index]}
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

