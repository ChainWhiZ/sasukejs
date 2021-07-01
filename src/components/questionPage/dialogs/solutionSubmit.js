import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles((theme) => ({
    root: {

        height: "50%",
        overflow: "scroll"

    },
}));

export default function SolutionSubmit(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(props.open);
    const [scroll, setScroll] = useState('paper');
    const [solution, setSolution] = useState('');
    const [username] = localStorage.getItem('username');
    const [solutions, setSoltuion] = useState([]);
    const handleClose = () => {
        setOpen(false);
        props.handleDialogClose(false);
    };
    const handleChange = (value, index) => {
        const sols = solutions;
        sols[index] = value;
        setSoltuion(sols);
    };

    const handleSubmit = (workplanId) => {

        setOpen(false);
        props.handleDialogClose(false);
    };
    console.log(props)

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} scroll={scroll}
            aria-describedby="scroll-dialog-description">
            <DialogTitle id="simple-dialog-title">Submit Solution</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText
                    id="scroll-dialog-description">
                    {props.workplanIds.map((workplanId, index) => (
                        <>
                            <Card>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <p>{workplanId}</p>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type={"text"}
                                                variant="outlined"
                                                label="Solution github link"
                                                value={solutions[index]}
                                                onChange={(e) => handleChange(e.target.value, index)}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => handleSubmit(workplanId,solutions[index])}>Submit</Button>
                                </CardActions>
                            </Card>

                            <br />

                        </>
                    ))}

                    <Button onClick={handleClose}>Close</Button>

                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

