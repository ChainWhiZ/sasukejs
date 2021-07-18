import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Navbar from "../navbar/navbar";
import SideDrawer from "./drawer";

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

export default function ProfilePage(props) {
    const classes = useStyles();
    //   const [data, setData] = useState([]);
    //   useEffect(() => {
    //     axios
    //       .get(`http://localhost:4000/question/fetchall`)
    //       .then((response) => {
    //         setData(response.data);
    //       })
    //       .catch((err) => console.log(err));
    //   }, [data._id]);

    return (
        <div className={classes.root}>

            <Grid container spacing={6}>
                <Grid item md={12} xs={12}>
                    <Navbar />
                </Grid>
                <br/>
                <Grid item md={3} xs={12}>
                    <SideDrawer />
                </Grid>
                <Grid item md={9} xs={12}>

                </Grid>
            </Grid>
        </div>
    );
}
